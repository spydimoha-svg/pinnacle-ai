import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoMark } from "../components/Logo";
import { useStore } from "../lib/store";

/**
 * Hidden Pinnacle Master access — /summit. Not linked anywhere in the UI.
 * Only the Pinnacle team knows this route and the passcode.
 */
export default function MasterAccess() {
  const navigate = useNavigate();
  const masterLogin = useStore((s) => s.masterLogin);
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const user = masterLogin(code);
    if (!user) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode("");
      return;
    }
    navigate("/master");
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
