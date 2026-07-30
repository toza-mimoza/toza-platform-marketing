/** Marketing site copy — EN / DE / SR (Latin). */

export type Locale = "en" | "de" | "sr";

export const LOCALES: readonly Locale[] = ["en", "de", "sr"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  sr: "SR",
};

type Messages = Record<string, string>;

const en: Messages = {
  "meta.description":
    "Toza Platform — multi-tenant application platform. Isolated workspaces, installable apps including APMS for ambulatory care, and enterprise-grade security.",
  "meta.title": "Toza Platform",
  "a11y.skip": "Skip to content",
  "a11y.nav": "Primary",
  "a11y.nav_mobile": "Mobile",
  "a11y.lang": "Language",
  "nav.platform": "Platform",
  "nav.apps": "Apps",
  "nav.news": "News",
  "nav.contact": "Contact",
  "nav.demo": "Try demo",
  "nav.menu": "Menu",
  "hero.brand": "Toza Platform",
  "hero.title_1": "Build on one runtime.",
  "hero.title_2": "Ship many apps.",
  "hero.lead":
    "A multi-tenant application platform: isolated workspaces, shared security and licensing, and installable domain apps — starting with APMS for ambulatory care.",
  "hero.cta_demo": "Explore live demo",
  "hero.cta_apps": "Browse apps",
  "platform.title": "Platform capabilities",
  "platform.lead":
    "Dynamic tables and forms, fine-grained security, communications, and an operator console — independent of which apps a tenant licenses.",
  "platform.isolation.title": "True tenant isolation",
  "platform.isolation.body":
    "Each customer instance runs on its own database. Data never mixes across organisations.",
  "platform.marketplace.title": "App marketplace",
  "platform.marketplace.body":
    "License apps per instance. Install and unsubscribe without rebuilding the stack.",
  "platform.security.title": "Enterprise security",
  "platform.security.body":
    "MFA, OAuth, ACL, audit trails, and session policies — once for every app on the tenant.",
  "platform.console.title": "Operator console",
  "platform.console.body":
    "Platform staff manage instances, licenses, and announcements from a dedicated console — separate from customer workspaces.",
  "apps.title": "Apps on Toza",
  "apps.lead":
    "Domain products ship as installable apps. The platform stays generic; each app brings its own data model, roles, workflows, and UI.",
  "apps.featured": "Featured app",
  "apps.apms.title": "APMS — Ambulatory care",
  "apps.apms.body":
    "End-to-end operations for German ambulatory nursing services: clients, service and medication plans, tour planning, duty roster, billing (SGB XI / HKP), documents, and TI/KIM-ready electronic submission when your gateway is connected.",
  "apps.apms.p1": "Care planning, proofs, and payroll-oriented workflows",
  "apps.apms.p2": "Statutory billing packages and DTA / KIM paths",
  "apps.apms.p3": "Role model for office, PDL, caregivers, and admins",
  "apps.apms.cta": "Open APMS demo",
  "apps.chip.clients": "Clients",
  "apps.chip.tour": "Tour plan",
  "apps.chip.plans": "Service plans",
  "apps.chip.billing": "Billing",
  "apps.chip.meds": "Medications",
  "apps.chip.kim": "KIM / TI",
  "apps.insight.title": "Insight",
  "apps.insight.body":
    "Operational KPIs and dashboards on tenant data — analytics without leaving the workspace.",
  "apps.next.title": "Your next app",
  "apps.next.body":
    "The same metadata engine, ACL, and marketplace can host additional verticals. Talk to us about packaging your domain on Toza.",
  "news.title": "Platform news",
  "news.lead": "Updates from the Toza team — also shown on workspace login screens.",
  "news.loading": "Loading announcements…",
  "news.empty": "No announcements at the moment.",
  "news.error": "Announcements are temporarily unavailable.",
  "cta.title": "See the platform and APMS live",
  "cta.body":
    "Walk through the public demo or contact us about a dedicated workspace for your organisation.",
  "cta.demo": "Open demo",
  "cta.console": "Operator sign-in",
  "contact.title": "Contact",
  "contact.lead":
    "Questions about the platform, APMS onboarding, pricing, or a pilot? We'd love to hear from you.",
  "contact.email_label": "Email",
  "contact.note":
    "Existing workspace users sign in at their organisation subdomain — for example",
  "footer.rights": "Toza Platform. All rights reserved.",
  "footer.meta": "Multi-tenant application platform · Apps including APMS",
};

