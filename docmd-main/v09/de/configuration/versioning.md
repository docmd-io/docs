---
title: "Versionierungs-Engine"
description: "Liefern Sie Mehrversions-Dokumentation mit nahtlosem Versionswechsel, verfolgechter URL-Pfad-Erhaltung und isolierten Build-Ausgaben in docmd."
---

`docmd` verfügt über eine native Versionierungs-Engine, mit der Sie mehrere Release-Versionen gleichzeitig verwalten und bereitstellen können. Der Compiler verarbeitet URL-Routing, Versionsumschaltmenüs und die verfolgechte Navigationszustandserhaltung automatisch.

## Verzeichnisorganisation

Organisieren Sie die Dokumentation in versionierten Quellverzeichnissen. Die Standardkonvention behält die aktuell aktive Version in `docs/` und Legacy- oder Vorschau-Releases in Verzeichnissen mit dem Präfix `docs-`:

```text
my-project/
├── docs/           # Aktuell aktives Release (Hauptversion)
├── docs-v1/        # Legacy-Release
├── docmd.config.json
```

## Konfigurationsschema

<img width="500" class="with-border" src="/assets/previews/menu-versioning.webp">

Konfigurieren Sie Versionen im `versions`-Block von `docmd.config.json`:

```json "docmd.config.json"
{
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Neueste)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x" }
    ]
  }
}
```

## Kerneigenschaften der Engine

### 1. Root-SEO-Route (Aktive Version)
Die `current`-Version wird direkt in Ihren Site-Stamm gebaut (z. B. `example.com/`). Dies stellt sicher, dass organischer Suchverkehr und externe Links auf Ihrer aktuellsten Dokumentation landen.

### 2. Isolierte Versions-Unterverzeichnisse
Nicht-aktuelle Releases werden in dedizierte Unterordner gebaut, die nach ihrer `id` benannt sind:
- `v2` (Aktives Release) → `example.com/`
- `v1` (Legacy-Release) → `example.com/v1/`

### 3. Verfolgechte Pfaderhaltung (Sticky Route Preservation)
Wenn Leser mithilfe des Dropdown-Selektors zwischen Versionen umschalten, behält `docmd` relative Pfadpositionen bei. Liest ein Benutzer `example.com/getting-started` und wechselt zu **v1**, wird er automatisch zu `example.com/v1/getting-started` weitergeleitet (sofern das Zieldokument existiert).

### 4. Statische Asset-Isolation
Jede Version erbt gemeinsame Assets aus dem globalen Verzeichnis `assets/`. Der Compiler isoliert kompilierte Assets während der Build-Zeit, um Styling- oder Skriptkonflikte über Versionen hinweg zu verhindern.

### 5. Versionsspezifische Navigations-Sidebars
Jede Version kann ein unabhängiges `navigation.json`-Manifest verwalten. Lesen Sie die [Navigationskonfiguration](./navigation.md) für kaskadierende Auflösungsdetails.

## Richtlinien für die Versionierung

1. **URL-freundliche IDs**: Verwenden Sie prägnante, alphanumerische Bezeichner wie `v1`, `v2` oder `beta`.
2. **Konsistente Dateihierarchien**: Pflegen Sie parallele Verzeichnisstrukturen über Versionen hinweg, um die Genauigkeit des verfolgechten Pfadwechsels zu maximieren.
3. **Einzelne Konfigurationsdatei**: Erstellen Sie keine separaten Konfigurationsmanifeste für jede Version; `docmd` verarbeitet alle Versionen in einem einzigen einheitlichen Build-Durchlauf.