---
title: "CLI-Befehle"
description: "Befehlszeilen-Referenz für docmd - alle verfügbaren Befehle und Optionen."
---

## Befehle im Überblick

| Befehl | Beschreibung |
|:--------|:------------|
| [`npx @docmd/core init`](#npx-docmdcore-init) | Ein neues Dokumentations-Projekt scaffolden |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | Development-Server mit Hot-Reload starten |
| [`npx @docmd/core build`](#npx-docmdcore-build) | Eine produktionsreife statische Site generieren |
| [`npx @docmd/core live`](#npx-docmdcore-live) | Den browserbasierten Live-Editor starten |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | Laufende Dev-Server beenden |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | Deployment-Konfigurationen generieren |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | Legacy-Konfigurationen upgraden oder von anderen Tools migrieren |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | Links validieren und Dokumentations-Dateien prüfen |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | Vorabprüfung: fehlende Plugins, defekte Konfigurationen, nicht passende Engines melden |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | Als MCP-(Model Context Protocol-)Server über stdio betreiben |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | Ein Plugin installieren und konfigurieren |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | Ein Plugin und seine Konfiguration entfernen |

## Globale Optionen

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--config <path>` | `-c` | Pfad zur Konfigurations-Datei (Standard: `docmd.config.json`) |
| `--verbose` | `-V` | Detaillierte Build-Logs anzeigen |
| `--version` | `-v` | Installierte Version ausgeben |
| `--help` | `-h` | Hilfe-Menü anzeigen |
| `--cwd <path>` | - | Arbeitsverzeichnis überschreiben (für Monorepos) |

## `npx @docmd/core init`

Ein neues Dokumentations-Projekt im aktuellen Verzeichnis scaffolden.

```bash
npx @docmd/core init
```

Erstellt:
- `docs/index.md` - Boilerplate-Startseite
- `docmd.config.json` - empfohlene Standards
- Aktualisierte `package.json` mit Build-Skripten

## `npx @docmd/core dev`

Einen Development-Server mit sofortigem Hot-Reload starten.

```bash
npx @docmd/core dev [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Server-Port (Standard: `3000`) |
| `--config <path>` | `-c` | Pfad zur Konfigurations-Datei |

## `npx @docmd/core build`

Eine produktionsreife statische Site in `site/` generieren.

```bash
npx @docmd/core build [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--offline` | - | Links auf `.html` umschreiben für `file://`-Browsing |
| `--config <path>` | `-c` | Pfad zur Konfigurations-Datei |

## `npx @docmd/core live`

Den browserbasierten Live-Editor starten.

```bash
npx @docmd/core live [options]
```

| Option | Beschreibung |
|:-------|:------------|
| `--build-only` | Editor-Bundle generieren, ohne den Server zu starten |

## `npx @docmd/core stop`

Laufende Dev-Server beenden.

```bash
npx @docmd/core stop [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Nur den Server auf diesem Port stoppen |
| `--force` | `-f` | Auch `serve`-Prozesse auf den Ports 3000, 3001, 8080, 8081 beenden |

## `npx @docmd/core deploy`

Deployment-Konfigurations-Dateien generieren.

```bash
npx @docmd/core deploy [options]
```

| Option | Beschreibung |
|:-------|:------------|
| `--docker` | Generiert eine `Dockerfile` + `.dockerignore` |
| `--nginx` | Generiert `nginx.conf` |
| `--caddy` | Generiert eine `Caddyfile` |
| `--github-pages` | Generiert `.github/workflows/deploy.yml` |
| `--vercel` | Generiert `vercel.json` |
| `--netlify` | Generiert `netlify.toml` |
| `--force` | Vorhandene Deployment-Dateien überschreiben |

## `npx @docmd/core migrate`

Von einem anderen Tool migrieren oder Konfigurationen upgraden.

```bash
npx @docmd/core migrate
```

Ordnet veraltete Schlüssel automatisch neu zu (z. B. `siteTitle` → `title`) und strukturiert das Config-Objekt um.

## `npx @docmd/core validate`

Dokumentations-Dateien validieren und auf defekte interne Links prüfen.

```bash
npx @docmd/core validate [options]
```

| Option | Beschreibung |
|:-------|:------------|
| `--json` | Fehler als maschinenlesbares JSON ausgeben (nützlich für CI-Pipelines). |

Durchsucht jede Markdown-Datei, folgt relativen Links und Bild-Referenzen und meldet defekte Ziele. Beendet sich mit einem Status ungleich Null, falls ein Link ungültig ist, sodass Sie es in Pre-Merge-Hooks einbinden können.

## `npx @docmd/core doctor`

Vorabprüfung, die fehlende Plugins, defekte Konfigurationen und nicht passende Engines meldet. Keine Datei-Schreibvorgänge, keine Build-Nebenwirkungen — rein diagnostisch.

```bash
npx @docmd/core doctor [Optionen]
```

| Option | Beschreibung |
|:-------|:------------|
| `--config <Pfad>` | Pfad zu einer abweichenden `docmd.config.json` (oder `.ts`/`.js`/`.mjs`). |
| `--fix` | Fehlende offizielle Plugins oder Templates automatisch installieren. |
| `--json` | Den Bericht als maschinenlesbares JSON ausgeben (für CI und Tools). |

Standardmäßig druckt `doctor` eine menschenlesbare Zusammenfassung mit: installierter `@docmd/core`-Version, allen konfigurierten Plugins (mit Version und Status `✓ installiert` / `⚠ fehlt`), dem aktiven Template, den angeforderten Engines (`js` immer aktiv, `rust` optional) und einer Liste der Auto-Install-Kandidaten. Mit `--fix` ruft es den Paket-Manager des Projekts auf (`pnpm add`, `npm install --save`, `yarn add` oder `bun add`), um die Kandidaten zu installieren, und beendet sich mit Code 0, wenn alles aufgelöst wurde. Mit `--json` werden dieselben Daten als einzelnes JSON-Objekt ausgegeben — nützlich für Pre-Commit-Hooks und CI-Gates. Exit-Code 0 bedeutet, das Projekt ist gesund; ungleich Null bedeutet, dass nach einem `--fix`-Lauf mindestens ein Problem verbleibt.

## `npx @docmd/core mcp`

docmd als Model Context Protocol (MCP)-Server über stdio betreiben. Damit können AI-Agenten (Claude Desktop, Cursor usw.) Ihre Dokumentation direkt lesen und validieren.

```bash
npx @docmd/core mcp
```

Der Server kommuniziert über Standard-Ein-/Ausgabe mittels JSON-RPC. Konfigurieren Sie Ihren MCP-Client mit:

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["-y", "@docmd/core", "mcp"]
    }
  }
}
```

## `npx @docmd/core add <plugin>`

Ein offizielles oder Community-Plugin installieren und konfigurieren.

```bash
npx @docmd/core add <plugin-name>
```

| Beispiel | Beschreibung |
|:--------|:------------|
| `npx @docmd/core add analytics` | Installiert `@docmd/plugin-analytics` |
| `npx @docmd/core add search` | Installiert `@docmd/plugin-search` |

Die CLI erkennt Ihren Package-Manager (npm, pnpm, yarn oder bun) und fügt empfohlene Standards in `docmd.config.json` ein.

## `npx @docmd/core remove <plugin>`

Ein Plugin sicher deinstallieren und seine Konfiguration aufräumen.

```bash
npx @docmd/core remove <plugin-name>
```

Entfernt:
- Das npm-Paket
- Die Plugin-Konfiguration aus `docmd.config.json`

::: callout tip "Agent-kompatibles Logging" icon:sparkles
docmd verwendet strukturiertes Terminal-Logging. AI-Agenten können die Ausgabe präzise für Fehlererkennung und automatisierte Wartung parsen.
:::