---
title: "CLI-Befehle"
description: "Die vollständige Referenz des Command-Line-Interface von docmd."
---

Die `docmd`-CLI bietet eine Reihe leistungsstarker Befehle zur Verwaltung Ihrer Dokumentation — von der ersten Projektstruktur bis hin zur produktionsreifen Bereitstellung.

## Globale Optionen

Diese Optionen gelten theoretisch für alle `docmd`-Befehle.

- `-v, --version`: Gibt die aktuelle Version von `@docmd/core` aus.
- `-V, --verbose`: Zeigt detaillierte Protokolle der Engine und des Installers an. Nützlich zum Debuggen von Plugin-Installationen.
- `-h, --help`: Zeigt das interaktive Hilfemenü an.
- `--cwd <pfad>`: (Intern) Überschreibt das Arbeitsverzeichnis. Nützlich für Monorepo-Setups.

## `docmd init`

Erstellt ein neues Dokumentationsprojekt im aktuellen Verzeichnis.

```bash
docmd init
```

### Aktionen
- Erstellt ein `docs/`-Verzeichnis mit einer beispielhaften `index.md`.
- Generiert eine `docmd.config.js`-Datei mit empfohlenen Standardwerten.
- Aktualisiert Ihre `package.json` mit empfohlenen Build-Skripten.

## `docmd dev`

Startet einen schnellen Entwicklungsserver mit **sofortigem Hot-Reloading**.

```bash
docmd dev [optionen]
```

### Optionen
- `-p, --port <nummer>`: Einen benutzerdefinierten Port angeben (Standard: `3000`).
- `-c, --config <pfad>`: Einen vom Standard abweichenden Pfad zur Konfigurationsdatei verwenden.

## `docmd build`

Generiert eine produktionsreife statische Website im Ordner `site/`.

```bash
docmd build [optionen]
```

### Optionen
- `--offline`: **Dateiprotokoll-freundlich**. Schreibt Links so um, dass sie auf `.html` enden, was das direkte Browsen im lokalen Dateisystem ermöglicht (z. B. `file://`).
- `-c, --config <pfad>`: Pfad zur Konfigurationsdatei (Standard: `docmd.config.js`).

## `docmd live`

Startet die browserbasierte **Live-Editor**-Umgebung.

```bash
docmd live [optionen]
```

### Optionen
- `--build-only`: Generiert das statische Editor-Bundle in `dist/`, ohne einen Server zu starten.

## `docmd stop`

Beendet alle im Hintergrund laufenden Dokumentationsserver ordnungsgemäß.

```bash
docmd stop [optionen]
```

### Optionen
- `-p, --port <nummer>`: Beendet eine spezifische Instanz, die auf einem bestimmten Port läuft.

## `docmd add <plugin>`

Installiert ein offizielles Plugin oder ein Community-Plugin und konfiguriert Ihr Projekt automatisch.

```bash
docmd add analytics
```

### Aktionen
- Nutzt Ihren bevorzugten Paketmanager (`npm`, `pnpm`, `yarn` oder `bun`).
- Fügt das Plugin und seine empfohlenen Standardeinstellungen in die `docmd.config.js` ein.

## `docmd remove <plugin>`

Deinstalliert sicher ein Plugin und bereinigt Ihre Konfiguration.

```bash
docmd remove analytics
```

## `docmd migrate`

Aktualisiert veraltete `docmd`-Konfigurationen auf das moderne V2-Schema.

```bash
docmd migrate
```

Es ordnet veraltete Schlüssel neu zu (z. B. `siteTitle` zu `title`) und strukturiert das Konfigurationsobjekt neu, um das neue Layout und die neuen Navigations-Frameworks zu unterstützen.

::: callout tip "Agenten-kompatibles Logging"
`docmd` implementiert strukturiertes Terminal-Logging. Wenn Sie einen KI-Agenten für die Entwicklung nutzen, ermöglicht dies eine präzise Fehlererkennung und automatisierte Projektwartung.
:::