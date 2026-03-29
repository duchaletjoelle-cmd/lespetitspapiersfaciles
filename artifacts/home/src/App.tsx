import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Retraite2026 from "@/pages/retraite-2026";

const queryClient = new QueryClient();

function Navbar() {
  return (
    <nav className="bg-white border-b border-rose-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-6">
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
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <img
        src={`${import.meta.env.BASE_URL}hero.jpeg`}
        alt="Elegant workspace with roses and laptop"
        className="max-w-full max-h-screen object-contain"
      />
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
