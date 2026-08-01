import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import type { Role } from "../lib/types";

/** Route guard. Redirects to login (or home for the hidden master area). */
export default function Protected({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const user = useStore((s) => s.currentUser);
  if (!user || user.role !== role) {
    return <Navigate to={role === "master" ? "/summit" : "/login"} replace />;
  }
  return <>{children}</>;
}
