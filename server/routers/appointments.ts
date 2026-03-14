/**
 * Routeur tRPC — Rendez-vous
 * Les Petits Papiers Faciles
 */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { sendEmail, sendEmailWithAttachments, generateAppointmentConfirmationEmail, generateContactConfirmationEmail } from "../_core/email";
import { generateCalendarInvite, generateClientCalendarInvite } from "../_core/calendar";
import {
  getAvailableSlots,
  createAppointment,
  listAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  blockSlot,
  unblockSlot,
  listBlockedSlots,
  isWorkingDay,
} from "../appointments.db";

// ─── Middleware admin ────────────────────────────────────────────────────────

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Accès réservé à l'administrateur." });
  }
  return next({ ctx });
});

// ─── Labels lisibles ─────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  "aide-administrative": "Aide administrative",
  "apprentissage-numerique": "Apprentissage numérique",
  "premiere-seance": "Première séance découverte",
  "autre": "Autre",
};

// ─── Routeur ─────────────────────────────────────────────────────────────────

export const appointmentsRouter = router({
  /**
   * Envoyer un message de contact (public)
   */
  sendContactMessage: publicProcedure
    .input(
      z.object({
        clientName: z.string().min(2).max(255),
        clientEmail: z.string().email(),
        clientPhone: z.string().min(8).max(30),
        subject: z.string().min(5).max(255),
        message: z.string().min(10).max(2000),
      })
    )
    .mutation(async ({ input }) => {
      // Notifier la propriétaire
      const notificationContent = `**${input.clientName}** a envoyé un message.\n\n- **Sujet :** ${input.subject}\n- **Email :** ${input.clientEmail}\n- **Téléphone :** ${input.clientPhone}\n\n**Message :**\n${input.message}`;
      await notifyOwner({
        title: `Nouveau message de contact — ${input.clientName}`,
        content: notificationContent,
      });

      // Envoyer un email de notification à la propriétaire
      await sendEmail({
        to: "lespetitspapiersfaciles@gmail.com",
        subject: `Nouveau message de contact : ${input.subject}`,
        htmlContent: `<p>${notificationContent.replace(/\n/g, "<br>")}</p>`,
      });

      // Envoyer un email de confirmation au client
      const confirmationEmail = generateContactConfirmationEmail({
        clientName: input.clientName,
        subject: input.subject,
      });
      await sendEmail({
        to: input.clientEmail,
        subject: `Nous avons bien reçu votre message - Les Petits Papiers Faciles`,
        htmlContent: confirmationEmail,
      });

      return { success: true };
    }),

  /**
   * Créneaux disponibles pour une date donnée (public)
   */
  getAvailableSlots: publicProcedure
    .input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }))
    .query(async ({ input }) => {
      const slots = await getAvailableSlots(input.date);
      return { slots, isWorkingDay: isWorkingDay(input.date) };
    }),

  /**
   * Créer un rendez-vous (public — visiteur non connecté)
   */
  create: publicProcedure
    .input(
      z.object({
        clientName: z.string().min(2).max(255),
        clientEmail: z.string().email(),
        clientPhone: z.string().min(8).max(30),
        appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        appointmentTime: z.string().regex(/^\d{2}:\d{2}$/),
        serviceType: z.enum([
          "aide-administrative",
          "apprentissage-numerique",
          "premiere-seance",
          "autre",
        ]),
        message: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Vérifier que le créneau est encore disponible
      const available = await getAvailableSlots(input.appointmentDate);
      if (!available.includes(input.appointmentTime)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Ce créneau n'est plus disponible. Veuillez en choisir un autre.",
        });
      }

      const appt = await createAppointment({
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        appointmentDate: input.appointmentDate as unknown as Date,
        appointmentTime: input.appointmentTime,
        serviceType: input.serviceType,
        message: input.message ?? null,
        status: "pending",
      });

      // Notifier la propriétaire
      const serviceLabel = SERVICE_LABELS[input.serviceType] ?? input.serviceType;
      const apptNotificationContent = `**${input.clientName}** a pris rendez-vous.\n\n- **Date :** ${input.appointmentDate} à ${input.appointmentTime}\n- **Service :** ${serviceLabel}\n- **Email :** ${input.clientEmail}\n- **Téléphone :** ${input.clientPhone}${input.message ? `\n- **Message :** ${input.message}` : ""}`;
      await notifyOwner({
        title: `📅 Nouveau rendez-vous — ${input.clientName}`,
        content: apptNotificationContent,
      });

      // Générer les invitations de calendrier
      const ownerCalendarInvite = generateCalendarInvite({
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        appointmentDate: input.appointmentDate,
        appointmentTime: input.appointmentTime,
        serviceType: serviceLabel,
        message: input.message,
      });

      const clientCalendarInvite = generateClientCalendarInvite({
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        appointmentDate: input.appointmentDate,
        appointmentTime: input.appointmentTime,
        serviceType: serviceLabel,
      });

      // Envoyer un email de notification à la propriétaire avec invitation calendrier
      await sendEmailWithAttachments({
        to: "lespetitspapiersfaciles@gmail.com",
        subject: `Nouveau rendez-vous : ${input.clientName} - ${input.appointmentDate}`,
        htmlContent: `<p>${apptNotificationContent.replace(/\n/g, "<br>")}</p>`,
        attachments: [
          {
            filename: "rendez-vous.ics",
            content: Buffer.from(ownerCalendarInvite).toString("base64"),
            contentType: "text/calendar",
          },
        ],
      });

      // Envoyer un email de confirmation au client avec invitation calendrier
      const confirmationEmail = generateAppointmentConfirmationEmail({
        clientName: input.clientName,
        appointmentDate: input.appointmentDate,
        appointmentTime: input.appointmentTime,
        serviceType: serviceLabel,
      });
      await sendEmailWithAttachments({
        to: input.clientEmail,
        subject: `🎉 Votre rendez-vous est confirmé avec Les Petits Papiers Faciles !`,
        htmlContent: confirmationEmail,
        attachments: [
          {
            filename: "rendez-vous.ics",
            content: Buffer.from(clientCalendarInvite).toString("base64"),
            contentType: "text/calendar",
          },
        ],
      });

      return { success: true, appointmentId: appt.id };
    }),

  // ── Admin procedures ──────────────────────────────────────────────────────

  /**
   * Lister tous les rendez-vous (admin)
   */
  list: adminProcedure
    .input(
      z.object({
        status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
        from: z.string().optional(),
        to: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      return listAppointments(input);
    }),

  /**
   * Mettre à jour le statut d'un RDV (admin)
   */
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
        adminNotes: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateAppointmentStatus(input.id, input.status, input.adminNotes);
      return { success: true };
    }),

  /**
   * Supprimer un RDV (admin)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await deleteAppointment(input.id);
      return { success: true };
    }),

  /**
   * Bloquer un créneau (admin)
   */
  blockSlot: adminProcedure
    .input(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
        reason: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await blockSlot({
        blockedDate: input.date as unknown as Date,
        blockedTime: input.time ?? null,
        reason: input.reason ?? null,
      });
      return { success: true };
    }),

  /**
   * Débloquer un créneau (admin)
   */
  unblockSlot: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await unblockSlot(input.id);
      return { success: true };
    }),

  /**
   * Lister les créneaux bloqués (admin)
   */
  listBlockedSlots: adminProcedure
    .input(
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      return listBlockedSlots(input?.from, input?.to);
    }),
});
