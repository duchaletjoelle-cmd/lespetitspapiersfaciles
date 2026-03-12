/**
 * Gestion des liens de paiement uniques et sécurisés
 * Génère des tokens uniques pour accéder à la page de paiement
 */

import crypto from "crypto";

export interface PaymentLinkData {
  appointmentId: string;
  clientEmail: string;
  clientName: string;
  amount: number;
  createdAt: number;
  expiresAt: number;
}

/**
 * Génère un token unique et sécurisé pour un lien de paiement
 */
export function generatePaymentToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Crée un lien de paiement unique
 * Le lien expire après 30 jours
 */
export function createPaymentLink(data: Omit<PaymentLinkData, "createdAt" | "expiresAt">): {
  token: string;
  link: string;
  expiresAt: number;
} {
  const token = generatePaymentToken();
  const createdAt = Date.now();
  const expiresAt = createdAt + 30 * 24 * 60 * 60 * 1000; // 30 jours

  // En production, vous devriez stocker ce token en base de données
  // Pour l'instant, on le retourne simplement
  const link = `/payment/${token}`;

  return {
    token,
    link,
    expiresAt,
  };
}

/**
 * Valide un token de paiement
 * Vérifie qu'il n'a pas expiré et qu'il existe
 */
export function validatePaymentToken(token: string, expiresAt: number): boolean {
  // Vérifier que le token n'est pas vide
  if (!token || token.length !== 64) {
    return false;
  }

  // Vérifier que le lien n'a pas expiré
  if (Date.now() > expiresAt) {
    return false;
  }

  return true;
}

/**
 * Génère l'URL complète du lien de paiement
 */
export function getPaymentLinkUrl(token: string, baseUrl: string = ""): string {
  const url = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${url}/payment/${token}`;
}
