const TESTIMONIALS = [
  {
    text: "Sandra m'a aidée à remplir mon dossier de retraite. Elle a été patiente et très claire dans ses explications. Je me suis sentie accompagnée du début à la fin.",
    author: "Michèle, 63 ans",
    location: "Hyères",
  },
  {
    text: "Grâce à Sandra, j'ai enfin compris comment utiliser Ameli et faire mes démarches en ligne. Elle prend le temps d'expliquer sans jamais me faire sentir perdue.",
    author: "Jean-Pierre, 71 ans",
    location: "Carqueiranne",
  },
  {
    text: "Je recommande vivement Les Petits Papiers Faciles. Sandra est sérieuse, discrète et vraiment efficace. Mes papiers sont enfin en ordre !",
    author: "Françoise, 58 ans",
    location: "Le Pradet",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 reveal" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
          >
            Ce que disent mes clients
          </h2>
          <p className="text-lg text-gray-500 italic">Des témoignages authentiques de personnes accompagnées</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-5 h-5" fill="oklch(0.72 0.10 82)" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic flex-1">"{t.text}"</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="font-semibold" style={{ color: "oklch(0.30 0.04 72)" }}>{t.author}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
