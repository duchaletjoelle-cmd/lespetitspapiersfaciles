/* ============================================================
   App.tsx — Les Petits Papiers Faciles
   Style : Clarté Provençale — routing complet, layout global
   ============================================================ */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import AudioPlayer from "./components/AudioPlayer";
import { FloatingGuide } from "./components/FloatingGuide";

// Pages
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";
import CommentCaFonctionnePage from "./pages/CommentCaFonctionne";
import QuiSuisJePage from "./pages/QuiSuisJe";
import SecteurPage from "./pages/Secteur";
import AvantageFiscalPage from "./pages/AvantageFiscal";
import ContactPage from "./pages/Contact";
import MentionsLegalesPage from "./pages/MentionsLegales";
import ConfidentialitePage from "./pages/Confidentialite";
import CookiesPage from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import RendezVousPage from "./pages/RendezVous";
import AdminRendezVousPage from "./pages/AdminRendezVous";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import FAQPage from "./pages/FAQ";
import PaymentPage from "./pages/PaymentPage";
import AdminPaymentPage from "./pages/AdminPayment";
import ChecklistRDVPage from "./pages/ChecklistRDV";
import ChecklistAdministrativePage from "./pages/ChecklistAdministrative";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <FloatingGuide />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/comment-ca-fonctionne" component={CommentCaFonctionnePage} />
          <Route path="/qui-suis-je" component={QuiSuisJePage} />
          <Route path="/secteur" component={SecteurPage} />
          <Route path="/avantage-fiscal" component={AvantageFiscalPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/rendez-vous" component={RendezVousPage} />
          <Route path="/checklist-rdv" component={ChecklistRDVPage} />
          <Route path="/checklist-administrative" component={ChecklistAdministrativePage} />
          <Route path="/admin/rendez-vous" component={AdminRendezVousPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogArticlePage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/admin/paiements" component={AdminPaymentPage} />
          <Route path="/payment/:token" component={PaymentPage} />
          <Route path="/mentions-legales" component={MentionsLegalesPage} />
          <Route path="/confidentialite" component={ConfidentialitePage} />
          <Route path="/cookies" component={CookiesPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CookieBanner />
      <AudioPlayer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
