/* ============================================================
   Page Secteur d'intervention — Les Petits Papiers Faciles
   Style : Clarté Provençale — carte Google Maps, communes listées
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, Home, Wifi, ArrowRight } from "lucide-react";
import { MapView } from "@/components/Map";

const communes = [
  { name: "Hyères", principal: true },
  { name: "Carqueiranne", principal: true },
  { name: "Le Pradet", principal: true },
  { name: "La Crau", principal: false },
  { name: "Toulon", principal: false },
  { name: "La Garde", principal: false },
  { name: "La Valette-du-Var", principal: false },
  { name: "Ollioules", principal: false },
];

export default function SecteurPage() {
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

  const handleMapReady = (map: google.maps.Map) => {
    // Centre sur Hyères
    map.setCenter({ lat: 43.1204, lng: 6.1286 });
    map.setZoom(11);

    // Marqueurs des communes principales
    const mainCommunes = [
      { lat: 43.1204, lng: 6.1286, name: "Hyères" },
      { lat: 43.1003, lng: 6.0831, name: "Carqueiranne" },
      { lat: 43.1378, lng: 6.0200, name: "Le Pradet" },
    ];

    mainCommunes.forEach((commune) => {
      new google.maps.Marker({
        position: { lat: commune.lat, lng: commune.lng },
        map,
        title: commune.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#4A6741",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
    });

    // Cercle de zone d'intervention
    new google.maps.Circle({
      strokeColor: "#4A6741",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#4A6741",
      fillOpacity: 0.08,
      map,
      center: { lat: 43.1204, lng: 6.1286 },
      radius: 20000,
    });
  };

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
            Secteur d'intervention
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            J'interviens principalement à domicile sur Hyères, Carqueiranne et
            les communes environnantes du Var.
          </p>
        </div>
      </section>

      {/* ── CARTE & INFOS ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Infos */}
            <div className="lg:col-span-1 reveal">
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Zone d'intervention
              </h2>
              <div className="section-divider" />

              <div className="space-y-4 mb-8">
                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <Home size={20} className="mt-0.5 shrink-0" style={{ color: "oklch(0.42 0.06 145)" }} />
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.22 0.02 65)" }}
                    >
                      À domicile
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Je me déplace chez vous, dans un cadre confortable et
                      familier, pour travailler ensemble sur vos démarches.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <Wifi size={20} className="mt-0.5 shrink-0" style={{ color: "oklch(0.42 0.06 145)" }} />
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.22 0.02 65)" }}
                    >
                      À distance
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Pour certaines démarches, un accompagnement à distance est
                      possible par téléphone ou visioconférence.
                    </p>
                  </div>
                </div>
              </div>

              <h3
                className="text-xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Communes desservies
              </h3>
              <div className="flex flex-wrap gap-2">
                {communes.map((commune) => (
                  <span
                    key={commune.name}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: commune.principal
                        ? "oklch(0.42 0.06 145)"
                        : "oklch(0.95 0.02 145)",
                      color: commune.principal
                        ? "oklch(0.97 0.01 80)"
                        : "oklch(0.35 0.02 65)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {commune.principal && (
                      <MapPin size={12} className="inline mr-1" />
                    )}
                    {commune.name}
                  </span>
                ))}
              </div>
              <p
                className="text-sm mt-4"
                style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Vous n'êtes pas dans cette liste ? Contactez-moi, nous trouverons
                une solution.
              </p>
            </div>

            {/* Carte */}
            <div className="lg:col-span-2 reveal" style={{ transitionDelay: "0.15s" }}>
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ height: "480px", border: "1px solid oklch(0.88 0.03 80)" }}
              >
                <MapView
                  onMapReady={handleMapReady}
                  className="w-full h-full"
                />
              </div>
              <p
                className="text-xs mt-2 text-center"
                style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Zone d'intervention approximative — contactez-moi pour confirmer la disponibilité dans votre secteur.
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
            Vous êtes dans ma zone ?
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Contactez-moi pour convenir d'un rendez-vous à votre domicile.
            La première séance est offerte.
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
            Prendre rendez-vous
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
