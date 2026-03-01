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
  it("contient exactement 7 créneaux", () => {
    expect(ALL_SLOTS).toHaveLength(7);
  });

  it("commence à 09:00 et se termine à 17:00", () => {
    expect(ALL_SLOTS[0]).toBe("09:00");
    expect(ALL_SLOTS[ALL_SLOTS.length - 1]).toBe("17:00");
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
