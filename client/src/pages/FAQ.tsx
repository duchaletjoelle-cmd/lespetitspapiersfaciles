/*
   Page FAQ Simplifiée — Les Petits Papiers Faciles
   Questions basiques pour les seniors (sans donner toutes les réponses)
   ============================================================ */

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useSEOHead } from "../components/SEOHead";

// Données FAQ simplifiée
const FAQ_CATEGORIES = [
  {
    category: "Les Bases",
    questions: [
      {
        id: "q1",
        question: "Par où commencer si je n'ai jamais utilisé un ordinateur ?",
        answer:
          "C'est une excellente question ! Commencer par les bases est important. Nous vous recommandons de prendre rendez-vous avec un professionnel qui pourra vous guider pas à pas. Lors d'une première séance, nous couvrirons : comment allumer l'ordinateur, utiliser la souris et le clavier, et naviguer sur internet. Chaque personne apprend à son rythme, et c'est normal d'avoir besoin de temps.",
      },
      {
        id: "q2",
        question: "Quel type d'ordinateur me convient le mieux ?",
        answer:
          "Il existe plusieurs types d'ordinateurs (de bureau, portable, tablette, smartphone). Le choix dépend de vos besoins et de votre budget. Un professionnel peut vous aider à choisir. Nous vous recommandons de prendre rendez-vous pour discuter de vos besoins spécifiques.",
      },
      {
        id: "q3",
        question: "Combien ça coûte d'avoir internet à la maison ?",
        answer:
          "Le coût varie selon votre fournisseur et votre région. Vous pouvez aussi utiliser internet gratuitement à la bibliothèque ou à la mairie. Appelez-nous pour discuter des options qui vous conviennent.",
      },
    ],
  },
  {
    category: "Internet et Navigation",
    questions: [
      {
        id: "q4",
        question: "Comment je fais pour aller sur un site internet ?",
        answer:
          "C'est une bonne question ! Il y a plusieurs étapes à connaître. Nous vous expliquerons comment utiliser un navigateur internet et comment trouver les sites que vous cherchez. Prenez rendez-vous pour une séance pratique.",
      },
      {
        id: "q5",
        question: "Comment je cherche quelque chose sur internet ?",
        answer:
          "Il existe des outils appelés 'moteurs de recherche' qui vous aident à trouver des informations. Nous vous montrerons comment les utiliser efficacement lors d'une séance.",
      },
    ],
  },
  {
    category: "Les Emails",
    questions: [
      {
        id: "q6",
        question: "Comment je crée une adresse email ?",
        answer:
          "Créer une adresse email est gratuit et facile, mais il y a plusieurs étapes à suivre. Nous pouvons vous aider à créer votre adresse email lors d'une séance. Appelez-nous pour prendre rendez-vous.",
      },
      {
        id: "q7",
        question: "Comment j'envoie un email ?",
        answer:
          "Envoyer un email est simple une fois que vous connaissez les bases. Nous vous montrerons comment composer et envoyer un email lors d'une séance pratique.",
      },
    ],
  },
  {
    category: "La Sécurité",
    questions: [
      {
        id: "q8",
        question: "Comment je crée un bon mot de passe ?",
        answer:
          "Un bon mot de passe est important pour protéger vos comptes. Il existe des règles simples à suivre. Nous vous expliquerons comment créer un mot de passe sûr lors d'une séance.",
      },
      {
        id: "q9",
        question: "Comment je reconnais une arnaque sur internet ?",
        answer:
          "Il existe plusieurs types d'arnaques sur internet. Nous vous montrerons comment les reconnaître et comment vous protéger. C'est un sujet important que nous couvrons en détail lors de nos séances.",
      },
      {
        id: "q10",
        question: "Mon ordinateur est-il sûr ?",
        answer:
          "La sécurité de votre ordinateur est importante. Nous pouvons vérifier l'état de sécurité de votre ordinateur et vous recommander les actions à prendre. Prenez rendez-vous pour une vérification.",
      },
    ],
  },
  {
    category: "Les Démarches Administratives",
    questions: [
      {
        id: "q11",
        question: "Comment je fais mes démarches administratives en ligne ?",
        answer:
          "Les démarches administratives en ligne peuvent être compliquées. Nous vous accompagnerons pas à pas pour faire vos déclarations d'impôts, demander des allocations, ou consulter votre retraite. Appelez-nous pour prendre rendez-vous.",
      },
      {
        id: "q12",
        question: "Où je trouve les sites officiels pour mes démarches ?",
        answer:
          "Il existe plusieurs sites officiels selon votre besoin (impôts, retraite, allocations, etc.). Nous connaissons tous ces sites et nous pouvons vous aider à les trouver et à les utiliser.",
      },
    ],
  },
  {
    category: "Les Réseaux Sociaux",
    questions: [
      {
        id: "q13",
        question: "Qu'est-ce que Facebook et comment ça marche ?",
        answer:
          "Facebook est un réseau social qui vous permet de rester en contact avec votre famille et vos amis. Nous vous montrerons comment créer un compte et comment l'utiliser lors d'une séance.",
      },
      {
        id: "q14",
        question: "Comment je partage une photo avec ma famille sur internet ?",
        answer:
          "Il existe plusieurs façons de partager des photos avec votre famille en ligne. Nous vous montrerons les options les plus simples et les plus sûres.",
      },
    ],
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useSEOHead({
    title: "FAQ - Questions Fréquentes | Les Petits Papiers Faciles",
    description:
      "Trouvez les réponses à vos questions sur le numérique. Si vous avez besoin d'aide, prenez rendez-vous avec nos experts.",
    url: "/faq",
  });

  // Filtrer les questions selon la recherche
  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.01 80)" }}>
      {/* Header */}
      <div
        className="py-16 px-4"
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
      >
        <div className="container max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-semibold text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Questions Fréquentes
          </h1>
          <p className="text-lg text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Trouvez les réponses à vos questions sur le numérique
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              size={20}
              style={{ color: "oklch(0.45 0.08 145)" }}
            />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2"
              style={{
                borderColor: "oklch(0.85 0.03 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            />
          </div>
        </div>

        {/* Questions par catégorie */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.category} className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.42 0.06 145)",
                }}
              >
                {category.category}
              </h2>

              <div className="space-y-3">
                {category.questions.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-lg border-2 overflow-hidden"
                    style={{ borderColor: "oklch(0.85 0.03 80)" }}
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === q.id ? null : q.id)
                      }
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-50 transition"
                      style={{ backgroundColor: "oklch(0.98 0.01 80)" }}
                    >
                      <span
                        className="text-left font-medium"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {q.question}
                      </span>
                      <ChevronDown
                        size={20}
                        style={{
                          color: "oklch(0.45 0.08 145)",
                          transform:
                            expandedId === q.id ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      />
                    </button>

                    {expandedId === q.id && (
                      <div
                        className="px-6 py-4 border-t-2"
                        style={{ borderColor: "oklch(0.85 0.03 80)", backgroundColor: "oklch(0.99 0.005 80)" }}
                      >
                        <p
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            color: "oklch(0.42 0.02 65)",
                            lineHeight: "1.6",
                          }}
                        >
                          {q.answer}
                        </p>
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: "oklch(0.85 0.03 80)" }}>
                          <p
                            className="text-sm"
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              color: "oklch(0.45 0.08 145)",
                              fontWeight: "500",
                            }}
                          >
                            💡 Vous avez besoin d'aide ? Prenez rendez-vous avec un expert !
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.42 0.02 65)",
              }}
            >
              Aucune question ne correspond à votre recherche.
            </p>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-16 p-8 rounded-lg text-center"
          style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
        >
          <h3
            className="text-2xl font-semibold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.42 0.06 145)" }}
          >
            Vous n'avez pas trouvé la réponse ?
          </h3>
          <p
            className="mb-6"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.42 0.02 65)" }}
          >
            Nos experts sont là pour vous aider. Prenez rendez-vous pour une séance personnalisée.
          </p>
          <a href="/contact">
            <button
              style={{
                backgroundColor: "oklch(0.45 0.08 145)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: "500",
              }}
            >
              Prendre Rendez-vous
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
