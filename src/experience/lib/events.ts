/**
 * Narrative event bus.
 *
 * The brief requires that sound can be attached later without rewriting any
 * animation logic, so chapters never call audio directly — they announce what
 * just happened and anything may listen.
 *
 * Deliberately not React state: these fire mid-timeline, sometimes several per
 * frame, and pushing them through a provider would re-render the tree during
 * the exact moments that must stay at 60fps.
 */

export const NARRATIVE_EVENTS = [
  "BOOK_OPEN",
  "PAGE_FLIP",
  "KNOWLEDGE_RELEASE",
  "DNA_EMERGE",
  "INTELLIGENCE_SPREAD",
  "BRAIN_ASCEND",
  "CTA_REVEAL",
] as const;

export type NarrativeEvent = (typeof NARRATIVE_EVENTS)[number];

/** Payload is intentionally open: a listener that does not care can ignore it. */
export type NarrativePayload = {
  /** 0..1 progress of the chapter that emitted, when meaningful. */
  progress?: number;
  /** Scroll direction at emit time; useful for one-shot sounds. */
  direction?: 1 | -1;
  [key: string]: unknown;
};

type Listener = (payload: NarrativePayload) => void;

const listeners = new Map<NarrativeEvent, Set<Listener>>();

/** Events that have already fired this session, for once-only semantics. */
const fired = new Set<NarrativeEvent>();

export function on(event: NarrativeEvent, fn: Listener): () => void {
  let set = listeners.get(event);
  if (!set) {
    set = new Set();
    listeners.set(event, set);
  }
  set.add(fn);
  return () => {
    set!.delete(fn);
  };
}

export function emit(event: NarrativeEvent, payload: NarrativePayload = {}): void {
  fired.add(event);
  const set = listeners.get(event);
  if (!set) return;
  // Copy before iterating: a listener may unsubscribe itself.
  for (const fn of Array.from(set)) {
    try {
      fn(payload);
    } catch (err) {
      // A broken listener must never take the animation loop down with it.
      if (import.meta.env.DEV) console.error(`[narrative] ${event} listener threw`, err);
    }
  }
}

/**
 * Fire only the first time. Scroll is bidirectional, so a naive emit on a
 * threshold crossing would retrigger every time the user scrubs back and
 * forth over the same point — which is exactly how you get a machine-gun
 * page-flip sound.
 */
export function emitOnce(event: NarrativeEvent, payload: NarrativePayload = {}): void {
  if (fired.has(event)) return;
  emit(event, payload);
}

export function hasFired(event: NarrativeEvent): boolean {
  return fired.has(event);
}

/** Test/HMR helper. Not used in the running experience. */
export function resetNarrative(): void {
  fired.clear();
  listeners.clear();
}
