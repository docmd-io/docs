---
title: "Navigations-Konfiguration"
description: "Strukturieren Sie Ihre Seitenleiste, kategorisieren Sie Links und konfigurieren Sie Icons für Leser und Suchmaschinen."
---

Der Compiler bietet eine explizite Kontrolle über Ihre Website-Navigation. Eine klare Navigationshierarchie schafft eine logische Lesereihenfolge. Dies optimiert das SPA-Erlebnis und bietet eine eindeutige Kontextkarte für die Suchindexierung und KI-Modelle.

## 1. Das Navigations-Schema

Ein Array von Link-Objekten in Ihrer `docmd.config.json`-Datei steuert die Seitenleiste. Jedes Objekt ist ein direkter Link oder eine geschachtelte Kategoriegruppe.

```json
{
  "navigation": [
    { "title": "Übersicht", "path": "/", "icon": "home" },
    { "title": "Schnellstart", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## 2. Unterstützte Eigenschaften

Jedes Element unterstützt folgende Einstellungen:

| Eigenschaft | Typ | Erforderlich | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Ja | Der in der Seitenleiste angezeigte Menütext. |
| `path` | `String` | Nein | Ziel-URL. Relative lokale Pfade müssen mit einem Schrägstrich (`/`) beginnen. |
| `icon` | `String` | Nein | Name eines beliebigen [Lucide-Icons](external:https://lucide.dev/icons) im Kebab-Case-Format (z. B. `git-branch`). |
| `children` | `Array` | Nein | Ein Array von verschachtelten Navigationselementen, um ein Untermenü zu erstellen. |
| `collapsible`| `Boolean`| Nein | Wenn `true`, kann der Benutzer den Kategorieordner erweitern oder einklappen. |
| `external` | `Boolean`| Nein | Wenn `true`, wird der Link in einem neuen Browser-Tab geöffnet. |

## 3. Organisation von Bereichsgruppen

Strukturieren Sie Ihre Seitenleiste mithilfe von zwei primären Gruppierungsmethoden:

### Klickbare Gruppe (Direkte Seite + Unterordner)
Geben Sie neben `children` auch einen `path` für eine Kategorieüberschrift an. Durch Klicken auf den Titel wird die Landingpage geladen und die untergeordneten Links werden ausgeklappt.

```json
{
  "title": "Cloud-Dienste",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### Statisches Label (Nur Kategorieüberschriften)
Lassen Sie den Parameter `path` weg. Die Überschrift dient als nicht anklickbarer Titel zur Gruppierung verwandter Links. Verwenden Sie dies, um größere technische Kategorien ohne eine eigene Landingpage zu unterteilen.

```json
{
  "title": "Formatierung & Elemente",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax-Leitfaden", "path": "/content/syntax" },
    { "title": "Rich Container", "path": "/content/containers" }
  ]
}
```

## 4. Automatische Breadcrumbs

Die Engine generiert automatisch kontextbezogene Breadcrumbs (Brotkrümelnavigation) für jede Seite. Diese werden direkt über der Hauptüberschrift der Seite angezeigt, um eine schnelle Orientierung zu erleichtern.

### Wichtigste Verhaltensweisen
*   **Automatische Auflösung**: Die Engine verfolgt die aktive Route durch Ihren Navigationsbaum, um die Hierarchie zu erstellen.
*   **Aktiver Indikator**: Die aktuelle Seite ist das letzte, nicht verlinkte Breadcrumb-Element.
*   **Mobile Optimierung**: Breadcrumbs werden auf kleinen Bildschirmen vereinfacht oder dynamisch ausgeblendet, um Platz zu sparen.

### Deaktivieren von Breadcrumbs
Breadcrumbs sind standardmäßig aktiviert. Aktualisieren Sie Ihre Website-Layout-Optionen, um sie global zu deaktivieren:

```json
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## 5. Kaskadierende Navigationsauflösung

Der Compiler verwendet ein kaskadierendes Auflösungssystem nach dem Prinzip „nächste Datei gewinnt“. Dies unterstützt mehrere Versionen oder Sprachen, ohne Ihre globale Konfiguration aufzublähen.

```text
my-project/
├── docmd.config.json           [Ebene 3: Globale Konfiguration] - Standard-Fallback
├── docs-v1.0/ 
│   ├── navigation.json       [Ebene 2: Versions-Navigation] - Überschreibt Global
│   └── zh/
│       └── navigation.json   [Ebene 1: Sprach-Navigation] - Absolute Priorität
```

1.  **Ebene 1: Sprachspezifisch** (`navigation.json` in einem Sprachordner): Überschreibt alle Einstellungen für diese spezifische Sprache und Version.
2.  **Ebene 2: Versionsspezifisch** (`navigation.json` in einem Versionsordner): Überschreibt die globale Konfiguration für diese Version über alle Sprachen hinweg.
3.  **Ebene 3: Globale Konfiguration** (`config.navigation`): Die grundlegende Fallback-Definition in der zentralen Konfigurationsdatei.

### Intelligenter Schutz vor toten Links
Die Engine prüft beim Navigations-Fallback auf Ebene 2 oder 3 automatisch, ob die Zieldateien existieren. Fehlende Dateien werden dynamisch aus der Seitenleiste gefiltert. Dies verhindert tote Links für ältere Versionen oder fehlende Übersetzungen.

## 6. Icon-Integration

Der Compiler enthält das vollständige **Lucide-Icon-System**. Verwenden Sie den offiziellen Lucide-Namen im Kebab-Case-Format (z. B. `settings`, `folder-open`, `book-marked`), um ein Icon anzuwenden.

::: callout tip "Optimierung von Seitenleisten-Labels"
Halten Sie die Titel in der Seitenleiste klar und prägnant. Eine saubere Navigationsstruktur ermöglicht es KI-Agenten, Ihre Sitemap problemlos aus dem kompilierten `llms.txt`-Feed zu analysieren.
:::