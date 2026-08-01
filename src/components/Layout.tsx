import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  FileText,
  Library,
  Clapperboard,
  Rocket,
  NotebookPen,
  UserRound,
  LogOut,
  Building2,
  Users,
  FolderUp,
  Landmark,
  IndianRupee,
  Bell,
  Flame,
  Mountain,
  Compass,
} from "lucide-react";
import { Logo } from "./Logo";
import { useStore } from "../lib/store";
import type { Role } from "../lib/types";

const NAV: Record<Role, { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean }[]> = {
  student: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/app/planner", label: "Plan", icon: Compass },
    { to: "/app/tutor", label: "Tutor", icon: MessageCircle },
    { to: "/app/subjects", label: "Subjects", icon: BookOpen },
    { to: "/app/worksheets", label: "Worksheets", icon: FileText },
    { to: "/app/papers", label: "Papers & PYQs", icon: Landmark },
    { to: "/app/library", label: "Library", icon: Library },
    { to: "/app/videos", label: "Video Studio", icon: Clapperboard },
    { to: "/app/entrance", label: "Learn Better", icon: Rocket },
    { to: "/app/blob", label: "Blob", icon: NotebookPen },
    { to: "/app/profile", label: "Profile", icon: UserRound },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/admin/materials", label: "Materials", icon: FolderUp },
    { to: "/admin/students", label: "Students", icon: Users },
  ],
  master: [
    { to: "/master", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/master/schools", label: "Schools", icon: Building2 },
    { to: "/master/pricing", label: "Pricing", icon: IndianRupee },
    { to: "/master/updates", label: "CBSE Watch", icon: Bell },
  ],
};

export default function Layout({ role }: { role: Role }) {
  const navigate = useNavigate();
  const user = useStore((s) => s.currentUser);
  const memory = useStore((s) =>
    s.currentUser && s.currentUser.role === "student"
      ? s.memories[s.currentUser.id]
      : null
  );
  const logout = useStore((s) => s.logout);
  const items = NAV[role];

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-line bg-pit/60 flex flex-col fixed inset-y-0 left-0 z-40 max-lg:hidden">
        <div className="px-5 py-5">
          <Logo size={28} />
          {role === "master" && (
            <div className="eyebrow mt-2">Master Console</div>
          )}
          {role === "admin" && (
            <div className="eyebrow-dim mt-2">School Admin</div>
          )}
        </div>
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <div className="text-sm font-semibold text-cream truncate">
            {user?.name}
          </div>
          <div className="text-xs text-dim truncate mb-3">{user?.email}</div>
          <button className="btn-ghost w-full !py-2 text-xs" onClick={signOut}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur px-5 py-3 flex items-center gap-3">
          <div className="lg:hidden">
            <Logo size={24} />
          </div>
          <div className="flex-1" />
          {memory && (
            <>
              <span
                className="chip-gold max-sm:hidden"
                title="Altitude — points climbed"
              >
                <Mountain size={13} /> {memory.altitude} m
              </span>
              <span className="chip max-sm:hidden" title="Study streak">
                <Flame size={13} className="text-coral" /> {memory.streak}-day
                streak
              </span>
              <span className="chip-sky">
                Class {memory.classLevel} ·{" "}
                {memory.mode === "board"
                  ? "Board"
                  : memory.mode.toUpperCase()}
              </span>
            </>
          )}
          <button
            className="btn-ghost lg:hidden !px-2 !py-1.5"
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={16} strokeWidth={1.8} />
          </button>
        </header>

        <main id="main-content" className="p-5 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>

        {/* Mobile nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-pit border-t border-line flex overflow-x-auto">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] min-w-16 ${
                  isActive ? "text-gold" : "text-dim"
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label.split(" ")[0]}
            </NavLink>
          ))}
        </nav>
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
