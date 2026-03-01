/* ============================================================
   CookieBanner — Les Petits Papiers Faciles
   Style : Clarté Provençale — bandeau bas de page, RGPD conforme
   ============================================================ */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lpp-cookie-consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("lpp-cookie-consent", "accepted");
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem("lpp-cookie-consent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] shadow-2xl"
      style={{ backgroundColor: "oklch(0.22 0.04 145)" }}
    >
      <div className="container py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.88 0.03 80)" }}
            >
              Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking n'est utilisé.{" "}
              <Link
                href="/cookies"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "oklch(0.80 0.05 145)" }}
              >
                En savoir plus
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={refuse}
              className="text-sm px-4 py-2 rounded border transition-all"
              style={{
                color: "oklch(0.75 0.03 80)",
                borderColor: "oklch(0.40 0.05 145)",
              }}
            >
              Refuser
            </button>
            <button
              onClick={accept}
              className="text-sm px-5 py-2 rounded font-semibold transition-all"
              style={{
                backgroundColor: "oklch(0.88 0.04 145)",
                color: "oklch(0.22 0.04 145)",
              }}
            >
              Accepter
            </button>
            <button
              onClick={refuse}
              className="p-1 rounded transition-opacity hover:opacity-70"
              aria-label="Fermer"
              style={{ color: "oklch(0.65 0.03 80)" }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
