---
title: "Skalierbare Ordnerstruktur"
description: "So organisieren Sie umfangreiche Dokumentationsprojekte unter Verwendung des Diátaxis-Frameworks und des Auflösungssystems von docmd."
---

## Problem

Kleine Dokumentations-Websites beginnen oft mit einem flachen `docs/`-Ordner. Wenn das Projekt jedoch wächst und mehrere Module, Tutorials, APIs und konzeptionelle Vertiefungen umfasst, wird eine ungeordnete Ordnerstruktur zu einer erheblichen Wartungslast. Dateien sind schwer zu finden, und die Navigations-Seitenleiste wird zu einer überwältigenden "Wand aus Links".

## Warum es wichtig ist

Eine ungeordnete Ordnerstruktur führt direkt zu einer verwirrenden Benutzererfahrung, da das Routing und die Standardnavigation von `docmd` von Ihrem Dateisystem abgeleitet werden. Für Autoren führt das Fehlen einer klaren Struktur zu Inhaltsduplikaten und inkonsistenten Benennungen, was die Verwaltung der Dokumentation erschwert, je mehr Mitwirkende dem Projekt beitreten.

## Ansatz

Wir empfehlen die Einführung eines Frameworks für Informationsarchitektur wie [Diátaxis](external:https://diataxis.fr/), das Inhalte in vier verschiedene Kategorien unterteilt: Tutorials, How-To Guides (Anleitungen), Reference (Referenz) und Explanation (Erklärung). Die strikte Abbildung dieser Kategorien auf Ihr physisches Dateisystem bietet einen klaren Fahrplan sowohl für Leser als auch für Autoren.

## Implementierung

### 1. Die Diátaxis-Hierarchie

Organisieren Sie Ihr Quellverzeichnis in semantische Unterordner. Diese physische Isolierung erleichtert die Verwaltung großer Dateisätze und gewährleistet eine saubere URL-Struktur.

```text
my-project/
├── docs/
│   ├── tutorials/           (Lernorientiert: Schritt-für-Schritt-Lektionen)
│   │   └── getting-started.md
│   ├── guides/              (Aufgabenorientiert: Lösung spezifischer Probleme)
│   │   └── deployment.md
│   ├── reference/           (Informationsorientiert: technische Beschreibungen)
│   │   └── api-spec.md
│   ├── explanation/         (Verständnisorientiert: theoretischer Hintergrund)
│   │   └── architecture.md
│   └── navigation.json      (Definition der Hauptnavigation)
└── docmd.config.js
```

### 2. Strategische Nutzung von navigation.json

Anstatt einen massiven Navigationsbaum in Ihrer globalen Konfiguration zu definieren, verwenden Sie `navigation.json`-Dateien in Ihren Quellverzeichnissen. `docmd` folgt einem [Auflösungsprioritätssystem](../../configuration/navigation#navigation-resolution-priority), das es Ihnen ermöglicht, unterschiedliche Seitenleisten-Hierarchien für verschiedene Abschnitte Ihrer Website zu definieren.

```json
// docs/navigation.json
[
  {
    "title": "Tutorials",
    "icon": "book-open",
    "children": [
      { "title": "Erste Schritte", "path": "/tutorials/getting-started" }
    ]
  },
  {
    "title": "Referenz",
    "icon": "braces",
    "children": [
      { "title": "API-Spezifikation", "path": "/reference/api-spec" }
    ]
  }
]
```

### 3. Datei-basiertes Routing

Denken Sie daran, dass der Speicherort jeder Markdown-Datei in der Ordnerstruktur ihre endgültige URL bestimmt. Beispielsweise wird `docs/guides/auth.md` zu `ihre-seite.com/guides/auth`. Nutzen Sie dies zu Ihrem Vorteil, um intuitive, einprägsame URLs für Ihre Benutzer zu erstellen.

## Abwägungen

Strenge Organisations-Frameworks wie Diátaxis erfordern ein klares Verständnis der Inhaltstypen. Technische Redakteure können es gelegentlich als schwierig empfinden, ein bestimmtes Dokument zu kategorisieren (z. B. "Ist dies ein Guide oder ein Tutorial?"). Die Festlegung klarer interner Richtlinien für Beiträge ist unerlässlich, um die Konsistenz zu wahren, während Ihr Team und Ihre Dokumentation wachsen.
