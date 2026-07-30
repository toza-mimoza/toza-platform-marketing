import { t, type Locale } from "./i18n";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://api.toza-platform.com";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const SCRIPT_ID = "cf-turnstile-api";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      appearance?: "always" | "execute" | "interaction-only";
      size?: "normal" | "compact" | "flexible" | "invisible";
      theme?: "light" | "dark" | "auto";
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile_script_failed")));
      if (window.turnstile) resolve();
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `${TURNSTILE_SCRIPT}?render=explicit`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script_failed"));
    document.head.appendChild(script);
  });
}

type BotProtection = {
  turnstile_enabled: boolean;
  turnstile_site_key: string | null;
};

export function setupContactForm(getLocale: () => Locale): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const host = document.getElementById("turnstile-host");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit") as HTMLButtonElement | null;
  if (!form || !statusEl || !submitBtn) return;

  let token: string | null = null;
  let widgetId: string | null = null;
  let captchaRequired = false;
  let submitting = false;

  const setStatus = (key: string | null, kind: "ok" | "err" | null = null) => {
    if (!key) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.classList.remove("is-ok", "is-err");
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = t(getLocale(), key);
    statusEl.classList.toggle("is-ok", kind === "ok");
    statusEl.classList.toggle("is-err", kind === "err");
  };

  const resetCaptcha = () => {
    token = null;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  };

  void (async () => {
    try {
      const res = await fetch(`${API_BASE.replace(/\/+$/, "")}/mira/marketing/bot-protection`);
      if (!res.ok) return;
      const cfg = (await res.json()) as BotProtection;
      if (!cfg.turnstile_enabled || !cfg.turnstile_site_key || !host) return;
      captchaRequired = true;
      await loadTurnstileScript();
      if (!window.turnstile) return;
      widgetId = window.turnstile.render(host, {
        sitekey: cfg.turnstile_site_key,
        appearance: "always",
        size: "flexible",
        theme: "light",
        callback: (value) => {
          token = value;
        },
        "error-callback": () => {
          token = null;
        },
        "expired-callback": () => {
          token = null;
        },
      });
    } catch {
      /* form still works if captcha not configured on the API */
    }
  })();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submitting) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();

    if (!name || !email || !message) {
      setStatus("contact.form.error", "err");
      return;
    }
    if (captchaRequired && !token) {
      setStatus("contact.form.captcha", "err");
      return;
    }

    submitting = true;
    submitBtn.disabled = true;
    const prevLabel = submitBtn.textContent;
    submitBtn.textContent = t(getLocale(), "contact.form.sending");
    setStatus(null);

    void (async () => {
      try {
        const res = await fetch(`${API_BASE.replace(/\/+$/, "")}/mira/marketing/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            company: company || null,
            message,
            locale: getLocale(),
            turnstile_token: token,
            website: website || null,
          }),
        });
        if (res.status === 204) {
          form.reset();
          resetCaptcha();
          setStatus("contact.form.success", "ok");
          return;
        }
        if (res.status === 429) {
          setStatus("contact.form.rate", "err");
        } else if (res.status === 400 || res.status === 403) {
          setStatus("contact.form.captcha", "err");
        } else {
          setStatus("contact.form.error", "err");
        }
        resetCaptcha();
      } catch {
        setStatus("contact.form.error", "err");
        resetCaptcha();
      } finally {
        submitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = prevLabel || t(getLocale(), "contact.form.submit");
        // Re-apply i18n key after submit label restore
        submitBtn.dataset.i18n = "contact.form.submit";
        submitBtn.textContent = t(getLocale(), "contact.form.submit");
      }
    })();
  });
}
