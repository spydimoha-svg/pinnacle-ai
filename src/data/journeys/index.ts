// Journey framing lookup.
//
// A journey is the narrative layer over a chapter that already exists: its
// title on the poster, how each scene opens, and what the student is asked to
// commit to before anything is revealed. The teaching itself lives in the
// concept graph — this only decides how it is told.
//
// A chapter with no framing here still plays. `buildScenes` falls back to the
// concept's own title and one-line summary, which is a plainer film but a
// complete one. That fallback is what lets the engine ship against 274
// chapters while only a handful are authored, instead of blocking on all of
// them.
import type { JourneyFraming } from "../../lib/director";
import { C10_MATHS_04_JOURNEY } from "./c10-maths-04";

const JOURNEYS: JourneyFraming[] = [C10_MATHS_04_JOURNEY];

export function journeyFor(chapterId: string): JourneyFraming | null {
  return JOURNEYS.find((j) => j.chapterId === chapterId) ?? null;
}

/** Chapters that currently have authored film grammar. */
export function framedChapterIds(): string[] {
  return JOURNEYS.map((j) => j.chapterId);
}
