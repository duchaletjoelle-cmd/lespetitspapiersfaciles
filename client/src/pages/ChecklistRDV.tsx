import React, { useState } from 'react';
import { CheckCircle2, Circle, FileText, DollarSign, AlertCircle } from 'lucide-react';

export default function ChecklistRDVPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [serviceType, setServiceType] = useState<'admin' | 'digital'>('admin');
  const [estimatedBudget, setEstimatedBudget] = useState(42);

  const adminChecklist = [
    { id: 'impots', label: 'Avis d\'imposition ou déclaration fiscale', icon: '📄' },
    { id: 'retraite', label: 'Documents de retraite (relevé, notification)', icon: '📋' },
    { id: 'allocations', label: 'Courriers de la CAF ou allocations', icon: '💌' },
    { id: 'ameli', label: 'Informations Ameli (numéro sécu)', icon: '🏥' },
    { id: 'banque', label: 'Coordonnées bancaires (si nécessaire)', icon: '🏦' },
    { id: 'identite', label: 'Pièce d\'identité (pour vérification)', icon: '🆔' },
    { id: 'courriers', label: 'Courriers administratifs à traiter', icon: '📮' },
  ];

  const digitalChecklist = [
    { id: 'appareil', label: 'Votre smartphone ou tablette', icon: '📱' },
    { id: 'wifi', label: 'Accès Wi-Fi à votre domicile', icon: '📡' },
    { id: 'email', label: 'Votre adresse email (ou en créer une)', icon: '✉️' },
    { id: 'identifiants', label: 'Vos identifiants de sites (si vous les avez)', icon: '🔐' },
    { id: 'questions', label: 'Liste de vos questions ou difficultés', icon: '❓' },
    { id: 'objectifs', label: 'Vos objectifs (apprendre quoi ?)', icon: '🎯' },
  ];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleServiceChange = (type: 'admin' | 'digital') => {
    setServiceType(type);
    setCheckedItems({});
  };

  const checklist = serviceType === 'admin' ? adminChecklist : digitalChecklist;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / checklist.length) * 100);
  const creditImpotAmount = Math.round(estimatedBudget * 0.5);
  const realCost = estimatedBudget - creditImpotAmount;

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'oklch(0.98 0.01 80)' }}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'oklch(0.45 0.08 145)',
            }}
          >
            Préparez votre Rendez-vous
          </h1>
          <p
            className="text-lg"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'oklch(0.30 0.07 145 / 0.85)',
            }}
          >
            Checklist & Budget pour bien démarrer
          </p>
        </div>

        {/* Service Type Selector */}
        <div className="mb-8 flex gap-4 justify-center">
          <button
            onClick={() => handleServiceChange('admin')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              serviceType === 'admin'
                ? 'text-white shadow-lg'
                : 'text-gray-700 bg-white border-2'
            }`}
            style={{
              backgroundColor: serviceType === 'admin' ? 'oklch(0.45 0.08 145)' : 'white',
              borderColor: serviceType === 'admin' ? 'oklch(0.45 0.08 145)' : 'oklch(0.45 0.08 145 / 0.30)',
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            📋 Aide Administrative
          </button>
          <button
            onClick={() => handleServiceChange('digital')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              serviceType === 'digital'
                ? 'text-white shadow-lg'
                : 'text-gray-700 bg-white border-2'
            }`}
            style={{
              backgroundColor: serviceType === 'digital' ? 'oklch(0.45 0.08 145)' : 'white',
              borderColor: serviceType === 'digital' ? 'oklch(0.45 0.08 145)' : 'oklch(0.45 0.08 145 / 0.30)',
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            💻 Accompagnement Numérique
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: 'oklch(0.30 0.07 145)',
                fontWeight: 600,
              }}
            >
              Préparation : {completionPercentage}%
            </span>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: 'oklch(0.45 0.08 145)',
              }}
            >
              {checkedCount} / {checklist.length}
            </span>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: 'oklch(0.45 0.08 145 / 0.15)' }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${completionPercentage}%`,
                backgroundColor: 'oklch(0.45 0.08 145)',
              }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'oklch(0.45 0.08 145)',
            }}
          >
            {serviceType === 'admin' ? '📋 Checklist Administrative' : '💻 Checklist Numérique'}
          </h2>

          <div className="space-y-3">
            {checklist.map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-gray-50"
                style={{
                  backgroundColor: checkedItems[item.id] ? 'oklch(0.45 0.08 145 / 0.08)' : 'transparent',
                  borderLeft: `4px solid ${checkedItems[item.id] ? 'oklch(0.45 0.08 145)' : 'transparent'}`,
                }}
              >
                <div style={{ fontSize: '24px' }}>{item.icon}</div>
                <div className="flex-1 text-left">
                  <span
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: checkedItems[item.id] ? 'oklch(0.45 0.08 145)' : 'oklch(0.30 0.07 145)',
                      textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                      fontWeight: checkedItems[item.id] ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                {checkedItems[item.id] ? (
                  <CheckCircle2 size={24} style={{ color: 'oklch(0.45 0.08 145)' }} />
                ) : (
                  <Circle size={24} style={{ color: 'oklch(0.45 0.08 145 / 0.30)' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2
            className="text-2xl font-semibold mb-6 flex items-center gap-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'oklch(0.45 0.08 145)',
            }}
          >
            <DollarSign size={28} />
            Budget & Crédit d'Impôt
          </h2>

          <div className="space-y-4">
            {/* Budget Input */}
            <div>
              <label
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'oklch(0.30 0.07 145)',
                  fontWeight: 600,
                }}
              >
                Nombre de séances estimées :
              </label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={Math.round(estimatedBudget / 42)}
                  onChange={(e) => setEstimatedBudget(parseInt(e.target.value) * 42)}
                  className="px-4 py-2 border-2 rounded-lg"
                  style={{
                    borderColor: 'oklch(0.45 0.08 145 / 0.30)',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: 'oklch(0.30 0.07 145 / 0.85)',
                  }}
                >
                  séance(s) × 42€
                </span>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'oklch(0.45 0.08 145 / 0.08)',
                border: '2px solid oklch(0.45 0.08 145 / 0.20)',
              }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'oklch(0.30 0.07 145)',
                    }}
                  >
                    Coût total :
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'oklch(0.30 0.07 145)',
                    }}
                  >
                    {estimatedBudget}€
                  </span>
                </div>

                <div
                  className="border-t-2"
                  style={{ borderColor: 'oklch(0.45 0.08 145 / 0.20)' }}
                />

                <div className="flex justify-between items-center">
                  <span
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'oklch(0.45 0.08 145)',
                      fontWeight: 600,
                    }}
                  >
                    Crédit d'impôt (50%) :
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: 'oklch(0.45 0.08 145)',
                    }}
                  >
                    -{creditImpotAmount}€
                  </span>
                </div>

                <div
                  className="border-t-2 pt-3"
                  style={{ borderColor: 'oklch(0.45 0.08 145 / 0.20)' }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'oklch(0.45 0.08 145)',
                      }}
                    >
                      Coût réel pour vous :
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'oklch(0.45 0.08 145)',
                      }}
                    >
                      {realCost}€
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div
              className="p-4 rounded-lg flex gap-3"
              style={{
                backgroundColor: 'oklch(0.90 0.04 145 / 0.50)',
                border: '1px solid oklch(0.45 0.08 145 / 0.30)',
              }}
            >
              <AlertCircle size={20} style={{ color: 'oklch(0.45 0.08 145)', flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'oklch(0.30 0.07 145)',
                  fontSize: '0.95rem',
                }}
              >
                Le crédit d'impôt de 50% s'applique automatiquement. Vous recevrez une facture conforme aux normes SAP pour demander votre remboursement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/rendez-vous"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{
              backgroundColor: 'oklch(0.45 0.08 145)',
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Prendre un rendez-vous
          </a>
        </div>
      </div>
    </div>
  );
}
