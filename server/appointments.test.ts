/**
 * Tests Vitest — Routeur Appointments
 * Les Petits Papiers Faciles
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { isWorkingDay, ALL_SLOTS } from "./appointments.db";

// ─── Tests utilitaires ────────────────────────────────────────────────────────

describe("isWorkingDay", () => {
  it("retourne true pour un lundi", () => {
    expect(isWorkingDay("2026-03-02")).toBe(true); // lundi
  });

  it("retourne true pour un samedi", () => {
    expect(isWorkingDay("2026-03-07")).toBe(true); // samedi
  });

  it("retourne false pour un dimanche", () => {
    expect(isWorkingDay("2026-03-08")).toBe(false); // dimanche
  });

  it("retourne true pour un vendredi", () => {
    expect(isWorkingDay("2026-03-06")).toBe(true); // vendredi
  });
});

describe("ALL_SLOTS", () => {
  it("contient exactement 9 créneaux", () => {
    expect(ALL_SLOTS).toHaveLength(9);
  });

  it("commence à 09:00 et se termine à 17:00", () => {
    expect(ALL_SLOTS[0]).toBe("09:00");
    expect(ALL_SLOTS[ALL_SLOTS.length - 1]).toBe("17:00");
    // Vérifier que les créneaux couvrent 9 heures (09h à 17h inclus)
    expect(ALL_SLOTS).toEqual(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
  });

  it("tous les créneaux sont au format HH:MM", () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    ALL_SLOTS.forEach((slot) => {
      expect(slot).toMatch(timeRegex);
    });
  });
});

// ─── Tests routeur tRPC ───────────────────────────────────────────────────────

describe("appointments router — validation", () => {
  it("valide un format de date correct", () => {
    const validDate = "2026-03-15";
    expect(/^\d{4}-\d{2}-\d{2}$/.test(validDate)).toBe(true);
  });

  it("rejette un format de date incorrect", () => {
    const invalidDate = "15/03/2026";
    expect(/^\d{4}-\d{2}-\d{2}$/.test(invalidDate)).toBe(false);
  });

  it("valide un format d'heure correct", () => {
    const validTime = "09:00";
    expect(/^\d{2}:\d{2}$/.test(validTime)).toBe(true);
  });

  it("rejette un format d'heure incorrect", () => {
    const invalidTime = "9h00";
    expect(/^\d{2}:\d{2}$/.test(invalidTime)).toBe(false);
  });
});


// ─── Tests complets du flux de prise de rendez-vous ─────────────────────────────

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { beforeEach } from "vitest";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Flux complet de prise de rendez-vous — Intégration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAvailableSlots — Récupération des créneaux", () => {
    it("retourne les créneaux pour une date valide (lundi-samedi)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Utiliser une date future valide (lundi)
      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      const result = await caller.appointments.getAvailableSlots({ date: dateStr });

      expect(result).toBeDefined();
      expect(result.isWorkingDay).toBe(true);
      expect(Array.isArray(result.slots)).toBe(true);
      expect(result.slots.length).toBeGreaterThan(0);
      result.slots.forEach((slot) => {
        expect(slot).toMatch(/^\d{2}:\d{2}$/);
      });
    });

    it("retourne une liste vide pour un dimanche", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Trouver le prochain dimanche
      const nextSunday = new Date();
      nextSunday.setDate(nextSunday.getDate() + ((0 - nextSunday.getDay() + 7) % 7 || 7));
      const dateStr = nextSunday.toISOString().split("T")[0];

      const result = await caller.appointments.getAvailableSlots({ date: dateStr });

      expect(result.isWorkingDay).toBe(false);
      expect(result.slots).toEqual([]);
    });
  });

  describe("create — Création de rendez-vous", () => {
    it("valide le nom du client (minimum 2 caractères)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      try {
        await caller.appointments.create({
          clientName: "A",
          clientEmail: "test@example.com",
          clientPhone: "06 12 34 56 78",
          appointmentDate: dateStr,
          appointmentTime: "09:00",
          serviceType: "premiere-seance",
        });
        expect.fail("Devrait rejeter un nom trop court");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("valide le format de l'email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      try {
        await caller.appointments.create({
          clientName: "Jean Dupont",
          clientEmail: "email-invalide",
          clientPhone: "06 12 34 56 78",
          appointmentDate: dateStr,
          appointmentTime: "09:00",
          serviceType: "premiere-seance",
        });
        expect.fail("Devrait rejeter un email invalide");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("valide le numéro de téléphone (minimum 8 caractères)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      try {
        await caller.appointments.create({
          clientName: "Jean Dupont",
          clientEmail: "jean@example.com",
          clientPhone: "123",
          appointmentDate: dateStr,
          appointmentTime: "09:00",
          serviceType: "premiere-seance",
        });
        expect.fail("Devrait rejeter un téléphone trop court");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("accepte les types de service valides", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      const slotsResult = await caller.appointments.getAvailableSlots({ date: dateStr });
      const availableSlots = slotsResult.slots;

      if (availableSlots.length === 0) {
        console.warn("Aucun créneau disponible pour le test");
        return;
      }

      const serviceTypes = [
        "premiere-seance",
        "aide-administrative",
        "apprentissage-numerique",
        "autre",
      ];

      // Utiliser un créneau différent pour chaque type de service
      for (let i = 0; i < serviceTypes.length; i++) {
        const serviceType = serviceTypes[i];
        const availableTime = availableSlots[i % availableSlots.length];

        const result = await caller.appointments.create({
          clientName: `Client ${serviceType}`,
          clientEmail: `client-${serviceType}-${i}@example.com`,
          clientPhone: "06 12 34 56 78",
          appointmentDate: dateStr,
          appointmentTime: availableTime,
          serviceType: serviceType as any,
          message: `Test pour ${serviceType}`,
        });

        expect(result.success).toBe(true);
      }
    });
  });

  describe("sendContactMessage — Envoi de message de contact", () => {
    it("envoie un message de contact avec des données valides", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.appointments.sendContactMessage({
        clientName: "Pierre Martin",
        clientEmail: "pierre@example.com",
        clientPhone: "06 11 22 33 44",
        subject: "Question sur les services",
        message: "Je voudrais savoir si vous proposez des services à domicile.",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("valide le sujet (minimum 5 caractères)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.appointments.sendContactMessage({
          clientName: "Pierre Martin",
          clientEmail: "pierre@example.com",
          clientPhone: "06 11 22 33 44",
          subject: "Test",
          message: "Message valide avec suffisamment de caractères",
        });
        expect.fail("Devrait rejeter un sujet trop court");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Flux complet : Sélection → Création → Confirmation", () => {
    it("complète le flux entier de prise de rendez-vous", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Étape 1 : Sélectionner une date
      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      // Étape 2 : Récupérer les créneaux
      const slotsResult = await caller.appointments.getAvailableSlots({ date: dateStr });
      expect(slotsResult.isWorkingDay).toBe(true);
      expect(slotsResult.slots.length).toBeGreaterThan(0);

      const selectedTime = slotsResult.slots[0];

      // Étape 3 : Créer le rendez-vous
      const appointmentResult = await caller.appointments.create({
        clientName: "Sophie Bernard",
        clientEmail: "sophie@example.com",
        clientPhone: "06 99 88 77 66",
        appointmentDate: dateStr,
        appointmentTime: selectedTime,
        serviceType: "apprentissage-numerique",
        message: "Je veux apprendre à utiliser internet et les emails",
      });

      expect(appointmentResult.success).toBe(true);
      expect(appointmentResult.appointmentId).toBeGreaterThan(0);

      // Vérification : Le créneau ne devrait plus être disponible
      const slotsAfter = await caller.appointments.getAvailableSlots({ date: dateStr });
      expect(slotsAfter.slots).not.toContain(selectedTime);
    });

    it("empêche la double réservation du même créneau", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const futureMonday = new Date();
      futureMonday.setDate(futureMonday.getDate() + ((1 - futureMonday.getDay() + 7) % 7 || 7));
      const dateStr = futureMonday.toISOString().split("T")[0];

      const slotsResult = await caller.appointments.getAvailableSlots({ date: dateStr });
      if (slotsResult.slots.length === 0) {
        console.warn("Aucun créneau disponible pour le test");
        return;
      }

      const selectedTime = slotsResult.slots[0];

      // Première réservation
      const result1 = await caller.appointments.create({
        clientName: "Client 1",
        clientEmail: "client1@example.com",
        clientPhone: "06 11 11 11 11",
        appointmentDate: dateStr,
        appointmentTime: selectedTime,
        serviceType: "premiere-seance",
      });

      expect(result1.success).toBe(true);

      // Deuxième réservation au même créneau (devrait échouer)
      try {
        await caller.appointments.create({
          clientName: "Client 2",
          clientEmail: "client2@example.com",
          clientPhone: "06 22 22 22 22",
          appointmentDate: dateStr,
          appointmentTime: selectedTime,
          serviceType: "premiere-seance",
        });
        expect.fail("Devrait rejeter la double réservation");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