const de: Messages = {
  "meta.description":
    "Toza Platform — Multi-Tenant-Anwendungsplattform. Isolierte Workspaces, installierbare Apps einschließlich APMS für die ambulante Pflege und Enterprise-Sicherheit.",
  "meta.title": "Toza Platform",
  "a11y.skip": "Zum Inhalt springen",
  "a11y.nav": "Hauptnavigation",
  "a11y.nav_mobile": "Mobile Navigation",
  "a11y.lang": "Sprache",
  "nav.platform": "Plattform",
  "nav.apps": "Apps",
  "nav.news": "News",
  "nav.contact": "Kontakt",
  "nav.demo": "Demo testen",
  "nav.menu": "Menü",
  "hero.brand": "Toza Platform",
  "hero.title_1": "Eine Runtime.",
  "hero.title_2": "Viele Apps.",
  "hero.lead":
    "Eine Multi-Tenant-Anwendungsplattform: isolierte Workspaces, gemeinsame Sicherheit und Lizenzierung sowie installierbare Fach-Apps — beginnend mit APMS für die ambulante Pflege.",
  "hero.cta_demo": "Live-Demo öffnen",
  "hero.cta_apps": "Apps ansehen",
  "platform.title": "Plattform-Funktionen",
  "platform.lead":
    "Dynamische Tabellen und Formulare, feingranulare Sicherheit, Kommunikation und eine Operator-Konsole — unabhängig davon, welche Apps ein Tenant lizenziert.",
  "platform.isolation.title": "Echte Tenant-Isolation",
  "platform.isolation.body":
    "Jede Kundeninstanz läuft auf einer eigenen Datenbank. Daten vermischen sich nie zwischen Organisationen.",
  "platform.marketplace.title": "App-Marketplace",
  "platform.marketplace.body":
    "Apps pro Instanz lizenzieren. Installieren und abbestellen, ohne den Stack neu aufzubauen.",
  "platform.security.title": "Enterprise-Sicherheit",
  "platform.security.body":
    "MFA, OAuth, ACL, Audit-Trails und Sitzungsrichtlinien — einmal für jede App auf dem Tenant.",
  "platform.console.title": "Operator-Konsole",
  "platform.console.body":
    "Plattform-Mitarbeiter verwalten Instanzen, Lizenzen und Ankündigungen in einer eigenen Konsole — getrennt von Kunden-Workspaces.",
  "apps.title": "Apps auf Toza",
  "apps.lead":
    "Fachprodukte kommen als installierbare Apps. Die Plattform bleibt generisch; jede App bringt eigenes Datenmodell, Rollen, Workflows und UI mit.",
  "apps.featured": "Featured App",
  "apps.apms.title": "APMS — Ambulante Pflege",
  "apps.apms.body":
    "End-to-end Betrieb für ambulante Pflegedienste in Deutschland: Klienten, Leistungs- und Medikationspläne, Tourenplanung, Dienstplan, Abrechnung (SGB XI / HKP), Dokumente und TI/KIM-fähige elektronische Übermittlung, sobald Ihr Gateway angebunden ist.",
  "apps.apms.p1": "Pflegeplanung, Nachweise und lohnnahe Workflows",
  "apps.apms.p2": "Gesetzliche Abrechnungspakete und DTA-/KIM-Pfade",
  "apps.apms.p3": "Rollenmodell für Büro, PDL, Pflegekräfte und Admins",
  "apps.apms.cta": "APMS-Demo öffnen",
  "apps.chip.clients": "Klienten",
  "apps.chip.tour": "Tourenplan",
  "apps.chip.plans": "Leistungspläne",
  "apps.chip.billing": "Abrechnung",
  "apps.chip.meds": "Medikation",
  "apps.chip.kim": "KIM / TI",
  "apps.insight.title": "Insight",
  "apps.insight.body":
    "Operative KPIs und Dashboards auf Tenant-Daten — Analytics ohne den Workspace zu verlassen.",
  "apps.next.title": "Ihre nächste App",
  "apps.next.body":
    "Dieselbe Metadaten-Engine, ACL und Marketplace können weitere Vertikalen hosten. Sprechen Sie mit uns über die Paketierung Ihrer Domäne auf Toza.",
  "news.title": "Plattform-News",
  "news.lead": "Updates vom Toza-Team — auch auf den Login-Seiten der Workspaces.",
  "news.loading": "Ankündigungen werden geladen…",
  "news.empty": "Derzeit keine Ankündigungen.",
  "news.error": "Ankündigungen sind vorübergehend nicht verfügbar.",
  "cta.title": "Plattform und APMS live sehen",
  "cta.body":
    "Nutzen Sie die öffentliche Demo oder kontaktieren Sie uns für einen eigenen Workspace Ihrer Organisation.",
  "cta.demo": "Demo öffnen",
  "cta.console": "Operator-Anmeldung",
  "contact.title": "Kontakt",
  "contact.lead":
    "Fragen zur Plattform, APMS-Onboarding, Preisen oder einem Pilot? Wir freuen uns auf Ihre Nachricht.",
  "contact.email_label": "E-Mail",
  "contact.note":
    "Bestehende Workspace-Nutzer melden sich über die Subdomain ihrer Organisation an — zum Beispiel",
  "footer.rights": "Toza Platform. Alle Rechte vorbehalten.",
  "footer.meta": "Multi-Tenant-Anwendungsplattform · Apps einschließlich APMS",
};

