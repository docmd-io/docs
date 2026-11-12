---
title: "CLI-Befehle"
description: "Befehlszeilenschnittstellen-Referenz für docmd, Befehle, Flags und Optionen zum Erstellen und Verwalten von Dokumentationen."
---

## Befehle im Überblick

| Befehl | Technische Funktion |
| :--- | :--- |
| [`npx @docmd/core init`](#npx-docmdcore-init) | Einen neuen Dokumentations-Workspace initialisieren. |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | Lokalen Entwicklungsserver mit Hot-Reloading starten. |
| [`npx @docmd/core build`](#npx-docmdcore-build) | Produktionsbereite statische Website kompilieren. |
| [`npx @docmd/core serve`](#npx-docmdcore-serve) | Produktionsbereiten statischen Webserver mit Komprimierung und Health-Checks starten. |
| [`npx @docmd/core live`](#npx-docmdcore-live) | Browserbasierte Live-Editor-Umgebung starten. |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | Aktive Entwicklungs- oder Produktionsserver beenden. |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | Deployment-Manifeste und Containerdateien generieren. |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | Legacy-Konfigurationen upgraden oder von Drittanbieter-Tools migrieren. |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | Link-Validierung ausführen und Dokumentenintegrität prüfen. |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | Pre-Flight-Umgebungsdiagnose ausführen und Abhängigkeiten prüfen. |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | Model Context Protocol (MCP)-Server über `stdio` ausführen. |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | docmd-Plugins installieren und konfigurieren. |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | Plugins deinstallieren und Konfigurationseinträge entfernen. |

## Globale Optionen

| Parameter-Flag | Alias | Technische Beschreibung |
| :--- | :--- | :--- |
| `--config <path>` | `-c` | Benutzerdefinierten Pfad zur Konfigurationsdatei angeben (Standard: `docmd.config.json`). |
| `--no-open` | - | Automatisches Öffnen des Browsers beim Serverstart deaktivieren (`dev`-Befehl). |
| `--verbose` | `-V` | Detaillierte Ausführungsprotokolle ausgeben. |
| `--version` | `-v` | Installierte Paketversion ausgeben. |
| `--help` | `-h` | CLI-Hilfeanweisungen für Befehle ausgeben. |
| `--cwd <path>` | - | Ziel-Arbeitsverzeichnispfad überschreiben. |

## `npx @docmd/core init`

Initialisieren Sie ein Dokumentations-Repository-Layout im Arbeitsverzeichnis.

```bash
npx @docmd/core init
```

Generiert:
* `docs/index.md`, Standard-Landingpage.
* `docmd.config.json`, Standardmäßige Konfigurationsoptionen.
* Aktualisierte Build-Skripte in `package.json`.

## `npx @docmd/core dev`

Starten Sie den lokalen Entwicklungsserver mit Echtzeit-Hot-Reloading.

```bash
npx @docmd/core dev [options]
```

| Parameter-Flag | Alias | Technische Beschreibung |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Webserver-Port angeben (Standard: `3000`). |
| `--host <address>` | - | Netzwerk-Interface zur Bindung angeben (Standard: `127.0.0.1`; `0.0.0.0` für alle/LAN). |
| `--no-open` | - | Automatisches Öffnen des Standard-Webbrowsers beim Serverstart verhindern. |
| `--config <path>` | `-c` | Benutzerdefinierter Pfad zur Konfigurationsdatei. |

## `npx @docmd/core build`

Kompilieren Sie eine statische Produktions-Website in Ihr konfiguriertes Ausgabeverzeichnis (`site/`).

```bash
npx @docmd/core build [options]
```

| Parameter-Flag | Alias | Technische Beschreibung |
| :--- | :--- | :--- |
| `--offline` | - | Asset- und Link-Pfade in relative `.html`-Dateien für lokales Dateisystem-Browsing umschreiben. |
| `--config <path>` | `-c` | Benutzerdefinierter Pfad zur Konfigurationsdatei. |

## `npx @docmd/core serve`

Einmal kompilieren und einen produktionsreifen HTTP-Webserver für die erstellte Dokumentation (`site/`) starten.

Im Gegensatz zu `dev` ist `serve` für Produktivumgebungen konzipiert (z. B. Docker, Kubernetes, VPS). Es führt kein Dateiwatching oder Hintergrund-Neukompilieren durch, liefert statische Assets mit Gzip- und Deflate-Komprimierung aus, erzwingt strenge Sicherheits-Header (CSP, HSTS), unterstützt Clean URLs und stellt einen Container-Health-Check (`/healthz`) bereit.

```bash
npx @docmd/core serve [options]
```

| Parameter-Flag | Alias | Technische Beschreibung |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Webserver-Port angeben (Standard: `3000` oder `serve.port`). |
| `--host <address>` | - | Netzwerk-Interface zur Bindung angeben (Standard: `127.0.0.1`; `0.0.0.0` für alle/LAN/Docker). |
| `--config <path>` | `-c` | Benutzerdefinierter Pfad zur Konfigurationsdatei. |

::: callout info "Container-Health-Checks (/healthz)" icon:activity
`docmd serve` stellt einen automatischen `GET /healthz`-Endpunkt bereit, der `{"status":"ok","version":"..."}` mit HTTP 200 und `Cache-Control: no-store` zurückgibt. Verwenden Sie diesen Endpunkt für Docker `HEALTHCHECK`, Kubernetes Liveness- und Readiness-Probes sowie Cloud-Load-Balancer.
:::

## `npx @docmd/core live`

Starten Sie die browserbasierte Live-Editor-Umgebung.

```bash
npx @docmd/core live [options]
```

| Parameter-Flag | Technische Beschreibung |
| :--- | :--- |
| `--build-only` | Eigenständiges Live-Editor-Bundle kompilieren, ohne den Vorschau-Webserver zu starten. |

## `npx @docmd/core stop`

Beenden Sie laufende Entwicklungs- oder Produktionsserver.

```bash
npx @docmd/core stop [options]
```

| Parameter-Flag | Alias | Technische Beschreibung |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Prozess beenden, der auf dem angegebenen Port läuft. |
| `--force` | `-f` | Prozesse beenden, die auf Standardports (3000, 3001, 8080, 8081) laufen. |

## `npx @docmd/core deploy`

Generieren Sie Deployment-Manifeste und Konfigurationsdateien.

```bash
npx @docmd/core deploy [options]
```

| Parameter-Flag | Technische Beschreibung |
| :--- | :--- |
| `--docker` | Multi-Stage-`Dockerfile` und `.dockerignore` ausgeben. |
| `--nginx` | Produktions-`nginx.conf` ausgeben. |
| `--caddy` | `Caddyfile` ausgeben. |
| `--github-pages` | `.github/workflows/deploy.yml` ausgeben. |
| `--vercel` | `vercel.json` ausgeben. |
| `--netlify` | `netlify.toml` ausgeben. |
| `--force` | Vorhandene Deployment-Manifeste überschreiben. |

## `npx @docmd/core migrate`

Migrieren Sie Konfigurationen von älteren Versionen oder Drittanbieter-Engines.

```bash
npx @docmd/core migrate [options]
```

Option-Flags:
* `--upgrade`: Veraltete Konfigurationsschlüssel vor Version 0.7.x an Ort und Stelle übersetzen.
* `--dry-run`: Migrationsänderungen in der Vorschau anzeigen, ohne Festplatteninhalte zu ändern.

## `npx @docmd/core validate`

Validieren Sie interne Linkziele und Dokumentstruktur in allen Markdown-Quellen.

```bash
npx @docmd/core validate [options]
```

| Parameter-Flag | Technische Beschreibung |
| :--- | :--- |
| `--json` | Validierungsfehler als maschinenlesbares JSON für die CI-Integration ausgeben. |

## `npx @docmd/core doctor`

Führen Sie Pre-Flight-Umgebungsdiagnosen aus und prüfen Sie Installationszustände von Plugins/Templates.

```bash
npx @docmd/core doctor [options]
```

| Parameter-Flag | Technische Beschreibung |
| :--- | :--- |
| `--config <path>` | Pfad zu einer nicht standardmäßigen Konfigurationsdatei. |
| `--fix` | Fehlende offizielle Plugins oder Templates, die bei der Prüfung identifiziert wurden, automatisch installieren. |
| `--json` | Diagnosebericht im maschinenlesbaren JSON-Format ausgeben. |

## `npx @docmd/core mcp`

Führen Sie den Model Context Protocol (MCP)-Server über `stdio` für Agenten-Integrationen aus.

```bash
npx @docmd/core mcp
```

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

Installieren und konfigurieren Sie offizielle oder Drittanbieter-Plugins.

```bash
npx @docmd/core add <plugin-name>
```

| Befehlsbeispiel | Technische Funktion |
| :--- | :--- |
| `npx @docmd/core add analytics` | `@docmd/plugin-analytics` installieren. |
| `npx @docmd/core add search` | `@docmd/plugin-search` installieren. |

## `npx @docmd/core remove <plugin>`

Deinstallieren Sie Plugins und bereinigen Sie entsprechende Konfigurationsblöcke in `docmd.config.json`.

```bash
npx @docmd/core remove <plugin-name>
```

::: callout tip "Agenten-Terminal-Protokollierung" icon:sparkles
docmd formatiert CLI-Ausgaben unter Verwendung strukturierter Terminal-Protokollierung, um das Parsen durch automatisierte CI-Jobs und KI-Entwicklungsagenten zu vereinfachen.
:::