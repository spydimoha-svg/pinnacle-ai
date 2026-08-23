import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useStore } from "../lib/store";
import { cloudEnabled } from "../lib/supabase";
import type { ClassLevel } from "../lib/types";

const CLASS_LEVELS: ClassLevel[] = [9, 10, 11, 12];

/** localStorage key for the Supabase access token Protected.tsx re-verifies
    admin routes against — see the comment in submit() below. */
const ADMIN_TOKEN_KEY = "pinnacle-admin-token";

/** Mirrors a trial signup onto Supabase via api/signup.ts, which performs the
 *  anonymous-link server-side with the service-role key (rate-limited by IP)
 *  instead of the browser calling supabase.auth.signInAnonymously() straight
 *  off the public anon key. Reports back whether the email came back
 *  confirmed. Supabase queues a freshly linked email as unconfirmed until the
 *  inbox owner clicks the link, so returning false here is what stops
 *  submitTrial() from treating a typed-but-unproven email as a working cloud
 *  account: without this check, anyone could squat a real student's email and
 *  permanently block their real signup from ever linking to it. Fails open
 *  (true) on any cloud error so a flaky connection never blocks the local
 *  trial account. */
async function linkTrialCloudProfile(u: {
  name: string;
  email: string;
  password: string;
  classLevel?: ClassLevel;
  schoolId?: string;
}): Promise<boolean> {
  if (!cloudEnabled()) return true;
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(u),
    });
    if (!res.ok) return true;
    const { confirmed } = await res.json();
    return Boolean(confirmed);
  } catch {
    return true;
  }
}

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
  const [confirmEmail, setConfirmEmail] = useState<string | null>(null);

  async function submitTrial(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (!cleanName || !cleanEmail || !cleanPassword) return;
    if (cleanPassword.length < 10) {
      setError("Password must be at least 10 characters.");
      return;
    }
    const taken = allUsers().some((u) => u.email.toLowerCase() === cleanEmail);
    if (taken) {
      setError("That email already has an account. Sign in instead.");
      return;
    }
    const created = addStudent({
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      classLevel,
    });
    // Mirror the profile onto Supabase before navigating, so the student
    // this browser is about to sign in as can also sign in from any other
    // device (see linkTrialCloudProfile) — CloudSync starts syncing this
    // same student the moment /app mounts, so this has to finish first.
    setBusy(true);
    const confirmed = await linkTrialCloudProfile(created);
    setBusy(false);
    if (!confirmed) {
      setConfirmEmail(cleanEmail);
      return;
    }
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

    // Supabase configured: the password is verified server-side, proxied
    // through /api/login (rate-limited, same pattern as api/signup.ts)
    // rather than calling the Supabase Auth password sign-in directly from
    // the browser, which would hit Supabase's raw auth endpoint unthrottled
    // by anything this app controls. A matching local profile supplies the
    // name/id/school to display, but never the role — that field is just
    // localStorage JSON and trivially editable in devtools. Admin access is
    // only granted from Supabase's own app_metadata.role, which only a
    // service-role key can set, never the signed-in user. Protected.tsx
    // re-checks this same token against Supabase on every /admin visit, the
    // same way it already re-checks the master token on every /master visit.
    if (cloudEnabled()) {
      setBusy(true);
      // A throw here (dropped connection, DNS failure) used to skip the
      // setBusy(false) that followed and strand the button on "Signing in…"
      // with no error shown at all, so the fetch is caught into `res` first
      // and every exit below runs with busy already cleared.
      let res: Response | undefined;
      try {
        res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
      } catch {
        // Left undefined — handled as unreachable below.
      }
      setBusy(false);

      // The per-IP and global throttles in api/login.ts fire on legitimate
      // traffic too (a shared school NAT is one IP), so this has to read as
      // "wait", not as a rejected password. Checked before the branch below so
      // a throttled student never falls through to the dev store.
      if (res?.status === 429) {
        setError("Too many sign-in attempts. Wait a minute, then try again.");
        return;
      }

      // Whitelist, not a blacklist: these three are the only statuses where
      // api/login.ts actually ruled on the credentials — 200 signed in, 401
      // rejected, 400 malformed. Everything else is the service failing and
      // must not reach the student as "wrong password".
      //
      // This started as `status >= 500 || 503` and was wrong: with the local
      // brain running, /api/login returns 404 (it only serves /api/chat), which
      // slipped through and broke sign-in again. 403 from the origin check and
      // 413 are the same class of mistake waiting to happen, so the rule is now
      // "did it adjudicate?" rather than a list of failures to remember.
      if (!res || ![200, 400, 401].includes(res.status)) {
        // `npm run dev` serves the UI from plain vite, where /api/* proxies to
        // scripts/ollama-dev-server.mjs — which answers POST /api/chat and
        // nothing else — so no login function exists locally and the seeded
        // demo accounts in src/data/schools.ts are the only way in. DEV is
        // compile-time, so this branch is stripped from the production
        // bundle: production must never trust the localStorage `role` this
        // path reads, for the reason spelled out above.
        if (import.meta.env.DEV) {
          const local = login(email, password);
          if (local) {
            navigate(local.role === "admin" ? "/admin" : "/app");
            return;
          }
          // In dev the local store is the whole authority, so a miss here is
          // genuinely a wrong email/password — not the unreachable server.
          setError("That email and password don't match any account.");
          return;
        }
        setError("Can't reach the sign-in service right now. Try again in a moment.");
        return;
      }

      const result = res.ok
        ? (await res.json()) as {
            session: { access_token: string; refresh_token: string };
            user: {
              id: string;
              email: string;
              app_metadata?: { role?: string };
              user_metadata?: { name?: string; classLevel?: ClassLevel | null; schoolId?: string | null };
            };
          }
        : null;
      const cleanEmail = email.trim().toLowerCase();
      const localProfile = result
        ? useStore
            .getState()
            .allUsers()
            .find((u) => u.email.toLowerCase() === cleanEmail)
        : undefined;
      // A trial/admin-enrolled student's profile can live only in the
      // browser that created it (store.ts's extraUsers). linkCloudProfile
      // mirrors it onto the Supabase user as metadata for exactly this
      // case: Supabase Auth just confirmed the password server-side, so
      // that metadata is enough to rebuild the same profile on a device
      // that never saw the original signup.
      const meta = result?.user.user_metadata;
      const profile =
        localProfile ??
        (result && meta?.name
          ? {
              id: result.user.id,
              name: meta.name,
              email: cleanEmail,
              password,
              role: "student" as const,
              classLevel: meta.classLevel ?? undefined,
              schoolId: meta.schoolId ?? undefined,
            }
          : undefined);
      if (!profile || !result) {
        setError("That email and password don't match any account.");
        return;
      }
      const isAdmin = result.user.app_metadata?.role === "admin";
      if (isAdmin) {
        localStorage.setItem(ADMIN_TOKEN_KEY, result.session.access_token);
      } else {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      }
      const user = { ...profile, role: isAdmin ? ("admin" as const) : ("student" as const) };
      useStore.setState({ currentUser: user });
      useStore.getState().touchStreak();
      navigate(isAdmin ? "/admin" : "/app");
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
        {confirmEmail ? (
          <div className="card !p-7 text-center">
            <div className="eyebrow mb-1">Almost there</div>
            <h1 className="font-display text-2xl font-bold text-cream mb-4">
              Confirm your email
            </h1>
            {/* text-muted, not text-dim: this is the instruction the student needs
                to actually finish signing up, not secondary chrome — text-dim reads
                at under 4:1 on the card surface. */}
            <p className="text-muted text-sm mb-6">
              We've sent a confirmation link to{" "}
              <span className="text-cream">{confirmEmail}</span>. Click it to activate cloud
              sync for this account, then sign in.
            </p>
            <button
              type="button"
              className="btn-gold w-full"
              onClick={() => {
                setConfirmEmail(null);
                setMode("signin");
              }}
            >
              Back to sign in
            </button>
          </div>
        ) : (
        <form className="card !p-7" onSubmit={submit}>
          <div className="flex gap-1 p-1 mb-6 rounded-lg bg-black/20">
            <button
              type="button"
              className={`flex-1 py-1.5 rounded-md text-sm font-medium transition ${
                mode === "signin" ? "bg-gold text-ink" : "text-dim"
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
                mode === "trial" ? "bg-gold text-ink" : "text-dim"
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
        )}
      </div>
    </div>
  );
}
