/* ============================================================
   Page Prise de Rendez-Vous — Les Petits Papiers Faciles
   Style : Clarté Provençale
   Flux : 1. Choisir date → 2. Choisir créneau → 3. Remplir formulaire → 4. Confirmation
   ============================================================ */

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format, addMonths, isBefore, startOfDay } from "date-fns";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceType =
  | "aide-administrative"
  | "apprentissage-numerique"
  | "premiere-seance"
  | "autre";

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  {
    value: "premiere-seance",
    label: "Première séance découverte",
    desc: "Gratuite — pour faire connaissance et évaluer vos besoins",
  },
  {
    value: "aide-administrative",
    label: "Aide administrative",
    desc: "Impôts, retraite, courriers, factures, espaces en ligne",
  },
  {
    value: "apprentissage-numerique",
    label: "Apprentissage numérique",
    desc: "Internet, emails, démarches en ligne, scanner des documents",
  },
  {
    value: "autre",
    label: "Autre demande",
    desc: "Précisez votre besoin dans le message",
  },
];

// ─── Composant principal ──────────────────────────────────────────────────────

export default function RendezVous() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "premiere-seance" as ServiceType,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedId, setConfirmedId] = useState<number | null>(null);

  // Formatage de la date pour l'API
  const dateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : "";

  // Récupérer les créneaux disponibles
  const { data: slotsData, isLoading: slotsLoading } =
    trpc.appointments.getAvailableSlots.useQuery(
      { date: dateStr },
      { enabled: !!dateStr }
    );

  // Mutation de création
  const createMutation = trpc.appointments.create.useMutation({
    onSuccess: (data) => {
      setConfirmedId(data.appointmentId);
      setStep(4);
    },
    onError: (err) => {
      setErrors({ submit: err.message });
    },
  });

  // Réinitialiser le créneau si la date change
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  // ─── Validation formulaire ──────────────────────────────────────────────────

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.clientName.trim() || form.clientName.trim().length < 2) {
      newErrors.clientName = "Veuillez indiquer votre nom complet.";
    }
    if (!form.clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) {
      newErrors.clientEmail = "Adresse email invalide.";
    }
    if (!form.clientPhone.trim() || form.clientPhone.trim().length < 8) {
      newErrors.clientPhone = "Numéro de téléphone invalide.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ─── Soumission ─────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    createMutation.mutate({
      ...form,
      appointmentDate: dateStr,
      appointmentTime: selectedTime,
      message: form.message || undefined,
    });
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 3);

  function isDateDisabled(date: Date): boolean {
    if (isBefore(date, today)) return true;
    if (date > maxDate) return true;
    const day = date.getDay();
    return day === 0; // Dimanche désactivé
  }

  function formatDateFr(date: Date): string {
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  }

  // ─── Rendu ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ paddingTop: "72px", minHeight: "100vh", backgroundColor: "oklch(0.94 0.02 80)" }}>
      {/* En-tête */}
      <section
        className="py-14"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-4xl md:text-5xl font-semibold mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Prendre rendez-vous
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.88 0.03 80)",
            }}
          >
            Choisissez une date et un créneau qui vous convient. La première séance est offerte.
          </p>

          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { n: 1, label: "Date" },
              { n: 2, label: "Créneau" },
              { n: 3, label: "Vos infos" },
              { n: 4, label: "Confirmé" },
            ].map(({ n, label }, i, arr) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                    style={{
                      backgroundColor:
                        step > n
                          ? "oklch(0.75 0.10 145)"
                          : step === n
                          ? "oklch(0.97 0.01 80)"
                          : "oklch(0.55 0.04 145)",
                      color:
                        step === n
                          ? "oklch(0.30 0.07 145)"
                          : "oklch(0.97 0.01 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {step > n ? <CheckCircle2 size={16} /> : n}
                  </div>
                  <span
                    className="text-xs hidden sm:block"
                    style={{
                      color: step >= n ? "oklch(0.95 0.01 80)" : "oklch(0.70 0.04 145)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="w-8 h-0.5 mb-4"
                    style={{
                      backgroundColor:
                        step > n ? "oklch(0.75 0.10 145)" : "oklch(0.55 0.04 145)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">

          {/* ── ÉTAPE 1 : Calendrier ── */}
          {step === 1 && (
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                boxShadow: "0 4px 24px oklch(0.42 0.06 145 / 0.10)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays size={22} style={{ color: "oklch(0.42 0.06 145)" }} />
                <h2
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Choisissez une date
                </h2>
              </div>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Disponible du lundi au samedi. Les dimanches sont non travaillés.
              </p>

              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  locale={fr}
                  className="rounded-xl border"
                  style={{ borderColor: "oklch(0.88 0.03 80)" }}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => selectedDate && setStep(2)}
                  disabled={!selectedDate}
                  className="flex items-center gap-2 px-8 py-3 rounded font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.97 0.01 80)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 2 : Créneaux horaires ── */}
          {step === 2 && (
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                boxShadow: "0 4px 24px oklch(0.42 0.06 145 / 0.10)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock size={22} style={{ color: "oklch(0.42 0.06 145)" }} />
                <h2
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Choisissez un créneau
                </h2>
              </div>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {selectedDate && (
                  <span className="font-medium" style={{ color: "oklch(0.42 0.06 145)" }}>
                    {formatDateFr(selectedDate).charAt(0).toUpperCase() + formatDateFr(selectedDate).slice(1)}
                  </span>
                )}
              </p>

              {slotsLoading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <Loader2 size={24} className="animate-spin" style={{ color: "oklch(0.42 0.06 145)" }} />
                  <span style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    Vérification des disponibilités…
                  </span>
                </div>
              ) : slotsData?.slots.length === 0 ? (
                <div
                  className="text-center py-10 rounded-xl"
                  style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                >
                  <p
                    className="text-base font-medium mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Aucun créneau disponible ce jour
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Veuillez choisir une autre date.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slotsData?.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className="py-3 rounded-xl text-sm font-semibold transition-all border-2"
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        backgroundColor:
                          selectedTime === slot
                            ? "oklch(0.42 0.06 145)"
                            : "oklch(0.96 0.01 80)",
                        color:
                          selectedTime === slot
                            ? "oklch(0.97 0.01 80)"
                            : "oklch(0.35 0.02 65)",
                        borderColor:
                          selectedTime === slot
                            ? "oklch(0.42 0.06 145)"
                            : "oklch(0.88 0.03 80)",
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all"
                  style={{
                    backgroundColor: "oklch(0.92 0.02 80)",
                    color: "oklch(0.35 0.02 65)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  <ArrowLeft size={16} />
                  Retour
                </button>
                <button
                  onClick={() => selectedTime && setStep(3)}
                  disabled={!selectedTime}
                  className="flex items-center gap-2 px-8 py-3 rounded font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.97 0.01 80)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 : Formulaire ── */}
          {step === 3 && (
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                boxShadow: "0 4px 24px oklch(0.42 0.06 145 / 0.10)",
              }}
            >
              {/* Récapitulatif date/heure */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl mb-6"
                style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
              >
                <CalendarDays size={20} style={{ color: "oklch(0.42 0.06 145)" }} />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.30 0.07 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {selectedDate && (
                      <>
                        {formatDateFr(selectedDate).charAt(0).toUpperCase() + formatDateFr(selectedDate).slice(1)}
                        {" "}à{" "}
                        <span>{selectedTime}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <User size={22} style={{ color: "oklch(0.42 0.06 145)" }} />
                <h2
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Vos coordonnées
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nom */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Nom et prénom *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.60 0.02 65)" }} />
                    <input
                      type="text"
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      placeholder="Marie Dupont"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.clientName ? "oklch(0.60 0.20 30)" : "oklch(0.85 0.03 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                        backgroundColor: "oklch(0.99 0.005 80)",
                      }}
                    />
                  </div>
                  {errors.clientName && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.20 30)" }}>
                      {errors.clientName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Adresse email *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.60 0.02 65)" }} />
                    <input
                      type="email"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      placeholder="marie.dupont@email.fr"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.clientEmail ? "oklch(0.60 0.20 30)" : "oklch(0.85 0.03 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                        backgroundColor: "oklch(0.99 0.005 80)",
                      }}
                    />
                  </div>
                  {errors.clientEmail && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.20 30)" }}>
                      {errors.clientEmail}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.60 0.02 65)" }} />
                    <input
                      type="tel"
                      value={form.clientPhone}
                      onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                      placeholder="06 12 34 56 78"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.clientPhone ? "oklch(0.60 0.20 30)" : "oklch(0.85 0.03 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                        backgroundColor: "oklch(0.99 0.005 80)",
                      }}
                    />
                  </div>
                  {errors.clientPhone && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.20 30)" }}>
                      {errors.clientPhone}
                    </p>
                  )}
                </div>

                {/* Type de service */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Type d'accompagnement souhaité *
                  </label>
                  <div className="space-y-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all"
                        style={{
                          borderColor:
                            form.serviceType === opt.value
                              ? "oklch(0.42 0.06 145)"
                              : "oklch(0.88 0.03 80)",
                          backgroundColor:
                            form.serviceType === opt.value
                              ? "oklch(0.95 0.02 145)"
                              : "oklch(0.99 0.005 80)",
                        }}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={opt.value}
                          checked={form.serviceType === opt.value}
                          onChange={() => setForm({ ...form, serviceType: opt.value })}
                          className="mt-0.5 accent-green-700"
                        />
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color:
                                form.serviceType === opt.value
                                  ? "oklch(0.30 0.07 145)"
                                  : "oklch(0.35 0.02 65)",
                              fontFamily: "'Source Sans 3', sans-serif",
                            }}
                          >
                            {opt.label}
                            {opt.value === "premiere-seance" && (
                              <span
                                className="ml-2 text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: "oklch(0.42 0.06 145)",
                                  color: "oklch(0.97 0.01 80)",
                                }}
                              >
                                Offerte
                              </span>
                            )}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            {opt.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Message (optionnel)
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3 top-3" style={{ color: "oklch(0.60 0.02 65)" }} />
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Décrivez brièvement votre situation ou vos besoins…"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none transition-all resize-none"
                      style={{
                        borderColor: "oklch(0.85 0.03 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                        backgroundColor: "oklch(0.99 0.005 80)",
                      }}
                    />
                  </div>
                </div>

                {/* Erreur de soumission */}
                {errors.submit && (
                  <div
                    className="p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: "oklch(0.95 0.05 30)",
                      color: "oklch(0.45 0.20 30)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {errors.submit}
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all"
                    style={{
                      backgroundColor: "oklch(0.92 0.02 80)",
                      color: "oklch(0.35 0.02 65)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    <ArrowLeft size={16} />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex items-center gap-2 px-8 py-3 rounded font-semibold transition-all disabled:opacity-60"
                    style={{
                      backgroundColor: "oklch(0.42 0.06 145)",
                      color: "oklch(0.97 0.01 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {createMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Confirmer le rendez-vous
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── ÉTAPE 4 : Confirmation ── */}
          {step === 4 && (
            <div
              className="rounded-2xl p-10 text-center"
              style={{
                backgroundColor: "oklch(0.98 0.01 80)",
                boxShadow: "0 4px 24px oklch(0.42 0.06 145 / 0.10)",
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
              >
                <CheckCircle2 size={40} style={{ color: "oklch(0.42 0.06 145)" }} />
              </div>

              <h2
                className="text-3xl font-semibold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Rendez-vous confirmé !
              </h2>

              <p
                className="text-base mb-2"
                style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Votre demande a bien été enregistrée.
              </p>

              {selectedDate && selectedTime && (
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl my-4"
                  style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                >
                  <CalendarDays size={18} style={{ color: "oklch(0.42 0.06 145)" }} />
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.30 0.07 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {formatDateFr(selectedDate).charAt(0).toUpperCase() + formatDateFr(selectedDate).slice(1)}
                    {" "}à{" "}{selectedTime}
                  </span>
                </div>
              )}

              <p
                className="text-sm mt-4 mb-8 max-w-md mx-auto"
                style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Je vous contacterai rapidement pour confirmer le rendez-vous et vous communiquer les détails pratiques.
                En cas de besoin, n'hésitez pas à m'appeler au{" "}
                <a href="tel:0750527227" style={{ color: "oklch(0.42 0.06 145)", fontWeight: 600 }}>
                  07 50 52 72 27
                </a>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold transition-all"
                  style={{
                    backgroundColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.97 0.01 80)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Retour à l'accueil
                </a>
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedDate(undefined);
                    setSelectedTime("");
                    setForm({
                      clientName: "",
                      clientEmail: "",
                      clientPhone: "",
                      serviceType: "premiere-seance",
                      message: "",
                    });
                    setErrors({});
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold transition-all border-2"
                  style={{
                    borderColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.42 0.06 145)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Nouveau rendez-vous
                </button>
              </div>

              {/* Note étoile */}
              <div className="flex items-center justify-center gap-1 mt-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="oklch(0.75 0.12 80)" style={{ color: "oklch(0.75 0.12 80)" }} />
                ))}
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: "oklch(0.60 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Première séance découverte offerte — sans engagement
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
