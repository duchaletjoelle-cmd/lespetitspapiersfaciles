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
  // Formater la date en format lisible français
  const dateObj = new Date(data.appointmentDate + "T00:00:00Z");
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('fr-FR', options);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Source Sans 3', Arial, sans-serif; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #6b9e7f; color: white; padding: 30px 20px; border-radius: 8px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 30px 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px; }
          .detail-box { background-color: white; padding: 15px; border-left: 4px solid #6b9e7f; margin: 15px 0; border-radius: 4px; }
          .detail-label { font-weight: bold; color: #6b9e7f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .detail-value { font-size: 16px; color: #333; margin-top: 5px; }
          .cta-section { background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .cta-section p { margin: 0; color: #2e7d32; font-weight: 500; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; }
          .footer p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Rendez-vous confirmé</h1>
            <p>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            
            <p>Merci d'avoir pris rendez-vous avec nous ! Votre rendez-vous est confirmé. Voici les détails :</p>
            
            <div class="detail-box">
              <div class="detail-label">📅 Date</div>
              <div class="detail-value">${capitalizedDate}</div>
            </div>
            
            <div class="detail-box">
              <div class="detail-label">🕐 Heure</div>
              <div class="detail-value">${data.appointmentTime}</div>
            </div>
            
            <div class="detail-box">
              <div class="detail-label">⭐ Service</div>
              <div class="detail-value">${data.serviceType}</div>
            </div>
            
            <div class="detail-box">
              <div class="detail-label">📍 Lieu</div>
              <div class="detail-value">À votre domicile (Hyères, Carqueiranne et communes environnantes)</div>
            </div>
            
            <div class="cta-section">
              <p>🙏 Si vous avez besoin d'annuler ou de modifier votre rendez-vous, contactez-nous au plus vite.</p>
            </div>
            
            <p style="margin-top: 20px; line-height: 1.6;">Nous nous réjouissons de vous rencontrer ! Si vous avez des questions ou besoin d'aide avant votre rendez-vous, n'hésitez pas à nous contacter.</p>
            
            <p style="margin-top: 20px;">Cordialement,<br><strong>Sandra Duchalet</strong><br>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="footer">
            <p><strong>Les Petits Papiers Faciles</strong></p>
            <p>Aide administrative et accompagnement numérique</p>
            <p>📞 07 50 52 72 27 | 📧 lespetitspapiersfaciles@gmail.com</p>
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
          body { font-family: 'Source Sans 3', Arial, sans-serif; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #6b9e7f; color: white; padding: 30px 20px; border-radius: 8px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 30px 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; }
          .footer p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Message reçu</h1>
            <p>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            
            <p>Merci pour votre message ! Nous avons bien reçu votre demande concernant : <strong>${data.subject}</strong></p>
            
            <p>Nous vous répondrons dans les plus brefs délais. Si c'est urgent, n'hésitez pas à nous appeler au <strong>07 50 52 72 27</strong>.</p>
            
            <p style="margin-top: 20px;">Cordialement,<br><strong>Sandra Duchalet</strong><br>Les Petits Papiers Faciles</p>
          </div>
          
          <div class="footer">
            <p><strong>Les Petits Papiers Faciles</strong></p>
            <p>Aide administrative et accompagnement numérique</p>
            <p>📞 07 50 52 72 27 | 📧 lespetitspapiersfaciles@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
