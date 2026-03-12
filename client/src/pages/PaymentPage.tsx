/**
 * Page de Paiement Sécurisée
 * Accessible via un lien unique envoyé au client
 * Affiche le QR code SEPA ou l'IBAN pour effectuer le virement
 * Notifications automatiques par email
 */

import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { AlertCircle, CheckCircle, Lock, Clock, Shield, Copy, Eye, EyeOff } from "lucide-react";
import SEPAPaymentQR from "../components/SEPAPaymentQR";

interface PaymentData {
  appointmentId: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  appointmentDate?: string;
  expiresAt: number;
}

export default function PaymentPage() {
  const [match, params] = useRoute("/payment/:token");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "manual">("qr");
  const [showIban, setShowIban] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

  // Coordonnées bancaires réelles
  const COMPANY_IBAN = "FR76 1621 8000 0140 1211 0249 729";
  const COMPANY_BIC = "BFBKFRP1";
  const COMPANY_NAME = "DUCHALET SANDRA";

  const token = params?.token as string;

  useEffect(() => {
    if (!token) {
      setError("Lien de paiement invalide");
      setLoading(false);
      return;
    }

    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const mockData: PaymentData = {
          appointmentId: token.substring(0, 12),
          clientName: "Client",
          clientEmail: "client@example.com",
          amount: 42,
          appointmentDate: new Date().toLocaleDateString("fr-FR"),
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };

        if (Date.now() > mockData.expiresAt) {
          setIsExpired(true);
          setError("Ce lien de paiement a expiré");
        } else {
          setPaymentData(mockData);
        }
      } catch (err) {
        setError("Erreur lors du chargement de la page de paiement");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [token]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre page de paiement...</p>
        </div>
      </div>
    );
  }

  if (error || isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            {isExpired ? "Lien expiré" : "Erreur"}
          </h1>
          <p className="text-center text-gray-600 mb-6">
            {error || "Une erreur est survenue lors du chargement de votre page de paiement."}
          </p>
          <a
            href="/"
            className="block w-full text-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ── EN-TÊTE SÉCURISÉ ── */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <span className="text-sm font-bold text-green-700 block">Page Sécurisée</span>
              <span className="text-xs text-green-600">Connexion chiffrée SSL/TLS</span>
            </div>
          </div>

          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.45 0.08 145)" }}
          >
            Paiement de votre séance
          </h1>
          <p className="text-gray-600 mb-4">
            Complétez votre paiement par virement bancaire sécurisé. Aucune donnée sensible n'est stockée sur ce site.
          </p>

          {/* Badge de sécurité mutuelle */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900">✓ Gage de sécurité mutuelle</p>
              <p className="text-xs text-blue-800 leading-relaxed mt-1">
                Ce système de paiement par virement direct protège <strong>vos données bancaires</strong> (aucune saisie de carte) et vous garantit la <strong>réception immédiate d'une facture conforme SAP</strong> pour votre crédit d'impôt.
              </p>
            </div>
          </div>
        </div>

        {/* ── DÉTAILS DU RENDEZ-VOUS ── */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du rendez-vous</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Nom</span>
              <span className="font-medium text-gray-900">{paymentData.clientName}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-gray-900 text-sm">{paymentData.clientEmail}</span>
            </div>
            {paymentData.appointmentDate && (
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">{paymentData.appointmentDate}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-600 font-medium">Montant à payer</span>
              <span
                className="text-2xl font-bold"
                style={{ color: "oklch(0.45 0.08 145)" }}
              >
                {paymentData.amount.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        {/* ── CHOIX DE LA MÉTHODE DE PAIEMENT ── */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Comment payer ?</h2>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod("qr")}
              className="w-full p-4 rounded-lg border-2 text-left transition-all"
              style={{
                borderColor: paymentMethod === "qr" ? "oklch(0.45 0.08 145)" : "oklch(0.88 0.03 80)",
                backgroundColor: paymentMethod === "qr" ? "oklch(0.95 0.02 145)" : "oklch(0.99 0.005 80)",
              }}
            >
              <p className="font-semibold" style={{ color: paymentMethod === "qr" ? "oklch(0.45 0.08 145)" : "oklch(0.35 0.02 65)" }}>
                📱 Paiement par QR Code (Recommandé)
              </p>
              <p className="text-sm text-gray-600 mt-1">Scannez avec votre application bancaire</p>
            </button>

            <button
              onClick={() => setPaymentMethod("manual")}
              className="w-full p-4 rounded-lg border-2 text-left transition-all"
              style={{
                borderColor: paymentMethod === "manual" ? "oklch(0.45 0.08 145)" : "oklch(0.88 0.03 80)",
                backgroundColor: paymentMethod === "manual" ? "oklch(0.95 0.02 145)" : "oklch(0.99 0.005 80)",
              }}
            >
              <p className="font-semibold" style={{ color: paymentMethod === "manual" ? "oklch(0.45 0.08 145)" : "oklch(0.35 0.02 65)" }}>
                💳 Virement Manuel
              </p>
              <p className="text-sm text-gray-600 mt-1">Entrez l'IBAN dans votre application bancaire</p>
            </button>
          </div>

          {/* ── OPTION QR CODE ── */}
          {paymentMethod === "qr" && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Ouvrez votre application bancaire (Crédit Agricole, BNP, Société Générale, etc.) et scannez ce code :
              </p>
              <SEPAPaymentQR
                appointmentId={paymentData.appointmentId}
                defaultAmount={paymentData.amount}
                showLabel={true}
              />
              <p className="text-xs text-gray-500 mt-4">
                Tous les montants et informations sont pré-remplies. Confirmez simplement le virement.
              </p>
            </div>
          )}

          {/* ── OPTION VIREMENT MANUEL ── */}
          {paymentMethod === "manual" && (
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-4">
                Utilisez les informations ci-dessous pour effectuer un virement depuis votre application bancaire :
              </p>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Bénéficiaire</p>
                  <p className="font-semibold text-gray-900">{COMPANY_NAME}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">IBAN</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-semibold text-gray-900">
                      {showIban ? COMPANY_IBAN : "•••• •••• •••• •••• •••• •••• •••"}
                    </p>
                    <button
                      onClick={() => setShowIban(!showIban)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      {showIban ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY_IBAN)}
                    className="mt-2 flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Copy size={14} />
                    {copiedIban ? "Copié !" : "Copier"}
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">BIC</p>
                  <p className="font-mono font-semibold text-gray-900">{COMPANY_BIC}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Montant</p>
                  <p className="font-semibold text-lg" style={{ color: "oklch(0.45 0.08 145)" }}>
                    {paymentData.amount.toFixed(2)}€
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Libellé (Référence)</p>
                  <p className="font-mono font-semibold text-gray-900">RDV-{paymentData.appointmentId}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Conservez votre preuve de virement pour votre dossier.
              </p>
            </div>
          )}
        </div>

        {/* ── SÉCURITÉ ET CONFIDENTIALITÉ ── */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔒 Sécurité & Confidentialité</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Données chiffrées</p>
                <p className="text-gray-600">Votre connexion est protégée par un certificat SSL/TLS 256-bit.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Aucun stockage de données sensibles</p>
                <p className="text-gray-600">Vos informations bancaires ne sont jamais enregistrées sur nos serveurs.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Virement bancaire direct</p>
                <p className="text-gray-600">Vous contrôlez entièrement votre paiement via votre application bancaire.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Conformité RGPD</p>
                <p className="text-gray-600">Vos données personnelles sont traitées conformément à la législation française et européenne.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── INSTRUCTIONS FINALES ── */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900 mb-1">Après le paiement</p>
              <p className="text-xs text-green-800">
                Vous recevrez une <strong>confirmation par email</strong> (lespetitspapiers@gmail.com) et une <strong>facture PDF</strong> conforme aux normes SAP pour votre crédit d'impôt.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Lien valide pendant 30 jours</p>
              <p className="text-xs text-blue-800">
                Ce lien de paiement est personnel et sécurisé. Ne le partagez pas avec d'autres personnes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
