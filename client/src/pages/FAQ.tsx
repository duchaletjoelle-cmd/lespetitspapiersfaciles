/* ============================================================
   Page FAQ — Les Petits Papiers Faciles
   Questions fréquentes sur le numérique pour les seniors
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Search } from "lucide-react";

// Données FAQ
const FAQ_CATEGORIES = [
  {
    category: "Questions Générales sur l'Informatique",
    questions: [
      {
        id: "q1",
        question: "Par où commencer si je n'ai jamais utilisé un ordinateur ?",
        answer:
          "Commencez par les bases absolues : allumer l'ordinateur, utiliser la souris, comprendre le clavier. Ne cherchez pas à tout apprendre d'un coup. Chaque jour, pratiquez une nouvelle action simple pendant 15 minutes. Après une semaine, vous saurez naviguer sur internet. Après un mois, vous pourrez envoyer des emails. L'important est la régularité, pas la vitesse. Trouvez quelqu'un de patient — un ami, un membre de la famille ou un professionnel — qui puisse vous guider sans vous juger.",
      },
      {
        id: "q2",
        question:
          "Quelle est la différence entre un ordinateur, une tablette et un smartphone ?",
        answer:
          "Ce sont trois appareils différents mais complémentaires. L'ordinateur (de bureau ou portable) est le plus puissant et le plus facile pour les débutants car l'écran est grand et la souris est plus précise. La tablette est plus légère et intuitive, parfaite pour lire, regarder des vidéos ou consulter ses emails au lit. Le smartphone est le plus portable mais l'écran est petit. Pour débuter, un ordinateur portable ou de bureau est recommandé.",
      },
      {
        id: "q3",
        question: "Combien ça coûte d'avoir internet à la maison ?",
        answer:
          "L'accès à internet coûte généralement entre 20 et 50 euros par mois, selon votre fournisseur (Orange, Bouygues, Free, SFR, etc.). Vous pouvez aussi utiliser internet gratuitement à la bibliothèque, à la mairie, dans certains cafés ou chez des amis. Si vous avez un smartphone avec un forfait internet, vous pouvez aussi vous connecter en wifi public.",
      },
      {
        id: "q4",
        question:
          "Est-ce que mon ordinateur va devenir lent si je l'utilise beaucoup ?",
        answer:
          "Non, utiliser votre ordinateur ne le rend pas lent. Cependant, il peut ralentir si vous téléchargez trop de fichiers, si vous avez trop d'applications ouvertes en même temps, ou si vous avez un virus. Pour garder votre ordinateur rapide : fermez les applications que vous n'utilisez pas, supprimez les fichiers inutiles régulièrement, mettez à jour votre antivirus, et redémarrez votre ordinateur une fois par semaine.",
      },
    ],
  },
  {
    category: "Questions sur Internet et les Navigateurs",
    questions: [
      {
        id: "q5",
        question:
          "Qu'est-ce qu'un navigateur internet et lequel dois-je utiliser ?",
        answer:
          "Un navigateur est l'application qui vous permet de consulter les sites web. Les plus populaires sont Google Chrome (gratuit, facile à utiliser), Firefox (gratuit, très sûr), et Microsoft Edge (gratuit, inclus dans Windows). Pour débuter, utilisez celui qui est déjà installé sur votre ordinateur. Tous fonctionnent de la même façon : vous tapez l'adresse d'un site web dans la barre en haut, et le site s'affiche.",
      },
      {
        id: "q6",
        question: "Comment je fais pour trouver quelque chose sur internet ?",
        answer:
          "Utilisez un moteur de recherche comme Google. Allez sur google.fr, tapez ce que vous cherchez dans la case de recherche (par exemple 'météo Hyères' ou 'recette tarte aux pommes'), puis appuyez sur Entrée. Google vous affichera une liste de résultats. Cliquez sur celui qui vous intéresse. Plus votre recherche est précise, meilleurs seront les résultats.",
      },
      {
        id: "q7",
        question: "Pourquoi certains sites sont lents à charger ?",
        answer:
          "Plusieurs raisons peuvent ralentir un site : votre connexion internet est lente, le site est très populaire et surchargé, ou votre ordinateur n'a pas assez de mémoire. Attendez quelques secondes — généralement, le site finit par charger. Si c'est toujours lent, essayez de fermer les autres onglets ou applications ouvertes, ou redémarrez votre ordinateur.",
      },
      {
        id: "q8",
        question: "C'est quoi un 'onglet' dans le navigateur ?",
        answer:
          "Un onglet est comme une page de votre navigateur. Vous pouvez avoir plusieurs onglets ouverts en même temps. Par exemple, vous pouvez avoir un onglet avec votre email, un autre avec un article de journal, et un troisième avec un site de recettes — tout en même temps. Pour ouvrir un nouvel onglet, cliquez sur le '+' à côté des onglets existants, ou appuyez sur Ctrl+T.",
      },
    ],
  },
  {
    category: "Questions sur les Emails",
    questions: [
      {
        id: "q9",
        question: "Comment je crée une adresse email ?",
        answer:
          "Vous pouvez créer une adresse email gratuitement avec Gmail (Google), Outlook (Microsoft), ou Yahoo. Allez sur gmail.com, cliquez sur 'Créer un compte', et suivez les instructions. Vous devrez choisir un nom d'utilisateur (par exemple 'marie.dupont@gmail.com') et un mot de passe. Notez bien votre adresse email et votre mot de passe — vous en aurez besoin pour vous connecter.",
      },
      {
        id: "q10",
        question: "Comment j'envoie un email ?",
        answer:
          "Connectez-vous à votre email (gmail.com, outlook.com, etc.), cliquez sur 'Composer' ou 'Nouveau message', puis remplissez les champs : À (l'adresse email du destinataire), Sujet (le titre de votre message), et le Corps (votre message). Écrivez votre message, puis cliquez sur 'Envoyer'. Votre email partira instantanément.",
      },
      {
        id: "q11",
        question: "Comment je sais si j'ai reçu un email ?",
        answer:
          "Quand vous recevez un email, vous verrez généralement une notification (un petit message qui apparaît sur votre écran ou dans votre navigateur). Vous pouvez aussi vérifier en allant dans votre boîte de réception. Les nouveaux emails apparaissent en haut de la liste. Si vous ne voyez pas vos emails, vérifiez que vous êtes connecté à votre compte email.",
      },
      {
        id: "q12",
        question:
          "Qu'est-ce qu'une pièce jointe et comment je l'envoie ?",
        answer:
          "Une pièce jointe est un fichier (une photo, un document, une vidéo) que vous attachez à votre email. Pour envoyer une pièce jointe, composez un email normalement, puis cliquez sur le bouton 'Ajouter une pièce jointe' ou 'Joindre un fichier' (généralement représenté par un trombone). Sélectionnez le fichier que vous voulez envoyer sur votre ordinateur, puis cliquez sur 'Ouvrir'.",
      },
    ],
  },
  {
    category: "Questions sur la Sécurité",
    questions: [
      {
        id: "q13",
        question:
          "Comment je reconnais un email de phishing (arnaque) ?",
        answer:
          "Un email de phishing prétend venir d'une organisation de confiance (votre banque, Amazon, etc.) mais c'est une arnaque. Voici les signes d'alerte : l'email vous demande de cliquer sur un lien pour 'vérifier votre compte', il crée une urgence ('Votre compte sera fermé dans 24h'), l'adresse email de l'expéditeur est légèrement différente de l'original, ou il vous demande des informations personnelles. Règle d'or : une vraie banque ne vous demandera JAMAIS votre mot de passe par email.",
      },
      {
        id: "q14",
        question:
          "Est-ce que c'est dangereux de cliquer sur des liens dans les emails ?",
        answer:
          "Cliquer sur un lien n'est pas dangereux en soi, mais vous devez être vigilant. Avant de cliquer, vérifiez que l'email vient d'une source de confiance. Survolez le lien avec votre souris (sans cliquer) pour voir l'adresse réelle. Si l'adresse semble bizarre ou ne correspond pas à ce que vous attendez, ne cliquez pas.",
      },
      {
        id: "q15",
        question: "Comment je crée un bon mot de passe ?",
        answer:
          "Un bon mot de passe doit avoir au moins 12 caractères, mélanger majuscules, minuscules, chiffres et symboles, et ne pas contenir d'informations personnelles (date de naissance, nom). Exemple faible : 'Marie1960' (trop court, contient des infos personnelles). Exemple fort : 'Hyères#2024@Soleil!' (long, mélangé, unique).",
      },
      {
        id: "q16",
        question:
          "Est-ce que je dois utiliser un gestionnaire de mots de passe ?",
        answer:
          "Oui, c'est recommandé. Mémoriser des dizaines de mots de passe forts est impossible. Un gestionnaire de mots de passe comme Bitwarden (gratuit) ou 1Password (payant) stocke tous vos mots de passe de manière sécurisée. Vous n'avez besoin de mémoriser qu'un seul mot de passe maître. C'est plus sûr que d'écrire vos mots de passe sur un papier.",
      },
      {
        id: "q17",
        question:
          "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
        answer:
          "L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire. Quand vous vous connectez à un compte, vous devez d'abord entrer votre mot de passe, puis un code qui vous est envoyé par SMS ou généré par une application. Même si quelqu'un connaît votre mot de passe, il ne peut pas accéder à votre compte sans ce deuxième code.",
      },
      {
        id: "q18",
        question:
          "Comment je sais si un site web est sûr avant d'y entrer mes informations ?",
        answer:
          "Avant d'entrer vos informations personnelles ou bancaires, vérifiez trois choses : (1) l'adresse du site commence par 'https://' (pas 'http://'), (2) il y a un cadenas 🔒 dans la barre d'adresse, et (3) l'adresse du site correspond à ce que vous attendez. Si ces trois éléments sont présents, le site est probablement sûr.",
      },
    ],
  },
  {
    category: "Questions sur les Démarches Administratives",
    questions: [
      {
        id: "q19",
        question:
          "Comment je fais mes démarches administratives en ligne ?",
        answer:
          "La plupart des démarches administratives se font maintenant en ligne. Par exemple, pour les impôts, allez sur impots.gouv.fr et connectez-vous avec votre numéro de sécurité sociale. Pour la retraite, allez sur lassuranceretraite.fr. Pour les allocations, allez sur caf.fr. Chaque site a un processus légèrement différent, mais ils sont généralement bien expliqués.",
      },
      {
        id: "q20",
        question:
          "Comment je me connecte à mon compte impôts.gouv.fr ?",
        answer:
          "Allez sur impots.gouv.fr, cliquez sur 'Se connecter', puis choisissez votre méthode de connexion (numéro fiscal + mot de passe, ou FranceConnect). Si vous n'avez pas de mot de passe, cliquez sur 'Créer un compte' et suivez les instructions. Vous devrez entrer votre numéro de sécurité sociale et répondre à des questions de sécurité.",
      },
      {
        id: "q21",
        question:
          "C'est quoi FranceConnect et comment ça marche ?",
        answer:
          "FranceConnect est un système qui vous permet de vous connecter à plusieurs sites gouvernementaux avec un seul compte. Au lieu de créer un compte séparé pour chaque site (impôts, retraite, allocations, etc.), vous pouvez utiliser votre compte FranceConnect. Pour créer un compte FranceConnect, allez sur franceconnect.gouv.fr et choisissez votre fournisseur d'identité.",
      },
    ],
  },
  {
    category: "Questions sur les Réseaux Sociaux et la Communication",
    questions: [
      {
        id: "q22",
        question:
          "Comment je me crée un compte Facebook pour voir les photos de ma famille ?",
        answer:
          "Allez sur facebook.com, cliquez sur 'Créer un compte', et remplissez les informations demandées (nom, email, date de naissance, etc.). Choisissez un mot de passe fort. Une fois votre compte créé, vous pouvez chercher vos amis et votre famille, les ajouter, et voir leurs photos et messages.",
      },
      {
        id: "q23",
        question:
          "Comment je fais un appel vidéo avec mes petits-enfants ?",
        answer:
          "Vous pouvez faire des appels vidéo gratuitement avec Skype, WhatsApp, ou FaceTime (si vous avez un iPhone). Pour commencer, téléchargez l'application sur votre ordinateur ou smartphone, créez un compte, et ajoutez vos petits-enfants. Une fois qu'ils sont dans vos contacts, vous pouvez cliquer sur leur nom et sélectionner 'Appel vidéo'.",
      },
      {
        id: "q24",
        question: "Comment je partage une photo sur Facebook ?",
        answer:
          "Connectez-vous à Facebook, allez sur votre profil, et cliquez sur 'Créer une publication' ou 'Ajouter une photo/vidéo'. Sélectionnez la photo que vous voulez partager depuis votre ordinateur ou téléphone. Vous pouvez ajouter une description. Avant de publier, vérifiez qui peut voir votre photo (amis seulement, famille, ou tout le monde).",
      },
    ],
  },
  {
    category: "Questions sur les Achats en Ligne",
    questions: [
      {
        id: "q25",
        question: "Comment je fais un achat sur Amazon ?",
        answer:
          "Allez sur amazon.fr, cherchez le produit que vous voulez (par exemple 'livre de cuisine'), cliquez dessus, et vérifiez le prix et les avis. Cliquez sur 'Ajouter au panier', puis 'Voir le panier'. Vérifiez que tout est correct, puis cliquez sur 'Passer la commande'. Vous devrez entrer votre adresse de livraison et votre méthode de paiement.",
      },
      {
        id: "q26",
        question:
          "Est-ce que c'est sûr de donner mon numéro de carte bancaire en ligne ?",
        answer:
          "Oui, c'est sûr si vous suivez quelques précautions. Vérifiez que le site commence par 'https://' et qu'il y a un cadenas 🔒 dans la barre d'adresse. N'entrez votre numéro de carte que sur des sites de confiance (Amazon, sites gouvernementaux, etc.). Ne donnez jamais votre numéro de carte par email ou téléphone.",
      },
      {
        id: "q27",
        question: "Comment je retourne un produit acheté en ligne ?",
        answer:
          "Chaque site a sa propre politique de retour. Sur Amazon, allez dans 'Mes commandes', trouvez le produit, et cliquez sur 'Retourner ou remplacer'. Suivez les instructions pour imprimer une étiquette de retour. Mettez le produit dans une boîte avec l'étiquette, et déposez-le à La Poste ou chez un point relais.",
      },
    ],
  },
  {
    category: "Questions sur la Maintenance et la Résolution de Problèmes",
    questions: [
      {
        id: "q28",
        question:
          "Qu'est-ce que je dois faire si mon ordinateur est lent ?",
        answer:
          "Essayez ces solutions : (1) redémarrez votre ordinateur (éteignez-le complètement, attendez 30 secondes, puis rallumez-le), (2) fermez les applications que vous n'utilisez pas, (3) supprimez les fichiers inutiles, (4) mettez à jour votre antivirus et lancez une analyse, (5) vérifiez que votre connexion internet fonctionne bien.",
      },
      {
        id: "q29",
        question: "Comment je mets à jour mon ordinateur ?",
        answer:
          "Les mises à jour sont importantes pour la sécurité. Sur Windows, allez dans 'Paramètres' > 'Mise à jour et sécurité' > 'Vérifier les mises à jour'. Si des mises à jour sont disponibles, cliquez sur 'Installer'. Votre ordinateur peut redémarrer — c'est normal. Vous pouvez aussi activer les mises à jour automatiques.",
      },
      {
        id: "q30",
        question: "Qu'est-ce que je fais si j'ai un virus ?",
        answer:
          "Si vous pensez avoir un virus, installez un antivirus gratuit comme Windows Defender (inclus dans Windows) ou Avast (gratuit). Lancez une analyse complète — cela peut prendre quelques heures. L'antivirus détectera et supprimera les virus. Après, mettez à jour votre antivirus régulièrement.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "oklch(0.85 0.03 145)" }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 px-6 flex items-center justify-between hover:bg-opacity-50 transition-colors"
        style={{
          backgroundColor: isOpen ? "oklch(0.93 0.02 80)" : "transparent",
        }}
      >
        <h3
          className="text-lg font-semibold text-left"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "oklch(0.45 0.08 145)",
          }}
        >
          {question}
        </h3>
        <ChevronDown
          size={24}
          className={`transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: "oklch(0.42 0.06 145)" }}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.50 0.05 145)",
              lineHeight: "1.8",
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
    <div style={{ paddingTop: "72px" }}>
      {/* ── HEADER ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Questions Fréquentes
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.90 0.02 80)",
            }}
          >
            Trouvez les réponses aux questions les plus fréquentes sur le
            numérique, internet et les démarches administratives en ligne.
          </p>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="py-8" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="container max-w-2xl">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              style={{ color: "oklch(0.42 0.06 145)" }}
            />
            <input
              type="text"
              placeholder="Cherchez une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
              style={{
                borderColor: "oklch(0.85 0.03 145)",
                backgroundColor: "oklch(0.97 0.01 80)",
                color: "oklch(0.45 0.08 145)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.42 0.06 145)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.85 0.03 145)";
              }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ CONTENT ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="container max-w-3xl">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.category} className="mb-12">
                <h2
                  className="text-3xl font-semibold mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: "oklch(0.45 0.08 145)",
                  }}
                >
                  {category.category}
                </h2>
                <div
                  className="rounded-lg overflow-hidden shadow-md"
                  style={{
                    backgroundColor: "oklch(0.97 0.01 80)",
                    border: "1px solid oklch(0.90 0.02 80)",
                  }}
                >
                  {category.questions.map((item) => (
                    <FAQItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems.includes(item.id)}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p
                className="text-lg"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.50 0.05 145)",
                }}
              >
                Aucune question ne correspond à votre recherche. Essayez avec
                d'autres mots-clés.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.45 0.08 145) 0%, oklch(0.35 0.08 145) 100%)",
        }}
      >
        <div className="container text-center">
          <h2
            className="text-4xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.90 0.02 80)",
            }}
          >
            Contactez-moi directement. Je suis là pour répondre à toutes vos
            questions, même les plus simples.
          </p>
          <Link href="/contact">
            <button
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "oklch(0.94 0.02 80)",
                color: "oklch(0.45 0.08 145)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Me contacter
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
