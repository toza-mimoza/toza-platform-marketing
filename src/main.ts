import "./styles.css";

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

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
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

async function loadAnnouncements(): Promise<void> {
  const root = document.getElementById("announcements");
  if (!root) return;

  try {
    const res = await fetch(`${API_BASE.replace(/\/+$/, "")}/mira/login_announcements`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { announcements?: Announcement[] };
    const items = data.announcements ?? [];

    if (items.length === 0) {
      root.innerHTML = '<p class="announcements-empty">No announcements at the moment.</p>';
      return;
    }

    root.innerHTML = items
      .map((item) => {
        const date = formatDate(item.mira_created);
        const summary = item.summary?.trim()
          ? `<p class="announcement-summary">${escapeHtml(item.summary)}</p>`
          : "";
        const link =
          item.link_url?.trim()
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
    root.innerHTML =
      '<p class="announcements-error">Announcements are temporarily unavailable.</p>';
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

document.addEventListener("DOMContentLoaded", () => {
  setupYear();
  setupMobileNav();
  void loadAnnouncements();
});
