/* ============================================================
   Page Contact — Les Petits Papiers Faciles
   Style : Clarté Provençale — formulaire simple, coordonnées claires
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xyzaabcd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formState.nom,
          email: formState.email,
          telephone: formState.telephone,
          sujet: formState.sujet,
          message: formState.message,
        }),
      });
      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.5rem",
    border: "1.5px solid oklch(0.85 0.03 80)",
    backgroundColor: "oklch(0.98 0.01 80)",
    color: "oklch(0.22 0.02 65)",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: "600",
    fontSize: "0.9rem",
    color: "oklch(0.35 0.02 65)",
  };

  return (
    <div ref={pageRef} style={{ paddingTop: "72px" }}>
      {/* ── HEADER ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Contactez-moi
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Un doute, une question, un besoin ? N'hésitez pas à me contacter —
            je vous réponds rapidement et sans engagement.
          </p>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Coordonnées */}
            <div className="lg:col-span-2 reveal">
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Mes coordonnées
              </h2>
              <div className="section-divider" />

              <div className="space-y-5 mb-8">
                <a
                  href="tel:0750527227"
                  className="flex items-start gap-4 p-4 rounded-xl transition-all group"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                  >
                    <Phone size={18} style={{ color: "oklch(0.42 0.06 145)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Téléphone
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "oklch(0.22 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      07 50 52 72 27
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:lespetitspapiersfaciles@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                  >
                    <Mail size={18} style={{ color: "oklch(0.42 0.06 145)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm font-medium break-all"
                      style={{ color: "oklch(0.22 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      lespetitspapiersfaciles@gmail.com
                    </p>
                  </div>
                </a>

                <div
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                  >
                    <MapPin size={18} style={{ color: "oklch(0.42 0.06 145)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Zone d'intervention
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Hyères · Carqueiranne · Le Pradet<br />
                      et communes environnantes
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                  >
                    <Clock size={18} style={{ color: "oklch(0.42 0.06 145)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Horaires
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Lundi au Samedi<br />
                      9h00 – 17h30
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge séance offerte */}
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  backgroundColor: "oklch(0.42 0.06 145)",
                  color: "oklch(0.97 0.01 80)",
                }}
              >
                <p
                  className="text-lg font-semibold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  ✦ Première séance offerte
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Sans engagement, pour faire connaissance et évaluer vos besoins.
                </p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3 reveal" style={{ transitionDelay: "0.15s" }}>
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "oklch(0.98 0.01 80)",
                  border: "1px solid oklch(0.88 0.03 80)",
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                    >
                      <CheckCircle size={32} style={{ color: "oklch(0.42 0.06 145)" }} />
                    </div>
                    <h3
                      className="text-2xl font-semibold mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Message envoyé !
                    </h3>
                    <p
                      className="text-base"
                      style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Merci pour votre message. Je vous répondrai dans les plus
                      brefs délais, généralement sous 24 heures.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2
                      className="text-2xl font-semibold mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Envoyez-moi un message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label style={labelStyle} htmlFor="nom">
                            Votre nom *
                          </label>
                          <input
                            id="nom"
                            name="nom"
                            type="text"
                            required
                            value={formState.nom}
                            onChange={handleChange}
                            placeholder="Prénom Nom"
                            style={inputStyle}
                            onFocus={(e) => {
                              (e.target as HTMLInputElement).style.borderColor = "oklch(0.42 0.06 145)";
                            }}
                            onBlur={(e) => {
                              (e.target as HTMLInputElement).style.borderColor = "oklch(0.85 0.03 80)";
                            }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle} htmlFor="telephone">
                            Téléphone
                          </label>
                          <input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            value={formState.telephone}
                            onChange={handleChange}
                            placeholder="06 XX XX XX XX"
                            style={inputStyle}
                            onFocus={(e) => {
                              (e.target as HTMLInputElement).style.borderColor = "oklch(0.42 0.06 145)";
                            }}
                            onBlur={(e) => {
                              (e.target as HTMLInputElement).style.borderColor = "oklch(0.85 0.03 80)";
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle} htmlFor="email">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="votre@email.fr"
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "oklch(0.42 0.06 145)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "oklch(0.85 0.03 80)";
                          }}
                        />
                      </div>

                      <div>
                        <label style={labelStyle} htmlFor="sujet">
                          Sujet *
                        </label>
                        <select
                          id="sujet"
                          name="sujet"
                          required
                          value={formState.sujet}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: "pointer" }}
                          onFocus={(e) => {
                            (e.target as HTMLSelectElement).style.borderColor = "oklch(0.42 0.06 145)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLSelectElement).style.borderColor = "oklch(0.85 0.03 80)";
                          }}
                        >
                          <option value="">Choisissez un sujet</option>
                          <option value="aide-administrative">Aide administrative</option>
                          <option value="apprentissage-numerique">Apprentissage numérique</option>
                          <option value="premiere-seance">Première séance découverte</option>
                          <option value="tarif-credit-impot">Tarif et crédit d'impôt</option>
                          <option value="autre">Autre demande</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle} htmlFor="message">
                          Votre message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre situation ou votre besoin en quelques mots..."
                          style={{ ...inputStyle, resize: "vertical" }}
                          onFocus={(e) => {
                            (e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.42 0.06 145)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.85 0.03 80)";
                          }}
                        />
                      </div>

                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        En soumettant ce formulaire, vous acceptez que vos données
                        soient utilisées pour vous répondre. Elles ne seront jamais
                        transmises à des tiers.{" "}
                        <a
                          href="/confidentialite"
                          style={{ color: "oklch(0.42 0.06 145)", textDecoration: "underline" }}
                        >
                          Politique de confidentialité
                        </a>
                      </p>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-sage w-full justify-center text-base"
                        style={{ opacity: loading ? 0.7 : 1 }}
                      >
                        {loading ? (
                          "Envoi en cours…"
                        ) : (
                          <>
                            Envoyer le message
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
