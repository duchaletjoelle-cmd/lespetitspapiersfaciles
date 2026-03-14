/* ============================================================
   Page FAQ — Les Petits Papiers Faciles
   Style : Clarté Provençale — accordéon interactif
   ============================================================ */

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqData = [
  {
    category: "Informatique Générale",
    questions: [
      {
        id: "q1",
        question: "Par où commencer si je n'ai jamais utilisé un ordinateur ?",
        answer:
          "Commencez par les bases : allumer l'ordinateur, utiliser la souris et le clavier. Pratiquez 15 minutes par jour. Trouvez quelqu'un de patient pour vous guider.",
      },
      {
        id: "q2",
        question: "Quelle est la différence entre un ordinateur, une tablette et un smartphone ?",
        answer:
          "L'ordinateur est le plus puissant avec un grand écran. La tablette est légère et intuitive. Le smartphone est portable mais avec un petit écran. Pour débuter, un ordinateur est recommandé.",
      },
      {
        id: "q3",
        question: "Combien ça coûte d'avoir internet à la maison ?",
        answer:
          "Entre 20 et 50 euros par mois selon votre fournisseur. Vous pouvez aussi utiliser internet gratuitement à la bibliothèque ou à la mairie.",
      },
      {
        id: "q4",
        question: "Est-ce que mon ordinateur va devenir lent si je l'utilise beaucoup ?",
        answer:
          "Non, utiliser votre ordinateur ne le rend pas lent. Mais il peut ralentir si vous avez trop de fichiers ou de virus. Installez un antivirus et redémarrez régulièrement votre ordinateur.",
      },
    ],
  },
  {
    category: "Internet et Navigateurs",
    questions: [
      {
        id: "q5",
        question: "Qu'est-ce qu'un navigateur internet et lequel dois-je utiliser ?",
        answer:
          "Un navigateur est l'application pour consulter les sites web. Les plus populaires sont Google Chrome, Firefox et Microsoft Edge. Tous fonctionnent de la même façon.",
      },
      {
        id: "q6",
        question: "Comment je fais pour trouver quelque chose sur internet ?",
        answer:
          "Utilisez un moteur de recherche comme Google. Allez sur google.fr, tapez ce que vous cherchez, puis appuyez sur Entrée. Plus votre recherche est précise, meilleurs seront les résultats.",
      },
      {
        id: "q7",
        question: "Pourquoi certains sites sont lents à charger ?",
        answer:
          "Plusieurs raisons : votre connexion est lente, le site est surchargé, ou votre ordinateur n'a pas assez de mémoire. Attendez quelques secondes ou fermez les autres onglets.",
      },
      {
        id: "q8",
        question: "C'est quoi un 'onglet' dans le navigateur ?",
        answer:
          "Un onglet est comme une page de votre navigateur. Vous pouvez avoir plusieurs onglets ouverts en même temps. Cliquez sur le '+' pour ouvrir un nouvel onglet.",
      },
    ],
  },
  {
    category: "Les Emails",
    questions: [
      {
        id: "q9",
        question: "Comment je crée une adresse email ?",
        answer:
          "Vous pouvez créer une adresse email gratuitement avec Gmail, Outlook ou Yahoo. Allez sur gmail.com, cliquez sur 'Créer un compte', et suivez les instructions.",
      },
      {
        id: "q10",
        question: "Comment j'envoie un email ?",
        answer:
          "Connectez-vous à votre email, cliquez sur 'Composer', remplissez les champs (À, Sujet, Corps), écrivez votre message, puis cliquez sur 'Envoyer'.",
      },
      {
        id: "q11",
        question: "Comment je sais si j'ai reçu un email ?",
        answer:
          "Vous recevrez généralement une notification. Vous pouvez aussi vérifier en allant dans votre boîte de réception. Les nouveaux emails apparaissent en haut de la liste.",
      },
      {
        id: "q12",
        question: "Qu'est-ce qu'une pièce jointe et comment je l'envoie ?",
        answer:
          "Une pièce jointe est un fichier que vous attachez à votre email. Composez un email, cliquez sur 'Ajouter une pièce jointe', sélectionnez le fichier, puis cliquez sur 'Ouvrir'.",
      },
    ],
  },
  {
    category: "La Sécurité en Ligne",
    questions: [
      {
        id: "q13",
        question: "Comment je reconnais une arnaque sur internet ?",
        answer:
          "Si quelque chose semble trop beau pour être vrai, c'est probablement une arnaque. Ne cliquez jamais sur un lien dans un email suspect et ne donnez jamais vos informations personnelles.",
      },
      {
        id: "q14",
        question: "Comment je crée un bon mot de passe ?",
        answer:
          "Un bon mot de passe doit être long (12 caractères minimum) et contenir des lettres majuscules, minuscules, chiffres et symboles. Évitez d'utiliser votre date de naissance ou votre nom.",
      },
    ],
  },
  {
    category: "Paiement et Rendez-vous",
    questions: [
      {
        id: "q15",
        question: "Comment se fait le règlement des séances ?",
        answer:
          "Le règlement des séances s'effectue par virement bancaire. Ce mode de paiement simple et sécurisé permet d'assurer une comptabilité claire et évite toute manipulation d'espèces ou de chèques. Lors de la prise de rendez-vous, les informations nécessaires au règlement (IBAN) sont communiquées. Le rendez-vous est confirmé dès réception du virement. Il est recommandé d'effectuer la réservation 48 heures à l'avance afin de permettre une bonne organisation des accompagnements.",
      },
    ],
  },
  {
    category: "Les Réseaux Sociaux",
    questions: [
      {
        id: "q16",
        question: "Qu'est-ce que Facebook et comment ça marche ?",
        answer:
          "Facebook est un réseau social qui vous permet de rester en contact avec votre famille et vos amis. Nous vous montrerons comment créer un compte et comment l'utiliser lors d'une séance.",
      },
      {
        id: "q17",
        question: "Comment je partage une photo avec ma famille sur internet ?",
        answer:
          "Il existe plusieurs façons de partager des photos avec votre famille en ligne. Nous vous montrerons les options les plus simples et les plus sûres.",
      },
    ],
  },
  {
    category: "Retraite et Administration 2026",
    questions: [
      {
        id: "q18",
        question: "Quel est l'âge légal de départ en retraite en 2026 ?",
        answer:
          "Suite à la suspension de la réforme, l'âge légal pour les personnes nées entre 1964 et 1968 est fixé entre 62 ans et 9 mois et 63 ans et 9 mois. Le passage aux 64 ans ne concerne désormais que les générations nées à partir de 1969.",
      },
      {
        id: "q19",
        question: "Ma pension de retraite a-t-elle augmenté en 2026 ?",
        answer:
          "Oui, les pensions de retraite de base ont été revalorisées de 0,9 % au 1er janvier 2026 pour compenser l'inflation. Cette hausse est visible sur votre paiement de février.",
      },
      {
        id: "q20",
        question: "Puis-je travailler tout en étant à la retraite en 2026 ?",
        answer:
          "Oui, le cumul emploi-retraite est possible. Il est même totalement libéralisé (sans plafond de revenus) si vous avez plus de 67 ans ou si vous bénéficiez du taux plein. Depuis 2026, cette activité peut vous ouvrir des droits pour une seconde pension.",
      },
    ],
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
      {/* ── HERO ── */}
      <section
        className="relative py-20"
        style={{
          background: "linear-gradient(135deg, oklch(0.42 0.06 145) 0%, oklch(0.50 0.07 145) 100%)",
        }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl md:text-6xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Questions Fréquentes
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Trouvez les réponses aux questions les plus courantes sur le numérique pour les seniors.
          </p>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="py-20">
        <div className="container max-w-3xl">
          {/* Barre de recherche */}
          <div className="mb-12">
            <div
              className="relative"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                border: "1px solid oklch(0.88 0.03 80)",
                borderRadius: "12px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Search size={20} style={{ color: "oklch(0.42 0.06 145)" }} />
              <input
                type="text"
                placeholder="Cherchez une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "16px",
                  color: "oklch(0.22 0.02 65)",
                }}
              />
            </div>
          </div>

          {/* Accordéon FAQ */}
          <div className="space-y-4">
            {filteredData.map((category) => (
              <div key={category.category}>
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: "oklch(0.42 0.06 145)",
                  }}
                >
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((question) => (
                    <div
                      key={question.id}
                      style={{
                        backgroundColor: "oklch(0.98 0.01 80)",
                        border: "1px solid oklch(0.88 0.03 80)",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === question.id ? null : question.id)
                        }
                        style={{
                          width: "100%",
                          padding: "16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor:
                            expandedId === question.id
                              ? "oklch(0.95 0.02 145)"
                              : "oklch(0.98 0.01 80)",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "oklch(0.22 0.02 65)",
                          textAlign: "left",
                        }}
                      >
                        <span>{question.question}</span>
                        <ChevronDown
                          size={20}
                          style={{
                            color: "oklch(0.42 0.06 145)",
                            transform:
                              expandedId === question.id ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            flexShrink: 0,
                          }}
                        />
                      </button>
                      {expandedId === question.id && (
                        <div
                          style={{
                            padding: "16px",
                            backgroundColor: "oklch(0.98 0.01 80)",
                            borderTop: "1px solid oklch(0.88 0.03 80)",
                            color: "oklch(0.42 0.02 65)",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "15px",
                            lineHeight: "1.6",
                          }}
                        >
                          {question.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredData.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "oklch(0.42 0.02 65)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <p>Aucune question ne correspond à votre recherche.</p>
              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                N'hésitez pas à nous contacter pour vos autres questions !
              </p>
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              marginTop: "40px",
              padding: "24px",
              backgroundColor: "oklch(0.95 0.02 145)",
              border: "1px solid oklch(0.85 0.03 145)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.42 0.02 65)",
                marginBottom: "16px",
              }}
            >
              Vous n'avez pas trouvé votre réponse ?
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                backgroundColor: "oklch(0.42 0.06 145)",
                color: "oklch(0.97 0.01 80)",
                textDecoration: "none",
                borderRadius: "8px",
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: "600",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              Contactez-moi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
