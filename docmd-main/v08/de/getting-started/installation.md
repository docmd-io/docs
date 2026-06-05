---
title: "Installation"
description: "Installieren Sie @docmd/core global, lokal in einem Projekt oder führen Sie es containerisiert über das offizielle Docker-Image aus. Benötigt Node.js 18+."
---

Wählen Sie die Installationsmethode, die zu Ihrem Workflow passt. Node.js 18 oder höher ist für lokale Builds erforderlich.

## 1. Lokale Installation (empfohlen)

Die lokale Ausführung von `docmd` hält Ihre Dokumentationskonfiguration mit Ihrem Quellcode versioniert.

::: tabs
== tab "npm" icon:box
```bash
# Als Entwicklungsabhängigkeit installieren
npm install -D @docmd/core

# Ein neues Projekt initialisieren
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# Als Entwicklungsabhängigkeit installieren
pnpm add -D @docmd/core

# Ein neues Projekt initialisieren
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# Als Entwicklungsabhängigkeit installieren
yarn add -D @docmd/core

# Ein neues Projekt initialisieren
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# Als Entwicklungsabhängigkeit installieren
bun add -D @docmd/core

# Ein neues Projekt initialisieren
bunx docmd init
```
== tab "Docker" icon:container
```bash
# Ziehen Sie das offizielle Multi-Architektur-Image
docker pull ghcr.io/docmd-io/docmd:latest

# Dokumentation von lokalem docs/ nach site/ erstellen
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

Siehe [Leitfaden zur Docker-Bereitstellung](../deployment/docker.md) für Docker Compose und Kubernetes-Konfigurationen.
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Kurzbefehle" icon:sparkles
Nach der lokalen Installation können Sie `npx docmd dev` verwenden, um den Live-Vorschau-Server zu starten, oder Skripte direkt zu Ihrer `package.json` hinzufügen.
:::

## 2. Globale Installation

Installieren Sie das Paket global, um überall auf Ihrem System Websites zu erstellen oder in der Vorschau anzuzeigen, ohne ein lokales Projekt anzulegen.

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

Nach der Installation ist die `docmd`-Binärdatei überall verfügbar:

```bash
docmd dev   # Lokalen Entwicklungsserver starten
docmd build # Statische Ausgabe erstellen
```

## 3. Nur-Browser-Integration

Betten Sie die Engine direkt über ein CDN in eine bestehende Web-Anwendung ein.

::: callout info "Spezialisierte Bibliotheksintegration" icon:help-circle
Dies umgeht die CLI und lädt die Parsing-Engine im Browser des Lesers. Verwenden Sie dies für dynamische Portale, nicht für statische SEO-Websites.
:::

Fügen Sie das Stylesheet und die JavaScript-Engine zu Ihrem HTML hinzu.

```html
<!-- Haupt-Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphe Rendering-Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

Siehe [Leitfaden zur Browser-API](../api/browser-api.md) für vollständige Integrationsdetails.

## 4. Fehlerbehebung

### Berechtigung verweigert (`EACCES`-Fehler)
Verwenden Sie nicht `sudo` für globale Installationen unter macOS oder Linux. Beheben Sie Berechtigungskonflikte mit einem Node.js-Versionsmanager wie [nvm](https://github.com/nvm-sh/nvm) oder [fnm](https://github.com/Schniz/fnm).

### PowerShell-Ausführungsrichtlinien (Windows)
Wenn Windows die Ausführung blockiert, öffnen Sie PowerShell als Administrator und aktivieren Sie die Ausführung von Skripten für den aktuellen Benutzer.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```