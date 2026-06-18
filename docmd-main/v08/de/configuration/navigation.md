---
title: "Navigationskonfiguration"
description: "Strukturieren Sie Ihre Sidebar, kategorisieren Sie Links und konfigurieren Sie Icons für Leser und Suchmaschinen."
---

Der Compiler bietet explizite Kontrolle über Ihre Site-Navigation. Eine klare Navigationshierarchie erzeugt eine logische Lesereihenfolge. Sie optimiert das SPA-Erlebnis und liefert eine klare Kontextkarte für die Suchindizierung und KI-Modelle.

## 1. Das Navigations-Schema

Ein Array von Link-Objekten in Ihrer `docmd.config.json` steuert die Sidebar. Jedes Objekt ist entweder ein direkter Link oder eine verschachtelte Kategoriegruppe.

<img width="260" class="with-border" src="/assets/previews/navigation-hierarchy.webp">

```json
{
  "navigation": [
    { "title": "Overview", "path": "/", "icon": "home" },
    { "title": "Quick Start", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## 2. Unterstützte Eigenschaften

Jeder Eintrag unterstützt diese Einstellungen:

| Eigenschaft | Typ | Erforderlich | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Ja | Der in der Sidebar angezeigte Text. |
| `path` | `String` | Nein | Ziel-URL. Relative lokale Pfade müssen mit einem Schrägstrich (`/`) beginnen. |
| `icon` | `String` | Nein | Name eines beliebigen [Lucide-Icons](external:https://lucide.dev/icons) im kebab-case-Format (z. B. `git-branch`). |
| `children` | `Array` | Nein | Ein Array verschachtelter Navigationselemente zur Bildung eines Untermenüs. |
| `collapsible`| `Boolean`| Nein | Bei `true` kann der Nutzer die Kategoriegruppe auf- und zuklappen. |
| `external` | `Boolean`| Nein | Bei `true` wird der Link in einem neuen Browser-Tab geöffnet. |

## 3. Sektionen organisieren

Strukturieren Sie Ihre Sidebar mit zwei primären Gruppierungsmethoden:

### Klickbare Gruppe (Direkte Seite + Unterordner)
Geben Sie sowohl `path` als auch `children` für einen Kategorie-Header an. Ein Klick auf den Titel lädt die Landingpage und klappt die untergeordneten Links auf.

```json
{
  "title": "Cloud Services",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### Statisches Label (nur Kategorie-Header)
Lassen Sie den `path`-Parameter weg. Der Header dient als nicht klickbarer Gruppentitel. Verwenden Sie dies, um große technische Kategorien ohne eine einzelne Landingpage zu gliedern.

```json
{
  "title": "Formatting & Elements",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax Guide", "path": "/content/syntax" },
    { "title": "Rich Containers", "path": "/content/containers" }
  ]
}
```

## 4. Automatische Brotkrumen

Die Engine erzeugt automatisch kontextbezogene Brotkrumen für jede Seite. Sie erscheinen direkt über dem Hauptseiten-Header und helfen bei der schnellen Orientierung.

<img width="500" class="with-border" src="/assets/previews/navigation-breadcrumb.webp">

### Wichtige Verhaltensweisen
*   **Automatische Auflösung**: Die Engine folgt der aktiven Route durch Ihren Navigationsbaum, um die Hierarchie aufzubauen.
*   **Aktiv-Anzeige**: Die aktuelle Seite ist das letzte, unverlinkte Brotkrumen-Element.
*   **Mobile Optimierung**: Auf kleinen Viewports werden Brotkrumen vereinfacht oder ausgeblendet, um Bildschirmplatz zu sparen.

### Brotkrumen deaktivieren
Brotkrumen sind standardmäßig aktiviert. Aktualisieren Sie Ihre Site-Layout-Optionen, um sie global zu deaktivieren:

```json
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## 5. Navigations-Auflösungs-Kaskadierung

Der Compiler verwendet ein Kaskadierungssystem nach dem Prinzip „nächste Datei gewinnt". Dies unterstützt mehrere Versionen oder Sprachen, ohne Ihre globale Konfiguration aufzublähen.

```text
my-project/
├── docmd.config.json           [Level 3: Globale Konfiguration] - Standard-Fallback
├── docs-v1.0/ 
│   ├── navigation.json       [Level 2: Versions-Navigation] - überschreibt Global
│   └── zh/
│       └── navigation.json   [Level 1: Sprach-Navigation] - absolute Priorität
```

1.  **Level 1: Sprachspezifisch** (`navigation.json` in einem Locale-Ordner): überschreibt alle Einstellungen für diese spezifische Sprache und Version.
2.  **Level 2: Versionsspezifisch** (`navigation.json` in einem Versionsordner): überschreibt die globale Konfiguration für diese Version über alle Sprachen hinweg.
3.  **Level 3: Globale Konfiguration** (`config.navigation`): die Basis-Fallback-Definition in der zentralen Konfigurationsdatei.

### Intelligenter Schutz vor defekten Links
Die Engine prüft automatisch, ob Zieldateien während des Level-2- oder Level-3-Navigations-Fallbacks existieren. Fehlende Dateien werden dynamisch aus der Sidebar herausgefiltert. Das beseitigt defekte Links für ältere Versionen oder fehlende Übersetzungen.

## 6. Icon-Integration

Der Compiler enthält das vollständige **Lucide-Icon**-System. Verwenden Sie den offiziellen Lucide-Namen im kebab-case-Format (z. B. `settings`, `folder-open`, `book-marked-line`), um ein Icon anzuwenden.

::: callout tip "Sidebar-Beschriftungen optimieren" icon:sparkles
Halten Sie Sidebar-Titel klar und beschreibend. Eine prägnante Navigationsstruktur ermöglicht es KI-Agenten, Ihre Sitemap einfach aus dem kompilierten `llms.txt`-Feed zu parsen.
:::
