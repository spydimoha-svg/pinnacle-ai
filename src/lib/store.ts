import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BlobEntry,
  ChatMessage,
  ChapterProgress,
  ClassLevel,
  Mode,
  ProgressStatus,
  Resource,
  School,
  StudentMemory,
  User,
  Worksheet,
} from "./types";
import { MASTER_NAME, SCHOOLS, USERS } from "../data/schools";
import type { CloudUserData } from "./cloud";
import {
  deleteSchoolResource,
  loadSchoolResources,
  saveSchoolResources,
} from "./cloud";
import type { LessonState } from "./lesson";
import type { Script } from "./osm";
import { freshProfile, type LearnerProfile } from "./learner";
import { supabase, cloudEnabled } from "./supabase";

const isoDay = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

function freshMemory(user: User): StudentMemory {
  return {
    name: user.name.split(" ")[0],
    classLevel: (user.classLevel ?? 10) as ClassLevel,
    mode: "board",
    examTargets: [],
    achievements: ["Joined Pinnacle AI"],
    strengths: [],
    focusAreas: [],
    streak: 1,
    lastActiveDay: isoDay(),
    altitude: 20,
    lastTopics: [],
    notes: [],
    progress: {},
  };
}

interface PinnacleState {
  currentUser: User | null;
  /** users added by admins at runtime, merged with seed users */
  extraUsers: User[];
  schools: School[];
  memories: Record<string, StudentMemory>;
  chats: Record<string, ChatMessage[]>;
  blobs: Record<string, BlobEntry[]>;
  worksheets: Record<string, Worksheet[]>;
  /** materials added by school admins (multi-tenant: scoped by schoolId) */
  schoolResources: Resource[];
  /**
   * Answer scripts being marked in the teachers-only OSM console. Scoped by
   * schoolId the same way schoolResources is, so one school's evaluation
   * never appears in another's console.
   */
  scripts: Script[];
  /** The chapter each student is currently being walked through, step by step. */
  lessons: Record<string, LessonState | null>;
  /**
   * How each student understands — pace, the analogies that land, their own
   * recurring mistakes. Persisted, because a teacher who forgets how you learn
   * every time you close the tab is not a teacher who knows you.
   */
  profiles: Record<string, LearnerProfile>;

  login: (email: string, password: string) => User | null;
  logout: () => void;
  allUsers: () => User[];
  addStudent: (u: Omit<User, "id" | "role">) => User;
  /** Mirrors a locally-created student's profile onto their Supabase user so
   *  Login.tsx can rebuild it on a different device (see linkCloudProfile). */
  linkCloudProfile: (u: User) => Promise<void>;

  memory: () => StudentMemory | null;
  updateMemory: (patch: Partial<StudentMemory>) => void;
  recordProgress: (p: ChapterProgress) => void;
  /** One atomic diagnostic rating: updates progress, strengths/focus and altitude. */
  assessChapter: (
    chapterId: string,
    chapterTitle: string,
    status: ProgressStatus,
    confidence: number
  ) => void;
  addAltitude: (points: number, achievement?: string) => void;
  touchStreak: () => void;
  setMode: (mode: Mode) => void;

  pushChat: (msg: ChatMessage) => void;
  setChat: (msgs: ChatMessage[]) => void;
  clearChat: () => void;

  lesson: () => LessonState | null;
  setLesson: (lesson: LessonState | null) => void;
  profile: () => LearnerProfile;
  setProfile: (profile: LearnerProfile) => void;

  /** Bulk-apply a student's state pulled from the cloud DB on login (cloud wins). */
  applyCloudUserData: (userId: string, data: CloudUserData) => void;

  addBlob: (entry: BlobEntry) => void;
  updateBlob: (id: string, patch: Partial<BlobEntry>) => void;

  addWorksheet: (w: Worksheet) => void;
  updateWorksheet: (id: string, patch: Partial<Worksheet>) => void;

