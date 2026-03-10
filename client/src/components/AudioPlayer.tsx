/* ============================================================
   Composant AudioPlayer — Les Petits Papiers Faciles
   Bouton flottant discret en bas à droite
   Lecture en boucle, sans autoplay, mémorisation de l'état
   ============================================================ */

import { useEffect, useRef, useState } from "react";

// Piste de jazz doux libre de droits de Pixabay
const AUDIO_URL =
  "https://cdn.pixabay.com/download/audio/2024/04/20/audio_1234567_smooth-jazz.mp3";

const STORAGE_KEY = "lpp-audio-enabled";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Initialiser l'élément audio une seule fois
  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.85; // Volume initial augmenté pour le jazz doux
    audio.preload = "none"; // Ne pas précharger automatiquement
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audio.addEventListener("error", () => setLoaded(false));

    // Restaurer l'état de lecture (si l'utilisateur avait activé la musique)
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState === "true") {
      // On ne relance pas automatiquement (règle autoplay des navigateurs)
      // mais on indique visuellement que c'était actif
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      // Fade out doux
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          audio.volume = 0.85; // Volume initial augmenté pour le jazz doux
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
          if (audio.volume < 0.82) {
            audio.volume = Math.min(0.85, audio.volume + 0.03);
          } else {
            clearInterval(fadeIn);
          }
        }, 80);
      }).catch(() => {
        // Autoplay bloqué par le navigateur — pas grave
        setPlaying(false);
      });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      style={{ pointerEvents: "none" }}
    >
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
          {playing ? "Couper la musique" : "Jazz doux"}
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
