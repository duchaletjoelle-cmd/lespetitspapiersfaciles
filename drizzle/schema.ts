import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Rendez-vous — système de prise de RDV en ligne
 * Chaque ligne représente une réservation faite par un visiteur.
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),

  // Informations du client
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 30 }).notNull(),

  // Date et créneau (stocké en UTC)
  appointmentDate: date("appointmentDate").notNull(),
  appointmentTime: varchar("appointmentTime", { length: 5 }).notNull(), // "09:00"

  // Type de service
  serviceType: mysqlEnum("serviceType", [
    "aide-administrative",
    "apprentissage-numerique",
    "premiere-seance",
    "autre",
  ])
    .notNull()
    .default("premiere-seance"),

  // Message optionnel
  message: text("message"),

  // Statut du RDV
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"])
    .notNull()
    .default("pending"),

  // Notes internes (visibles uniquement par l'admin)
  adminNotes: text("adminNotes"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Blocked slots — créneaux bloqués manuellement par l'admin
 */
export const blockedSlots = mysqlTable("blocked_slots", {
  id: int("id").autoincrement().primaryKey(),
  blockedDate: date("blockedDate").notNull(),
  blockedTime: varchar("blockedTime", { length: 5 }), // null = journée entière bloquée
  reason: varchar("reason", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlockedSlot = typeof blockedSlots.$inferSelect;
export type InsertBlockedSlot = typeof blockedSlots.$inferInsert;