  addSchoolResource: (r: Resource) => void;
  removeSchoolResource: (id: string) => void;

  /** Create or overwrite an answer script in the marking console. */
  saveScript: (s: Script) => void;
  removeScript: (id: string) => void;
  /** Pull every school's materials from the cloud DB (cloud wins per id). */
  hydrateSchoolResources: () => Promise<void>;

  upsertSchool: (s: School) => void;
  removeSchool: (id: string) => void;
}

export const useStore = create<PinnacleState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      extraUsers: [],
      schools: SCHOOLS,
      memories: {},
      chats: {},
      blobs: {},
      worksheets: {},
      schoolResources: [],
      scripts: [],
      lessons: {},
      profiles: {},

      login: (email, password) => {
        const user = get()
          .allUsers()
          .find(
            (u) =>
              u.email.toLowerCase() === email.trim().toLowerCase() &&
              u.password === password
          );
        if (!user) return null;
        const keepOwn = <T,>(rec: Record<string, T>): Record<string, T> =>
          rec[user.id] !== undefined ? { [user.id]: rec[user.id] } : {};
        set((s) => ({
          currentUser: user,
          memories:
            user.role === "student"
              ? { [user.id]: s.memories[user.id] ?? freshMemory(user) }
              : {},
          chats: keepOwn(s.chats),
          blobs: keepOwn(s.blobs),
          worksheets: keepOwn(s.worksheets),
          lessons: keepOwn(s.lessons),
          profiles: keepOwn(s.profiles),
        }));
        get().touchStreak();
        void get().hydrateSchoolResources();
        return user;
      },

      logout: () =>
        set((s) => {
          const u = s.currentUser;
          if (!u || !cloudEnabled()) return { currentUser: null };
          const drop = <T,>(rec: Record<string, T>): Record<string, T> => {
            const rest = { ...rec };
            delete rest[u.id];
            return rest;
          };
          return {
            currentUser: null,
            memories: drop(s.memories),
            chats: drop(s.chats),
            blobs: drop(s.blobs),
            worksheets: drop(s.worksheets),
            lessons: drop(s.lessons),
            profiles: drop(s.profiles),
          };
        }),

      allUsers: () => [...USERS, ...get().extraUsers],

      addStudent: (u) => {
        const user: User = { ...u, id: `u-${Date.now()}`, role: "student" };
        set((s) => ({ extraUsers: [...s.extraUsers, user] }));
        return user;
      },

      // A trial/admin-enrolled student's profile (name, class, school) only
      // ever lives in the browser that created it — extraUsers is local
      // state. Supabase Auth itself already authenticates this student from
      // any device (cloud.ts creates that identity), so mirroring the
      // profile onto it as user metadata is enough for Login.tsx to rebuild
      // the same profile after a signInWithPassword succeeds elsewhere.
      // Best-effort: signup still works locally on this device if it fails.
      linkCloudProfile: async (u) => {
        if (!cloudEnabled() || !supabase) return;
        try {
          const { data } = await supabase.auth.signInAnonymously();
          if (!data.session) return;
          await supabase.auth.updateUser({
            email: u.email,
            password: u.password,
            data: {
              name: u.name,
              classLevel: u.classLevel ?? null,
              schoolId: u.schoolId ?? null,
            },
          });
        } catch {
          /* offline or Supabase unreachable — nothing more to do here */
        }
      },

      memory: () => {
        const u = get().currentUser;
        if (!u || u.role !== "student") return null;
        return get().memories[u.id] ?? null;
      },

      updateMemory: (patch) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => {
          const m = s.memories[u.id] ?? freshMemory(u);
          return { memories: { ...s.memories, [u.id]: { ...m, ...patch } } };
        });
      },

      recordProgress: (p) => {
        const u = get().currentUser;
        if (!u) return;
        get().touchStreak();
        set((s) => {
          const m = s.memories[u.id] ?? freshMemory(u);
          return {
            memories: {
              ...s.memories,
              [u.id]: { ...m, progress: { ...m.progress, [p.chapterId]: p } },
            },
          };
        });
      },

      assessChapter: (chapterId, chapterTitle, status, confidence) => {
        const u = get().currentUser;
        if (!u || u.role !== "student") return;
        get().touchStreak();
        set((s) => {
          const m = s.memories[u.id] ?? freshMemory(u);
          const prev = m.progress[chapterId];
          const firstSolid = status === "mastered" && !prev?.masteryAwarded;

          // Read strengths/focus from the LATEST memory (functional update), so
          // several quick ratings can't clobber each other's arrays.
          const strengths = new Set(m.strengths);
          const focus = new Set(m.focusAreas);
          if (status === "mastered") {
            strengths.add(chapterTitle);
            focus.delete(chapterTitle);
          } else if (status === "learning") {
            focus.add(chapterTitle);
            strengths.delete(chapterTitle);
          } else {
            // revising / not-started: don't claim it as a strength
            strengths.delete(chapterTitle);
            focus.delete(chapterTitle);
          }

          return {
            memories: {
              ...s.memories,
              [u.id]: {
                ...m,
                progress: {
                  ...m.progress,
                  [chapterId]: {
                    chapterId,
                    status,
                    confidence,
                    lastStudied: isoDay(),
                    masteryAwarded: prev?.masteryAwarded || firstSolid,
                  },
                },
                strengths: [...strengths].slice(-10),
                focusAreas: [...focus].slice(-10),
                altitude: m.altitude + (firstSolid ? 15 : 0),
                achievements: firstSolid
                  ? [...m.achievements, `Locked in ${chapterTitle}`]
                  : m.achievements,
              },
            },
          };
        });
      },

      addAltitude: (points, achievement) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => {
          const m = s.memories[u.id] ?? freshMemory(u);
          return {
            memories: {
              ...s.memories,
              [u.id]: {
                ...m,
                altitude: m.altitude + points,
                achievements: achievement
                  ? [...m.achievements, achievement]
                  : m.achievements,
              },
            },
          };
        });
      },

      touchStreak: () => {
        const u = get().currentUser;
        if (!u || u.role !== "student") return;
        const m = get().memories[u.id];
        if (!m) return;
        const today = isoDay();
        if (m.lastActiveDay === today) return;
        const yesterday = isoDay(new Date(Date.now() - 86_400_000));
        const streak = m.lastActiveDay === yesterday ? m.streak + 1 : 1;
        set((s) => ({
          memories: {
            ...s.memories,
            [u.id]: { ...s.memories[u.id], streak, lastActiveDay: today },
          },
        }));
      },

      setMode: (mode) => get().updateMemory({ mode }),

      pushChat: (msg) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => {
          const cur = s.chats[u.id] ?? [];
          const next = [...cur, msg].slice(-80);
          return { chats: { ...s.chats, [u.id]: next } };
        });
      },

      setChat: (msgs) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({ chats: { ...s.chats, [u.id]: msgs.slice(-80) } }));
      },

      clearChat: () => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({ chats: { ...s.chats, [u.id]: [] } }));
      },

      lesson: () => {
        const u = get().currentUser;
        return u ? (get().lessons[u.id] ?? null) : null;
      },

      setLesson: (lesson) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({ lessons: { ...s.lessons, [u.id]: lesson } }));
      },

      profile: () => {
        const u = get().currentUser;
        if (!u) return freshProfile();
        return get().profiles[u.id] ?? freshProfile();
      },

      setProfile: (profile) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({ profiles: { ...s.profiles, [u.id]: profile } }));
      },

      applyCloudUserData: (userId, data) =>
        set((s) => ({
          memories: data.memory
            ? { ...s.memories, [userId]: data.memory }
            : s.memories,
          chats: { ...s.chats, [userId]: data.chats },
          blobs: { ...s.blobs, [userId]: data.blobs },
          worksheets: { ...s.worksheets, [userId]: data.worksheets },
          profiles: data.profile
            ? { ...s.profiles, [userId]: data.profile }
            : s.profiles,
        })),

      addBlob: (entry) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({
          blobs: {
            ...s.blobs,
            [u.id]: [entry, ...(s.blobs[u.id] ?? [])].slice(0, 200),
          },
        }));
      },

      updateBlob: (id, patch) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({
          blobs: {
            ...s.blobs,
            [u.id]: (s.blobs[u.id] ?? []).map((b) =>
              b.id === id ? { ...b, ...patch } : b
            ),
          },
        }));
      },

      addWorksheet: (w) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({
          worksheets: {
            ...s.worksheets,
            [u.id]: [w, ...(s.worksheets[u.id] ?? [])].slice(0, 200),
          },
        }));
      },

      updateWorksheet: (id, patch) => {
        const u = get().currentUser;
        if (!u) return;
        set((s) => ({
          worksheets: {
            ...s.worksheets,
            [u.id]: (s.worksheets[u.id] ?? []).map((w) =>
              w.id === id ? { ...w, ...patch } : w
            ),
          },
        }));
      },

      addSchoolResource: (r) => {
        set((s) => ({ schoolResources: [r, ...s.schoolResources] }));
        void saveSchoolResources([r]);
      },

      removeSchoolResource: (id) => {
        set((s) => ({
          schoolResources: s.schoolResources.filter((r) => r.id !== id),
        }));
        void deleteSchoolResource(id);
      },

      saveScript: (script) =>
        set((s) => {
          const exists = s.scripts.some((x) => x.id === script.id);
          return {
            scripts: exists
              ? s.scripts.map((x) => (x.id === script.id ? script : x))
              : [script, ...s.scripts],
          };
        }),

      removeScript: (id) =>
        set((s) => ({ scripts: s.scripts.filter((x) => x.id !== id) })),

      hydrateSchoolResources: async () => {
        if (!cloudEnabled()) return;
        const cloudResources = await loadSchoolResources();
        if (!cloudResources) return;
        set((s) => ({
          schoolResources: [
            ...cloudResources,
            ...s.schoolResources.filter(
              (r) => !cloudResources.some((c) => c.id === r.id)
            ),
          ],
        }));
      },

      upsertSchool: (school) =>
        set((s) => {
          const exists = s.schools.some((x) => x.id === school.id);
          return {
            schools: exists
              ? s.schools.map((x) => (x.id === school.id ? school : x))
              : [...s.schools, school],
          };
        }),

      removeSchool: (id) =>
        set((s) => ({ schools: s.schools.filter((x) => x.id !== id) })),
    }),
    {
      name: "pinnacle-state-v1",
      version: 1,
      // Bump this alongside a matching migrate step whenever StudentMemory,
      // ChapterProgress or LearnerProfile change shape — otherwise a
      // returning student's old localStorage crashes on rehydrate instead
      // of transforming.
      migrate: (persistedState) => persistedState as PinnacleState,
      partialize: (s) => ({
        currentUser: s.currentUser,
        extraUsers: s.extraUsers,
        schools: s.schools,
        memories: s.memories,
        chats: s.chats,
        blobs: s.blobs,
        worksheets: s.worksheets,
        schoolResources: s.schoolResources,
        // Marks and remarks persist; the scanned pages do not. They are
        // browser object URLs for files on the teacher's own machine — dead
        // on the next reload, and inlining them as data URLs instead would
        // put multi-megabyte images into a 5MB localStorage quota shared with
        // every student's progress. The console re-attaches scans per session.
        scripts: s.scripts.map((x) => ({ ...x, pages: [] as string[] })),
        lessons: s.lessons,
        profiles: s.profiles,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentUser) void state.hydrateSchoolResources();
      },
    }
  )
);
