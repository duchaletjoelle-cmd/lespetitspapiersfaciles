/**
 * Helpers de base de données pour les rendez-vous
 * Les Petits Papiers Faciles
 */

import { and, eq, gte, lte, ne, sql } from "drizzle-orm";
import { getDb } from "./db";
import {
  appointments,
  blockedSlots,
  type Appointment,
  type InsertAppointment,
  type InsertBlockedSlot,
} from "../drizzle/schema";

// ─── Créneaux horaires disponibles ──────────────────────────────────────────

/** Créneaux proposés du lundi au samedi, 9h–17h30 */
export const ALL_SLOTS: string[] = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

/** Jours ouvrés : 1 (lundi) à 6 (samedi) — dimanche exclu */
export function isWorkingDay(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00Z");
  const day = d.getUTCDay();
  return day >= 1 && day <= 6;
}

// ─── Créneaux disponibles pour une date donnée ───────────────────────────────

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  if (!isWorkingDay(dateStr)) return [];

  const db = await getDb();
  if (!db) return ALL_SLOTS;

  // Récupérer les RDV confirmés/en attente pour ce jour
  const booked = await db
    .select({ time: appointments.appointmentTime })
    .from(appointments)
    .where(
      and(
        sql`${appointments.appointmentDate} = ${dateStr}`,
        ne(appointments.status, "cancelled")
      )
    );

  const bookedTimes = new Set(booked.map((r) => r.time));

  // Récupérer les créneaux bloqués pour ce jour
  const blocked = await db
    .select({ time: blockedSlots.blockedTime })
    .from(blockedSlots)
    .where(sql`${blockedSlots.blockedDate} = ${dateStr}`);

  // Si un créneau null existe → journée entière bloquée
  if (blocked.some((b) => b.time === null)) return [];

  const blockedTimes = new Set(blocked.map((b) => b.time).filter(Boolean));

  return ALL_SLOTS.filter(
    (slot) => !bookedTimes.has(slot) && !blockedTimes.has(slot)
  );
}

// ─── Créer un rendez-vous ────────────────────────────────────────────────────

export async function createAppointment(
  data: InsertAppointment
): Promise<Appointment> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(appointments).values(data);

  // Récupérer le RDV inséré
  const [inserted] = await db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.clientEmail, data.clientEmail),
        sql`${appointments.appointmentDate} = ${data.appointmentDate}`,
        eq(appointments.appointmentTime, data.appointmentTime)
      )
    )
    .limit(1);

  if (!inserted) throw new Error("Failed to retrieve created appointment");
  return inserted;
}

// ─── Lister les rendez-vous (admin) ─────────────────────────────────────────

export async function listAppointments(filters?: {
  status?: "pending" | "confirmed" | "cancelled";
  from?: string;
  to?: string;
}): Promise<Appointment[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(appointments.status, filters.status));
  }
  if (filters?.from) {
    conditions.push(sql`${appointments.appointmentDate} >= ${filters.from}`);
  }
  if (filters?.to) {
    conditions.push(sql`${appointments.appointmentDate} <= ${filters.to}`);
  }

  const rows = await db
    .select()
    .from(appointments)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(appointments.appointmentDate, appointments.appointmentTime);

  return rows;
}

// ─── Mettre à jour le statut d'un RDV ───────────────────────────────────────

export async function updateAppointmentStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled",
  adminNotes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Partial<Appointment> = { status };
  if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

  await db
    .update(appointments)
    .set(updateData)
    .where(eq(appointments.id, id));
}

// ─── Supprimer un RDV ────────────────────────────────────────────────────────

export async function deleteAppointment(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(appointments).where(eq(appointments.id, id));
}

// ─── Bloquer un créneau ──────────────────────────────────────────────────────

export async function blockSlot(data: InsertBlockedSlot): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blockedSlots).values(data);
}

// ─── Débloquer un créneau ────────────────────────────────────────────────────

export async function unblockSlot(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blockedSlots).where(eq(blockedSlots.id, id));
}

// ─── Lister les créneaux bloqués ─────────────────────────────────────────────

export async function listBlockedSlots(from?: string, to?: string) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];
  if (from) conditions.push(sql`${blockedSlots.blockedDate} >= ${from}`);
  if (to) conditions.push(sql`${blockedSlots.blockedDate} <= ${to}`);

  return db
    .select()
    .from(blockedSlots)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(blockedSlots.blockedDate);
}
