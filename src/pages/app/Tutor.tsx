import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, SendHorizonal, Square, Trash2 } from "lucide-react";
import { useStore } from "../../lib/store";
import { buildSystemPrompt, FORMAT_REMINDER, GROUNDING_REMINDER, simplifyReminder } from "../../lib/persona";
import { factualAnswer, groundingFor, groundingForChapter } from "../../lib/grounding";
import { generateOnce, offlineTutorReply, streamChat, toWire } from "../../lib/ai";
import { buildMarkPrompt, gradeAnswer, readMark } from "../../lib/grade";
import {
  advance,
  currentConcept,
  detectLessonIntent,
  lessonMap,
  lessonProgress,
  planTurn,
  readTags,
  resolveVerdict,
  startLesson,
  type LessonState,
} from "../../lib/lesson";
import { conceptMapFor } from "../../data/concepts";
import { hardWordsIn, observeStudent, type LearnerProfile } from "../../lib/learner";
import { Markdown, Spinner } from "../../components/ui";
import { LessonRail } from "../../components/LessonRail";
import { LogoMark } from "../../components/Logo";
import type { ChatMessage } from "../../lib/types";

const STARTERS = [
  "I want to learn polynomials from scratch.",
  "Give me a 3-mark question and grade my answer like a CBSE examiner.",
  "I have 40 minutes. What's the best use of it today?",
  "Explain this simply: why do we even use trigonometry?",
];

/** Quick replies during a lesson: the student should never have to type "yes". */
const LESSON_REPLIES: Record<string, string[]> = {
  teach: ["I didn't get that", "Explain it simpler", "Got it, what's next?"],
  check: ["I didn't get that", "Give me a hint"],
  reteach: ["That's clearer", "Still confused"],
  recap: ["Give me more practice"],
};

/** Stable reference — a fresh [] in the selector would re-render forever. */
const NO_CHAT: ChatMessage[] = [];

