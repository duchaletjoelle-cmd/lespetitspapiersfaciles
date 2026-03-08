/* ============================================================
   Composant Testimonials — Les Petits Papiers Faciles
   Section témoignages clients pour renforcer la crédibilité
   ============================================================ */

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Revest",
    company: "SUPRANA",
    text: "Je vous remercie pour votre réactivité. Bonne journée.",
    rating: 5,
    context: "Aide administrative - Facture ENDIS",
  },
  {
    id: 2,
    name: "Olivier Carozzo",
    text: "Super ! En tous les cas, merci beaucoup pour le temps pris pour m'aider ainsi que votre gentillesse. Ça a peut-être pu me rendre la tâche plus facile, que je pense à remercier chaleureusement les personnes humaines comme vous :)",
    rating: 5,
    context: "Aide administrative - Dossier ENDIS",
  },
  {
    id: 3,
    name: "David Pierron",
    text: "Hoooo... ça c'est du rapide ! Grand Merci Sandra ! Je préviens dès que nouveau devis sera fait ..",
    rating: 5,
    context: "Aide administrative - Demande urgente",
  },
  {
    id: 4,
    name: "Christine Surry",
    text: "Au top Sandra ! merci !",
    rating: 5,
    context: "Aide administrative - Réclamation",
  },
  {
    id: 5,
    name: "Ludovic Rubino",
    text: "Tu gères merci ☺ Bonne journée",
    rating: 5,
    context: "Aide administrative - Dossier urgent",
  },
  {
    id: 6,
    name: "Gérald",
    text: "Merci pour votre sérieux madame. Cordialement",
    rating: 5,
    context: "Aide administrative - Changement de dossier",
  },
];

function TestimonialCard({
  name,
  company,
  text,
  rating,
  context,
}: {
  name: string;
  company?: string;
  text: string;
  rating: number;
  context: string;
}) {
  return (
    <div
      className="p-6 rounded-lg shadow-md h-full flex flex-col"
      style={{
        backgroundColor: "oklch(0.97 0.01 80)",
        border: "1px solid oklch(0.90 0.02 80)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill="oklch(0.80 0.05 145)"
            style={{ color: "oklch(0.80 0.05 145)" }}
          />
        ))}
      </div>

      {/* Quote Icon */}
      <Quote
        size={24}
        className="mb-3 opacity-30"
        style={{ color: "oklch(0.42 0.06 145)" }}
      />

      {/* Testimonial Text */}
      <p
        className="text-base mb-6 flex-grow"
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          color: "oklch(0.50 0.05 145)",
          lineHeight: "1.6",
          fontStyle: "italic",
        }}
      >
        "{text}"
      </p>

      {/* Author Info */}
      <div className="border-t pt-4" style={{ borderColor: "oklch(0.90 0.02 80)" }}>
        <p
          className="font-semibold text-sm"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "oklch(0.30 0.07 145)",
          }}
        >
          {name}
          {company && <span style={{ color: "oklch(0.42 0.06 145)" }}> • {company}</span>}
        </p>
        <p
          className="text-xs mt-1"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "oklch(0.60 0.04 145)",
          }}
        >
          {context}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "oklch(0.97 0.01 80)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.30 0.07 145)",
            }}
          >
            Ce que disent mes clients
          </h2>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.50 0.05 145)",
            }}
          >
            Des retours authentiques de clients satisfaits qui ont fait confiance à mes services d'aide administrative et d'accompagnement numérique.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              company={testimonial.company}
              text={testimonial.text}
              rating={testimonial.rating}
              context={testimonial.context}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div
            className="inline-block px-6 py-4 rounded-lg"
            style={{
              backgroundColor: "oklch(0.93 0.02 80)",
              border: "2px solid oklch(0.80 0.05 145)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.30 0.07 145)",
              }}
            >
              ✓ Tous les avis sont des retours authentiques de clients réels
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
