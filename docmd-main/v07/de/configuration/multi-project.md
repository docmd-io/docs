---
title: "Multi-Projekt-Konfiguration"
description: "Erstellen Sie mehrere unabhängige Dokumentationsseiten aus einer einzigen docmd-Instanz. Gemeinsame Assets, unabhängige Versionierung, eine Bereitstellung."
---

Erstellen und veröffentlichen Sie mehrere Dokumentationsprojekte aus einem einzigen Repository. Jedes Projekt behält seine eigene Konfiguration, Versionierung und Navigation, während es ein gemeinsames Theme und eine gemeinsame Asset-Pipeline nutzt.

## Übersicht

Der Multi-Projekt-Modus ist für Organisationen konzipiert, die mehrere Tools, Bibliotheken oder Produkte unter einer Domain pflegen. Statt mehrere docmd-Instanzen hinter einem Reverse-Proxy zu betreiben, erzeugt ein einzelnes `docmd build` ein einheitliches `site/`-Verzeichnis.

```
docs.example.com/           → Hauptdokumentation
docs.example.com/sdk/       → SDK-Referenz
docs.example.com/cli/       → CLI-Dokumentation
```

## Einrichtung

### 1. Verzeichnisstruktur

Organisieren Sie Ihr Repository mit einem Verzeichnis pro Projekt:

```
my-docs/
├── assets/                   ← gemeinsame Assets (alle Projekte)
├── main-docs/
│   ├── docmd.config.js       ← Projektkonfiguration
│   └── v01/                  ← versionierte Inhalte
│       └── en/
├── sdk-docs/
│   ├── docmd.config.js       ← Projektkonfiguration
│   └── docs/                 ← nicht-versionierte Inhalte
├── docmd.config.js           ← Root-Multi-Projekt-Konfiguration
└── package.json
```

### 2. Root-Konfiguration

Die Root-`docmd.config.js` enthält **nur** das `projects`-Array:

```javascript
module.exports = defineConfig({
  projects: [
    { prefix: '/', src: 'main-docs' },
    { prefix: '/sdk', src: 'sdk-docs' }
  ]
});
```

| Schlüssel | Beschreibung |
| :-- | :---------- |
| `prefix` | URL-Präfix für dieses Projekt. Verwenden Sie `'/'` für das Root-Projekt. |
| `src` | Verzeichnis mit der `docmd.config.js` und den Inhalten dieses Projekts. |

::: callout warning
Jede Multi-Projekt-Konfiguration **muss** ein Root-Projekt mit `prefix: '/'` enthalten.
:::

### 3. Projektkonfigurationen

Jedes Projektverzeichnis hat seine eigene `docmd.config.js` mit vollständig unabhängiger Konfiguration. Fügen Sie **keine** `src`- oder `out`-Schlüssel ein — die übergeordnete Konfiguration stellt diese automatisch bereit.

```javascript
// sdk-docs/docmd.config.js
module.exports = defineConfig({
  title: 'SDK-Referenz',
  url: 'https://docs.example.com/sdk',

  theme: {
    name: 'default',
    appearance: 'light',
  },

  versions: {
    current: '02',
    all: [
      { id: '02', dir: 'v02', label: 'v2.0' },
      { id: '01', dir: 'v01', label: 'v1.0' }
    ]
  },
});
```

## Assets

### Gemeinsame Assets

Legen Sie gemeinsame Ressourcen (Logos, Favicons, globales CSS) im Root-`assets/`-Verzeichnis ab. Diese werden automatisch in die Ausgabe jedes Projekts kopiert.

### Projektspezifische Assets

Jedes Projekt kann ein eigenes `assets/`-Verzeichnis haben. Projektspezifische Assets haben Vorrang vor gemeinsamen Assets bei Namenskonflikten.

## Entwicklung

Starten Sie den Multi-Projekt-Entwicklungsserver:

```bash
docmd dev
```

Der Server erstellt alle Projekte und stellt sie über einen einzigen Port bereit. Dateiänderungen in einem Projekt lösen einen Neubau mit Live-Reload aus. Änderungen an gemeinsamen Assets erstellen alle Projekte neu.

## Erstellen & Bereitstellen

```bash
docmd build
```

Die Ausgabe ist ein einzelnes statisches Verzeichnis. Veröffentlichen Sie es auf jedem statischen Hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages) ohne zusätzliche Konfiguration.

## Regeln & Einschränkungen

1. **Root-Projekt erforderlich** — ein Projekt muss `prefix: '/'` haben
2. **Keine doppelten Präfixe** — jedes Projekt benötigt ein einzigartiges URL-Präfix
3. **Kein `src`/`out` in untergeordneten Konfigurationen** — die übergeordnete Konfiguration stellt diese bereit
4. **Alles unabhängig** — jedes Projekt hat eigene Titel, Versionen, i18n, Plugins und Navigation
5. **Root-Konfiguration minimal** — nur `projects` sollte in der Root-`docmd.config.js` stehen
