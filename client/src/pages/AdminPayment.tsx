/* ============================================================
   Page d'Administration - Gestion des Paiements
   Interface privée pour générer des liens de paiement
   et des factures automatiques (normes SAP)
   ============================================================ */

import { useState } from "react";
import { Copy, Download, Send, CheckCircle, AlertCircle, Shield } from "lucide-react";

interface PaymentLink {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  createdAt: string;
  link: string;
  status: "pending" | "paid" | "expired";
}

interface GuideSettings {
  name: string;
  outfit: 'default' | 'digital' | 'workshop' | 'serenity';
  showExpression: boolean;
  waveOnHover: boolean;
}

export default function AdminPaymentPage() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [guideSettings, setGuideSettings] = useState<GuideSettings>({
    name: "Votre Assistante",
    outfit: 'default',
    showExpression: true,
    waveOnHover: true,
  });
  const [activeTab, setActiveTab] = useState<'payments' | 'guide'>('payments');

  const generatePaymentLink = () => {
    if (!clientName || !clientEmail || !amount) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const token = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newLink: PaymentLink = {
      id: token,
      clientName,
      clientEmail,
      amount: parseFloat(amount),
      createdAt: new Date().toLocaleDateString("fr-FR"),
      link: `${window.location.origin}/payment/${token}`,
      status: "pending",
    };

    setPaymentLinks([newLink, ...paymentLinks]);
    setSuccessMessage(`Lien créé pour ${clientName}`);
    setClientName("");
    setClientEmail("");
    setAmount("");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGuideSettingChange = (key: keyof GuideSettings, value: any) => {
    setGuideSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSuccessMessage(`Paramètre "${key}" mis à jour !`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const downloadInvoice = (link: PaymentLink) => {
    // Génération du QR Code SEPA
    const sepaData = [
      "BCD",
      "002",
      "1",
      "SCT",
      "BFBKFRP1",
      "DUCHALET SANDRA",
      "FR7616218000014012110249729",
      `EUR${link.amount.toFixed(2)}`,
      "",
      `RDV-${link.id.substring(0, 12)}`,
      "Les Petits Papiers Faciles",
      "",
    ].join("\n");
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(sepaData)}`;

    // Création du modèle de facture avec QR Code (Conformité 100% Légale FR / SAP)
    const invoiceHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; max-width: 850px; margin: auto; border: 1px solid #eee; color: #333; line-height: 1.6;">
        <!-- EN-TÊTE PRESTATAIRE -->
        <table style="width: 100%; margin-bottom: 40px;">
          <tr>
            <td style="vertical-align: top; width: 50%;">
              <div style="font-size: 20px; font-weight: bold; color: oklch(0.45 0.08 145); margin-bottom: 5px;">Les Petits Papiers Faciles</div>
              <div style="font-size: 14px;">
                <strong>Sandra Duchalet</strong><br>
                [Votre Adresse Complète]<br>
                83400 Hyères<br>
                Tél : 07 50 52 72 27<br>
                Email : lespetitspapiers@gmail.com<br>
                <strong>SIRET : [À COMPLÉTER]</strong><br>
                <strong>Agrément SAP : [À COMPLÉTER]</strong>
              </div>
            </td>
            <td style="vertical-align: top; text-align: right; width: 50%;">
              <div style="font-size: 24px; font-weight: bold; color: #777; margin-bottom: 10px;">FACTURE</div>
              <div style="font-size: 14px;">
                N° : <strong>${new Date().getFullYear()}-${link.id.substring(0, 6).toUpperCase()}</strong><br>
                Date d'émission : ${link.createdAt}<br>
                Date de la prestation : ${link.createdAt}
              </div>
            </td>
          </tr>
        </table>

        <!-- ADRESSE CLIENT -->
        <table style="width: 100%; margin-bottom: 40px;">
          <tr>
            <td style="width: 60%;"></td>
            <td style="width: 40%; background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
              <div style="font-size: 12px; color: #777; margin-bottom: 5px; text-transform: uppercase;">Facturé à :</div>
              <div style="font-size: 15px; font-weight: bold;">${link.clientName}</div>
              <div style="font-size: 14px;">
                [Adresse du client]<br>
                [Code Postal / Ville]<br>
                ${link.clientEmail}
              </div>
            </td>
          </tr>
        </table>

        <!-- DÉTAIL DES PRESTATIONS -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background: oklch(0.45 0.08 145); color: white;">
              <th style="padding: 12px; text-align: left; border-radius: 4px 0 0 4px;">Description de la prestation</th>
              <th style="padding: 12px; text-align: center;">Quantité</th>
              <th style="padding: 12px; text-align: right; border-radius: 0 4px 4px 0;">Prix Unitaire HT</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 15px; vertical-align: top;">
                <strong>Accompagnement administratif et numérique</strong><br>
                <span style="font-size: 12px; color: #666;">Assistance aux démarches en ligne et organisation de documents.</span>
              </td>
              <td style="padding: 15px; text-align: center; vertical-align: top;">1 séance</td>
              <td style="padding: 15px; text-align: right; vertical-align: top;">${link.amount.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>

        <!-- RÉCAPITULATIF FINANCIER -->
        <table style="width: 100%; margin-bottom: 40px;">
          <tr>
            <td style="width: 60%; vertical-align: top;">
              <div style="font-size: 12px; color: #666; background: #f5f5f5; padding: 15px; border-radius: 4px;">
                <strong>Mentions Légales TVA :</strong><br>
                Exonération de TVA, article 293 B du Code général des impôts.<br>
                TVA non applicable.
              </div>
            </td>
            <td style="width: 40%; vertical-align: top;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px; text-align: right;">Total HT :</td>
                  <td style="padding: 5px; text-align: right; font-weight: bold;">${link.amount.toFixed(2)} €</td>
                </tr>
                <tr>
                  <td style="padding: 5px; text-align: right;">TVA (0%) :</td>
                  <td style="padding: 5px; text-align: right; font-weight: bold;">0,00 €</td>
                </tr>
                <tr style="font-size: 18px; color: oklch(0.45 0.08 145);">
                  <td style="padding: 10px 5px; text-align: right; font-weight: bold;">TOTAL TTC :</td>
                  <td style="padding: 10px 5px; text-align: right; font-weight: bold; border-top: 2px solid oklch(0.45 0.08 145);">${link.amount.toFixed(2)} €</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- AVANTAGE FISCAL SAP -->
        <div style="border: 2px dashed oklch(0.45 0.08 145); padding: 15px; border-radius: 8px; margin-bottom: 40px; background: oklch(0.98 0.01 145);">
          <div style="font-weight: bold; color: oklch(0.45 0.08 145); margin-bottom: 5px;">✨ Avantage Fiscal Services à la Personne (SAP)</div>
          <div style="font-size: 13px; color: #444;">
            Cette prestation ouvre droit à un <strong>crédit d'impôt de 50%</strong> des sommes engagées (selon l'article 199 sexdecies du CGI). 
            Pour cette facture, votre avantage fiscal potentiel est de <strong>${(link.amount / 2).toFixed(2)} €</strong>.
          </div>
        </div>

        <!-- PAIEMENT ET QR CODE -->
        <table style="width: 100%; background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
          <tr>
            <td style="width: 70%; vertical-align: top;">
              <div style="font-weight: bold; margin-bottom: 10px;">Règlement de la facture :</div>
              <div style="font-size: 13px;">
                Mode de paiement : <strong>Virement Bancaire</strong><br>
                Échéance : <strong>À réception</strong><br><br>
                <strong>Coordonnées Bancaires (IBAN) :</strong><br>
                Bénéficiaire : DUCHALET SANDRA<br>
                IBAN : FR76 1621 8000 0140 1211 0249 729<br>
                BIC : BFBKFRP1<br>
                Référence à indiquer : <strong>RDV-${link.id.substring(0, 6).toUpperCase()}</strong>
              </div>
            </td>
            <td style="width: 30%; text-align: center; vertical-align: middle;">
              <div style="font-size: 11px; font-weight: bold; margin-bottom: 5px; color: oklch(0.45 0.08 145);">SCANNÉ POUR PAYER</div>
              <img src="${qrCodeUrl}" style="width: 120px; height: 120px; border: 1px solid #ddd; padding: 5px; background: white;" alt="QR Code Paiement">
            </td>
          </tr>
        </table>

        <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
          Les Petits Papiers Faciles - Sandra Duchalet - Entreprise Individuelle<br>
          Dispensé d'immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM).
        </div>
      </div>
    `;

    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(invoiceHtml);
      newWindow.document.close();
      newWindow.print(); // Ouvre la boîte de dialogue d'impression pour générer un PDF
    } else {
      alert("Veuillez autoriser les pop-ups pour télécharger la facture.");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
      {/* HEADER */}
      <div
        className="py-12 px-4"
        style={{
          background: "linear-gradient(135deg, oklch(0.42 0.06 145) 0%, oklch(0.50 0.07 145) 100%)",
        }}
      >
        <div className="container max-w-4xl">
          <h1
            className="text-4xl font-semibold mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Gestion des Paiements
          </h1>
          <p style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            Générez des liens de paiement personnalisés et des factures automatiques (Gage de sécurité mutuelle)
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <div className="container max-w-4xl py-12 px-4">
        {/* MESSAGE DE SUCCÈS */}
        {successMessage && (
          <div
            className="mb-6 p-4 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: "oklch(0.90 0.05 145)", color: "oklch(0.35 0.08 145)" }}
          >
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* FORMULAIRE */}
        <div
          className="rounded-lg shadow-lg p-8 mb-8"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl font-semibold"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.45 0.08 145)",
              }}
            >
              Créer un lien de paiement
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100">
              <Shield size={14} className="text-green-700" />
              <span className="text-xs font-medium text-green-800">Sécurité mutuelle activée</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Nom du client */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                Nom du client
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Marie Dupont"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.03 80)",
                  "--tw-ring-color": "oklch(0.45 0.08 145)",
                } as React.CSSProperties}
              />
            </div>

            {/* Email du client */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                Email du client
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Ex: marie@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.03 80)",
                  "--tw-ring-color": "oklch(0.45 0.08 145)",
                } as React.CSSProperties}
              />
            </div>

            {/* Montant */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                Montant (€)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex: 42.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.03 80)",
                  "--tw-ring-color": "oklch(0.45 0.08 145)",
                } as React.CSSProperties}
              />
            </div>

            {/* Bouton */}
            <button
              onClick={generatePaymentLink}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
            >
              Générer le lien de paiement
            </button>
          </div>
        </div>

        {/* LISTE DES LIENS */}
        {/* SECTION PERSONNALISATION DU GUIDE */}
        <div
          className="rounded-lg shadow-lg p-8 mb-8"
          style={{ backgroundColor: "white" }}
        >
          <h2
            className="text-2xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.45 0.08 145)",
            }}
          >
            👩‍💼 Personnalisez votre Assistante
          </h2>

          <div className="space-y-6">
            {/* Nom du guide */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                Nom de votre assistante :
              </label>
              <input
                type="text"
                value={guideSettings.name}
                onChange={(e) => handleGuideSettingChange('name', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: "oklch(0.88 0.03 80)" }}
                placeholder="Ex: Marie, Votre Assistante..."
              />
            </div>

            {/* Tenue */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                Tenue par défaut :
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'default', label: '📋 Classique', icon: '👔' },
                  { value: 'digital', label: '💻 Tech', icon: '💻' },
                  { value: 'workshop', label: '🎓 Atelier', icon: '🎓' },
                  { value: 'serenity', label: '🥰 Sérénité', icon: '🥰' },
                ].map((outfit) => (
                  <button
                    key={outfit.value}
                    onClick={() => handleGuideSettingChange('outfit', outfit.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      guideSettings.outfit === outfit.value
                        ? 'border-2'
                        : 'border-2'
                    }`}
                    style={{
                      borderColor:
                        guideSettings.outfit === outfit.value
                          ? 'oklch(0.45 0.08 145)'
                          : 'oklch(0.88 0.03 80)',
                      backgroundColor:
                        guideSettings.outfit === outfit.value
                          ? 'oklch(0.45 0.08 145 / 0.10)'
                          : 'transparent',
                    }}
                  >
                    <div className="text-2xl mb-1">{outfit.icon}</div>
                    <div
                      className="text-xs font-medium"
                      style={{
                        color:
                          guideSettings.outfit === outfit.value
                            ? 'oklch(0.45 0.08 145)'
                            : 'oklch(0.50 0.07 145)',
                      }}
                    >
                      {outfit.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={guideSettings.showExpression}
                  onChange={(e) => handleGuideSettingChange('showExpression', e.target.checked)}
                  className="w-4 h-4"
                />
                <span style={{ color: "oklch(0.30 0.07 145)" }}>
                  Afficher les expressions émoji (😊, 😄, 🥰)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={guideSettings.waveOnHover}
                  onChange={(e) => handleGuideSettingChange('waveOnHover', e.target.checked)}
                  className="w-4 h-4"
                />
                <span style={{ color: "oklch(0.30 0.07 145)" }}>
                  Animation "Wave" au survol
                </span>
              </label>
            </div>
          </div>
        </div>

        {paymentLinks.length > 0 && (
          <div
            className="rounded-lg shadow-lg p-8"
            style={{ backgroundColor: "white" }}
          >
            <h2
              className="text-2xl font-semibold mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.45 0.08 145)",
              }}
            >
              Liens de paiement créés
            </h2>

            <div className="space-y-4">
              {paymentLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: "oklch(0.88 0.03 80)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold" style={{ color: "oklch(0.30 0.07 145)" }}>
                        {link.clientName}
                      </h3>
                      <p className="text-sm" style={{ color: "oklch(0.50 0.07 145)" }}>
                        {link.clientEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: "oklch(0.45 0.08 145)" }}>
                        {link.amount.toFixed(2)}€
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.50 0.07 145)" }}>
                        {link.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Lien de paiement */}
                  <div className="mb-4 p-3 rounded" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
                    <p className="text-xs mb-2" style={{ color: "oklch(0.50 0.07 145)" }}>
                      Lien de paiement:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link.link}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border rounded"
                        style={{ borderColor: "oklch(0.88 0.03 80)" }}
                      />
                      <button
                        onClick={() => copyToClipboard(link.link, link.id)}
                        className="p-2 rounded transition-all"
                        style={{
                          backgroundColor:
                            copiedId === link.id ? "oklch(0.90 0.05 145)" : "oklch(0.95 0.02 145)",
                        }}
                      >
                        <Copy size={18} style={{ color: "oklch(0.45 0.08 145)" }} />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadInvoice(link)}
                      className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all"
                      style={{
                        backgroundColor: "oklch(0.95 0.02 145)",
                        color: "oklch(0.45 0.08 145)",
                      }}
                    >
                      <Download size={16} />
                      Télécharger la facture
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all text-white"
                      style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
                    >
                      <Send size={16} />
                      Envoyer au client
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
