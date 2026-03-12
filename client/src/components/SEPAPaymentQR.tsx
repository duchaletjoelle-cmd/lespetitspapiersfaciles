/**
 * Composant SEPAPaymentQR
 * Affiche un QR code SEPA pour le paiement des séances
 * Visible uniquement dans la confirmation de rendez-vous
 */

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

interface SEPAPaymentQRProps {
  appointmentId: string;
  amount?: number; // En euros, défaut 42€
  showLabel?: boolean;
}

export default function SEPAPaymentQR({
  appointmentId,
  amount = 42,
  showLabel = true,
}: SEPAPaymentQRProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Générer le QR code SEPA côté client
    const generateQRCode = async () => {
      try {
        // Données SEPA au format BCD
        const sepaData = [
          "BCD", // Service tag
          "002", // Version
          "1", // Encoding (UTF-8)
          "SCT", // Identification
          "", // BIC (optionnel)
          "Sandra Duchalet", // Beneficiary name
          "FR7616218000014012110249729", // IBAN
          `EUR${amount.toFixed(2)}`, // Amount
          "", // Purpose code
          `RDV-${appointmentId.substring(0, 12)}`, // Structured reference
          "Séance d'accompagnement numérique", // Unstructured remittance
          "", // Beneficiary to payer information
        ].join("\n");

        const encoded = encodeURIComponent(sepaData);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Erreur lors de la génération du QR code:", error);
      } finally {
        setLoading(false);
      }
    };

    generateQRCode();
  }, [appointmentId, amount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Génération du QR code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6">
      {showLabel && (
        <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Modalités de règlement
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Scannez ce QR code avec votre application bancaire pour effectuer
              le virement de la séance (42€). Les informations de paiement sont
              préremplies automatiquement.
            </p>
          </div>
        </div>
      )}

      {qrCodeUrl && (
        <div className="flex flex-col items-center gap-3">
          <img
            src={qrCodeUrl}
            alt="QR Code SEPA pour paiement"
            className="w-64 h-64 border-2 border-green-200 rounded-lg shadow-md"
          />
          <p className="text-xs text-gray-600 text-center max-w-xs">
            Montant: <span className="font-semibold">{amount}€</span> • Référence:{" "}
            <span className="font-semibold">RDV-{appointmentId.substring(0, 12)}</span>
          </p>
        </div>
      )}

      <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <p className="font-medium mb-1">💡 Conseil:</p>
        <p>
          Votre application bancaire remplira automatiquement l'IBAN et le
          montant. Vérifiez simplement que le bénéficiaire est "Sandra
          Duchalet" avant de confirmer.
        </p>
      </div>
    </div>
  );
}