export default function Tutor() {
  const memory = useStore((s) => (s.currentUser ? s.memories[s.currentUser.id] : null));
  const chat = useStore((s) => (s.currentUser ? (s.chats[s.currentUser.id] ?? NO_CHAT) : NO_CHAT));
  const lesson = useStore((s) => (s.currentUser ? (s.lessons[s.currentUser.id] ?? null) : null));
  const storedProfile = useStore((s) => (s.currentUser ? s.profiles[s.currentUser.id] : null));
  const pushChat = useStore((s) => s.pushChat);
  const clearChat = useStore((s) => s.clearChat);
  const addAltitude = useStore((s) => s.addAltitude);
  const updateMemory = useStore((s) => s.updateMemory);
  const setLesson = useStore((s) => s.setLesson);
  const setProfile = useStore((s) => s.setProfile);
  const recordProgress = useStore((s) => s.recordProgress);

  const profile: LearnerProfile = storedProfile ?? {
    level: 1,
    worksWith: [],
    avoids: [],
    interests: [],
    habits: [],
    language: "English",
    reteaches: 0,
    firstTimeWins: 0,
    updatedAt: Date.now(),
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const autoSentRef = useRef(false);
  // Bumped whenever a session is reset; an in-flight send() whose token no
  // longer matches discards its result instead of writing into a cleared chat.
  const genRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.length, draft]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Arriving from "Teach me this chapter": the lesson prompt travels in nav
  // state instead of the clipboard, so it can be sent straight away.
  useEffect(() => {
    const navState = location.state as { autoPrompt?: string; chapterId?: string } | null;
    const autoPrompt = navState?.autoPrompt;
    if (!autoPrompt || autoSentRef.current) return;
    autoSentRef.current = true;
    navigate(location.pathname, { replace: true, state: null });
    // A lesson already mid-check on this exact chapter must not have the
    // canned autoPrompt run through it as the student's graded answer — the
    // chat already shows the current turn, so there is nothing to do here.
    const resuming =
      lesson && lesson.chapterId === navState?.chapterId && lesson.phase !== "placement";
    if (!resuming) send(autoPrompt, navState?.chapterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  /**
   * One turn of the conversation.
   *
   * Two modes share this path. In free chat the model gets the full persona and
   * answers the question. Inside a lesson the ENGINE decides what this reply is
   * for — ask the placement questions, teach step 3, mark an answer, re-explain
   * — and hands the model one small job with a hard word limit. That is the
   * whole difference between a tutor and a generator.
   */
  async function send(text?: string, startChapterId?: string) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");

    const userMsg: ChatMessage = { role: "user", content, ts: Date.now() };
    pushChat(userMsg);
    setBusy(true);
    setDraft("");

    const myGen = genRef.current;
    let history = [...chat, userMsg];

    // Some questions are matters of fact the app already holds, and the honest
    // answer costs nothing to produce and cannot be got wrong. Asking a model
    // to say "that exercise does not exist" is asking it to be trusted about
    // something we already know for certain.
    const known = factualAnswer(content, memory?.classLevel);
    if (known) {
      pushChat({ role: "assistant", content: known, ts: Date.now() });
      setBusy(false);
      setProfile(observeStudent(profile, content).profile);
      return;
    }

    // Read the student before answering them: what they like, what they keep
    // getting wrong, and whether they just told us they are lost.
    const observed = observeStudent(profile, content);
    let nextProfile = observed.profile;

    // Starting a lesson, or continuing one.
    let active: LessonState | null = lesson;
    let justStarted = false;
    // The exact chapterId a lesson intent resolved to, kept even when
    // startLesson finds no concept map for it — so the grounding fallback
    // below can still ground on that chapter instead of fuzzy-searching the
    // raw message and risking a different chapter's content.
    let groundChapterId: string | null = startChapterId ?? null;
    // "Teach me this chapter" carries the exact chapter clicked, so it is
    // trusted directly — never re-matched against the prompt text, which
    // detectLessonIntent scopes to the student's stored class and can miss
    // or misfire when the chapter clicked is from a different class.
    if (startChapterId) {
      if (!active || active.chapterId !== startChapterId) {
        const map = conceptMapFor(startChapterId);
        active = startLesson(startChapterId, map?.classLevel ?? memory?.classLevel ?? 10);
        justStarted = Boolean(active);
      }
    } else if (!active) {
      const intent = detectLessonIntent(content, memory?.classLevel);
      if (intent) {
        groundChapterId = intent.chapterId;
        active = startLesson(intent.chapterId, memory?.classLevel ?? 10);
        justStarted = Boolean(active);
      }
    } else {
      // A clear "teach me chapter X" for a DIFFERENT chapter must end the
      // lesson in progress and start the new one — never get graded as the
      // student's answer inside the wrong lesson.
      const intent = detectLessonIntent(content, memory?.classLevel);
      if (intent && intent.chapterId !== active.chapterId) {
        groundChapterId = intent.chapterId;
        active = startLesson(intent.chapterId, memory?.classLevel ?? 10);
        justStarted = Boolean(active);
      } else if (observed.lost || observed.wantsSlower) {
        // They said it outright, so do not wait for a wrong answer to find out.
        if (active.phase === "teach" || active.phase === "check") {
          active = { ...active, phase: "reteach" };
        }
      }
    }

    // A freshly started lesson (or a chapter switch) must not carry the prior
    // free-chat transcript into the model's context — a new placement check
    // has to read as a clean conversation, not a continuation of whatever was
    // discussed before it.
    if (justStarted) history = [userMsg];

    const plan = active ? planTurn(active, nextProfile, memory) : null;
    // A known chapterId with no plan means startLesson found no concept map
    // for it — ground on that exact chapter (clicked or matched by intent),
    // not a fuzzy re-search of the prompt text that can match a different
    // chapter.
    const grounding = plan
      ? null
      : groundChapterId
        ? groundingForChapter(groundChapterId, memory?.classLevel ?? 10, memory?.mode)
        : groundingFor(content, memory?.classLevel, memory?.mode);
    const system = plan ? plan.system : buildSystemPrompt(memory, grounding, nextProfile);

    // Outside a lesson there is no reteach phase, so "I don't get it" has to be
    // handled here or the next reply comes back harder than the one that just
    // failed — which is measurably what used to happen.
    const needsSimpler = !plan && (observed.lost || observed.wantsSlower);
    const reminder = plan
      ? plan.reminder
      : needsSimpler
        ? `${simplifyReminder(nextProfile.level >= 3 ? 3 : 2, nextProfile.interests, hardWordsIn(chat.filter((m) => m.role === "assistant").slice(-1)[0]?.content ?? "", [content]))}

${FORMAT_REMINDER}

${GROUNDING_REMINDER}`
        : `${FORMAT_REMINDER}

${GROUNDING_REMINDER}`;
    // Free chat had no ceiling at all, and the local model filled whatever it
    // was given: 424, 446 and 478-word replies to single doubts. A doubt gets
    // an answer, not an essay.
    const budget = plan?.maxTokens ?? (needsSimpler ? (nextProfile.level >= 3 ? 240 : 320) : 620);

    const controller = new AbortController();
    abortRef.current = controller;

    let full = "";
    let cancelled = false;
    try {
      for await (const chunk of streamChat(
        toWire(history),
        system,
        controller.signal,
        reminder,
        budget
      )) {
        full += chunk;
        setDraft(full);
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError" || controller.signal.aborted) {
        cancelled = true;
      } else if (/returned 401|returned 403/.test((err as Error)?.message ?? "")) {
        // An expired or missing session, not a dropped connection — telling
        // the student "my full brain isn't reachable" here just sends them
        // chasing a network problem that doesn't exist.
        full = "I can't reach your account right now — please sign in again.";
        cancelled = true;
      } else {
        // A dropped connection mid-turn — with or without partial text
        // already streamed — is not the student getting it wrong, and a
        // half-formed worked example is not a finished one. Treat it like a
        // cancel so the partial text is never pushed as final and advance()
        // never sees an undefined verdict and burns a retry on our outage.
        full = offlineTutorReply(content);
        cancelled = true;
      }
    } finally {
      abortRef.current = null;
    }

    // A "New session" during the stream invalidates this turn — drop it so the
    // finishing reply never lands in a cleared chat as an orphan.
    if (genRef.current !== myGen) return;

    setDraft("");
    setBusy(false);

    if (full) {
      // The engine's control tags are read here and stripped: the student sees
      // a teacher's reply, the app gets a verdict it can act on.
      // The app marks the check answer itself against the stored correct one,
      // and only falls back to the model's own verdict line when the answer
      // cannot be judged mechanically. Without this the lesson stalls on any
      // model that does not emit the control line — every local one, so far.
      let verdict = plan ? readTags(full, plan.phase) : { clean: full };
      if (plan?.phase === "check" && active && !cancelled) {
        verdict = resolveVerdict(currentConcept(active), content, verdict);
        // Still nothing decisive: the app could not mark it mechanically and
        // the model did not say. Rather than leave the student stuck on a step
        // they may well have got right, ask the model one closed question — a
        // job even a 3B does reliably, because it is the only thing being asked.
        const concept = currentConcept(active);
        if (verdict.mastered === undefined && !verdict.isDoubt && concept) {
          // Most chapters have no authored check answer to mark against — the
          // model asked its own question, so judge it against the concept's
          // brief instead of leaving the student stuck on a step they may
          // well have got right.
          const hasKey = Boolean(concept.check.answer);
          const q = hasKey
            ? concept.check.q
            : chat.filter((m) => m.role === "assistant").slice(-1)[0]?.content ?? concept.title;
          const p = buildMarkPrompt(q, hasKey ? concept.check.answer : concept.brief, content, {
            isBrief: !hasKey,
          });
          try {
            const word = await generateOnce(p.user, p.system, undefined, undefined, 8);
            verdict = { ...verdict, mastered: readMark(word), markedBy: "app", why: "second-pass mark" };
          } catch {
            /* leave undecided; the engine treats that as not yet */
          }
          // The second-pass call awaits independently of the main stream, so a
          // "New session" that lands while it is in flight must drop this
          // verdict too — otherwise it lands in the cleared chat and advances
          // the lesson that no longer exists.
          if (genRef.current !== myGen) return;
        }
      }
      let shown = verdict.clean;
      if (plan?.appendAfter) shown += `\n${plan.appendAfter}`;
      pushChat({ role: "assistant", content: shown, ts: Date.now() });

      if (active && plan && !cancelled) {
        const moved = advance(active, verdict, {
          lost: observed.lost,
          wantsSlower: observed.wantsSlower,
        });
        setLesson(moved.phase === "done" ? null : moved);
        // A concept locked in is real progress, and it is worth more than a
        // message sent.
        if (verdict.mastered) {
          addAltitude(10);
          nextProfile = { ...nextProfile, firstTimeWins: nextProfile.firstTimeWins + 1 };
          // A concept mastered mid-lesson is real progress even if the student
          // leaves before recap — record it now, not only at the finish line.
          if (moved.phase !== "done") {
            const { done, total } = lessonProgress(moved);
            recordProgress({
              chapterId: moved.chapterId,
              status: "learning",
              confidence: total ? Math.round((done / total) * 100) : 0,
              lastStudied: new Date().toISOString(),
              masteryAwarded: memory?.progress[moved.chapterId]?.masteryAwarded ?? false,
            });
          }
        }
        if (moved.phase === "done") {
          const { done, total } = lessonProgress(moved);
          const shaky = Object.values(moved.progress).some((p) => p.status === "shaky");
          const alreadyAwarded = memory?.progress[moved.chapterId]?.masteryAwarded ?? false;
          recordProgress({
            chapterId: moved.chapterId,
            status: shaky ? "revising" : "mastered",
            confidence: total ? Math.round((done / total) * 100) : 0,
            lastStudied: new Date().toISOString(),
            masteryAwarded: alreadyAwarded || !shaky,
          });
        }
      } else if (justStarted && active) {
        setLesson(active);
      }
    }

    setProfile(nextProfile);
    if (cancelled) return;

    addAltitude(5);
    // remember the topic loosely so the tutor can reference it next session —
    // but any reply inside a lesson (an answer, a quick-reply chip like "Got
    // it, what's next?") is not a topic, and would otherwise pollute this with
    // UI text or fragments like "x = -3". A lesson session earns one entry —
    // the chapter title, recorded when it starts — not a fresh one per chip.
    if (memory) {
      if (justStarted && active) {
        const title = lessonMap(active)?.chapterTitle;
        if (title) updateMemory({ lastTopics: [...memory.lastTopics.slice(-4), title] });
      } else if (content.length > 12 && !plan) {
        const topic = content.slice(0, 60);
        updateMemory({ lastTopics: [...memory.lastTopics.slice(-4), topic] });
      }
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  /** Reset to a blank session, aborting any in-flight reply cleanly. */
  function newSession() {
    genRef.current++; // invalidate the current turn (if any)
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setDraft("");
    clearChat();
    setLesson(null);
  }

  const quickReplies = lesson && !busy ? (LESSON_REPLIES[lesson.phase] ?? []) : [];
  const lessonTitle = lesson ? lessonMap(lesson)?.chapterTitle : null;

  return (
    <div className="flex flex-col h-[calc(100dvh-8.5rem)] lg:h-[calc(100dvh-7.5rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="eyebrow mb-0.5">Your teacher, 24 × 7</div>
          <h1 className="font-display text-2xl font-bold text-cream">Tutor</h1>
        </div>
        {chat.length > 0 && (
          <button className="btn-ghost !py-2 text-xs" onClick={newSession} title="Start a fresh session">
            <Trash2 size={14} /> New session
          </button>
        )}
      </div>

      {lesson && (
        <LessonRail
          state={lesson}
          profile={profile}
          onQuit={() => setLesson(null)}
        />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1" role="log" aria-live="polite">
        {chat.length === 0 && !busy && (
          <div className="card text-center py-10">
            <div className="flex justify-center mb-4">
              <LogoMark size={40} />
            </div>
            <div className="font-display text-lg font-semibold text-cream mb-1">
              {memory ? `Hey ${memory.name}.` : "Hey."} Ready when you are.
            </div>
            <p className="text-sm text-muted max-w-md mx-auto mb-6">
              Ask a doubt and I'll answer it. Or say you want to learn a chapter
              from scratch, and I'll check what you already know first, then take
              it one step at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  className="chip hover:border-gold-dim hover:text-cream text-left"
                  onClick={() => send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {chat.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] bg-raise border border-line rounded-2xl rounded-br-md px-4 py-3 text-[15px]">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex gap-3">
              <div className="shrink-0 mt-1">
                <LogoMark size={26} />
              </div>
              <div className="max-w-[85%] min-w-0">
                <Markdown text={m.content} />
              </div>
            </div>
          )
        )}

        {busy && (
          <div className="flex gap-3" aria-hidden="true">
            <div className="shrink-0 mt-1">
              <LogoMark size={26} />
            </div>
            <div className="max-w-[85%] min-w-0">
              {draft ? <Markdown text={draft} streaming /> : <Spinner />}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Saying "I don't get it" has to be one tap, or a student who is lost
          will type "ok" instead and quietly fall behind. */}
      {quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {quickReplies.map((q) => (
            <button key={q} className="chip hover:border-gold-dim hover:text-cream" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        className="flex gap-2 pt-3 border-t border-line"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          className="input flex-1"
          placeholder={
            lessonTitle
              ? `Answer, or tell me you're stuck — we're on ${lessonTitle}`
              : memory
                ? `Ask anything, ${memory.name} — a doubt, a chapter, a plan…`
                : "Ask anything…"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          aria-label="Message the tutor"
        />
        {busy ? (
          <button type="button" className="btn-ghost !px-4" onClick={stop}>
            <Square size={15} />
          </button>
        ) : (
          <button type="submit" className="btn-gold !px-4" disabled={!input.trim()} aria-label="Send">
            <SendHorizonal size={16} />
          </button>
        )}
      </form>
      {!lesson && chat.length > 0 && !busy && (
        <button
          className="text-[11px] text-dim hover:text-gold mt-2 self-start inline-flex items-center gap-1"
          onClick={() => send("I want to learn a chapter from scratch, step by step.")}
        >
          <GraduationCap size={12} /> Run a full chapter with me instead
        </button>
      )}
    </div>
  );
}
