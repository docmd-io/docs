---
title: "Zusammenarbeit mehrerer Teams"
description: "So nutzen Sie dezentrale Navigation und globale Menüleisten, um mehreren Teams die Zusammenarbeit an einem einheitlichen Dokumentationsprojekt ohne Reibungsverluste zu ermöglichen."
---

## Problem

Wenn mehrere unabhängige Teams (z. B. Frontend, Backend, DevOps und Produkt) zu einem einzigen Dokumentations-Repository beitragen, entstehen oft organisatorische Reibungsverluste. Teams könnten versehentlich globale Navigationseinstellungen überschreiben, widersprüchliche Design-Paradigmen erstellen oder bei gleichzeitigen Updates Links über Domänengrenzen hinweg beschädigen.

## Warum es wichtig ist

Reibung im Authoring-Prozess führt zu "Dokumentations-Silos", in denen Teams unabhängige, isolierte Wikis erstellen, um der Komplexität eines gemeinsamen Repositorys zu entgehen. Dies zerstört die einheitliche User Experience eines zentralen Dokumentationsportals und macht es für Benutzer erheblich schwerer, umfassende Informationen über das gesamte System zu finden.

## Ansatz

Nutzen Sie das dezentrale [Auflösungsprioritätssystem](../../configuration/navigation#navigation-resolution-priority) von `docmd`. Dies ermöglicht es einzelnen Teams, mithilfe lokaler `navigation.json`-Dateien die volle Autonomie über ihre spezifischen Domänen zu behalten, während ein zentrales Team die globale [Menüleiste](../../configuration/menubar) und das visuelle Designsystem verwaltet.

## Implementierung

### 1. Domänenbasierte Verantwortlichkeit

Unterteilen Sie Ihre Dokumentation in Top-Level-Verzeichnisse, die spezifischen Teams zugewiesen sind. Jedes Team ist vollständig für den Inhalt und die interne Struktur seines zugewiesenen Ordners verantwortlich.

```text
mein-projekt/
├── docs/
│   ├── frontend/             # Gehört dem UI-Team
│   │   ├── navigation.json   # Teamspezifische Sidebar
│   │   └── komponenten.md
│   ├── backend/              # Gehört dem API-Team
│   │   ├── navigation.json
│   │   └── datenbank.md
│   └── docmd.config.js       # Gehört dem Plattform-/Core-Team
```

### 2. Globaler Kontextwechsel (Die Menüleiste)

Das zentrale Plattform-Team steuert die [Menüleiste](../../configuration/menubar), die als primäre Navigationsebene dient, um zwischen den verschiedenen Team-Domänen zu wechseln.

```javascript
// docmd.config.js
export default {
  menubar: {
    enabled: true,
    items: [
      { text: 'Frontend', url: '/frontend/komponenten' },
      { text: 'Backend', url: '/backend/datenbank' },
      { text: 'Infrastruktur', url: '/devops/setup' }
    ]
  }
};
```

### 3. Lokale Autonomie mit navigation.json

Wenn ein Benutzer Inhalte innerhalb des `/frontend/`-Verzeichnisses durchsucht, priorisiert `docmd` automatisch die Datei `frontend/navigation.json`. Die Sidebar wird dynamisch aktualisiert und spiegelt nur die frontend-spezifische Hierarchie wider, wodurch verhindert wird, dass die Navigation durch unzusammenhängende Informationen anderer Teams überladen wird.

```json
// docs/frontend/navigation.json
[
  { "title": "Design System", "path": "/frontend/design-system" },
  { "title": "Komponenten-Bibliothek", "path": "/frontend/komponenten" }
]
```

## Abwägungen

Dezentrale Navigation erfordert von den Teams Sorgfalt bei domänenübergreifenden Links. Während `docmd` relative Links effektiv verarbeitet, bricht das Verschieben eines kompletten Team-Verzeichnisses die Links in den Dateien anderer Teams. Wir empfehlen die Verwendung von pfad-relativen Pfaden (beginnend mit `/`) für Links zwischen verschiedenen Team-Domänen, um Stabilität zu gewährleisten.
