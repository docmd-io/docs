---
title: "Versionierung"
description: "Aktivieren Sie Mehrversions-Dokumentation mit nahtlosem Wechsel, sticky Pfad-Erhaltung und isolierten Build-Verzeichnissen."
---

docmd verfügt über eine native Versionierungs-Engine. Verwalten und liefern Sie mehrere Versionen Ihres Projekts gleichzeitig. Die Engine übernimmt automatisch URL-Routing, Sidebar-Updates und Wechsel-Logik.

## Verzeichnisstruktur

Organisieren Sie Ihre Dokumentation in versionierten Quellordnern. Ein gängiges Muster behält die aktive Version in `docs/` und archivierte Versionen in Verzeichnissen mit dem Präfix `docs-`.

```text
my-project/
├── docs/           # Neueste Version (Hauptversion)
├── docs-v1/        # Legacy-Version
├── docmd.config.json
```

## Konfiguration

<img width="500" class="with-border" src="/assets/previews/menu-versioning.webp">

Definieren Sie Ihre Versionen im `versions`-Objekt:

```json
{
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Latest)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x" }
    ]
  }
}
```

## Kernfunktionen

### 1. Root-SEO (Die „aktuelle" Version)
Die `current`-Version wird direkt im Ausgabestamm erzeugt (z. B. `mysite.com/`). So landet der Suchverkehr immer auf Ihrer aktuellsten Dokumentation.

### 2. Isolierte Unterverzeichnisse
Nicht-aktuelle Versionen werden automatisch in Unterordner gebaut, die ihrer `id` entsprechen.
*   `v2 (Current)` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. Sticky-Switching (Pfad-Erhaltung)

docmd erhält den relativen Pfad beim Versionswechsel. Liest ein Nutzer `mysite.com/getting-started` und wechselt zu **v1**, wird er automatisch zu `mysite.com/v1/getting-started` weitergeleitet (sofern die Seite existiert).

### 4. Asset-Isolation
Jede Version erbt Ihr globales `assets/`-Verzeichnis. docmd isoliert diese während des Builds, um Style-Leaks oder Konflikte zu verhindern.

### 5. Versionierte Navigation

Jede Version kann eine eigene Navigationsstruktur pflegen. docmd verwendet ein Kaskadierungs-Prioritätssystem zur Auflösung der Sidebar.

Details zur Auflösungshierarchie finden Sie in der [Navigationskonfiguration](navigation.md).

## Best Practices

1.  **Semantische IDs**: Verwenden Sie prägnante, URL-freundliche IDs wie `v1`, `v2` oder `beta`.
2.  **Navigationsparität**: Pflegen Sie konsistente Ordnerstrukturen über die Versionen hinweg, um das „Sticky-Switching" zu maximieren.
3.  **Einheitliche Konfiguration**: Erstellen Sie keine separaten Konfigurationsdateien für jede Version. docmd verarbeitet alle Versionen in einem einzigen Durchlauf.
