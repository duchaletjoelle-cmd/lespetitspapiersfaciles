import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type EmailPayload = {
  to: string;
  subject: string;
  htmlContent: string;
};

/**
 * Envoie un email via le service Manus
 * Utilisé pour les confirmations de rendez-vous et les messages de contact
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const { to, subject, htmlContent } = payload;

  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service URL is not configured.",
    });
  }

  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service API key is not configured.",
    });
  }

  const endpoint = new URL(
    "webdevtoken.v1.WebDevService/SendEmail",
    ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
  ).toString();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to,
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email to ${to} (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Génère un email de confirmation de rendez-vous
 */
export function generateAppointmentConfirmationEmail(data: {
  clientName: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Source Sans 3', Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #6b9e7f; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px; }
          .detail { margin: 10px 0; }
          .label { font-weight: bold; color: #6b9e7f; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Confirmation de rendez-vous</h1>
            <p>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            
            <p>Merci d'avoir pris rendez-vous avec nous ! Voici les détails de votre rendez-vous :</p>
            
            <div class="detail">
              <span class="label">Date :</span> ${data.appointmentDate}
            </div>
            <div class="detail">
              <span class="label">Heure :</span> ${data.appointmentTime}
            </div>
            <div class="detail">
              <span class="label">Service :</span> ${data.serviceType}
            </div>
            
            <p style="margin-top: 20px;">Si vous avez besoin d'annuler ou de modifier votre rendez-vous, n'hésitez pas à nous contacter au <strong>07 50 52 72 27</strong> ou par email.</p>
            
            <p>À bientôt !</p>
            <p><strong>Les Petits Papiers Faciles</strong></p>
          </div>
          
          <div class="footer">
            <p>Aide administrative et accompagnement numérique à Hyères</p>
            <p>07 50 52 72 27 | lespetitspapiersfaciles@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Génère un email de confirmation de message de contact
 */
export function generateContactConfirmationEmail(data: {
  clientName: string;
  subject: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Source Sans 3', Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #6b9e7f; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Message reçu</h1>
            <p>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            
            <p>Merci pour votre message ! Nous avons bien reçu votre demande concernant : <strong>${data.subject}</strong></p>
            
            <p>Nous vous répondrons dans les plus brefs délais. Si c'est urgent, n'hésitez pas à nous appeler au <strong>07 50 52 72 27</strong>.</p>
            
            <p>Cordialement,</p>
            <p><strong>Les Petits Papiers Faciles</strong></p>
          </div>
          
          <div class="footer">
            <p>Aide administrative et accompagnement numérique à Hyères</p>
            <p>07 50 52 72 27 | lespetitspapiersfaciles@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
