---
title: "Navigationskonfiguration"
description: "Strukturieren Sie die Sidebar-Navigation, organisieren Sie Kategorien und konfigurieren Sie Icons für Leser und Suchmaschinen in docmd."
---

`docmd` bietet explizite Kontrolle über die Navigationshierarchie Ihrer Website. Eine strukturierte Sidebar erstellt eine logische Lesereihenfolge und optimiert sowohl die Single-Page-Application-Benutzererfahrung (SPA) als auch die Indizierbarkeit für Suchmaschinen.

## Das Navigations-Schema

Das `navigation`-Array in `docmd.config.json` steuert die Sidebar. Jedes Objekt stellt einen direkten Seiten-Link oder eine verschachtelte Kategoriegruppe dar:

<img width="260" class="with-border" src="/assets/previews/navigation-hierarchy.webp">

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Overview", "path": "/", "icon": "home" },
    { "title": "Quick Start", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## Unterstützte Link-Eigenschaften

Jedes Element im Navigations-Array unterstützt die folgenden Eigenschaften:

| Eigenschaft | Typ | Erforderlich | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Ja | In der Sidebar angezeigte Menübeschriftung. |
| `path` | `String` | Nein | Ziel-URL-Route. Relative lokale Pfade müssen mit einem führenden Schrägstrich (`/`) beginnen. |
| `icon` | `String` | Nein | Name eines beliebigen [Lucide-Icons](external:https://lucide.dev/icons) im Kebab-Case-Format (z. B. `git-branch`). |
| `children` | `Array` | Nein | Array verschachtelter Navigationselemente, die ein Untermenü definieren. |
| `collapsible`| `Boolean`| Nein | Bei `true` wird das Auf- und Einklappen von Kategoriegruppen aktiviert. |
| `external` | `Boolean`| Nein | Bei `true` wird der Ziel-Link in einem neuen Browser-Tab geöffnet. |

## Organisieren von Navigationsgruppen

Strukturieren Sie Ihre Sidebar mithilfe von zwei primären Gruppierungsmustern:

### Interaktive Kategorie-Header (Landingpage + untergeordnete Elemente)

Geben Sie neben `children` einen `path` für einen Kategorieabschnitt an. Ein Klick auf den Header navigiert zur Landingpage und schaltet untergeordnete Elemente um:

```json "docmd.config.json"
{
  "title": "Cloud Services",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### Statische Kategorie-Beschriftungen (nur Gruppen-Header)

Lassen Sie die Eigenschaft `path` weg. Der Kategorie-Header fungiert als nicht klickbarer Titel, der verwandte Links gruppiert:

```json "docmd.config.json"
{
  "title": "Formatting & Elements",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax Guide", "path": "/content/syntax" },
    { "title": "Rich Containers", "path": "/content/containers" }
  ]
}
```

## Kontextuelle Brotkrumen

Die Engine löst dynamisch kontextuelle Brotkrumen für jede Seite auf und rendert sie über dem Hauptseiten-Header:

<img width="500" class="with-border" src="/assets/previews/navigation-breadcrumb.webp">

- **Automatische Pfadverfolgung**: Die Engine verfolgt die aktive Route durch den Navigationsbaum, um Brotkrumensegmente aufzubauen.
- **Aktiv-Seiten-Indikator**: Das aktuelle Dokument wird als unverlinktes altes Element angezeigt.
- **Responsives Layout**: Brotkrumen passen sich dynamisch an kleine mobile Viewports an.

Um Brotkrumen global zu deaktivieren, aktualisieren Sie `layout.breadcrumbs`:

```json "docmd.config.json"
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## Kaskadierende Navigationsauflösung

`docmd` verwendet ein kaskadierendes Auflösungssystem nach dem Prinzip „nächste Datei gewinnt". Dies ermöglicht es versionierten oder lokalisierten Unterordnern, dedizierte Sidebars zu definieren, ohne globale Optionen zu duplizieren:

```text
my-project/
├── docmd.config.json         [Level 3: Globale Konfiguration] - Standard-Fallback
├── docs-v1.0/ 
│   ├── navigation.json       [Level 2: Versions-Navigation] - Überschreibt Global
│   └── zh/
│       └── navigation.json   [Level 1: Sprach-Navigation] - Höchste Priorität
```

1. **Level 1 (Sprachspezifisch)**: `navigation.json` in einem Locale-Ordner überschreibt die Navigation für diese Sprache und Version.
2. **Level 2 (Versionsspezifisch)**: `navigation.json` in einem Versionsordner überschreibt die globale Navigation für dieses spezifische Release.
3. **Level 3 (Globale Basis)**: Das `navigation`-Array in `docmd.config.json` dient als Basis-Fallback.

### Ausfallsicherheit bei defekten Links

Während der Fallback-Auflösung von Level 2 oder 3 prüft die Engine, ob die Zieldateien auf der Festplatte existieren. Nicht vorhandene Pfade werden automatisch aus der gerenderten Sidebar herausgefiltert.

## Integration des Icon-Systems

`docmd` bettet das vollständige **Lucide-Icon**-Set nativ ein. Übergeben Sie einen beliebigen offiziellen Lucide-Iconnamen im Kebab-Case-Format (z. B. `settings`, `folder-open`, `book-marked`), um ein Icon anzuwenden.

::: callout tip "Optimieren von Sidebar-Beschriftungen für KI-Engines" icon:sparkles
Halten Sie Sidebar-Titel klar und prägnant. Ein strukturierter Navigationsbaum hilft KI-Agenten, Ihre Dokumentationsstruktur über den kompilierten `llms.txt`-Endpunkt effizient zu parsen.
:::