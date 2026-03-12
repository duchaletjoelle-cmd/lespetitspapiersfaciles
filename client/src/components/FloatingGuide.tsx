import React, { useState, useEffect } from 'react';

const messages = [
  { range: [0, 20], text: "Bienvenue ! 👋 Je suis là pour vous guider.", type: 'general' },
  { range: [20, 35], text: "Découvrez mes deux types d'accompagnement ! 📚", type: 'general' },
  { range: [35, 50], text: "L'aide administrative, c'est mon domaine ! 📋", type: 'admin' },
  { range: [50, 65], text: "L'accompagnement numérique pour tous ! 💻", type: 'digital' },
  { range: [65, 75], text: "Ateliers en groupe ? Je suis prête ! 🎓", type: 'workshop' },
  { range: [75, 85], text: "Votre confidentialité est ma priorité ! 🔒", type: 'serenity' },
  { range: [85, 100], text: "Merci de votre visite ! À bientôt ! 💚", type: 'general' },
];

const qaDatabase = [
  {
    id: 'tarifs',
    question: "💰 Quel est le tarif ?",
    answer: "Une séance coûte 42€. Grâce au crédit d'impôt de 50%, vous ne payerez réellement que 21€. C'est accessible et transparent !",
    icon: "💰"
  },
  {
    id: 'credit-impot',
    question: "🎁 Comment fonctionne le crédit d'impôt ?",
    answer: "L'État rembourse 50% de vos dépenses en Services à la Personne. Si vous payez 42€, l'État vous rembourse 21€. Applicable à tous, imposables ou non !",
    icon: "🎁"
  },
  {
    id: 'premier-rdv',
    question: "📅 Comment se passe le premier RDV ?",
    answer: "Simple et sans engagement ! Nous faisons le point sur votre situation, je vous explique comment je peux vous aider, et vous décidez librement. Aucune pression.",
    icon: "📅"
  },
  {
    id: 'confidentialite',
    question: "🔒 Mes données sont-elles sécurisées ?",
    answer: "Absolument ! Vos documents personnels (impôts, retraite, courriers) sont traités avec la plus stricte confidentialité. Rien n'est jamais partagé.",
    icon: "🔒"
  },
  {
    id: 'contact',
    question: "📞 Comment vous contacter ?",
    answer: "Appelez-moi au 07 50 52 72 27 ou écrivez à lespetitspapiersfaciles@gmail.com. Je vous répondrai rapidement !",
    icon: "📞"
  }
];

// Mapping des tenues selon le contexte
const outfitMapping: Record<string, string> = {
  'general': '/img/guide-character.png',
  'admin': '/img/guide-character.png',
  'digital': '/img/guide-character-digital.png',
  'workshop': '/img/guide-character-workshop.png',
  'serenity': '/img/guide-character-serenity.png',
};

// Expressions du personnage
const expressions = {
  normal: '😊',
  happy: '😄',
  thinking: '🤔',
  winking: '😉',
  reassuring: '🥰',
};

