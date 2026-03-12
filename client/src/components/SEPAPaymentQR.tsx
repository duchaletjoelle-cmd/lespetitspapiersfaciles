/**
 * Composant SEPAPaymentQR
 * Affiche un QR code SEPA pour le paiement des séances
 * Permet au client de saisir un montant personnalisé
 * Visible uniquement dans la confirmation de rendez-vous
 */

import { useEffect, useState } from "react";
import { AlertCircle, Edit2 } from "lucide-react";

interface SEPAPaymentQRProps {
  appointmentId: string;
  defaultAmount?: number; // En euros, défaut 42€
  showLabel?: boolean;
}

export default function SEPAPaymentQR({
  appointmentId,
  defaultAmount = 42,
  showLabel = true,
}: SEPAPaymentQRProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>(defaultAmount.toString());
  const [isEditing, setIsEditing] = useState(false);

  const generateQRCode = async (amountToUse: number) => {
    try {
      setLoading(true);
      // Données SEPA au format BCD (EPC QR Code)
      const sepaData = [
        "BCD", // Service tag
        "002", // Version
        "1", // Encoding (UTF-8)
        "SCT", // Identification
        "BFBKFRP1", // BIC (Banque Populaire)
        "DUCHALET SANDRA", // Beneficiary name
        "FR7616218000014012110249729", // IBAN
        `EUR${amountToUse.toFixed(2)}`, // Amount
        "", // Purpose code
        `RDV-${appointmentId.substring(0, 12)}`, // Structured reference
        "Les Petits Papiers Faciles", // Unstructured remittance
        "", // Beneficiary to payer information
      ].join("\n");

      const encoded = encodeURIComponent(sepaData);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
      setQrCodeUrl(url);
      setAmount(amountToUse);
    } catch (error) {
      console.error("Erreur lors de la génération du QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Générer le QR code initial au montant par défaut
    generateQRCode(defaultAmount);
  }, [appointmentId, defaultAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleApplyAmount = () => {
    const newAmount = parseFloat(customAmount);
    if (!isNaN(newAmount) && newAmount > 0) {
      generateQRCode(newAmount);
      setIsEditing(false);
    } else {
      alert("Veuillez entrer un montant valide (ex: 42.50)");
    }
  };

  const handleCancel = () => {
    setCustomAmount(amount.toString());
    setIsEditing(false);
  };

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
              le virement. Les informations de paiement sont préremplies
              automatiquement.
            </p>
          </div>
        </div>
      )}

      {/* Section montant personnalisé */}
      <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-amber-900">Montant à payer</p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-colors"
            style={{
              backgroundColor: isEditing ? "oklch(0.95 0.02 145)" : "transparent",
              color: isEditing ? "oklch(0.45 0.08 145)" : "oklch(0.42 0.02 65)",
              border: `1px solid ${isEditing ? "oklch(0.45 0.08 145)" : "transparent"}`,
            }}
          >
            <Edit2 size={14} />
            {isEditing ? "Annuler" : "Modifier"}
          </button>
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={customAmount}
                onChange={handleAmountChange}
                placeholder="Ex: 42.50"
                className="w-full px-3 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <span className="flex items-center text-sm font-medium text-amber-900">€</span>
            <button
              onClick={handleApplyAmount}
              disabled={loading}
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Appliquer"}
            </button>
          </div>
        ) : (
          <p className="text-lg font-bold" style={{ color: "oklch(0.45 0.08 145)" }}>
            {amount.toFixed(2)}€
          </p>
        )}
      </div>

      {/* QR Code */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Génération du QR code...</p>
          </div>
        </div>
      ) : qrCodeUrl ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={qrCodeUrl}
            alt="QR Code SEPA pour paiement"
            className="w-64 h-64 border-2 border-green-200 rounded-lg shadow-md"
          />
          <p className="text-xs text-gray-600 text-center max-w-xs">
            Montant: <span className="font-semibold">{amount.toFixed(2)}€</span> • Référence:{" "}
            <span className="font-semibold">RDV-{appointmentId.substring(0, 12)}</span>
          </p>
        </div>
      ) : null}

      <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800">
        <p className="font-medium mb-1">💡 Conseil:</p>
        <p>
          Votre application bancaire remplira automatiquement l'IBAN et le
          montant. Vérifiez simplement que le bénéficiaire est "Sandra
          Duchalet" avant de confirmer le virement.
        </p>
      </div>
    </div>
  );
}
