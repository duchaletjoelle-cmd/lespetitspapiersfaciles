import React, { useState } from 'react';
import { CheckCircle2, Circle, Briefcase, FileText, Heart, Lock, TrendingUp } from 'lucide-react';
import { useSEOHead } from '../components/SEOHead';

const categories = [
  {
    id: 'papiers-quotidiens',
    title: 'Papiers du Quotidien',
    icon: '📄',
    description: 'Organisation et classement de vos documents essentiels',
    tasks: [
      { id: 'courriers', label: 'Trier et classer les courriers', emoji: '✉️' },
      { id: 'factures', label: 'Organiser les factures (eau, électricité, téléphone)', emoji: '💡' },
      { id: 'quittances', label: 'Archiver les quittances de loyer', emoji: '🏠' },
      { id: 'contrats', label: 'Centraliser les contrats d\'assurance', emoji: '📋' },
      { id: 'garanties', label: 'Classer les garanties et bons d\'achat', emoji: '🎫' },
    ]
  },
  {
    id: 'demarches-en-ligne',
    title: 'Démarches en Ligne',
    icon: '💻',
    description: 'Gestion de vos comptes administratifs numériques',
    tasks: [
      { id: 'impots', label: 'Accéder à votre espace Impôts.gouv', emoji: '📊' },
      { id: 'ameli', label: 'Consulter votre dossier Ameli (Sécurité Sociale)', emoji: '🏥' },
      { id: 'caf', label: 'Gérer votre compte CAF en ligne', emoji: '👨‍👩‍👧‍👦' },
      { id: 'retraite', label: 'Suivre votre dossier retraite (Agirc-Arrco, CNAV)', emoji: '📈' },
      { id: 'banque', label: 'Consulter vos relevés bancaires en ligne', emoji: '🏦' },
      { id: 'mutuelle', label: 'Accéder à votre espace mutuelle', emoji: '💳' },
    ]
  },
  {
    id: 'organisation-budget',
    title: 'Organisation & Budget',
    icon: '💰',
    description: 'Suivi financier et gestion budgétaire',
    tasks: [
      { id: 'budget', label: 'Établir un budget mensuel', emoji: '📝' },
      { id: 'depenses', label: 'Suivre vos dépenses régulières', emoji: '📉' },
      { id: 'economie', label: 'Identifier les économies possibles', emoji: '🎯' },
      { id: 'abonnements', label: 'Résilier les abonnements inutiles', emoji: '❌' },
      { id: 'virements', label: 'Mettre en place des virements automatiques', emoji: '🔄' },
      { id: 'epargne', label: 'Organiser une épargne régulière', emoji: '🏦' },
    ]
  },
  {
    id: 'sante-prevoyance',
    title: 'Santé & Prévoyance',
    icon: '❤️',
    description: 'Gestion de vos dossiers médicaux et administratifs',
    tasks: [
      { id: 'remboursements', label: 'Demander les remboursements de soins', emoji: '💊' },
      { id: 'ordonnances', label: 'Organiser vos ordonnances et prescriptions', emoji: '📋' },
      { id: 'vaccins', label: 'Mettre à jour votre carnet de vaccinations', emoji: '💉' },
      { id: 'mdph', label: 'Constituer un dossier MDPH (si nécessaire)', emoji: '🏢' },
      { id: 'aah', label: 'Demander l\'Allocation Adulte Handicapé', emoji: '♿' },
      { id: 'prevoyance', label: 'Vérifier votre couverture d\'assurance prévoyance', emoji: '🛡️' },
    ]
  },
  {
    id: 'succession-patrimoine',
    title: 'Succession & Patrimoine',
    icon: '🏛️',
    description: 'Préparation et gestion du patrimoine',
    tasks: [
      { id: 'testament', label: 'Préparer ou mettre à jour votre testament', emoji: '📜' },
      { id: 'mandat', label: 'Établir un mandat de protection future', emoji: '✍️' },
      { id: 'inventaire', label: 'Faire l\'inventaire de vos biens', emoji: '📦' },
      { id: 'actes', label: 'Centraliser les actes notariés', emoji: '🔐' },
      { id: 'beneficiaires', label: 'Vérifier les bénéficiaires de vos contrats', emoji: '👥' },
    ]
  },
  {
    id: 'numerique-securite',
    title: 'Numérique & Sécurité',
    icon: '🔒',
    description: 'Protection de vos données et identité numérique',
    tasks: [
      { id: 'mots-de-passe', label: 'Créer des mots de passe sécurisés', emoji: '🔑' },
      { id: 'authentification', label: 'Activer l\'authentification à deux facteurs', emoji: '📱' },
      { id: 'donnees-personnelles', label: 'Protéger vos données personnelles', emoji: '🛡️' },
      { id: 'arnaque', label: 'Apprendre à reconnaître les arnaques en ligne', emoji: '⚠️' },
      { id: 'sauvegarde', label: 'Sauvegarder vos documents importants', emoji: '💾' },
      { id: 'cnil', label: 'Exercer vos droits auprès de la CNIL', emoji: '⚖️' },
    ]
  }
];

