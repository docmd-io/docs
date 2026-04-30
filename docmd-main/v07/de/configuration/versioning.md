---
title: "Versionierung"
description: "Aktivieren Sie mehrdimensionale Dokumentationen mit nahtlosem Wechsel, Beibehaltung des Pfades und isolierten Build-Verzeichnissen."
---

`docmd` verfügt über eine native Versionierungs-Engine, mit der Sie mehrere Versionen Ihres Projekts gleichzeitig verwalten und bereitstellen können (z. B. `v1.x`, `v2.x`). Die Engine übernimmt automatisch das URL-Routing, die Aktualisierung der Seitenleiste und die Logik für den Versionswechsel.

## Verzeichnis-Organisation

Um die Versionierung zu aktivieren, organisieren Sie Ihre Dokumentation in versionierten Quellordnern. Ein gängiges Schema ist, die aktive Version in `docs/` zu halten und archivierte Versionen in Verzeichnissen mit dem Präfix `docs-` zu speichern.

```text
mein-projekt/
├── docs/           # Aktuelle Version (Hauptversion)
├── docs-v1/        # Veraltete Version
├── docmd.config.js
```

## Konfiguration

<!-- SCREENSHOT: Dropdown-Versionsumschalter in der Seitenleiste, der „v2.x (Aktuell)“ als ausgewählt zeigt, mit „v1.x“ als Option. -->

Definieren Sie Ihre Versionen innerhalb des `versions`-Objekts:

```javascript
export default defineConfig({
  versions: {
    current: 'v2',           // Die Version-ID, die im Root (/) erstellt wird
    position: 'sidebar-top', // Position des Umschalters: 'sidebar-top' oder 'sidebar-bottom'
    all: [
      { id: 'v2', dir: 'docs',    label: 'v2.x (Aktuell)' },
      { id: 'v1', dir: 'docs-v1', label: 'v1.x' }
    ]
  }
});
```

## Kernfunktionen

### 1. Root-SEO (Die „aktuelle“ Version)
Die als `current` festgelegte Version wird direkt in Ihrem Ausgabe-Root generiert (z. B. `meineseite.de/`). Dies stellt sicher, dass Ihr primärer Suchtraffic immer auf Ihrer aktuellsten Dokumentation landet.

### 2. Isolierte Unterverzeichnisse
Nicht-aktuelle Versionen werden automatisch in Unterordnern erstellt, die ihrer `id` entsprechen.
*   `v2 (Aktuell)` → `meineseite.de/`
*   `v1` → `meineseite.de/v1/`

### 3. Permanenter Wechsel (Pfadbeibehaltung)

<!-- SCREENSHOT: Zwei Browserfenster nebeneinander — links wird v2 einer Seite gezeigt, rechts derselbe Seitenpfad in v1 nach dem Wechsel, was die Pfadbeibehaltung demonstriert. -->
`docmd` behält den relativen Pfad bei, wenn ein Benutzer die Version wechselt. Wenn ein Benutzer `meineseite.de/erste-schritte` liest und auf **v1** wechselt, wird er automatisch zu `meineseite.de/v1/erste-schritte` weitergeleitet (sofern die Seite existiert), anstatt zur Startseite zurückgeführt zu werden.

### 4. Asset-Isolation
Jede Version erbt Ihr globales `assets/`-Verzeichnis, aber `docmd` stellt sicher, dass diese während des Build-Prozesses isoliert werden, um Style-Abweichungen oder Versionskonflikte zu vermeiden.

### 5. Versionierte Navigation

Jede Version kann ihre eigene, unabhängige Navigationsstruktur verwalten. `docmd` verwendet ein kaskadierendes Prioritätssystem, um die Seitenleiste aufzulösen. Dies ermöglicht die Verwendung einer zentralen Konfiguration oder versions-/sprachspezifischer `navigation.json`-Dateien.

Einzelheiten zur Auflösungshierarchie und visuelle Beispiele finden Sie unter [Priorität der Navigationsauflösung](./navigation#prioritat-der-navigationsauflosung).

## Best Practices

1.  **Semantische IDs**: Verwenden Sie prägnante, URL-freundliche IDs wie `v1`, `v2` oder `beta`.
2.  **Navigations-Parität**: Behalten Sie konsistente Ordnerstrukturen über die Versionen hinweg bei, um die Effektivität der „Pfadbeibehaltung“ zu maximieren.
3.  **Einheitliche Konfiguration**: Sie benötigen keine separaten Konfigurationsdateien für jede Version; `docmd` verarbeitet alle Versionen in einem einzigen Durchgang.