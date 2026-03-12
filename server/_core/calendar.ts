/**
 * Utilitaire pour générer des invitations de calendrier (.ics)
 * Les Petits Papiers Faciles
 */

import { createEvent, EventAttributes } from "ics";

/**
 * Génère une version simplifiée du fichier .ics en cas d'erreur
 */
function generateSimplifiedCalendarInvite(data: {
  clientName: string;
  clientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  message?: string;
}): string {
  const serviceDescriptions: Record<string, string> = {
    "premiere-seance": "Première séance découverte (Gratuite)",
    "aide-administrative": "Aide administrative",
    "apprentissage-numerique": "Apprentissage numérique",
    autre: "Autre demande",
  };
  const serviceDescription = serviceDescriptions[data.serviceType] || data.serviceType;
  const [year, month, day] = data.appointmentDate.split("-").map(Number);
  const [hours, minutes] = data.appointmentTime.split(":").map(Number);
  const startDateTime = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;
  const endDateTime = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hours + 1).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Les Petits Papiers Faciles//NONSGML v1.0//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
UID:${data.clientEmail}-${data.appointmentDate}T${data.appointmentTime}@lespetitspapiersfaciles.fr
CREATED:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DESCRIPTION:Service : ${serviceDescription}\\nClient : ${data.clientName}\\nEmail : ${data.clientEmail}${data.message ? `\\n\\nMessage du client :\\n${data.message}` : ""}
LAST-MODIFIED:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
LOCATION:À domicile (Hyères, Carqueiranne et communes environnantes)
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Rendez-vous - ${data.clientName}
TRANSP:OPAQUE
ORGANIZER;CN=Les Petits Papiers Faciles:mailto:lespetitspapiersfaciles@gmail.com
ATTENDEE;CN=${data.clientName};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${data.clientEmail}
END:VEVENT
END:VCALENDAR`;
}

/**
 * Génère une version simplifiée du fichier .ics pour le client en cas d'erreur
 */
function generateSimplifiedClientCalendarInvite(data: {
  clientName: string;
  clientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
}): string {
  const serviceDescriptions: Record<string, string> = {
    "premiere-seance": "Première séance découverte (Gratuite)",
    "aide-administrative": "Aide administrative",
    "apprentissage-numerique": "Apprentissage numérique",
    autre: "Autre demande",
  };
  const serviceDescription = serviceDescriptions[data.serviceType] || data.serviceType;
  const [year, month, day] = data.appointmentDate.split("-").map(Number);
  const [hours, minutes] = data.appointmentTime.split(":").map(Number);
  const startDateTime = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;
  const endDateTime = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hours + 1).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Les Petits Papiers Faciles//NONSGML v1.0//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
UID:${data.clientEmail}-${data.appointmentDate}T${data.appointmentTime}@lespetitspapiersfaciles.fr
CREATED:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DESCRIPTION:Rendez-vous avec Sandra Duchalet\\nService : ${serviceDescription}\\n\\nLieu : À votre domicile\\nHyères, Carqueiranne et communes environnantes\\n\\nTéléphone : 07 50 52 72 27\\nEmail : lespetitspapiersfaciles@gmail.com
LAST-MODIFIED:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
LOCATION:À votre domicile
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Rendez-vous - Les Petits Papiers Faciles
TRANSP:OPAQUE
ORGANIZER;CN=Les Petits Papiers Faciles:mailto:lespetitspapiersfaciles@gmail.com
END:VEVENT
END:VCALENDAR`;
}

/**
 * Génère le contenu d'un fichier .ics pour un rendez-vous
 */
