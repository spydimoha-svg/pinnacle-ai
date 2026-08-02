import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { supabase, cloudEnabled } from "../lib/supabase";
import type { Role } from "../lib/types";

/** localStorage key for the short-lived token api/master-login.ts issues. */
const MASTER_TOKEN_KEY = "pinnacle-master-token";
/** localStorage key for the Supabase access token Login.tsx stores on admin sign-in. */
const ADMIN_TOKEN_KEY = "pinnacle-admin-token";

// These two roles can't be trusted from the locally-persisted User object —
// that's just localStorage JSON, trivially edited in devtools — so they need
// a live round trip to a server the client can't spoof before every visit.
function needsServerCheck(role: Role): boolean {
  return role === "master" || (role === "admin" && cloudEnabled());
}

/** Route guard. Redirects to login (or home for the hidden master area). */
export default function Protected({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const user = useStore((s) => s.currentUser);
  const [serverOk, setServerOk] = useState(needsServerCheck(role) ? null : true as boolean | null);

  useEffect(() => {
    if (user?.role !== "master") localStorage.removeItem(MASTER_TOKEN_KEY);
    if (user?.role !== "admin") localStorage.removeItem(ADMIN_TOKEN_KEY);
  }, [user]);

  useEffect(() => {
    if (role !== "master") return;
    const token = localStorage.getItem(MASTER_TOKEN_KEY);
    if (!token) {
      setServerOk(false);
      return;
    }
    let cancelled = false;
    fetch("/api/master-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verify: token }),
    })
      .then((r) => (r.ok ? r.json() : { valid: false }))
      .then((d) => !cancelled && setServerOk(!!d.valid))
      .catch(() => !cancelled && setServerOk(false));
    return () => {
      cancelled = true;
    };
  }, [role]);

  useEffect(() => {
    // Same principle as the master check above, but the authority is
    // Supabase's own auth server: it confirms app_metadata.role for the
    // token Login.tsx stored, and app_metadata can only be set with the
    // service-role key — never by the signed-in user themselves.
    if (role !== "admin" || !cloudEnabled() || !supabase) return;
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) {
      setServerOk(false);
      return;
    }
    let cancelled = false;
    supabase.auth
      .getUser(token)
      .then(({ data, error }) => {
        if (!cancelled) setServerOk(!error && data.user?.app_metadata?.role === "admin");
      })
      .catch(() => !cancelled && setServerOk(false));
    return () => {
      cancelled = true;
    };
  }, [role]);

  if (!user || user.role !== role) {
    return <Navigate to={role === "master" ? "/summit" : "/login"} replace />;
  }
  if (needsServerCheck(role)) {
    if (serverOk === null) return null;
    if (!serverOk) return <Navigate to={role === "master" ? "/summit" : "/login"} replace />;
  }
  return <>{children}</>;
}
