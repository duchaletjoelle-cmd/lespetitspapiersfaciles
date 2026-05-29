import { useSEOHead } from "../components/SEOHead";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  useSEOHead({
    title: "Contact | Les Petits Papiers Faciles",
    description: "Contactez Sandra Duchalet pour votre aide administrative et accompagnement numérique à Hyères et dans le Var.",
    url: "https://lespetitspapiersfaciles.fr/contact",
  });

  return (
    <main className="min-h-screen py-24" style={{ backgroundColor: "oklch(0.98 0.01 80)" }}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-semibold mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.25 0.03 72)" }}
            >
              Me contacter
            </h1>
            <p className="text-xl text-gray-600">
              Je réponds généralement dans la journée. N'hésitez pas !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <div
                className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <h2
                  className="text-2xl font-semibold mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
                >
                  Coordonnées
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "oklch(0.30 0.04 72)" }}>Téléphone</p>
                      <a
                        href="tel:0750527227"
                        className="text-lg font-semibold hover:underline"
                        style={{ color: "oklch(0.45 0.05 145)" }}
                      >
                        07 50 52 72 27
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "oklch(0.30 0.04 72)" }}>Email</p>
                      <a
                        href="mailto:contact@lespetitspapiersfaciles.fr"
                        className="text-lg hover:underline"
                        style={{ color: "oklch(0.45 0.05 145)" }}
                      >
                        contact@lespetitspapiersfaciles.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "oklch(0.30 0.04 72)" }}>Zone d'intervention</p>
                      <p className="text-gray-600">Hyères, Carqueiranne, Le Pradet,<br />La Crau et communes du Var</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "oklch(0.30 0.04 72)" }}>Disponibilités</p>
                      <p className="text-gray-600">Lundi – Vendredi : 9h – 18h<br />Sur rendez-vous uniquement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message invite */}
            <div
              className="p-8 rounded-2xl flex flex-col justify-center text-center"
              style={{ backgroundColor: "oklch(0.30 0.04 72)", color: "white" }}
            >
              <MessageCircle size={48} className="mx-auto mb-6 opacity-80" />
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Un premier appel, sans engagement
              </h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Un simple échange téléphonique suffit souvent à clarifier votre situation et voir comment je peux vous aider.
              </p>
              <a
                href="tel:0750527227"
                className="inline-flex items-center justify-center gap-3 bg-white font-bold rounded-xl py-4 px-8 transition-opacity hover:opacity-90"
                style={{ color: "oklch(0.30 0.04 72)", fontSize: "1.1rem" }}
              >
                <Phone size={20} />
                07 50 52 72 27
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