export default function ChecklistAdministrativePage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(cat => [cat.id, true]))
  );

  useSEOHead({
    title: 'Checklist Administrative Complète | Les Petits Papiers Faciles',
    description: 'Découvrez notre liste complète de tâches administratives à gérer. Organisez vos papiers, démarches en ligne, budget et sécurité numérique avec notre aide.',
    url: 'https://lespetitspapiersfaciles.fr/checklist-administrative',
    keywords: 'checklist administrative, organisation papiers, démarches administratives, gestion budget',
    type: 'website',
  });

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const totalTasks = categories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / totalTasks) * 100);

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'oklch(0.98 0.01 80)' }}>
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'oklch(0.45 0.08 145)',
            }}
          >
            Checklist Administrative Complète
          </h1>
          <p
            className="text-xl mb-8"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'oklch(0.30 0.07 145 / 0.85)',
            }}
          >
            Organisez tous vos papiers et démarches en un seul endroit
          </p>

          {/* Overall Progress */}
          <div className="bg-white rounded-lg p-6 shadow-sm inline-block w-full md:w-auto">
            <div className="flex justify-between items-center mb-3">
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'oklch(0.30 0.07 145)',
                  fontWeight: 600,
                }}
              >
                Progression Globale
              </span>
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: 'oklch(0.45 0.08 145)',
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}
              >
                {completionPercentage}%
              </span>
            </div>
            <div
              className="w-full h-4 rounded-full overflow-hidden"
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
            <p
              className="text-sm mt-3"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: 'oklch(0.30 0.07 145 / 0.75)',
              }}
            >
              {checkedCount} tâche{checkedCount > 1 ? 's' : ''} complétée{checkedCount > 1 ? 's' : ''} sur {totalTasks}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryChecked = category.tasks.filter(task => checkedItems[task.id]).length;
            const categoryPercentage = Math.round((categoryChecked / category.tasks.length) * 100);
            const isExpanded = expandedCategories[category.id];

            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div style={{ fontSize: '32px' }}>{category.icon}</div>
                    <div>
                      <h2
                        className="text-2xl font-semibold"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          color: 'oklch(0.45 0.08 145)',
                        }}
                      >
                        {category.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          color: 'oklch(0.30 0.07 145 / 0.75)',
                          fontSize: '0.95rem'
                        }}
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div
                      className="text-right"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: 'oklch(0.45 0.08 145)',
                        fontWeight: 600,
                      }}
                    >
                      <div>{categoryPercentage}%</div>
                      <div style={{ fontSize: '0.85rem', color: 'oklch(0.30 0.07 145 / 0.75)' }}>
                        {categoryChecked}/{category.tasks.length}
                      </div>
                    </div>
                    <div
                      style={{
                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.3s',
                        fontSize: '24px'
                      }}
                    >
                      ▼
                    </div>
                  </div>
                </button>

                {/* Category Tasks */}
                {isExpanded && (
                  <div
                    className="px-6 pb-6 space-y-2"
                    style={{ borderTop: '1px solid oklch(0.45 0.08 145 / 0.15)' }}
                  >
                    {category.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleItem(task.id)}
                        className="w-full flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-gray-50"
                        style={{
                          backgroundColor: checkedItems[task.id] ? 'oklch(0.45 0.08 145 / 0.08)' : 'transparent',
                          borderLeft: `4px solid ${checkedItems[task.id] ? 'oklch(0.45 0.08 145)' : 'transparent'}`,
                        }}
                      >
                        <div style={{ fontSize: '20px', minWidth: '24px' }}>{task.emoji}</div>
                        <div className="flex-1 text-left">
                          <span
                            style={{
                              fontFamily: "'Source Sans 3', sans-serif",
                              color: checkedItems[task.id] ? 'oklch(0.45 0.08 145)' : 'oklch(0.30 0.07 145)',
                              textDecoration: checkedItems[task.id] ? 'line-through' : 'none',
                              fontWeight: checkedItems[task.id] ? 600 : 500,
                            }}
                          >
                            {task.label}
                          </span>
                        </div>
                        {checkedItems[task.id] ? (
                          <CheckCircle2 size={24} style={{ color: 'oklch(0.45 0.08 145)', flexShrink: 0 }} />
                        ) : (
                          <Circle size={24} style={{ color: 'oklch(0.45 0.08 145 / 0.30)', flexShrink: 0 }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div
          className="mt-16 p-8 rounded-lg"
          style={{
            backgroundColor: 'oklch(0.90 0.04 145 / 0.50)',
            border: '2px solid oklch(0.45 0.08 145 / 0.30)',
          }}
        >
          <h3
            className="text-2xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'oklch(0.45 0.08 145)',
            }}
          >
            💡 Besoin d'aide pour organiser vos papiers ?
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'oklch(0.30 0.07 145)',
              lineHeight: 1.8,
            }}
          >
            Cette checklist vous montre l'étendue des tâches administratives que je peux gérer pour vous. 
            Que vous ayez du mal à vous y retrouver, que vous manquiez de temps ou que vous ayez besoin d'être 
            accompagné(e) dans vos démarches en ligne, je suis là pour vous aider.
          </p>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: 'oklch(0.30 0.07 145)',
              lineHeight: 1.8,
            }}
          >
            <strong>Une séance coûte 42€</strong> (21€ après crédit d'impôt 50%). 
            Contactez-moi pour discuter de vos besoins spécifiques.
          </p>
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
            📅 Prendre un rendez-vous
          </a>
        </div>
      </div>
    </div>
  );
}
