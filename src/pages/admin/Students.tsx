import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, KeyRound, LogIn, UserPlus } from "lucide-react";
import { useStore } from "../../lib/store";
import { Empty, SectionHead } from "../../components/ui";
import type { ClassLevel } from "../../lib/types";

const CLASS_LEVELS: ClassLevel[] = [9, 10, 11, 12];

interface CreatedStudent {
  name: string;
  email: string;
  password: string;
  classLevel: ClassLevel;
}

export default function Students() {
  const school = useStore((s) =>
    s.schools.find((x) => x.id === s.currentUser?.schoolId)
  );
  const extraUsers = useStore((s) => s.extraUsers);
  const allUsers = useStore((s) => s.allUsers);
  const addStudent = useStore((s) => s.addStudent);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [password, setPassword] = useState("pinnacle123");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedStudent | null>(null);

  const roster = useMemo(
    () =>
      allUsers()
        .filter((u) => u.role === "student" && u.schoolId === school?.id)
        .sort(
          (a, b) =>
            (a.classLevel ?? 0) - (b.classLevel ?? 0) ||
            a.name.localeCompare(b.name)
        ),
    // extraUsers is the changing slice behind allUsers(); keeps the roster fresh
    [allUsers, extraUsers, school?.id]
  );

  if (!school) {
    return (
      <Empty
        title="No school linked"
        body="Your admin account isn't attached to a school yet. Ask Pinnacle Master to link your school, then sign in again."
      />
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (!cleanName || !cleanEmail || !cleanPassword) return;
    const taken = allUsers().some(
      (u) => u.email.toLowerCase() === cleanEmail
    );
    if (taken) {
      setError("That email already has an account. Use a different one.");
      return;
    }
    addStudent({
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      classLevel,
      schoolId: school.id,
    });
    setCreated({
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      classLevel,
    });
    setError(null);
    setName("");
    setEmail("");
    setPassword("pinnacle123");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="eyebrow mb-1">School console · {school.name}</div>
        <h1 className="font-display text-3xl font-bold text-cream">
          Students
        </h1>
        <p className="text-muted text-sm mt-2 max-w-lg">
          Enrol students and hand them their credentials. Accounts work
          immediately — no verification steps, no waiting.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* Add student form */}
        <div className="lg:col-span-2 space-y-3">
          <form onSubmit={submit} className="card space-y-4">
            <SectionHead eyebrow="Section A · Enrol" title="Add a student" />
            <div>
              <label className="label" htmlFor="stu-name">
                Full name
              </label>
              <input
                id="stu-name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Nair"
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="stu-email">
                Email
              </label>
              <input
                id="stu-email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@school.email"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="stu-class">
                  Class
                </label>
                <select
                  id="stu-class"
                  className="input"
                  value={classLevel}
                  onChange={(e) =>
                    setClassLevel(Number(e.target.value) as ClassLevel)
                  }
                >
                  {CLASS_LEVELS.map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="stu-pass">
                  Password
                </label>
                <input
                  id="stu-pass"
                  className="input font-mono"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-xs text-coral">{error}</p>}
            <button type="submit" className="btn-gold w-full">
              <UserPlus size={16} /> Add student
            </button>
          </form>

          {/* Success note with credentials */}
          {created && (
            <div className="card !border-mint/40">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-mint" />
                <span className="text-sm font-semibold text-cream">
                  {created.name} is enrolled in Class {created.classLevel}
                </span>
              </div>
              <div className="card-inset space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-cream">
                  <LogIn size={14} className="text-dim" />
                  <span className="text-dim">email</span> {created.email}
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-cream">
                  <KeyRound size={14} className="text-dim" />
                  <span className="text-dim">password</span>{" "}
                  {created.password}
                </div>
              </div>
              <p className="text-xs text-muted mt-3">
                Share these with the student — they can sign in right now at
                /login.
              </p>
            </div>
          )}
        </div>

        {/* Roster */}
        <div className="lg:col-span-3">
          <SectionHead
            eyebrow="Section B · Roster"
            title={`Enrolled students (${roster.length})`}
          />
          {roster.length === 0 ? (
            <Empty
              title="No students yet"
              body="Add your first student with the form. Their account works the moment you create it."
            />
          ) : (
            <div className="card !p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="eyebrow-dim text-left font-normal px-5 py-3">
                        Name
                      </th>
                      <th className="eyebrow-dim text-left font-normal px-5 py-3">
                        Email
                      </th>
                      <th className="eyebrow-dim text-left font-normal px-5 py-3">
                        Class
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-line/60 last:border-0"
                      >
                        <td className="px-5 py-3 font-semibold text-cream">
                          {u.name}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-muted">
                          {u.email}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-muted">
                          {u.classLevel ? `Class ${u.classLevel}` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <p className="text-xs text-dim mt-3">
            Students added here can sign in immediately at /login with the
            email and password you set.
          </p>
        </div>
      </div>
    </div>
  );
}
