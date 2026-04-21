---
title: "Verwendung von Plugins"
description: "Installieren, konfigurieren und verwalten Sie docmd-Plugins – von erforderlichen Standardvorgaben bis hin zu optionalen Erweiterungen."
---

`docmd` verfügt über eine modulare Plugin-Architektur. Erforderliche Plugins werden mit dem Core ausgeliefert und müssen nicht installiert werden. Optionale Plugins können mit einem einzigen CLI-Befehl installiert werden.

## Plugins installieren

Verwenden Sie die `docmd`-CLI, um Plugins zu installieren oder zu entfernen:

```bash
# Plugin installieren
docmd add <plugin-name>

# Plugin entfernen
docmd remove <plugin-name>
```

Der Installer erkennt automatisch Ihren Paketmanager (npm, pnpm, yarn oder bun), löst Kurznamen in vollständige Paketnamen auf und fügt die Plugin-Konfiguration in Ihre `docmd.config.js` ein.

Verwenden Sie `--verbose` (oder `-V`) für die vollständige Ausgabe des Installers:

```bash
docmd add <plugin-name> -V
```

## Erforderliche Plugins

Diese Plugins sind bereits in `@docmd/core` enthalten – keine Installation erforderlich. Aktivieren Sie sie in Ihrer `docmd.config.js`:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    search: {},                        // Offline-Volltextsuche
    seo: { aiBots: false },            // Meta-Tags, Open Graph, KI-Bot-Steuerung
    sitemap: {},                       // Automatische Generierung der sitemap.xml
    analytics: {},                     // Google Analytics v4
    llms: {},                          // LLM-Kontext-Generierung (llms.txt)
    mermaid: {}                        // Native interaktive Diagramme
  }
});
```

## Optionale Plugins

Optionale Plugins müssen vor der Aktivierung installiert werden.

| Plugin | Installationsbefehl | Beschreibung |
| :--- | :--- | :--- |
| [PWA](pwa.md) | `docmd add pwa` | Unterstützung für Progressive Web Apps mit Offline-Caching |
| [Threads](threads.md) | `docmd add threads` | Inline-Diskussionskommentare, gespeichert in Ihrem Markdown |
| [Math](math.md) | `docmd add math` | Native KaTeX- und LaTeX-Mathematik-Integration |

## Plugin-Bereiche und `noStyle`-Überschreibungen

Plugins fügen standardmäßig CSS und Verhalten global auf allen Seiten ein. Sie können sie jedoch explizit so konfigurieren, dass sie bestimmte Seiten überspringen oder ihre Ausführung auf ungestylten Landing-Templates (`noStyle: true`) vollständig deaktivieren.

### Umfang der globalen Konfiguration

Sie können jedes Plugin über Ihre `docmd.config.js` anweisen, das Einfügen auf `noStyle`-Seiten automatisch zu überspringen:

```javascript
plugins: {
  math: {
    noStyle: false // Math-CSS/JS wird auf No-Style-Seiten nicht mehr geladen
  }
}
```

### Lokaler Bereich der Seite (Frontmatter)

Unabhängig von Ihrer globalen Konfiguration (oder den Standardeinstellungen des Plugin-Entwicklers) können Sie jedes Plugin pro Dokument über das Markdown-Frontmatter individuell aktivieren oder deaktivieren.

```markdown
---
noStyle: true
plugins:
  math: true
  threads: false
---

# Nur Math wird hier gerendert, Threads sind komplett blockiert
```

## Plugin-Lebenszyklus

Plugins haken sich in verschiedene Phasen des Build- und Entwicklungsprozesses ein:

| Hook | Beschreibung |
| :--- | :--- |
| `markdownSetup(md, opts)` | Erweitert den Markdown-Parser um eigene Regeln oder Container |
| `generateMetaTags(config, page, root)` | Fügt `<meta>`- und `<link>`-Tags in den `<head>` ein |
| `generateScripts(config, opts)` | Fügt Skripte in den `<head>` oder vor `</body>` ein |
| `getAssets(opts)` | Definiert externe Dateien oder CDN-Skripte zum Einfügen |
| `onPostBuild(ctx)` | Führt Logik aus, nachdem alle HTML-Dateien generiert wurden |
| `translations(localeId)` | Gibt übersetzte UI-Strings für eine Sprache zurück |
| `actions` | Serverseitige Handler, die via WebSocket RPC vom Browser aus aufrufbar sind |
| `events` | „Fire-and-forget“-Handler für vom Browser gepushte Ereignisse |

## Plugin-Sicherheit

Das Plugin-System bietet integrierte Sicherheitsgarantien:

- **Validierung**: Plugins können einen `plugin`-Deskriptor mit `name`, `version` und `capabilities` (Fähigkeiten) deklarieren. Ungültige Deskriptoren werden beim Laden abgelehnt.
- **Isolation**: Jeder Hook-Aufruf ist in eine Try/Catch-Grenze gehüllt. Ein fehlerhaftes Plugin kann weder den Build zum Absturz bringen noch andere Plugins beeinträchtigen.
- **Erzwingung von Fähigkeiten**: Plugins, die Fähigkeiten deklarieren, können sich nur für Hooks registrieren, die sie explizit deklariert haben. Nicht deklarierte Hooks werden mit einer Warnung übersprungen.

Vollständige API-Referenz siehe [Plugins erstellen](building-plugins.md).

::: callout tip "KI-transparente Architektur 🤖"
Die Plugin-Architektur ist auf **Determinisierung** ausgelegt. Jedes von einem Plugin eingefügte Meta-Tag und Skript ist rückverfolgbar, was es sowohl KI-Agenten als auch menschlichen Entwicklern ermöglicht, das Verhalten der Website ohne versteckte Seiteneffekte genau zu verstehen.
:::