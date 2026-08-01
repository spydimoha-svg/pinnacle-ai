import type { School, User, CbseUpdate } from "../lib/types";

/** Seed schools. The Pinnacle Master console can add more and set pricing per school. */
export const SCHOOLS: School[] = [
  {
    id: "sch-demo",
    name: "Sunrise Public School",
    city: "Chennai",
    plan: "standard",
    pricePerStudent: 150,
    students: 420,
    joined: "2026-06-01",
    notes: "Pilot school. Classes 9–12 onboarded.",
  },
  {
    id: "sch-loyola",
    name: "Loyola Model School",
    city: "Chennai",
    plan: "free",
    pricePerStudent: 0,
    students: 260,
    joined: "2026-06-20",
    notes: "Free tier granted by Pinnacle Master.",
  },
  {
    id: "sch-nps",
    name: "NPS Gopalapuram",
    city: "Chennai",
    plan: "premium",
    pricePerStudent: 200,
    students: 610,
    joined: "2026-07-01",
  },
];

/** Seed accounts. Demo credentials are shown on the login page. */
export const USERS: User[] = [
  {
    id: "u-aarav",
    name: "Aarav Sharma",
    email: "aarav@student.demo",
    password: "demo",
    role: "student",
    schoolId: "sch-demo",
    classLevel: 10,
  },
  {
    id: "u-diya",
    name: "Diya Menon",
    email: "diya@student.demo",
    password: "demo",
    role: "student",
    schoolId: "sch-nps",
    classLevel: 12,
  },
  {
    id: "u-admin",
    name: "Mrs. Kavitha Rao",
    email: "admin@school.demo",
    password: "admin",
    role: "admin",
    schoolId: "sch-demo",
  },
];

/** Pinnacle Master passcode — the hidden login at /summit. Change before real deployment. */
export const MASTER_PASSCODE = "PEAK-2026";
export const MASTER_NAME = "Zainul";

/** Seeded CBSE update feed. In production an automated daily job refreshes this
    from cbse.gov.in + cbseacademic.nic.in. */
export const CBSE_UPDATES: CbseUpdate[] = [
  {
    id: "upd-1",
    date: "2026-07-10",
    title: "Class X & XII Sample Question Papers 2026-27 released",
    summary:
      "CBSE Academic has published SQPs with marking schemes for the 2027 boards. Pinnacle's question bank and answer keys are aligned to the new blueprint.",
    tag: "sample-paper",
    url: "https://cbseacademic.nic.in/sqp_classx_2026-27.html",
  },
  {
    id: "upd-2",
    date: "2026-07-02",
    title: "Curriculum 2026-27 documents live for Secondary & Sr. Secondary",
    summary:
      "Updated syllabus PDFs for classes IX–XII. No chapter deletions vs the rationalised NCERT; internal assessment weightage unchanged.",
    tag: "syllabus",
    url: "https://cbseacademic.nic.in/curriculum_2027.html",
  },
  {
    id: "upd-3",
    date: "2026-06-18",
    title: "Two board exams a year for Class X — first cycle notified",
    summary:
      "CBSE circular details the twin-exam scheme. Pinnacle study plans now target the earlier attempt with revision buffers.",
    tag: "circular",
    url: "https://www.cbse.gov.in/cbsenew/circulars.html",
  },
];
