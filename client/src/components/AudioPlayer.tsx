/* ============================================================
   Composant AudioPlayer — Les Petits Papiers Faciles
   Bouton flottant discret en bas à droite
   Lecture en boucle, sans autoplay, mémorisation de l'état
   ============================================================ */

import { useEffect, useRef, useState } from "react";

// Utiliser le fichier audio local pour une meilleure performance
const AUDIO_URL = "/audio/background_music.mp3";

const STORAGE_KEY = "lpp-audio-enabled";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Initialiser l'élément audio une seule fois
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_URL);
      audio.loop = true;
      audio.volume = 1.0;
      audio.preload = "auto";
      audioRef.current = audio;

      // Ajouter l'élément au DOM (caché) pour faciliter le débogage et la gestion
      audio.id = "lpp-background-audio";
      audio.style.display = "none";
      document.body.appendChild(audio);

      audio.addEventListener("canplaythrough", () => setLoaded(true));
      audio.addEventListener("error", (e) => {
        console.error("Erreur lors du chargement audio:", e);
        setLoaded(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      // Fade out doux
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.08);
        } else {
          audio.pause();
          audio.volume = 1.0; // Volume maximum pour la prochaine lecture
          clearInterval(fadeOut);
        }
      }, 80);
      setPlaying(false);
      sessionStorage.setItem(STORAGE_KEY, "false");
    } else {
      // Fade in doux
      audio.volume = 0;
      audio.play().then(() => {
        setPlaying(true);
        sessionStorage.setItem(STORAGE_KEY, "true");
        const fadeIn = setInterval(() => {
          if (audio.volume < 0.9) {
            audio.volume = Math.min(1.0, audio.volume + 0.1);
          } else {
            audio.volume = 1.0;
            clearInterval(fadeIn);
          }
        }, 50);
      }).catch((error) => {
        // Autoplay bloqué par le navigateur — pas grave
        console.warn("Autoplay bloqué:", error);
        setPlaying(false);
      });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      style={{ pointerEvents: "none" }}
    >
      {/* Texte "CLIQUEZ" */}
      <div
        className="text-xs font-bold tracking-widest"
        style={{
          color: "oklch(0.45 0.08 145)",
          fontFamily: "'Source Sans 3', sans-serif",
          pointerEvents: "none",
        }}
      >
        CLIQUEZ
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-md"
          style={{
            backgroundColor: "oklch(0.45 0.08 145)",
            color: "oklch(0.97 0.01 80)",
            fontFamily: "'Source Sans 3', sans-serif",
            pointerEvents: "none",
            opacity: 0.95,
          }}
        >
          {playing ? "Couper la musique" : "Activer la musique"}
        </div>
      )}

      {/* Bouton principal */}
      <button
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={playing ? "Couper la musique d'ambiance" : "Activer la musique d'ambiance"}
        title={playing ? "Couper la musique" : "Ambiance musicale — Jazz doux"}
        className="relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: playing
            ? "oklch(0.45 0.08 145)"
            : "oklch(0.94 0.02 80)",
          border: `2px solid ${playing ? "oklch(0.55 0.08 145)" : "oklch(0.78 0.04 80)"}`,
          color: playing ? "oklch(0.97 0.01 80)" : "oklch(0.45 0.08 145)",
          boxShadow: playing
            ? "0 4px 16px oklch(0.45 0.08 145 / 0.35)"
            : "0 2px 8px oklch(0.45 0.08 145 / 0.15)",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        {playing ? (
          /* Icône "en lecture" — barres animées */
          <span className="flex items-end gap-[2px] h-4">
            <span
              className="w-[3px] rounded-full"
              style={{
                backgroundColor: "currentColor",
                animation: "lpp-bar1 0.8s ease-in-out infinite alternate",
                height: "60%",
              }}
            />
            <span
              className="w-[3px] rounded-full"
              style={{
                backgroundColor: "currentColor",
                animation: "lpp-bar2 0.8s ease-in-out 0.15s infinite alternate",
                height: "100%",
              }}
            />
            <span
              className="w-[3px] rounded-full"
              style={{
                backgroundColor: "currentColor",
                animation: "lpp-bar3 0.8s ease-in-out 0.3s infinite alternate",
                height: "40%",
              }}
            />
            <span
              className="w-[3px] rounded-full"
              style={{
                backgroundColor: "currentColor",
                animation: "lpp-bar1 0.8s ease-in-out 0.45s infinite alternate",
                height: "80%",
              }}
            />
          </span>
        ) : (
          /* Icône "muet" — note de musique */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}

        {/* Indicateur de chargement */}
        {!loaded && (
          <span
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "oklch(0.45 0.08 145 / 0.4)",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
      </button>

      {/* Styles d'animation */}
      <style>{`
        @keyframes lpp-bar1 {
          from { height: 30%; }
          to   { height: 90%; }
        }
        @keyframes lpp-bar2 {
          from { height: 60%; }
          to   { height: 100%; }
        }
        @keyframes lpp-bar3 {
          from { height: 20%; }
          to   { height: 70%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
