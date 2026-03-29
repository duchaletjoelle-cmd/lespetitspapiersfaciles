export default function Retraite2026() {
  const tableData = [
    { naissance: "1961", age: "62 ans et 3 mois" },
    { naissance: "1962", age: "62 ans et 6 mois" },
    { naissance: "1963", age: "62 ans et 9 mois" },
    { naissance: "1964", age: "63 ans" },
    { naissance: "1965", age: "63 ans et 3 mois" },
    { naissance: "1966", age: "63 ans et 6 mois" },
    { naissance: "1967", age: "63 ans et 9 mois" },
    { naissance: "1968 et après", age: "64 ans" },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-rose-700 mb-2">
          Retraite 2026
        </h1>
        <p className="text-center text-gray-500 mb-10 text-sm uppercase tracking-wide">
          Les petits papiers faciles
        </p>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-rose-800 mb-3">
            Quel est l'âge légal de départ en retraite en 2026 ?
          </h2>
          <p className="text-gray-700 mb-3">
            L'âge légal dépend de votre année de naissance.
          </p>
          <p className="text-gray-700 mb-2">
            👉 En 2026, il se situe entre <strong>62 ans et 9 mois</strong> et <strong>63 ans et 9 mois</strong>.
          </p>
          <p className="text-gray-700">
            👉 La réforme prévoyant un passage à 64 ans est actuellement <strong>suspendue</strong> pour certaines générations et pourrait évoluer dans les années à venir.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-rose-700 mb-4">
          Âge légal de départ à la retraite (réforme en cours)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-rose-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-rose-700 text-white">
                <th className="text-left px-6 py-3 font-semibold">Année de naissance</th>
                <th className="text-left px-6 py-3 font-semibold">Âge légal de départ</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-rose-50"}
                >
                  <td className="px-6 py-3 text-gray-700">{row.naissance}</td>
                  <td className="px-6 py-3 font-medium text-rose-800">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-6 text-sm text-gray-600">
          <p className="mb-1">ℹ️ <strong>L'âge légal</strong> correspond à l'âge minimum pour demander sa retraite.</p>
          <p>ℹ️ Pour une retraite à <strong>taux plein</strong>, le nombre de trimestres validés reste déterminant.</p>
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">
          Source : législation française en vigueur — susceptible d'évoluer.
        </p>
      </div>
    </div>
  );
}
