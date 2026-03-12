/**
 * Page de Paiement Sécurisée
 * Accessible via un lien unique envoyé au client
 * Affiche le QR code SEPA pour effectuer le virement
 */

import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { AlertCircle, CheckCircle, Lock, Clock } from "lucide-react";
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

  const token = params?.token as string;

  useEffect(() => {
    if (!token) {
      setError("Lien de paiement invalide");
      setLoading(false);
      return;
    }

    // Récupérer les données de paiement depuis le serveur
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        // En production, vous feriez un appel API pour récupérer les données
        // Pour l'instant, on simule les données
        const mockData: PaymentData = {
          appointmentId: token.substring(0, 12),
          clientName: "Client",
          clientEmail: "client@example.com",
          amount: 42,
          appointmentDate: new Date().toLocaleDateString("fr-FR"),
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };

        // Vérifier si le lien a expiré
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
        {/* En-tête sécurisé */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-green-700" />
            <span className="text-sm font-medium text-green-700">Page sécurisée</span>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.45 0.08 145)" }}
          >
            Paiement de votre séance
          </h1>
          <p className="text-gray-600">
            Scannez le QR code ci-dessous avec votre application bancaire pour effectuer le virement.
          </p>
        </div>

        {/* Détails du rendez-vous */}
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

        {/* QR Code de paiement */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <SEPAPaymentQR
            appointmentId={paymentData.appointmentId}
            defaultAmount={paymentData.amount}
            showLabel={true}
          />
        </div>

        {/* Instructions de sécurité */}
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

        {/* Confirmation */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900 mb-1">Après le paiement</p>
              <p className="text-xs text-green-800">
                Vous recevrez une confirmation par email dès réception du virement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
