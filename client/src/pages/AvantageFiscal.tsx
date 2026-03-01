/* ============================================================
   Page Avantage fiscal — Les Petits Papiers Faciles
   Style : Clarté Provençale — explication pédagogique, chiffres clairs
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Info, Calculator, FileCheck } from "lucide-react";

const FISCAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/avantage-fiscal-lpp-dtbNFsi6RZ4Bp9EU6Jymj6.webp";

export default function AvantageFiscalPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = pageRef.current?.querySelectorAll(".reveal") ?? [];
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} style={{ paddingTop: "72px" }}>
      {/* ── HEADER ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Avantage fiscal
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Grâce au crédit d'impôt Services à la Personne, mes prestations vous
            coûtent en réalité deux fois moins cher.
          </p>
        </div>
      </section>

      {/* ── EXPLICATION PRINCIPALE ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="reveal">
              <h2
                className="text-4xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Le crédit d'impôt, c'est quoi ?
              </h2>
              <div className="section-divider" />
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                En France, les services à la personne bénéficient d'un avantage
                fiscal important : l'État rembourse <strong>50 % des sommes
                dépensées</strong> sous forme de crédit d'impôt sur le revenu.
              </p>
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Concrètement, si vous payez 42 € de l'heure pour mes
                prestations, l'État vous rembourse 21 € lors de votre
                déclaration de revenus. Votre coût réel est donc de{" "}
                <strong>21 € de l'heure seulement.</strong>
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Ce dispositif s'applique que vous soyez imposable ou non :
                si vous ne payez pas d'impôt, le crédit vous est remboursé
                directement par virement.
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <img
                src={FISCAL_IMG}
                alt="Crédit d'impôt services à la personne"
                className="rounded-2xl w-full object-cover shadow-lg"
                style={{ maxHeight: "380px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCUL ILLUSTRÉ ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <h2
              className="text-4xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Un exemple concret
            </h2>
            <div className="section-divider-center" />
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Calcul visuel */}
            <div
              className="rounded-2xl p-8 mb-10 reveal"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                border: "1px solid oklch(0.88 0.03 80)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                <div>
                  <div
                    className="text-5xl font-bold mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "oklch(0.45 0.02 65)",
                    }}
                  >
                    42 €
                  </div>
                  <div
                    className="text-sm font-medium uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Tarif affiché / heure
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Ce que vous payez à chaque séance
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                  >
                    <Calculator size={28} style={{ color: "oklch(0.42 0.06 145)" }} />
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Crédit d'impôt 50 %
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Remboursé par l'État
                  </div>
                </div>

                <div>
                  <div
                    className="text-5xl font-bold mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "oklch(0.42 0.06 145)",
                    }}
                  >
                    21 €
                  </div>
                  <div
                    className="text-sm font-medium uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Coût réel / heure
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Ce que ça vous coûte vraiment
                  </div>
                </div>
              </div>

              <div
                className="mt-8 pt-6 border-t text-center"
                style={{ borderColor: "oklch(0.88 0.03 80)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Pour 10 heures d'accompagnement : vous payez 420 € et
                  récupérez <strong>210 € via votre déclaration de revenus</strong>.
                </p>
              </div>
            </div>

            {/* Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal" style={{ transitionDelay: "0.1s" }}>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  border: "1px solid oklch(0.88 0.04 145)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={20} style={{ color: "oklch(0.42 0.06 145)" }} />
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Qui peut en bénéficier ?
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Tous les particuliers, imposables ou non",
                    "Résidents fiscaux français",
                    "Personnes âgées, actifs, retraités",
                    "Aucune condition de revenus",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <CheckCircle size={13} style={{ color: "oklch(0.42 0.06 145)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  border: "1px solid oklch(0.88 0.04 145)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck size={20} style={{ color: "oklch(0.42 0.06 145)" }} />
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Comment ça fonctionne ?
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Je vous fournis une attestation annuelle",
                    "Vous la déclarez sur impots.gouv.fr",
                    "Le crédit est calculé automatiquement",
                    "Remboursement ou déduction d'impôt",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      <CheckCircle size={13} style={{ color: "oklch(0.42 0.06 145)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTE IMPORTANTE ── */}
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
      >
        <div className="container">
          <div
            className="max-w-3xl mx-auto rounded-xl p-6 flex items-start gap-4 reveal"
            style={{
              backgroundColor: "oklch(0.98 0.01 80)",
              border: "1px solid oklch(0.85 0.04 145)",
            }}
          >
            <Info size={20} className="shrink-0 mt-0.5" style={{ color: "oklch(0.42 0.06 145)" }} />
            <div>
              <h3
                className="font-semibold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem" }}
              >
                Information importante
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Les informations présentées sur cette page sont données à titre
                indicatif. Le crédit d'impôt est soumis à des plafonds annuels
                fixés par la loi (12 000 € de dépenses maximum, soit 6 000 € de
                crédit). Pour toute question fiscale spécifique à votre
                situation, consultez un conseiller fiscal ou les services des
                impôts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container text-center reveal">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.97 0.01 80)" }}
          >
            Des questions sur le crédit d'impôt ?
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Je peux vous expliquer en détail comment cela fonctionne pour votre
            situation. Contactez-moi !
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all"
            style={{
              backgroundColor: "oklch(0.97 0.01 80)",
              color: "oklch(0.30 0.07 145)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Me contacter
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
