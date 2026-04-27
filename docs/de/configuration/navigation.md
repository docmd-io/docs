---
title: "Navigation"
description: "Definieren Sie die Seitenleistenstruktur Ihrer Website über die globale Konfiguration, verzeichnisspezifische navigation.json-Dateien oder automatisches Dateiscannen."
---

`docmd` bietet ein hochflexibles Navigationssystem, das von einfachen Projekten mit nur einem Ordner bis hin zu komplexen Dokumentations-Hubs mit mehreren Versionen und Sprachen skaliert.

## Methoden der Navigationsdefinition

Es gibt drei Möglichkeiten, die Navigation zu definieren. Wenn mehrere Methoden gleichzeitig verwendet werden, löst `docmd` diese in der folgenden Prioritätsreihenfolge auf:

### 1. Globale Konfiguration (`docmd.config.js`)
Ideal für kleinere Projekte. Die gesamte Navigationslogik wird in der Hauptkonfigurationsdatei gehalten.

```javascript
export default {
  navigation: [
    { title: 'Erste Schritte', path: '/intro' },
    { title: 'API-Referenz', path: '/api', children: [...] }
  ]
}
```

### 2. Verzeichnisspezifische Konfiguration (`navigation.json`)
Dies ist die **empfohlene Methode** für umfangreiche Dokumentationen. Platzieren Sie eine `navigation.json`-Datei in Ihrem `docs/`-Verzeichnis (oder einem beliebigen Unterverzeichnis).

```json
[
  { "title": "Übersicht", "path": "overview.md" },
  { "title": "Fortgeschrittene Themen", "children": [...] }
]
```

### 3. Automatisches Dateiscannen (Fallback)
Wenn weder eine globale Konfiguration noch eine `navigation.json` definiert ist, scannt `docmd` automatisch Ihr Dateisystem und erstellt eine alphabetische Seitenleiste.

## Attribute von Navigationsobjekten

Jeder Navigationseintrag unterstützt die folgenden Attribute:

| Attribut | Typ | Beschreibung |
| :--- | :--- | :--- |
| `title` | `string` | Der in der Seitenleiste angezeigte Text. |
| `path` | `string` | Der Pfad zur Quelldatei relativ zum aktuellen Verzeichnis (z. B. `intro.md`). |
| `icon` | `string` | Der Name eines Icons aus der Lucide-Bibliothek (z. B. `home`). |
| `collapsible` | `boolean` | Ob die Gruppe in der Seitenleiste ein- und ausgeklappt werden kann (Standard: `true`). |
| `collapsed` | `boolean` | Ob die Gruppe beim ersten Laden eingeklappt sein soll. |
| `external` | `boolean` | Ob der Link in einem neuen Tab geöffnet werden soll. |
| `children` | `array` | Eine verschachtelte Liste von Unter-Navigationselementen. |

## Priorität der Navigationsauflösung

Wenn ein Benutzer eine Seite besucht, wird die Seitenleiste dynamisch basierend auf der Verzeichnistiefe der Seite berechnet:

1.  **Nearest-Neighbor-Match**: Die Engine sucht zuerst nach einer `navigation.json` im selben Ordner wie die aktuelle Seite.
2.  **Rekursiver Aufstieg**: Wird keine gefunden, sucht sie im übergeordneten Verzeichnis, bis das Root-Verzeichnis erreicht ist.
3.  **Globaler Fallback**: Wenn im gesamten Dateisystem keine `navigation.json` vorhanden ist, werden die Definitionen aus der `docmd.config.js` verwendet.

::: callout tip "Kontextbasierte Navigation"
Diese Auflösungslogik ermöglicht es Ihnen, für verschiedene Bereiche Ihrer Website **völlig unterschiedliche** Seitenleisten zu definieren. Beispielsweise kann Ihr `/api/`-Verzeichnis eine Seitenleiste haben, die sich auf technische Definitionen konzentriert, während Ihr `/guides/`-Verzeichnis eine auf Tutorials ausgerichtete Seitenleiste anzeigt.
:::

## Automatisches Sortieren und Verbergen

*   **Dateien ausschließen**: Wenn eine Datei nicht in der automatisch generierten Seitenleiste erscheinen, aber dennoch erreichbar sein soll, setzen Sie `unlisted: true` im Frontmatter.
*   **Sortierung**: Die Reihenfolge in der `navigation.json` entspricht exakt der gerenderten Reihenfolge.

::: callout warning "Pfad-Normalisierung"
In der `navigation.json` können Sie `overview.md`, `overview` oder `./overview` schreiben. Die Build-Engine normalisiert diese Formate automatisch in saubere URLs für die Produktion. Siehe [Verlinkung & Referenzierung](../content/syntax/linking.md).
:::