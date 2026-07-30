# Toza Platform — marketing site

Static marketing site for **[toza-platform.com](https://toza-platform.com)** (apex domain).

The main product SPA lives on tenant subdomains (`console.toza-platform.com`, `demo.toza-platform.com`, …). This repo is intentionally separate from [`toza-platform`](https://github.com/toza-mimoza/toza-platform).

## Stack

- Vite + TypeScript
- Plain HTML/CSS (no React)
- Public announcements from `GET /mira/login_announcements` on the platform API

## Development

```bash
npm install
npm run dev
```

Optional local API override:

```bash
cp .env.example .env.local
# VITE_API_BASE_URL=http://localhost:8000
```

## Production build

```bash
npm ci
npm run build
```

Output: `dist/` → deploy to `/var/www/toza/marketing/` on the VPS.

## Deploy on Hostinger VPS

As user **`toza`** (after root created `/opt/toza-platform-marketing` — see Phase 0 runbook):

```bash
cd /opt/toza-platform-marketing   # clone this repo once
git pull
npm ci && npm run build
rsync -a --delete dist/ /var/www/toza/marketing/
```

As **root**, nginx serves apex only from marketing (see `nginx/toza-marketing.conf`).

Tenant Toza Platform SPA stays on **`*.toza-platform.com`** → `/var/www/toza/frontend/` (nginx site **`toza-platform`**).

## TLS (Certbot)

Apex cert (already typical):

```bash
sudo certbot --nginx -d toza-platform.com
```

When wildcard tenant hosts use a separate cert:

```bash
sudo certbot --nginx -d console.toza-platform.com -d demo.toza-platform.com
# …expand as you add instances
```

## Links configured in the site

| Link | URL |
|------|-----|
| Demo (platform + APMS) | `https://demo.toza-platform.com` |
| Operator sign-in | `https://console.toza-platform.com` |
| Contact | `support@toza-platform.com` |

Positioning: **app-agnostic multi-tenant platform** with installable apps (featured: **APMS** ambulatory care). Update `index.html` / env when hostnames change.
