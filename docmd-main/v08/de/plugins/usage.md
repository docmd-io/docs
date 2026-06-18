---
title: "Plugins verwenden"
description: "Installieren, konfigurieren und verwalten Sie docmd-Plugins — von erforderlichen Standards bis zu optionalen Add-ons."
---

docmd verfügt über eine modulare Plugin-Architektur. Erforderliche Plugins werden mit dem Kern ausgeliefert und benötigen keine Installation. Optionale Plugins können mit einem einzigen CLI-Befehl installiert werden.

## Plugins installieren

Verwenden Sie die docmd-CLI, um Plugins zu installieren und zu entfernen:

```bash
# Ein Plugin installieren
npx @docmd/core add <plugin-name>

# Ein Plugin entfernen
npx @docmd/core remove <plugin-name>
```

Der Installer erkennt Ihren Package-Manager (npm, pnpm, yarn oder bun). Er löst Kurznamen zu vollständigen Paketnamen auf und fügt die Konfiguration in Ihre `docmd.config.json` ein.

Verwenden Sie `--verbose` (oder `-V`) für die vollständige Installer-Ausgabe:

```bash
npx @docmd/core add <plugin-name> -V
```

## Erforderliche Plugins

Diese Plugins werden mit `@docmd/core` gebündelt. Es ist keine Installation erforderlich. Aktivieren Sie sie in Ihrer `docmd.config.json`:

```json "docmd.config.json"
  "plugins": {
    "search": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
```

::: callout tip "Git-Plugin"
Das Git-Plugin erkennt, ob Ihr Projekt ein Git-Repository ist. Falls nicht, deaktiviert es sich automatisch. Für Zeitstempel der letzten Aktualisierung ist keine Konfiguration erforderlich.
:::

## Optionale Plugins

Optionale Plugins müssen vor der Aktivierung installiert werden.

| Plugin | Installationsbefehl | Beschreibung |
| :--- | :--- | :--- |
| [PWA](pwa.md) | `npx @docmd/core add pwa` | Progressive Web App-Unterstützung mit Offline-Caching |
| [Threads](threads.md) | `npx @docmd/core add threads` | Inline-Diskussionskommentare in Markdown gespeichert |
| [Math](math.md) | `npx @docmd/core add math` | Native KaTeX- und LaTeX-Mathematikdarstellung |

## Automatische Installation

Wenn Sie ein offizielles Plugin zu Ihrer `docmd.config.json` hinzufügen, ohne es zu installieren, lädt docmd es automatisch herunter und installiert es beim nächsten Build. Dies funktioniert für alle Plugins im offiziellen Register.

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

Der automatische Installer:

- Zielt nur auf offizielle `@docmd/plugin-*`-Pakete.
- Pinnt die Version an die Ihrer `@docmd/core`-Installation.
- Erkennt und verwendet den Package-Manager Ihres Projekts.
- Meldet den Fortschritt im Terminal während der Ausführung.

## Drittanbieter- & benutzerdefinierte Plugins

Aus Sicherheitsgründen erzwingt der Installer eine offizielle Register-Zulassungsliste. Drittanbieter-Plugins müssen nativ mit Ihrem Package-Manager installiert werden:

```bash
npm install my-custom-plugin
# oder pnpm add, yarn add, bun add
```

Fügen Sie das Plugin nach der Installation unter seinem exakten Paketnamen zu Ihrer `docmd.config.json` hinzu:

```json "docmd.config.json"
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

Wenn das Plugin die Anforderungen von docmd erfüllt, wird es beim Build automatisch aktiviert. Andernfalls meldet die Engine einen Fehler.

## Plugin-Bereiche und `noStyle`-Überschreibungen

Plugins injizieren CSS und Verhalten global. Sie können sie jedoch so konfigurieren, dass sie bestimmte Seiten umgehen oder ihre Ausführung auf ungestalteten Landingpages (`noStyle: true`) vollständig deaktivieren.

### Globaler Konfigurationsumfang

Weisen Sie ein Plugin über Ihre `docmd.config.json` an, `noStyle`-Seiten automatisch zu überspringen:

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### Lokaler Seitenbereich (Frontmatter)

Sie können jedes Plugin pro Dokument über das Markdown-Frontmatter definitiv aktivieren oder deaktivieren.

```markdown
---
noStyle: true
plugins:
  math: true
  threads: false
---

# Only Math renders here, Threads are completely blocked
```

## Plugin-Lebenszyklus

Plugins haken sich in verschiedene Phasen des Build- und Entwicklungsprozesses ein:

| Hook | Beschreibung |
| :--- | :--- |
| `markdownSetup(md, opts)` | Erweitern Sie den Markdown-Parser mit benutzerdefinierten Regeln. |
| `generateMetaTags(config, page, root)` | Injizieren Sie `<meta>`- und `<link>`-Tags in den `<head>`. |
| `generateScripts(config, opts)` | Injizieren Sie Skripte in den `<head>` oder `</body>`. |
| `getAssets(opts)` | Definieren Sie externe Dateien oder CDN-Skripte zum Injizieren. |
| `onPostBuild(ctx)` | Logik ausführen, nachdem alle HTML-Dateien generiert wurden. |
| `translations(localeId)` | Übersetzte UI-Strings für eine Locale zurückgeben. |
| `actions` | Serverseitige Handler, die über WebSocket-RPC aufrufbar sind. |
| `events` | Fire-and-forget-Handler für vom Browser gesendete Ereignisse. |

## Plugin-Sicherheit

Das Plugin-System gewährleistet Build-Sicherheit:

- **Validierung**: Ungültige Plugin-Deskriptoren werden beim Laden abgelehnt.
- **Isolation**: Jeder Hook-Aufruf ist in ein try/catch eingeschlossen. Ein defektes Plugin kann den Build nicht zum Absturz bringen.
- **Capability-Erzwingung**: Plugins können sich nur für Hooks registrieren, die sie deklariert haben.

Die vollständige API-Referenz finden Sie unter [Plugins entwickeln](building-plugins.md).

::: callout tip "Verfolgbare Architektur" icon:sparkles
Jedes Meta-Tag und Skript, das die Engine ausgibt, wird aus expliziten Konfigurationen und Plugin-Ausgaben generiert. Es gibt keine versteckten Nebeneffekte.
:::
