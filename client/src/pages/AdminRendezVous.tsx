/* ============================================================
   Page Admin — Gestion des Rendez-Vous
   Les Petits Papiers Faciles
   Accessible uniquement à l'administrateur (propriétaire)
   ============================================================ */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Trash2,
  XCircle,
  RefreshCw,
  ChevronDown,
  User,
  MessageSquare,
  Lock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "cancelled";

const STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  pending: {
    label: "En attente",
    color: "oklch(0.55 0.12 80)",
    bg: "oklch(0.96 0.04 80)",
    icon: <Clock size={13} />,
  },
  confirmed: {
    label: "Confirmé",
    color: "oklch(0.40 0.10 145)",
    bg: "oklch(0.95 0.03 145)",
    icon: <CheckCircle2 size={13} />,
  },
  cancelled: {
    label: "Annulé",
    color: "oklch(0.50 0.15 30)",
    bg: "oklch(0.96 0.04 30)",
    icon: <XCircle size={13} />,
  },
};

const SERVICE_LABELS: Record<string, string> = {
  "aide-administrative": "Aide administrative",
  "apprentissage-numerique": "Apprentissage numérique",
  "premiere-seance": "1ère séance découverte",
  "autre": "Autre",
};

// ─── Composant principal ──────────────────────────────────────────────────────

