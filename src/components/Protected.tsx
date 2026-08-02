import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import type { Role } from "../lib/types";

/** localStorage key for the short-lived token api/master-login.ts issues. */
const MASTER_TOKEN_KEY = "pinnacle-master-token";

/** Route guard. Redirects to login (or home for the hidden master area). */
export default function Protected({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const user = useStore((s) => s.currentUser);
  const [masterOk, setMasterOk] = useState(role !== "master" ? true : null as boolean | null);

  useEffect(() => {
    if (user?.role !== "master") localStorage.removeItem(MASTER_TOKEN_KEY);
  }, [user]);

  useEffect(() => {
    if (role !== "master") return;
    const token = localStorage.getItem(MASTER_TOKEN_KEY);
    if (!token) {
      setMasterOk(false);
      return;
    }
    let cancelled = false;
    fetch("/api/master-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verify: token }),
    })
      .then((r) => (r.ok ? r.json() : { valid: false }))
      .then((d) => !cancelled && setMasterOk(!!d.valid))
      .catch(() => !cancelled && setMasterOk(false));
    return () => {
      cancelled = true;
    };
  }, [role]);

  if (!user || user.role !== role) {
    return <Navigate to={role === "master" ? "/summit" : "/login"} replace />;
  }
  if (role === "master") {
    // Server confirms the token, not the locally-persisted role field — that
    // field is just localStorage JSON and trivially editable in devtools.
    if (masterOk === null) return null;
    if (!masterOk) return <Navigate to="/summit" replace />;
  }
  return <>{children}</>;
}
