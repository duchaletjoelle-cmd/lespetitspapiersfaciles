import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Retraite2026 from "@/pages/retraite-2026";

const queryClient = new QueryClient();

function Navbar() {
  return (
    <nav className="bg-white border-b border-rose-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-rose-700 font-bold text-lg hover:text-rose-900 transition-colors">
          Les Petits Papiers Faciles
        </Link>
        <Link href="/retraite-2026" className="text-sm text-gray-600 hover:text-rose-700 transition-colors">
          Retraite 2026
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* 1. HERO - Photo + message */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}hero.jpeg`}
          alt="Bureau élégant avec roses et ordinateur"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Vos démarches administratives, simplement et en toute confiance
          </h1>
          <p className="text-lg md:text-xl text-rose-100 mb-8 drop-shadow">
            Je vous accompagne pas à pas, avec bienveillance, clarté et confidentialité.
          </p>
          <a
            href="#contact"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-colors duration-200"
          >
            👉 Prendre rendez-vous
          </a>
        </div>
      </section>

      {/* 2. BLOC CONFIANCE */}
      <section className="bg-rose-50 border-y border-rose-200 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-xl font-bold text-rose-800 mb-3">Confidentialité et discrétion garanties</h2>
          <p className="text-gray-700 mb-2">
            Vos documents et informations personnelles sont traités avec le plus grand respect.
          </p>
          <p className="text-gray-700 font-medium">
            Aucune donnée n'est transmise sans votre accord.
          </p>
        </div>
      </section>

      {/* 3. CE QUE JE PROPOSE */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-rose-700 text-center mb-8">🤝 Ce que je propose</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "📋", label: "Aide aux démarches administratives" },
              { icon: "👴", label: "Dossiers retraite" },
              { icon: "✉️", label: "Courriers et formulaires" },
              { icon: "💻", label: "Accompagnement numérique" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-800 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 italic text-lg">
            "Je m'adapte à votre situation, à votre rythme, et je vous explique chaque étape."
          </p>
        </div>
      </section>

      {/* 4. POUR QUI ? */}
      <section className="py-14 px-4 bg-rose-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-rose-700 mb-6">💬 Pour qui ?</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              "👴 Seniors",
              "📂 Personnes en difficulté avec les démarches",
              "🤲 Proches aidants",
            ].map((item, i) => (
              <span key={i} className="bg-white border border-rose-200 text-gray-800 rounded-full px-5 py-2 font-medium shadow-sm">
                {item}
              </span>
            ))}
          </div>
          <p className="text-xl font-semibold text-rose-800">
            "Vous n'êtes pas seul(e) face aux démarches administratives."
          </p>
        </div>
      </section>

      {/* 5. BLOC RASSURANT */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-gray-800 text-lg leading-relaxed">
              Certaines démarches peuvent avoir des <strong>conséquences financières importantes</strong>.<br />
              Je vous aide à y voir clair avant de prendre une décision.
            </p>
          </div>
        </div>
      </section>

      {/* 6. APPEL À L'ACTION */}
      <section id="contact" className="py-16 px-4 bg-rose-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">📞</div>
          <h2 className="text-2xl font-bold mb-3">Besoin d'aide ? Parlons-en simplement.</h2>
          <p className="text-rose-200 mb-8 text-lg">Je suis à votre écoute, sans jargon ni pression.</p>
          <a
            href="mailto:contact@lespetitspapiersfaciles.fr"
            className="inline-block bg-white text-rose-700 hover:bg-rose-50 font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-colors duration-200"
          >
            👉 Prendre contact
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2026 Les Petits Papiers Faciles — Tous droits réservés</p>
        <p className="mt-1">Hyères, Carqueiranne et communes environnantes</p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/retraite-2026" component={Retraite2026} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
