/**
 * SEPA QR Code Generator
 * Génère des QR codes SEPA pour les virements bancaires
 */

export interface SEPAQRCodeData {
  iban: string;
  beneficiary: string;
  amount?: number; // En euros
  reference?: string; // Référence du virement (ex: numéro de rendez-vous)
  remittanceInfo?: string; // Information de remise
}

/**
 * Génère une chaîne SEPA pour QR code
 * Format: BCD (Barcode Data)
 * https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation
 */
export function generateSEPAQRCodeString(data: SEPAQRCodeData): string {
  const lines: string[] = [
    "BCD", // Service tag
    "002", // Version
    "1", // Encoding (UTF-8)
    "SCT", // Identification
    "", // BIC (optionnel, laisser vide)
    data.beneficiary.substring(0, 70), // Beneficiary name
    data.iban.replace(/\s/g, ""), // IBAN (sans espaces)
    data.amount ? `EUR${data.amount.toFixed(2)}` : "", // Amount
    "", // Purpose code (optionnel)
    data.reference ? data.reference.substring(0, 16) : "", // Structured reference
    data.remittanceInfo ? data.remittanceInfo.substring(0, 140) : "", // Unstructured remittance
    "", // Beneficiary to payer information
  ];

  return lines.join("\n");
}

/**
 * Génère l'URL pour un QR code via API externe
 * Utilise qr-server.com (gratuit et fiable)
 */
export function generateSEPAQRCodeURL(data: SEPAQRCodeData): string {
  const sepaString = generateSEPAQRCodeString(data);
  const encoded = encodeURIComponent(sepaString);
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
}

/**
 * Crée les données pour un QR code SEPA de rendez-vous
 */
export function createAppointmentSEPAQRCode(
  appointmentId: string,
  amount: number = 42
): SEPAQRCodeData {
  return {
    iban: process.env.SEPA_IBAN || "FR7616218000014012110249729",
    beneficiary: process.env.SEPA_BENEFICIARY || "Sandra Duchalet",
    amount,
    reference: `RDV-${appointmentId.substring(0, 12)}`,
    remittanceInfo: `Séance d'accompagnement numérique`,
  };
}