export default function AdminRendezVous() {
  const { user, loading } = useAuth();
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Requête liste
  const { data: appointments, isLoading, refetch } = trpc.appointments.list.useQuery(
    filterStatus !== "all" ? { status: filterStatus } : {}
  );

  // Mutations
  const updateStatus = trpc.appointments.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Statut mis à jour");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteAppt = trpc.appointments.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Rendez-vous supprimé");
    },
    onError: (err) => toast.error(err.message),
  });

  // ─── Garde accès ────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "72px" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "oklch(0.42 0.06 145)" }} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ paddingTop: "72px", backgroundColor: "oklch(0.94 0.02 80)" }}
      >
        <Lock size={48} style={{ color: "oklch(0.42 0.06 145)" }} />
        <h1
          className="text-3xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Accès réservé
        </h1>
        <p style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
          Cette page est réservée à l'administrateur du site.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded font-semibold"
          style={{
            backgroundColor: "oklch(0.42 0.06 145)",
            color: "oklch(0.97 0.01 80)",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          Retour à l'accueil
        </a>
      </div>
    );
  }

  // ─── Rendu admin ─────────────────────────────────────────────────────────────

  const counts = {
    all: appointments?.length ?? 0,
    pending: appointments?.filter((a) => a.status === "pending").length ?? 0,
    confirmed: appointments?.filter((a) => a.status === "confirmed").length ?? 0,
    cancelled: appointments?.filter((a) => a.status === "cancelled").length ?? 0,
  };

  return (
    <div style={{ paddingTop: "72px", minHeight: "100vh", backgroundColor: "oklch(0.94 0.02 80)" }}>
      {/* En-tête */}
      <section
        className="py-10"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.97 0.01 80)",
                }}
              >
                Gestion des rendez-vous
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.82 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Les Petits Papiers Faciles — Espace administration
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold self-start sm:self-auto"
              style={{
                backgroundColor: "oklch(0.55 0.05 145)",
                color: "oklch(0.97 0.01 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <RefreshCw size={14} />
              Actualiser
            </button>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => {
            const cfg = s !== "all" ? STATUS_CONFIG[s] : null;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="rounded-xl p-4 text-left transition-all border-2"
                style={{
                  backgroundColor: filterStatus === s ? (cfg?.bg ?? "oklch(0.95 0.02 145)") : "oklch(0.98 0.01 80)",
                  borderColor: filterStatus === s ? (cfg?.color ?? "oklch(0.42 0.06 145)") : "transparent",
                  boxShadow: "0 2px 8px oklch(0.42 0.06 145 / 0.08)",
                }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: cfg?.color ?? "oklch(0.42 0.06 145)",
                  }}
                >
                  {counts[s]}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {s === "all" ? "Total" : cfg?.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Liste */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <Loader2 size={24} className="animate-spin" style={{ color: "oklch(0.42 0.06 145)" }} />
            <span style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Chargement…
            </span>
          </div>
        ) : !appointments || appointments.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ backgroundColor: "oklch(0.98 0.01 80)" }}
          >
            <CalendarDays size={40} className="mx-auto mb-4" style={{ color: "oklch(0.75 0.03 80)" }} />
            <p
              className="text-lg font-medium"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Aucun rendez-vous
              {filterStatus !== "all" ? ` ${STATUS_CONFIG[filterStatus as AppointmentStatus].label.toLowerCase()}` : ""}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => {
              const cfg = STATUS_CONFIG[appt.status as AppointmentStatus];
              const isExpanded = expandedId === appt.id;
              const dateFormatted = (() => {
                try {
                  const d = new Date(appt.appointmentDate + "T12:00:00Z");
                  return format(d, "EEEE d MMMM yyyy", { locale: fr });
                } catch {
                  return appt.appointmentDate as unknown as string;
                }
              })();

              return (
                <div
                  key={appt.id}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    boxShadow: "0 2px 8px oklch(0.42 0.06 145 / 0.08)",
                  }}
                >
                  {/* Ligne principale */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : appt.id)}
                  >
                    {/* Statut badge */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0"
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </div>

                    {/* Infos principales */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className="font-semibold text-sm"
                          style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.25 0.02 65)" }}
                        >
                          {appt.clientName}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: "oklch(0.93 0.02 145)",
                            color: "oklch(0.40 0.06 145)",
                            fontFamily: "'Source Sans 3', sans-serif",
                          }}
                        >
                          {SERVICE_LABELS[appt.serviceType] ?? appt.serviceType}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-0.5 capitalize"
                        style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {dateFormatted} à {appt.appointmentTime}
                      </p>
                    </div>

                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform"
                      style={{
                        color: "oklch(0.60 0.02 65)",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>

                  {/* Détails expandables */}
                  {isExpanded && (
                    <div
                      className="px-4 pb-5 border-t"
                      style={{ borderColor: "oklch(0.90 0.02 80)" }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <Mail size={14} style={{ color: "oklch(0.55 0.02 65)" }} />
                          <a
                            href={`mailto:${appt.clientEmail}`}
                            className="text-sm"
                            style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            {appt.clientEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} style={{ color: "oklch(0.55 0.02 65)" }} />
                          <a
                            href={`tel:${appt.clientPhone}`}
                            className="text-sm"
                            style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            {appt.clientPhone}
                          </a>
                        </div>
                        {appt.message && (
                          <div className="flex items-start gap-2 sm:col-span-2">
                            <MessageSquare size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.02 65)" }} />
                            <p
                              className="text-sm"
                              style={{ color: "oklch(0.40 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                            >
                              {appt.message}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock size={14} style={{ color: "oklch(0.55 0.02 65)" }} />
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.60 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            Reçu le {new Date(appt.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t" style={{ borderColor: "oklch(0.90 0.02 80)" }}>
                        {appt.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus.mutate({ id: appt.id, status: "confirmed" })}
                            disabled={updateStatus.isPending}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              backgroundColor: "oklch(0.95 0.03 145)",
                              color: "oklch(0.40 0.10 145)",
                              fontFamily: "'Source Sans 3', sans-serif",
                            }}
                          >
                            <CheckCircle2 size={13} />
                            Confirmer
                          </button>
                        )}
                        {appt.status !== "pending" && (
                          <button
                            onClick={() => updateStatus.mutate({ id: appt.id, status: "pending" })}
                            disabled={updateStatus.isPending}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              backgroundColor: "oklch(0.96 0.04 80)",
                              color: "oklch(0.55 0.12 80)",
                              fontFamily: "'Source Sans 3', sans-serif",
                            }}
                          >
                            <Clock size={13} />
                            Remettre en attente
                          </button>
                        )}
                        {appt.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus.mutate({ id: appt.id, status: "cancelled" })}
                            disabled={updateStatus.isPending}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              backgroundColor: "oklch(0.96 0.04 30)",
                              color: "oklch(0.50 0.15 30)",
                              fontFamily: "'Source Sans 3', sans-serif",
                            }}
                          >
                            <XCircle size={13} />
                            Annuler
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm("Supprimer définitivement ce rendez-vous ?")) {
                              deleteAppt.mutate({ id: appt.id });
                            }
                          }}
                          disabled={deleteAppt.isPending}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ml-auto"
                          style={{
                            backgroundColor: "oklch(0.96 0.01 80)",
                            color: "oklch(0.55 0.02 65)",
                            fontFamily: "'Source Sans 3', sans-serif",
                          }}
                        >
                          <Trash2 size={13} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
