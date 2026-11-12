---
title: "Installation"
description: "Installieren Sie @docmd/core global, lokal innerhalb eines Projekts oder führen Sie es containerisiert über das offizielle Docker-Image aus. Erfordert Node.js 20+."
---

Wählen Sie die Installationsmethode, die zu Ihrem Workflow passt. Für lokale Builds ist Node.js 20 oder höher erforderlich.

## 1. Lokale Installation (Empfohlen)

Die lokale Ausführung von `docmd` hält Ihre Dokumentationskonfiguration direkt zusammen mit Ihrem Quellcode versioniert.

::: tabs
== tab "npm" icon:box
```bash
# Als Entwicklungsabhängigkeit installieren
npm install -D @docmd/core

# Neues Projekt initialisieren
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# Als Entwicklungsabhängigkeit installieren
pnpm add -D @docmd/core

# Neues Projekt initialisieren
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# Als Entwicklungsabhängigkeit installieren
yarn add -D @docmd/core

# Neues Projekt initialisieren
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# Als Entwicklungsabhängigkeit installieren
bun add -D @docmd/core

# Neues Projekt initialisieren
bunx docmd init
```
== tab "Docker" icon:container
```bash
# Offizielles Multi-Architektur-Image ziehen
docker pull ghcr.io/docmd-io/docmd:latest

# Dokumentation aus lokalem docs/ nach site/ bauen
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

Siehe den [Docker-Deployment-Leitfaden](../deployment/docker.md) für Docker Compose- und Kubernetes-Konfigurationen.
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Kurzbefehl-Skripte" icon:sparkles
Sobald lokal installiert, können Sie `npx docmd dev` verwenden, um den Live-Vorschau-Server zu starten, oder Build-Skripte direkt zu Ihrer `package.json` hinzufügen.
:::

## 2. Globale Installation

Installieren Sie das Paket global, um Websites überall auf Ihrem System zu erstellen oder in der Vorschau anzuzeigen, ohne ein lokales Projekt anzulegen.

::: tabs
== tab "npm" icon:box
```bash
npm install -g @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -g @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn global add @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -g @docmd/core
```
:::

Sobald installiert, ist die `docmd`-Binärdatei global verfügbar:

```bash
docmd dev   # Lokalen Entwicklungsserver starten
docmd build # Statische Website-Ausgabe bauen
```

## 3. Reine Browser-Integration

Binden Sie die Rendering-Engine direkt über CDN in eine bestehende Webanwendung ein.

::: callout info "Spezialisierte Bibliotheks-Integration" icon:help-circle
Dies umgeht die CLI und lädt die Parsing-Engine direkt im Browser. Nutzen Sie dies für dynamische Portale und interaktives clientseitiges Rendering anstelle statischer SEO-Websites.
:::

Fügen Sie das Stylesheet und die JavaScript-Engine zu Ihrem HTML-Header hinzu.

```html
<!-- Kern-Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphe Rendering-Engine -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

Siehe die [Browser-API-Referenz](../reference/browser-api.md) für vollständige Integrationsdetails.

## 4. Fehlerbehebung

### Keine Berechtigung (`EACCES`-Fehler)
Verwenden Sie bei globalen Installationen auf macOS oder Linux kein `sudo`. Beheben Sie Berechtigungskonflikte mit einem Node.js-Versionsmanager wie [nvm](external:https://github.com/nvm-sh/nvm) oder [fnm](external:https://github.com/Schniz/fnm).

### PowerShell-Ausführungsrichtlinien (Windows)
Wenn Windows die Befehlsausführung blockiert, öffnen Sie PowerShell als Administrator und aktivieren Sie die Skriptausführung für den aktuellen Benutzer.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
