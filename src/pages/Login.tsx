import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useStore } from "../lib/store";
import { supabase, cloudEnabled } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
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
          <div className="eyebrow mb-1">Sign in</div>
          <h1 className="font-display text-2xl font-bold text-cream mb-6">
            Back to the climb.
          </h1>

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
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="text-coral text-sm mb-4" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-gold w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
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