export function generateCalendarInvite(data: {
  clientName: string;
  clientEmail: string;
  appointmentDate: string; // Format: YYYY-MM-DD
  appointmentTime: string; // Format: HH:MM
  serviceType: string;
  message?: string;
}): string {
  // Combiner la date et l'heure pour créer un objet Date
  const [year, month, day] = data.appointmentDate.split("-").map(Number);
  const [hours, minutes] = data.appointmentTime.split(":").map(Number);

  // Créer la date de début (fuseau horaire local)
  const startDate: [number, number, number, number, number] = [
    year,
    month,
    day,
    hours,
    minutes,
  ];

  // Créer la date de fin (1 heure après le début)
  const endDate: [number, number, number, number, number] = [
    year,
    month,
    day,
    hours + 1,
    minutes,
  ];

  // Mapper les types de service à des descriptions lisibles
  const serviceDescriptions: Record<string, string> = {
    "premiere-seance": "Première séance découverte (Gratuite)",
    "aide-administrative": "Aide administrative",
    "apprentissage-numerique": "Apprentissage numérique",
    autre: "Autre demande",
  };

  const serviceDescription = serviceDescriptions[data.serviceType] || data.serviceType;

  // Construire la description de l'événement
  let description = `Service : ${serviceDescription}\nClient : ${data.clientName}\nEmail : ${data.clientEmail}`;
  if (data.message) {
    description += `\n\nMessage du client :\n${data.message}`;
  }

  // Créer l'événement
  const event: EventAttributes = {
    title: `Rendez-vous - ${data.clientName}`,
    description: description,
    startInputType: "local",
    start: startDate,
    end: endDate,
    location: "À domicile (Hyères, Carqueiranne et communes environnantes)",
    organizer: {
      name: "Les Petits Papiers Faciles",
      email: "lespetitspapiersfaciles@gmail.com",
    },
    attendees: [
      {
        name: data.clientName,
        email: data.clientEmail,
        role: "REQ-PARTICIPANT",
        partstat: "NEEDS-ACTION",
        rsvp: true,
      },
    ],
  };

  // Générer le fichier .ics
  const { error, value } = createEvent(event);

  if (error) {
    console.error("[Calendar] Error generating .ics file:", error);
    // Retourner une version simplifiée si la génération échoue
    return generateSimplifiedCalendarInvite(data);
  }

  return value || "";
}

/**
 * Génère le contenu d'un fichier .ics pour envoyer au client
 */
export function generateClientCalendarInvite(data: {
  clientName: string;
  clientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
}): string {
  const [year, month, day] = data.appointmentDate.split("-").map(Number);
  const [hours, minutes] = data.appointmentTime.split(":").map(Number);

  const startDate: [number, number, number, number, number] = [
    year,
    month,
    day,
    hours,
    minutes,
  ];

  const endDate: [number, number, number, number, number] = [
    year,
    month,
    day,
    hours + 1,
    minutes,
  ];

  const serviceDescriptions: Record<string, string> = {
    "premiere-seance": "Première séance découverte (Gratuite)",
    "aide-administrative": "Aide administrative",
    "apprentissage-numerique": "Apprentissage numérique",
    autre: "Autre demande",
  };

  const serviceDescription = serviceDescriptions[data.serviceType] || data.serviceType;

  const event: EventAttributes = {
    title: `Rendez-vous - Les Petits Papiers Faciles`,
    description: `Rendez-vous avec Sandra Duchalet\nService : ${serviceDescription}\n\nLieu : À votre domicile\nHyères, Carqueiranne et communes environnantes\n\nTéléphone : 07 50 52 72 27\nEmail : lespetitspapiersfaciles@gmail.com`,
    startInputType: "local",
    start: startDate,
    end: endDate,
    duration: { hours: 1, minutes: 0 },
    location: "À votre domicile",
    organizer: {
      name: "Les Petits Papiers Faciles",
      email: "lespetitspapiersfaciles@gmail.com",
    },
  };

  const { error, value } = createEvent(event);

  if (error) {
    console.error("[Calendar] Error generating client .ics file:", error);
    // Retourner une version simplifiée si la génération échoue
    return generateSimplifiedClientCalendarInvite(data);
  }

  return value || "";
}
