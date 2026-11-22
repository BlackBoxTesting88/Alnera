type LegalConfig = {
  brand: string; theme: 'alnera' | 'smece'; kind: 'supplements' | 'food';
  companyName: string; address: string; pib: string; mb: string;
  salesEmail: string; privacyEmail: string; phone: string; shopHref: string;
  consentKey: string; consentVersion: string; marketingEnabled: boolean; metaPixelId: string;
};

// Kontakti su radni podaci. Ne uključivati prodaju bez potvrde vlasnika i pravnika.
// Email za privatnost nije Meta Pixel ID. Praćenje ostaje isključeno.
export const legalConfig: LegalConfig = {
  "brand": "ALNERA",
  "theme": "alnera",
  "kind": "supplements",
  "companyName": "ALNERA društvo sa ograničenom odgovornošću Valjevo",
  "address": "Jovana Dučića 68D, sprat 1, stan 12, 14000 Valjevo",
  "pib": "116052947",
  "mb": "22342509",
  "salesEmail": "office@alnera.rs",
  "privacyEmail": "testmail@test.com",
  "phone": "",
  "shopHref": "/#kolekcija",
  "consentKey": "alnera-cookie-consent-v1",
  "consentVersion": "2026-11-21.1:marketing-off",
  "marketingEnabled": false,
  "metaPixelId": ""
};
