---
title: "CLI-Befehle"
description: "Befehlszeilenreferenz für docmd — alle verfügbaren Befehle und Optionen."
---

## Befehlsübersicht

| Befehl | Beschreibung |
|:--------|:------------|
| [`docmd init`](#docmd-init) | Erstellt ein neues Dokumentationsprojekt |
| [`docmd dev`](#docmd-dev) | Startet den Entwicklungsserver mit Hot-Reload |
| [`docmd build`](#docmd-build) | Erzeugt eine statische Website für die Produktion |
| [`docmd live`](#docmd-live) | Startet den browserbasierten Live-Editor |
| [`docmd stop`](#docmd-stop) | Beendet laufende Entwicklungsserver |
| [`docmd deploy`](#docmd-deploy) | Erzeugt Bereitstellungskonfigurationen (Docker, Nginx, Caddy) |
| [`docmd migrate`](#docmd-migrate) | Aktualisiert Legacy-Konfigurationen auf das V2-Schema |
| [`docmd add <plugin>`](#docmd-add-plugin) | Installiert und konfiguriert ein Plugin |
| [`docmd remove <plugin>`](#docmd-remove-plugin) | Entfernt ein Plugin und dessen Konfiguration |

## Globale Optionen

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--config <path>` | `-c` | Pfad zur Konfigurationsdatei (Standard: `docmd.config.js`) |
| `--verbose` | `-V` | Detaillierte Build-Protokolle anzeigen |
| `--version` | `-v` | Die installierte Version ausgeben |
| `--help` | `-h` | Hilfemenü anzeigen |
| `--cwd <path>` | — | Arbeitsverzeichnis überschreiben (für Monorepos) |

## `docmd init`

Erstellt ein neues Dokumentationsprojekt im aktuellen Verzeichnis.

```bash
docmd init
```

Erstellt:
- `docs/index.md` — Beispiel-Startseite
- `docmd.config.js` — Empfohlene Standardeinstellungen
- Aktualisierte `package.json` mit Build-Skripten

## `docmd dev`

Startet einen Entwicklungsserver mit sofortigem Hot-Reload.

```bash
docmd dev [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Server-Port (Standard: `3000`) |
| `--config <path>` | `-c` | Pfad zur Konfigurationsdatei |

## `docmd build`

Erzeugt eine produktionsreife statische Website im Verzeichnis `site/`.

```bash
docmd build [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--offline` | — | Links auf `.html` umschreiben für `file://` Browsing |
| `--config <path>` | `-c` | Pfad zur Konfigurationsdatei |

## `docmd live`

Startet den browserbasierten Live-Editor.

```bash
docmd live [options]
```

| Option | Beschreibung |
|:-------|:------------|
| `--build-only` | Erzeugt das Editor-Bundle, ohne den Server zu starten |

## `docmd stop`

Beendet laufende docmd-Entwicklungsserver.

```bash
docmd stop [options]
```

| Option | Alias | Beschreibung |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Nur den Server auf diesem Port stoppen |
| `--force` | `-f` | Auch `serve`-Prozesse auf den Ports 3000, 3001, 8080, 8081 beenden |

## `docmd deploy`

Erzeugt Konfigurationsdateien für die Bereitstellung.

```bash
docmd deploy [options]
```

| Option | Beschreibung |
|:-------|:------------|
| `--docker` | Erzeugt ein `Dockerfile` |
| `--nginx` | Erzeugt `nginx.conf` |
| `--caddy` | Erzeugt `Caddyfile` |
| `--force` | Bestehende Bereitstellungsdateien überschreiben |

## `docmd migrate`

Aktualisiert Legacy docmd V1-Konfigurationen auf das V2-Schema.

```bash
docmd migrate
```

Ordnet automatisch veraltete Schlüssel neu zu (z. B. `siteTitle` → `title`) und strukturiert das Konfigurationsobjekt um.

## `docmd add <plugin>`

Installiert und konfiguriert ein offizielles oder Community-Plugin.

```bash
docmd add <plugin-name>
```

| Beispiel | Beschreibung |
|:--------|:------------|
| `docmd add analytics` | Installiert `@docmd/plugin-analytics` |
| `docmd add search` | Installiert `@docmd/plugin-search` |

Die CLI erkennt Ihren Paketmanager (npm, pnpm, yarn oder bun) und fügt empfohlene Standardeinstellungen in die `docmd.config.js` ein.

## `docmd remove <plugin>`

Deinstalliert sicher ein Plugin und bereinigt dessen Konfiguration.

```bash
docmd remove <plugin-name>
```

Entfernt:
- Das npm-Paket
- Plugin-Konfiguration aus der `docmd.config.js`

::: callout tip "Agenten-kompatible Protokollierung :robot:"
`docmd` verwendet strukturierte Terminal-Protokolle. KI-Agenten können die Ausgabe präzise parsen für Fehlererkennung und automatisierte Wartung.
:::