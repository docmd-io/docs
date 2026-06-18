---
title: "Installation"
description: "Installieren Sie @docmd/core global, lokal innerhalb eines Projekts oder containerisiert über das offizielle Docker-Image. Erfordert Node.js 18+."
---

Wählen Sie die Installationsmethode, die zu Ihrem Workflow passt. Für lokale Builds ist Node.js 18 oder höher erforderlich.

## 1. Lokale Installation (empfohlen)

`docmd` lokal auszuführen hält Ihre Dokumentationskonfiguration mit Ihrem Quellcode versioniert.

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
docker pull ghcr.io/docmd-io/docmd:0.8.6

# Dokumentation aus lokalem docs/ nach site/ bauen
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.6 build
```

Docker-Compose- und Kubernetes-Konfigurationen finden Sie im [Docker-Bereitstellungs-Leitfaden](../deployment/docker.md).
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Kurzbefehle" icon:sparkles
Nach der lokalen Installation können Sie `npx docmd dev` verwenden, um den Live-Vorschauserver zu starten, oder Skripte direkt zu Ihrer `package.json` hinzufügen.
:::

## 2. Globale Installation

Installieren Sie das Paket global, um Sites überall auf Ihrem System zu erstellen oder in der Vorschau anzuzeigen, ohne ein lokales Projekt anzulegen.

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

Nach der Installation ist das `docmd`-Binary überall verfügbar:

```bash
docmd dev   # Dev-Server lokal starten
docmd build # Statische Ausgabe erzeugen
```

## 3. Reine Browser-Integration

Binden Sie die Engine direkt über CDN in eine bestehende Webanwendung ein.

::: callout info "Spezialisierte Bibliotheksintegration" icon:help-circle
Dies umgeht die CLI und lädt die Parsing-Engine im Browser des Lesers. Verwenden Sie dies für dynamische Portale, nicht für statische SEO-Websites.
:::

Fügen Sie Ihrer HTML das Stylesheet und die JavaScript-Engine hinzu.

```html
<!-- Kern-Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphe Rendering-Engine -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

Vollständige Integrationsdetails finden Sie im [Browser-API-Leitfaden](../api/browser-api.md).

## 4. Fehlerbehebung

### Berechtigung verweigert (`EACCES`-Fehler)
Verwenden Sie `sudo` für globale Installationen auf macOS oder Linux nicht. Beheben Sie Berechtigungskonflikte mit einem Node.js-Versionsmanager wie [nvm](external:https://github.com/nvm-sh/nvm) oder [fnm](external:https://github.com/Schniz/fnm).

### PowerShell-Ausführungsrichtlinien (Windows)
Falls Windows die Ausführung blockiert, öffnen Sie PowerShell als Administrator und aktivieren Sie die Skriptausführung für den aktuellen Benutzer.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
