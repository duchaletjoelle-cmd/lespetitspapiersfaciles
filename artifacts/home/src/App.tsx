import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/Home";
import ContactPage from "@/pages/Contact";
import RendezVousPage from "@/pages/RendezVous";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const navLink = (href: string, label: string) => {
    const active = location === href;
    return (
      <Link
        href={href}
        className="text-sm font-semibold transition-colors"
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          color: active ? "oklch(0.45 0.05 145)" : "oklch(0.30 0.04 72)",
          textDecoration: "none",
        }}
        onClick={() => setMobileOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm"
      style={{ borderBottom: "1px solid oklch(0.90 0.02 80)" }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ lineHeight: "1.1" }}>
            <div
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "oklch(0.45 0.05 145)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Les Petits Papiers
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "oklch(0.25 0.03 72)",
                letterSpacing: "0.02em",
              }}
            >
              Faciles
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLink("/", "Accueil")}
          {navLink("/rendez-vous", "Prendre rendez-vous")}
          {navLink("/contact", "Contact")}
          <a
            href="tel:0750527227"
            className="btn-sage"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}
          >
            <Phone size={16} />
            07 50 52 72 27
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{ color: "oklch(0.30 0.04 72)" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ borderTop: "1px solid oklch(0.93 0.04 80)" }}
        >
          <div className="pt-4">{navLink("/", "Accueil")}</div>
          {navLink("/rendez-vous", "Prendre rendez-vous")}
          {navLink("/contact", "Contact")}
          <a
            href="tel:0750527227"
            className="btn-sage"
            style={{ padding: "0.6rem 1.25rem", fontSize: "0.95rem", alignSelf: "flex-start" }}
          >
            <Phone size={16} />
            07 50 52 72 27
          </a>
        </div>
      )}
    </header>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/rendez-vous" component={RendezVousPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
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
