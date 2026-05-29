import { useSEOHead } from "../components/SEOHead";
import { CalendarDays, Phone, CheckCircle, Clock, MapPin } from "lucide-react";

export default function RendezVousPage() {
  useSEOHead({
    title: "Prendre rendez-vous | Les Petits Papiers Faciles",
    description: "Prenez rendez-vous avec Sandra Duchalet pour votre aide administrative et accompagnement numérique à domicile dans le Var.",
    url: "https://lespetitspapiersfaciles.fr/rendez-vous",
  });

  return (
    <main className="min-h-screen py-24" style={{ backgroundColor: "oklch(0.98 0.01 80)" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-semibold mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.25 0.03 72)" }}
            >
              Prendre rendez-vous
            </h1>
            <p className="text-xl text-gray-600">
              La prise de rendez-vous se fait par téléphone. Je vous rappelle dans les plus brefs délais.
            </p>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
            >
              Comment ça se passe ?
            </h2>
            <div className="space-y-6">
              {[
                { icon: <Phone size={22} />, step: "1", title: "Vous m'appelez ou je vous rappelle", desc: "Un premier échange rapide pour comprendre votre besoin et voir si je peux vous aider." },
                { icon: <CalendarDays size={22} />, step: "2", title: "On fixe un rendez-vous à domicile", desc: "Je me déplace chez vous, à l'heure et au jour qui vous conviennent le mieux." },
                { icon: <CheckCircle size={22} />, step: "3", title: "On travaille ensemble, à votre rythme", desc: "Je vous explique chaque étape clairement, sans jargon, et on avance ensemble." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                    style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "oklch(0.30 0.04 72)" }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical info */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div
              className="p-6 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
            >
              <Clock size={28} style={{ color: "oklch(0.45 0.05 145)", flexShrink: 0 }} />
              <div>
                <p className="font-semibold" style={{ color: "oklch(0.30 0.04 72)" }}>Disponibilités</p>
                <p className="text-sm text-gray-600">Lundi – Vendredi, 9h – 18h</p>
              </div>
            </div>
            <div
              className="p-6 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: "oklch(0.93 0.04 80)" }}
            >
              <MapPin size={28} style={{ color: "oklch(0.45 0.05 145)", flexShrink: 0 }} />
              <div>
                <p className="font-semibold" style={{ color: "oklch(0.30 0.04 72)" }}>À domicile</p>
                <p className="text-sm text-gray-600">Hyères et communes du Var</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: "oklch(0.30 0.04 72)", color: "white" }}
          >
            <CalendarDays size={40} className="mx-auto mb-4 opacity-80" />
            <h2
              className="text-3xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Prêt(e) à démarrer ?
            </h2>
            <p className="text-lg opacity-90 mb-8">Appelez-moi, c'est simple et sans engagement.</p>
            <a
              href="tel:0750527227"
              className="inline-flex items-center gap-3 bg-white font-bold rounded-xl py-4 px-10 transition-opacity hover:opacity-90"
              style={{ color: "oklch(0.30 0.04 72)", fontSize: "1.15rem" }}
            >
              <Phone size={22} />
              07 50 52 72 27
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
