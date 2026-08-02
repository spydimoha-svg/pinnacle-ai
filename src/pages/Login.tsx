import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useStore } from "../lib/store";
import { supabase, cloudEnabled } from "../lib/supabase";
import type { ClassLevel } from "../lib/types";

const CLASS_LEVELS: ClassLevel[] = [9, 10, 11, 12];

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const addStudent = useStore((s) => s.addStudent);
  const allUsers = useStore((s) => s.allUsers);
  const [mode, setMode] = useState<"signin" | "trial">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function submitTrial(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (!cleanName || !cleanEmail || !cleanPassword) return;
    const taken = allUsers().some((u) => u.email.toLowerCase() === cleanEmail);
    if (taken) {
      setError("That email already has an account. Sign in instead.");
      return;
    }
    addStudent({ name: cleanName, email: cleanEmail, password: cleanPassword, classLevel });
    const user = login(cleanEmail, cleanPassword);
    if (!user) {
      setError("Couldn't create your account. Try again.");
      return;
    }
    navigate("/app");
  }

  async function submit(e: React.FormEvent) {
    if (mode === "trial") return submitTrial(e);
    e.preventDefault();
    setError("");

    // Supabase configured: the password is verified server-side by Supabase
    // Auth. A matching local profile only supplies the role/name to display —
    // it never gets a vote on whether the password was correct.
    if (cloudEnabled() && supabase) {
      setBusy(true);
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      setBusy(false);
      const user = authError
        ? undefined
        : useStore
            .getState()
            .allUsers()
            .find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        setError("That email and password don't match any account.");
        return;
      }
      useStore.setState({ currentUser: user });
      useStore.getState().touchStreak();
      navigate(user.role === "admin" ? "/admin" : "/app");
      return;
    }

    const user = login(email, password);
    if (!user) {
      setError("That email and password don't match any account.");
      return;
    }
    navigate(user.role === "admin" ? "/admin" : "/app");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo size={34} />
          </Link>
        </div>
        <form className="card !p-7" onSubmit={submit}>
          <div className="flex gap-1 p-1 mb-6 rounded-lg bg-black/20">
            <button
              type="button"
              className={`flex-1 py-1.5 rounded-md text-sm font-medium transition ${
                mode === "signin" ? "bg-gold text-charcoal" : "text-dim"
              }`}
              onClick={() => {
                setMode("signin");
                setError("");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`flex-1 py-1.5 rounded-md text-sm font-medium transition ${
                mode === "trial" ? "bg-gold text-charcoal" : "text-dim"
              }`}
              onClick={() => {
                setMode("trial");
                setError("");
              }}
            >
              Start free trial
            </button>
          </div>

          <div className="eyebrow mb-1">{mode === "signin" ? "Sign in" : "Free trial"}</div>
          <h1 className="font-display text-2xl font-bold text-cream mb-6">
            {mode === "signin" ? "Back to the climb." : "Start climbing, free."}
          </h1>

          {mode === "trial" && (
            <>
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="input mb-4"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </>
          )}

          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input mb-4"
            placeholder="you@school.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input mb-4"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
          />

          {mode === "trial" && (
            <>
              <label className="label" htmlFor="classLevel">
                Class
              </label>
              <select
                id="classLevel"
                className="input mb-4"
                value={classLevel}
                onChange={(e) => setClassLevel(Number(e.target.value) as ClassLevel)}
              >
                {CLASS_LEVELS.map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </>
          )}

          {error && (
            <p className="text-coral text-sm mb-4" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-gold w-full" disabled={busy}>
            {mode === "signin"
              ? busy
                ? "Signing in…"
                : "Sign in"
              : "Start free trial"}
          </button>

          {import.meta.env.DEV && (
            <>
              <div className="ridge-rule my-6" />

              <div className="text-xs text-dim space-y-1.5">
                <div className="eyebrow-dim mb-2">Demo accounts</div>
                <div>
                  <span className="text-muted">Student (Class 10):</span>{" "}
                  <code className="font-mono text-gold-bright">aarav@student.demo / demo</code>
                </div>
                <div>
                  <span className="text-muted">Student (Class 12):</span>{" "}
                  <code className="font-mono text-gold-bright">diya@student.demo / demo</code>
                </div>
                <div>
                  <span className="text-muted">School admin:</span>{" "}
                  <code className="font-mono text-gold-bright">admin@school.demo / admin</code>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
