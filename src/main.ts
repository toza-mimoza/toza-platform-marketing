import "./styles.css";
import {
  detectLocale,
  rememberLocale,
  t,
  type Locale,
  isLocale,
} from "./i18n";
import { setupContactForm } from "./contact";

/** Public platform API — login announcements (no auth). */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://api.toza-platform.com";

type Announcement = {
  mira_id: string;
  title: string;
  summary?: string | null;
  body: string;
  link_url?: string | null;
  link_label?: string | null;
  mira_created?: string | null;
};

let currentLocale: Locale = "en";

export function getCurrentLocale(): Locale {
  return currentLocale;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const tag = currentLocale === "sr" ? "sr-Latn" : currentLocale;
    return new Intl.DateTimeFormat(tag, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function applyLocale(locale: Locale): void {
  currentLocale = locale;
  document.documentElement.lang = locale === "sr" ? "sr-Latn" : locale;

  for (const el of document.querySelectorAll<HTMLElement>("[data-i18n]")) {
    const key = el.dataset.i18n;
    if (!key) continue;
    const value = t(locale, key);
    if (el.tagName === "META" && el.getAttribute("name") === "description") {
      el.setAttribute("content", value);
    } else if (el.tagName === "TITLE") {
      document.title = value;
    } else {
      el.textContent = value;
    }
  }

  for (const el of document.querySelectorAll<HTMLElement>("[data-i18n-aria]")) {
    const key = el.dataset.i18nAria;
    if (!key) continue;
    el.setAttribute("aria-label", t(locale, key));
  }

  for (const btn of document.querySelectorAll<HTMLButtonElement>(".lang-btn")) {
    const code = btn.dataset.locale;
    const active = code === locale;
    btn.setAttribute("aria-pressed", String(active));
    btn.classList.toggle("is-active", active);
  }
}

function setupLocale(): void {
  applyLocale(detectLocale());

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest<HTMLButtonElement>(".lang-btn");
    if (!btn) return;
    const code = btn.dataset.locale;
    if (!isLocale(code)) return;
    rememberLocale(code);
    applyLocale(code);
    void loadAnnouncements();
  });
}

async function loadAnnouncements(): Promise<void> {
  const root = document.getElementById("announcements");
  if (!root) return;

  try {
    const res = await fetch(`${API_BASE.replace(/\/+$/, "")}/mira/login_announcements`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { announcements?: Announcement[] };
    const items = data.announcements ?? [];

    if (items.length === 0) {
      root.innerHTML = `<p class="announcements-empty">${escapeHtml(t(currentLocale, "news.empty"))}</p>`;
      return;
    }

    root.innerHTML = items
      .map((item) => {
        const date = formatDate(item.mira_created);
        const summary = item.summary?.trim()
          ? `<p class="announcement-summary">${escapeHtml(item.summary)}</p>`
          : "";
        const link = item.link_url?.trim()
          ? `<p><a href="${escapeHtml(item.link_url)}" rel="noopener noreferrer">${escapeHtml(item.link_label?.trim() || item.link_url)}</a></p>`
          : "";
        return `
          <article class="announcement-card">
            <h3>${escapeHtml(item.title)}</h3>
            ${date ? `<p class="announcement-meta">${escapeHtml(date)}</p>` : ""}
            ${summary}
            <p class="announcement-body">${escapeHtml(item.body)}</p>
            ${link}
          </article>
        `;
      })
      .join("");
  } catch {
    root.innerHTML = `<p class="announcements-error">${escapeHtml(t(currentLocale, "news.error"))}</p>`;
  }
}

function setupMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const nav = document.getElementById("mobile-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.hidden = open;
  });
}

function setupYear(): void {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setupHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  const sync = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  sync();
  window.addEventListener("scroll", sync, { passive: true });
}

function setupReveal(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (nodes.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    for (const node of nodes) node.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  for (const node of nodes) io.observe(node);
}

document.addEventListener("DOMContentLoaded", () => {
  setupLocale();
  setupYear();
  setupMobileNav();
  setupHeaderScroll();
  setupReveal();
  setupContactForm(getCurrentLocale);
  void loadAnnouncements();
});
