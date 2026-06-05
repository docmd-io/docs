---
title: "Installation"
description: "Installieren Sie @docmd/core global, lokal in einem Projekt oder integrieren Sie es direkt in Web-Anwendungen. Benötigt Node.js 18+."
---

Wählen Sie die Installationsmethode, die zu Ihrem Workflow passt. Node.js 18 oder höher ist erforderlich.

## 1. Projekt-lokale Installation (empfohlen)

Installieren Sie `@docmd/core` lokal als Entwicklungsabhängigkeit. Dies sperrt die Version in Ihrer `package.json` und stellt sicher, dass Builds in Teams und CI/CD konsistent sind.

### Paket installieren

::: tabs
== tab "npm" icon:box
```bash
npm install -D @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -D @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn add -D @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -D @docmd/core
```
:::

### Projekt initialisieren

Erstellt automatisch die Standard-Ordnerstruktur, eine erste Seite und eine Konfigurationsdatei.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core init
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core init
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core init
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core init
```
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Kurzbefehle"
Nach der lokalen Installation können Sie `npx @docmd/core dev` verwenden oder es direkt zu Ihren `package.json`-Skripten hinzufügen.
:::

## 2. Globale Installation

Installieren Sie das Paket global, um überall auf Ihrem System Websites zu erstellen oder in der Vorschau zu betrachten.

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

Nach der globalen Installation ist die `docmd`-Binärdatei überall verfügbar. Sie können auch immer `npx @docmd/core` verwenden, ohne eine globale Installation.

```bash
docmd dev   # Lokalen Entwicklungsserver starten
docmd build # Statische Ausgabe erstellen
```

## 3. Docker

Verwenden Sie das offizielle Docker-Image, um Dokumentationen zu erstellen und in der Vorschau anzuzeigen, ohne Node.js lokal zu installieren.

```bash
# Ziehen Sie das offizielle Image
docker pull ghcr.io/docmd-io/docmd:latest

# Erstellen Sie Ihre Dokumentation (mounten Sie Ihre Quell- und Ausgabeordner)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# Starten Sie die Demo-Site
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

Unterstützt `linux/amd64` und `linux/arm64`. Alpine-basiert, als non-root ausgeführt, mit integrierten Health-Checks.

Siehe [Docker-Bereitstellung](../deployment/docker.md) für Dockerfile-Generierung, Docker Compose und Kubernetes-Beispiele.

## 4. Nur-Browser-Integration

Betten Sie die Engine direkt über ein CDN in eine bestehende Web-Anwendung ein.

::: callout info "Spezialisierte Bibliotheksintegration"
Dies umgeht die CLI und lädt die Parsing-Engine im Browser des Lesers. Verwenden Sie dies für dynamische Portale, nicht für statische SEO-Websites.
:::

Fügen Sie das Stylesheet und die JavaScript-Engine zu Ihrem HTML hinzu.

```html
<!-- Haupt-Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphe Rendering-Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

Siehe [Browser API](../api/browser-api.md) für vollständige Integrationsdetails.

## 4. Fehlerbehebung

### Berechtigung verweigert (`EACCES`-Fehler)
Verwenden Sie nicht `sudo` für globale Installationen unter macOS oder Linux. Beheben Sie Berechtigungskonflikte mit einem Node.js-Versionsmanager wie [nvm](https://github.com/nvm-sh/nvm) oder [fnm](https://github.com/Schniz/fnm).

### PowerShell-Ausführungsrichtlinien (Windows)
Wenn Windows die Ausführung blockiert, öffnen Sie PowerShell als Administrator und aktivieren Sie die Ausführung von Skripten für den aktuellen Benutzer.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```