export const FloatingGuide: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [bounceAnimation, setBounceAnimation] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [selectedQA, setSelectedQA] = useState<typeof qaDatabase[0] | null>(null);
  const [currentType, setCurrentType] = useState<'admin' | 'digital' | 'general' | 'workshop' | 'serenity'>('general');
  const [currentOutfit, setCurrentOutfit] = useState('/img/guide-character.png');
  const [currentExpression, setCurrentExpression] = useState(expressions.normal);
  const [waveAnimation, setWaveAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 100);
      setBounceAnimation(true);
      setTimeout(() => setBounceAnimation(false), 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const message = messages.find(
      (m) => scrollProgress >= m.range[0] && scrollProgress < m.range[1]
    );
    setCurrentMessage(message?.text || "");
    const newType = (message?.type as 'admin' | 'digital' | 'general' | 'workshop' | 'serenity') || 'general';
    setCurrentType(newType);
    setCurrentOutfit(outfitMapping[newType] || outfitMapping['general']);
    
    // Changement d'expression selon le contexte
    if (newType === 'serenity') {
      setCurrentExpression(expressions.reassuring);
    } else if (newType === 'workshop') {
      setCurrentExpression(expressions.happy);
    } else if (newType === 'digital') {
      setCurrentExpression(expressions.thinking);
    } else {
      setCurrentExpression(expressions.normal);
    }
  }, [scrollProgress]);

  const verticalPosition = 20 + (scrollProgress / 100) * 60;
  const horizontalOffset = Math.sin(scrollProgress * 0.05) * 20;

  const handleCharacterClick = () => {
    setWaveAnimation(true);
    setTimeout(() => setWaveAnimation(false), 600);
    setCurrentExpression(expressions.winking);
    setTimeout(() => setCurrentExpression(expressions.normal), 1000);
  };

  return (
    <div
      className={`fixed right-8 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        top: `${verticalPosition}%`,
        transform: `translateX(${horizontalOffset}px)`,
        zIndex: 40,
      }}
    >
      <div className="relative">
        {/* Bulle de message contextuelle ou Q&A */}
        {selectedQA ? (
          // Mode réponse
          <div
            className="absolute -left-48 top-0 bg-white rounded-lg p-4 shadow-xl text-sm animate-fadeIn"
            style={{
              color: 'oklch(0.45 0.08 145)',
              fontFamily: "'Source Sans 3', sans-serif",
              minWidth: '180px',
              border: '2px solid oklch(0.45 0.08 145 / 0.20)',
            }}
          >
            <p className="font-semibold mb-2">{selectedQA.icon} {selectedQA.question}</p>
            <p className="text-xs mb-3">{selectedQA.answer}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedQA(null)}
                className="text-xs px-2 py-1 rounded hover:bg-gray-100 flex-1"
              >
                ← Retour
              </button>
              <a
                href="/rendez-vous"
                className="text-xs px-2 py-1 rounded text-white flex-1 text-center"
                style={{ backgroundColor: 'oklch(0.45 0.08 145)' }}
              >
                RDV
              </a>
            </div>
          </div>
        ) : showQA ? (
          // Mode questions
          <div
            className="absolute -left-56 top-0 bg-white rounded-lg p-3 shadow-xl animate-fadeIn"
            style={{
              color: 'oklch(0.45 0.08 145)',
              fontFamily: "'Source Sans 3', sans-serif",
              minWidth: '220px',
              border: '2px solid oklch(0.45 0.08 145 / 0.20)',
            }}
          >
            <p className="font-semibold text-sm mb-2">Vos questions :</p>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {qaDatabase.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => setSelectedQA(qa)}
                  className="w-full text-left text-xs p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  {qa.icon} {qa.question}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQA(false)}
              className="w-full text-xs mt-2 px-2 py-1 rounded hover:bg-gray-100"
            >
              Fermer
            </button>
          </div>
        ) : (
          // Mode message
          <div
            className="absolute -left-40 top-0 bg-white rounded-lg p-3 shadow-lg text-sm animate-fadeIn"
            style={{
              color: 'oklch(0.45 0.08 145)',
              fontFamily: "'Source Sans 3', sans-serif",
              minWidth: '150px',
              border: '2px solid oklch(0.45 0.08 145 / 0.15)',
            }}
          >
            <p className="text-xs font-semibold mb-2">{currentMessage}</p>
            <button
              onClick={() => setShowQA(true)}
              className="w-full text-xs px-2 py-1 rounded transition-colors"
              style={{
                backgroundColor: 'oklch(0.45 0.08 145 / 0.10)',
                color: 'oklch(0.45 0.08 145)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.45 0.08 145 / 0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.45 0.08 145 / 0.10)';
              }}
            >
              ❓ Poser une question
            </button>
          </div>
        )}

        {/* Personnage */}
        <div
          className={`relative cursor-pointer transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${bounceAnimation ? 'animate-bounce' : ''} ${
            waveAnimation ? 'animate-pulse' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCharacterClick}
          style={{
            filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.10))',
          }}
        >
          {/* Image du personnage */}
          <img
            src={currentOutfit}
            alt="Guide"
            className="w-24 h-24 object-contain"
            style={{
              animation: waveAnimation ? 'wave 0.6s ease-in-out' : 'none',
            }}
          />

          {/* Expression emoji flottant */}
          <div
            className="absolute -top-2 -right-2 text-2xl animate-bounce"
            style={{
              animation: 'bounce 2s infinite',
            }}
          >
            {currentExpression}
          </div>

          {/* Petite étoile au survol */}
          {isHovered && (
            <div className="absolute -top-4 -left-4 text-2xl animate-spin">
              ✨
            </div>
          )}
        </div>
      </div>

      {/* Styles d'animation */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