const sr: Messages = {
  "meta.description":
    "Toza Platform — multi-tenant aplikativna platforma. Izolovani radni prostori, instalabilne aplikacije uključujući APMS za ambulantnu negu i enterprise bezbednost.",
  "meta.title": "Toza Platform",
  "a11y.skip": "Preskoči na sadržaj",
  "a11y.nav": "Glavna navigacija",
  "a11y.nav_mobile": "Mobilna navigacija",
  "a11y.lang": "Jezik",
  "nav.platform": "Platforma",
  "nav.apps": "Aplikacije",
  "nav.news": "Vesti",
  "nav.contact": "Kontakt",
  "nav.demo": "Isprobaj demo",
  "nav.menu": "Meni",
  "hero.brand": "Toza Platform",
  "hero.title_1": "Jedan runtime.",
  "hero.title_2": "Mnogo aplikacija.",
  "hero.lead":
    "Multi-tenant aplikativna platforma: izolovani radni prostori, zajednička bezbednost i licenciranje, te instalabilne domenske aplikacije — počevši od APMS-a za ambulantnu negu.",
  "hero.cta_demo": "Otvori live demo",
  "hero.cta_apps": "Pogledaj aplikacije",
  "platform.title": "Mogućnosti platforme",
  "platform.lead":
    "Dinamičke tabele i forme, fino zrnasta bezbednost, komunikacije i operatorska konzola — nezavisno od toga koje aplikacije tenant licencira.",
  "platform.isolation.title": "Prava izolacija tenanata",
  "platform.isolation.body":
    "Svaka klijentska instanca radi na sopstvenoj bazi. Podaci se nikad ne mešaju između organizacija.",
  "platform.marketplace.title": "Marketplace aplikacija",
  "platform.marketplace.body":
    "Licencirajte aplikacije po instanci. Instalirajte i otkažite bez ponovnog građenja steka.",
  "platform.security.title": "Enterprise bezbednost",
  "platform.security.body":
    "MFA, OAuth, ACL, audit tragovi i politike sesija — jednom za svaku aplikaciju na tenantu.",
  "platform.console.title": "Operatorska konzola",
  "platform.console.body":
    "Platformsko osoblje upravlja instancama, licencama i obaveštenjima iz posebne konzole — odvojeno od klijentskih radnih prostora.",
  "apps.title": "Aplikacije na Tozi",
  "apps.lead":
    "Domenski proizvodi stižu kao instalabilne aplikacije. Platforma ostaje generička; svaka aplikacija donosi sopstveni model podataka, uloge, tokove rada i UI.",
  "apps.featured": "Istaknuta aplikacija",
  "apps.apms.title": "APMS — Ambulantna nega",
  "apps.apms.body":
    "End-to-end rad za ambulantne službe nege u Nemačkoj: klijenti, planovi usluga i lekova, planiranje tura, raspored, obračun (SGB XI / HKP), dokumenti i elektronsko slanje spremno za TI/KIM kada je gateway povezan.",
  "apps.apms.p1": "Planiranje nege, dokazi i tokovi orijentisani na obračun plata",
  "apps.apms.p2": "Zakonski paketi obračuna i DTA / KIM putevi",
  "apps.apms.p3": "Model uloga za kancelariju, PDL, negovatelje i admine",
  "apps.apms.cta": "Otvori APMS demo",
  "apps.chip.clients": "Klijenti",
  "apps.chip.tour": "Plan tura",
  "apps.chip.plans": "Planovi usluga",
  "apps.chip.billing": "Obračun",
  "apps.chip.meds": "Lekovi",
  "apps.chip.kim": "KIM / TI",
  "apps.insight.title": "Insight",
  "apps.insight.body":
    "Operativni KPI-jevi i kontrolne table nad podacima tenanta — analitika bez napuštanja radnog prostora.",
  "apps.next.title": "Vaša sledeća aplikacija",
  "apps.next.body":
    "Isti metadata engine, ACL i marketplace mogu da hostuju dodatne vertikale. Razgovarajte sa nama o pakovanju vašeg domena na Tozi.",
  "news.title": "Vesti platforme",
  "news.lead": "Novosti Toza tima — prikazuju se i na ekranima za prijavu radnih prostora.",
  "news.loading": "Učitavanje obaveštenja…",
  "news.empty": "Trenutno nema obaveštenja.",
  "news.error": "Obaveštenja privremeno nisu dostupna.",
  "cta.title": "Pogledajte platformu i APMS uživo",
  "cta.body":
    "Prođite kroz javni demo ili nas kontaktirajte oko namenskog radnog prostora za vašu organizaciju.",
  "cta.demo": "Otvori demo",
  "cta.console": "Prijava operatora",
  "contact.title": "Kontakt",
  "contact.lead":
    "Pitanja o platformi, uvođenju APMS-a, cenama ili pilotu? Rado ćemo čuti od vas.",
  "contact.email_label": "Email",
  "contact.note":
    "Postojeći korisnici radnih prostora prijavljuju se na subdomenu svoje organizacije — na primer",
  "footer.rights": "Toza Platform. Sva prava zadržana.",
  "footer.meta": "Multi-tenant aplikativna platforma · Aplikacije uključujući APMS",
};

export const MESSAGES: Record<Locale, Messages> = { en, de, sr };

const STORAGE_KEY = "toza.marketing.locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "de" || value === "sr";
}

/** Prefer saved choice, else first matching browser language, else English. */
export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* ignore */
  }

  const candidates = [...(navigator.languages ?? []), navigator.language].filter(
    Boolean,
  ) as string[];
  for (const raw of candidates) {
    const primary = raw.toLowerCase().split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return "en";
}

export function rememberLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

export function t(locale: Locale, key: string): string {
  return MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
}
