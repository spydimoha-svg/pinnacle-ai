import { Link } from "react-router-dom";
import {
  ArrowRight,
  FilePlus2,
  FolderOpen,
  Library,
  MessageCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { useStore } from "../../lib/store";
import { RESOURCES } from "../../data";
import { Empty, SectionHead, Stat } from "../../components/ui";
import { Ridgeline } from "../../components/Logo";
import type { School } from "../../lib/types";

const PLAN_LABEL: Record<School["plan"], string> = {
  free: "Free plan",
  standard: "Standard plan",
  premium: "Premium plan",
};

const PLAN_CHIP: Record<School["plan"], string> = {
  free: "chip",
  standard: "chip-sky",
  premium: "chip-gold",
};

export default function AdminDashboard() {
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const schoolResources = useStore((s) => s.schoolResources);
  const allUsers = useStore((s) => s.allUsers);
  // extraUsers is the changing slice behind allUsers(); selecting it keeps the
  // enrolled count live and consistent with the Students roster page.
  const extraUsers = useStore((s) => s.extraUsers);

  if (!school) {
    return (
      <Empty
        title="No school linked"
        body="Your admin account isn't attached to a school yet. Ask Pinnacle Master to link your school, then sign in again."
      />
    );
  }

  const materials = schoolResources.filter((r) => r.schoolId === school.id);
  const enrolled = allUsers().filter(
    (u) => u.role === "student" && u.schoolId === school.id
  ).length;
  void extraUsers; // referenced only to keep `enrolled` reactive to new students

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative card !bg-pit/70 overflow-hidden !p-7">
        <div className="eyebrow mb-1">School console · {school.city}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          {school.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className={PLAN_CHIP[school.plan]}>
            {PLAN_LABEL[school.plan]}
          </span>
          <span className="chip">
            <span className="font-mono">
              {school.pricePerStudent > 0
                ? `₹${school.pricePerStudent} / student / month`
                : "₹0 · free for your school"}
            </span>
          </span>
        </div>
        <p className="text-muted text-sm mt-4 max-w-lg">
          Everything you add here stays private to {school.name}. Your students
          get the full CBSE library, the Pinnacle tutor, and your school's own
          materials in one place.
        </p>
        <Ridgeline className="absolute bottom-0 left-0 w-full h-16 opacity-70 pointer-events-none" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat
          label="Students enrolled"
          value={
            <span className="inline-flex items-center gap-2">
              <Users size={20} className="text-gold" /> {enrolled}
            </span>
          }
          sub="On your roster right now"
          accent
        />
        <Stat
          label="Your materials"
          value={materials.length}
          sub="Uploaded by your school"
        />
        <Stat
          label="Preset library"
          value={RESOURCES.length}
          sub="CBSE resources included"
        />
        <Stat
          label="Pinnacle tutor"
          value={
            <span className="inline-flex items-center">
              <span className="chip-mint">Active</span>
            </span>
          }
          sub="On for every student"
        />
      </div>

      {/* Setup explainer */}
      <div>
        <SectionHead
          eyebrow="Section A · Setup"
          title="How your school's Pinnacle is set up"
        />
        <div className="card">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="card-inset">
              <Library size={18} className="text-gold mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Preset CBSE library
              </div>
              <p className="text-xs text-muted">
                NCERT texts, previous-year papers, sample papers and syllabus
                documents for classes 9–12 come built in. Nothing to upload.
              </p>
            </div>
            <div className="card-inset">
              <FolderOpen size={18} className="text-sky mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Your materials
              </div>
              <p className="text-xs text-muted">
                Class notes, internal sample papers, circulars — anything you
                add sits alongside the preset library, visible only to{" "}
                {school.name}.
              </p>
            </div>
            <div className="card-inset">
              <MessageCircle size={18} className="text-mint mb-2" />
              <div className="font-semibold text-cream text-sm mb-1">
                Students see both
              </div>
              <p className="text-xs text-muted">
                Every student you enrol gets the preset library plus your
                uploads in one resources page, with the Pinnacle tutor on top.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <SectionHead
          eyebrow="Section B · Quick actions"
          title="Keep your school moving"
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Link to="/admin/materials" className="card card-hover block">
            <div className="flex items-center justify-between mb-3">
              <FilePlus2 size={18} className="text-gold" />
              <ArrowRight size={16} className="text-dim" />
            </div>
            <div className="font-display font-semibold text-cream mb-1">
              Add material
            </div>
            <p className="text-xs text-muted">
              Upload notes, sample papers or the school syllabus. Live for your
              students the moment you save.
            </p>
          </Link>
          <Link to="/admin/students" className="card card-hover block">
            <div className="flex items-center justify-between mb-3">
              <UserPlus size={18} className="text-mint" />
              <ArrowRight size={16} className="text-dim" />
            </div>
            <div className="font-display font-semibold text-cream mb-1">
              Add student
            </div>
            <p className="text-xs text-muted">
              Create a login in seconds and hand over the credentials — the
              student can sign in immediately.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
