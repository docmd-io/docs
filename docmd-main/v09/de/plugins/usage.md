---
title: "Plugins verwenden"
description: "Installieren, konfigurieren und verwalten Sie docmd-Plugins, von Kern-Built-ins bis hin zu optionalen Erweiterungen von Drittanbietern."
---

`docmd` verfügt über eine modulare Plugin-Architektur. Integrierte Plugins werden direkt mit der Kerne-Engine ausgeliefert und erfordern keine separate Installation. Optionale Plugins und Plugins von Drittanbietern können über die CLI oder Paketmanager installiert werden.

## Plugins installieren

Verwenden Sie die `docmd`-CLI, um Plugin-Pakete zu verwalten:

```bash
# Ein offizielles Plugin installieren
npx @docmd/core add <plugin-name>

# Ein installiertes Plugin entfernen
npx @docmd/core remove <plugin-name>
```

Der Installer erkennt Ihren aktiven Paketmanager (npm, pnpm, yarn oder bun), löst Kurznamen in vollständige `@docmd/plugin-*`-Paketnamen auf und aktualisiert Ihre `docmd.config.json` automatisch.

Verwenden Sie `--verbose` (oder `-V`), um vollständige Protokolle des Installers anzuzeigen:

```bash
npx @docmd/core add <plugin-name> -V
```

## Integrierte Kern-Plugins

Diese Plugins werden gebündelt mit `@docmd/core` ausgeliefert und erfordern keine Installation. Aktivieren oder konfigurieren Sie sie in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {},
    "ai": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "okf": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
}
```

::: callout tip title:"Git-Repository-Erkennung" icon:git-branch
Das Git-Plugin erkennt, ob Ihr Projektstammverzeichnis ein gültiges Git-Repository ist. Wenn die Git-Historie nicht verfügbar ist, deaktiviert es die Generierung von Fußzeilen-Zeitstempeln automatisch.
::: /callout

::: callout info title:"OKF-Bundle-Unterstützung" icon:info
Das `@docmd/plugin-okf`-Plugin generiert ein Open Knowledge Format Bundle (`site/okf/`), das typisierte Manifeste und Konzeptdateien für KI-Agenten enthält. Es ist standardmäßig aktiviert; setzen Sie `"plugins": { "okf": false }`, um es zu deaktivieren. Siehe [OKF-Bundle-Plugin](okf.md) für Details.
::: /callout

## Optionale Plugins

Optionale Plugins erfordern vor der Aktivierung eine explizite Installation:

| Plugin | Installationsbefehl | Zweck |
| :--- | :--- | :--- |
| [PWA-Unterstützung](pwa.md) | `npx @docmd/core add pwa` | Progressive Web App Manifest und Offline-Service-Worker-Caching |
| [Threads](threads.md) | `npx @docmd/core add threads` | Markdown-native Inline-Kommentardiskussionen |
| [Math (KaTeX)](math.md) | `npx @docmd/core add math` | Serverseitiges LaTeX- und KaTeX-Mathematikgleichungsrendering |

## Automatische Installationsmechanismen

Wenn ein offizielles Plugin in `docmd.config.json` deklariert ist, ohne in `node_modules` installiert zu sein, lädt `docmd` es bei der nächsten Build-Ausführung automatisch herunter und installiert es:

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

Der Auto-Installer:
* Beschränkt Ziele strikt auf offizielle `@docmd/plugin-*`-Pakete.
* Gleicht Abhängigkeits-Versions-Tags mit der installierten `@docmd/core`-Version ab.
* Erkennt automatisch Projekt-Paketmanager (npm, pnpm, yarn, bun).
* Gibt den Installationsfortschritt direkt in der Terminal-Oberfläche aus.

::: callout tip title:"Belastbare Modulauflösung" icon:shield-check
Der Auto-Installer verwendet dynamische ES-Modul-Importe mit Fallback-Auflösungspfaden, die das nahtlose Laden von ESM-Paketen ermöglichen, die explizite `exports`-Zuordnungen deklarieren.
::: /callout

## Drittanbieter- & Benutzerdefinierte Plugins

Aus Sicherheitsgründen erzwingt der automatisierte Installer eine offizielle Registrierungs-Zulassungsliste. Installieren Sie Drittanbieter-Plugins direkt mit Ihrem Paketmanager:

```bash
npm install my-custom-plugin
# oder pnpm add / yarn add / bun add
```

Fügen Sie das benutzerdefinierte Plugin unter Verwendung seiner vollständigen Paketkennung zu `docmd.config.json` hinzu:

```json "docmd.config.json"
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

## Seitenebene & `noStyle`-Plugin-Geltungsbereiche

Plugins injizieren standardmäßig global Stile und Verhalten. Sie können Plugins auf ungestalteten Landing-Pages (`noStyle: true`) oder pro Seite über Frontmatter deaktivieren.

### Globaler Konfigurationsbereich

Konfigurieren Sie Plugins in `docmd.config.json` so, dass sie `noStyle`-Landingpages überspringen:

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### Bereich für Seiten-Frontmatter

Aktivieren oder deaktivieren Sie bestimmte Plugins pro Dokument selektiv mithilfe von [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
noStyle: true
plugins:
  math: true
  threads: false
---
```

## Plugin-Architektur-Lebenszyklus

Plugins klinken sich in Kern-Build- und Entwicklungszyklen ein:

| Lebenszyklus-Hook | Technische Funktion |
| :--- | :--- |
| `markdownSetup(md, opts)` | Registrieren benutzerdefinierter Markdown-it Parser-Regeln |
| `generateMetaTags(config, page, root)` | Injizieren von `<meta>`- und `<link>`-Elementen in den `<head>` |
| `generateScripts(config, opts)` | Injizieren von Client-Skripten in den `<head>` oder `</body>` |
| `getAssets(opts)` | Registrieren statischer Assets oder externer CDN-Bundles |
| `onPostBuild(ctx)` | Ausführen von Nachbearbeitungsaufgaben nach Abschluss der HTML-Ausgabe |
| `translations(localeId)` | Registrieren lokalisierter UI-String-Zuordnungen |
| `actions` | Registrieren serverseitiger RPC-Handler für WebSocket-Aufrufe des Dev-Servers |
| `events` | Registrieren von Client-Event-Listenern |

## Sicherheits- & Schutzgarantien

* **Deskriptor-Validierung**: Fehlerhafte Plugin-Deskriptoren werden beim Start abgelehnt.
* **Fehlerisolation**: Jeder Hook-Aufruf ist durch try/catch-Wrapper geschützt; ein Plugin-Fehler kann den Dokumentations-Build nicht zum Absturz bringen.
* **Durchsetzung von Fähigkeiten**: Plugins erhalten Ausführungsrechte ausschließlich für Hooks, die in ihren Manifest-Fähigkeiten explizit deklariert sind.

Siehe [Plugins erstellen](../development/building-plugins.md) für vollständige Entwicklungsrichtlinien für Plugins.