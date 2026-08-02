import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoMark } from "../components/Logo";
import { useStore } from "../lib/store";
import { MASTER_NAME } from "../data/schools";

/** localStorage key for the short-lived token api/master-login.ts issues. */
const MASTER_TOKEN_KEY = "pinnacle-master-token";

/**
 * Hidden Pinnacle Master access — /summit. Not linked anywhere in the UI.
 * Only the Pinnacle team knows this route and the passcode, which is checked
 * server-side by api/master-login.ts — nothing secret ships in this bundle.
 */
export default function MasterAccess() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/master-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      if (!res.ok) throw new Error("rejected");
      const { token } = await res.json();
      localStorage.setItem(MASTER_TOKEN_KEY, token);
      useStore.setState({
        currentUser: {
          id: "u-master",
          name: MASTER_NAME,
          email: "master@pinnacle.ai",
          password: "",
          role: "master",
        },
      });
      navigate("/master");
    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode("");
      setError("That passcode isn't right.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pit p-5">
      <form
        onSubmit={submit}
        className={`text-center ${shake ? "animate-pulse" : ""}`}
      >
        <div className="flex justify-center mb-6 opacity-80">
          <LogoMark size={44} />
        </div>
        <div className="eyebrow mb-6">Summit access</div>
        <input
          type="password"
          className="input !bg-pit !border-line text-center font-mono tracking-[0.3em] w-64"
          placeholder="PASSCODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          aria-label="Master passcode"
        />
        {error && (
          <p className="text-coral text-sm mt-4" role="alert">
            {error}
          </p>
        )}
        <div className="mt-4">
          <button type="submit" className="btn-ghost text-xs !px-8">
            Ascend
          </button>
        </div>
        <p className="text-dim text-[11px] mt-8 max-w-xs mx-auto">
          This console is for the Pinnacle team only. If you found this page by
          accident, the view is nicer at the base camp.
        </p>
      </form>
    </div>
  );
}
