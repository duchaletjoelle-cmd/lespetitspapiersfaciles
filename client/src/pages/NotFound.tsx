/* ============================================================
   Page 404 — Les Petits Papiers Faciles
   Style : Clarté Provençale — message en français, ton chaleureux
   ============================================================ */

import { Link } from "wouter";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "oklch(0.94 0.02 80)", paddingTop: "72px" }}
    >
      <div className="text-center px-4 max-w-lg">
        <div
          className="text-8xl font-bold mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "oklch(0.88 0.04 145)",
          }}
        >
          404
        </div>
        <h1
          className="text-3xl font-semibold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Page introuvable
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          La page que vous cherchez n'existe pas ou a été déplacée. Pas de
          panique — retournez à l'accueil et trouvez ce dont vous avez besoin.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all"
          style={{
            backgroundColor: "oklch(0.42 0.06 145)",
            color: "oklch(0.97 0.01 80)",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          <Home size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
