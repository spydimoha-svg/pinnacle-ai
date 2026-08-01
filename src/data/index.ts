// Data access helpers. Pages import from here; the arrays live in the
// individual data files (curriculum, questions, resources, videos, entrance).
import type { ClassLevel, Question, Resource, Subject, VideoRec } from "../lib/types";
import { SUBJECTS } from "./curriculum";
import { QUESTIONS } from "./questions";
import { RESOURCES } from "./resources";
import { VIDEOS } from "./videos";

export { SUBJECTS } from "./curriculum";
export { QUESTIONS } from "./questions";
export { RESOURCES } from "./resources";
export { VIDEOS } from "./videos";
export { ENTRANCE_EXAMS } from "./entrance";
export { SCHOOLS, USERS, CBSE_UPDATES, MASTER_PASSCODE } from "./schools";

export function subjectsForClass(level: ClassLevel): Subject[] {
  return SUBJECTS.filter((s) => s.classLevel === level);
}

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChapter(chapterId: string) {
  for (const s of SUBJECTS) {
    const c = s.chapters.find((ch) => ch.id === chapterId);
    if (c) return { subject: s, chapter: c };
  }
  return undefined;
}

export function questionsFor(opts: {
  subjectId?: string;
  chapterId?: string;
  classLevel?: ClassLevel;
  marks?: number[];
}): Question[] {
  return QUESTIONS.filter(
    (q) =>
      (!opts.subjectId || q.subjectId === opts.subjectId) &&
      (!opts.chapterId || q.chapterId === opts.chapterId) &&
      (!opts.classLevel || q.classLevel === opts.classLevel) &&
      (!opts.marks || opts.marks.includes(q.marks))
  );
}

export function resourcesForClass(level: ClassLevel): Resource[] {
  return RESOURCES.filter((r) => r.classLevel === level);
}

export function videosForClass(level: ClassLevel): VideoRec[] {
  return VIDEOS.filter((v) => v.classLevel === level);
}
