---
title: "Skalierbare Ordnerstruktur"
description: "So organisieren Sie große Dokumentationsprojekte mithilfe des Diátaxis-Frameworks und des docmd-Auflösungssystems."
---

## Problem

Kleine Dokumentations-Websites beginnen oft mit einem flachen `docs/`-Ordner. Wenn das Projekt jedoch wächst und mehrere Module, Tutorials, APIs und tiefergehende Konzepte umfasst, wird eine unorganisierte Ordnerstruktur zu einer erheblichen Wartungslast. Dateien sind schwer zu finden, und die Sidebar wird zu einer unübersichtlichen "Link-Wüste".

## Warum es wichtig ist

Eine unorganisierte Ordnerstruktur führt direkt zu einer verwirrenden User Experience, da das Routing und die Standard-Navigation von `docmd` von Ihrem Dateisystem abgeleitet werden. Für Autoren führt das Fehlen einer klaren Struktur zu Inhaltsduplikaten und inkonsistenter Benennung, was die Verwaltung erschwert, wenn mehr Mitwirkende zum Projekt stoßen.

## Ansatz

Wir empfehlen die Verwendung eines Informationsarchitektur-Frameworks wie [Diátaxis](https://diataxis.fr/), das Inhalte in vier Kategorien unterteilt: Tutorials, How-To Guides, Reference und Explanation. Diese Kategorien direkt auf Ihr physisches Dateisystem abzubilden, bietet sowohl Lesern als auch Autoren einen klaren Fahrplan.

## Implementierung

### 1. Die Diátaxis-Hierarchie

Organisieren Sie Ihr Quellverzeichnis in semantische Unterordner. Diese physische Trennung erleichtert die Verwaltung großer Dateimengen und sorgt für eine saubere URL-Struktur.

```text
mein-projekt/
├── docs/
│   ├── tutorials/           (Lernorientiert: Schritt-für-Schritt-Lektionen)
│   │   └── erste-schritte.md
│   ├── guides/              (Aufgabenorientiert: Lösung spezifischer Probleme)
│   │   └── deployment.md
│   ├── reference/           (Informationsorientiert: technische Beschreibungen)
│   │   └── api-spezifikation.md
│   ├── explanation/         (Verständnisorientiert: theoretische Hintergründe)
│   │   └── architektur.md
│   └── navigation.json      (Hauptnavigationsdefinition)
└── docmd.config.js
```

### 2. Strategischer Einsatz von navigation.json

Anstatt einen riesigen Navigationsbaum in Ihrer globalen Konfiguration zu definieren, verwenden Sie `navigation.json`-Dateien in Ihren Quellverzeichnissen. `docmd` folgt einem [Auflösungsprioritätssystem](../../configuration/navigation#navigation-resolution-priority), mit dem Sie separate Sidebar-Hierarchien für verschiedene Abschnitte Ihrer Website definieren können.

```json
// docs/navigation.json
[
  {
    "title": "Tutorials",
    "icon": "book-open",
    "children": [
      { "title": "Erste Schritte", "path": "/tutorials/erste-schritte" }
    ]
  },
  {
    "title": "Referenz",
    "icon": "braces",
    "children": [
      { "title": "API-Spezifikation", "path": "/reference/api-spezifikation" }
    ]
  }
]
```

### 3. Dateibasiertes Routing

Beachten Sie, dass der Ort jeder Markdown-Datei in der Ordnerstruktur deren finale URL bestimmt. Zum Beispiel wird `docs/guides/auth.md` zu `ihre-seite.de/guides/auth`. Nutzen Sie dies zu Ihrem Vorteil, um intuitive und leicht merkbare URLs für Ihre Benutzer zu erstellen.

## Abwägungen

Strikte Organisationsframeworks wie Diátaxis erfordern ein klares Verständnis der Inhaltstypen. Technische Redakteure können es gelegentlich als schwierig empfinden, ein bestimmtes Dokument zu kategorisieren (z. B. "Ist das eine Anleitung oder ein Tutorial?"). Die Erstellung klarer interner Beitragsrichtlinien ist essenziell, um die Konsistenz zu wahren, während Ihr Team und Ihre Dokumentation wachsen.
