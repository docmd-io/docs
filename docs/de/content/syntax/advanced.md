---
title: "Fortgeschrittene Markdown-Syntax"
description: "Nutzen Sie den erweiterten Funktionsumfang von docmd: Benutzerdefinierte Attribute, GFM-Erweiterungen und semantische Definitionen."
---

Über das Standard-Markdown hinaus unterstützt `docmd` mehrere hochwertige Erweiterungen, die von GitHub Flavored Markdown (GFM) und Plugins für benutzerdefinierte Attribute abgeleitet sind. Diese Werkzeuge bieten Ihnen die volle Kontrolle über die Struktur und das Styling Ihres Dokuments.

## GFM-Erweiterungen

### Aufgabenlisten (Task Lists)
Erstellen Sie interaktive oder schreibgeschützte Checklisten für das Roadmap-Tracking.
```markdown
- [x] Engine-Optimierung abgeschlossen
- [ ] Plugin-API-Finalisierung
```
- [x] Engine-Optimierung abgeschlossen
- [ ] Plugin-API-Finalisierung

### Automatische Link-Auflösung
Standard-URLs und E-Mail-Adressen werden automatisch erkannt und verlinkt, ohne dass zusätzliches Markup erforderlich ist: `https://docmd.io`

### Shortcode-Emojis
`docmd` unterstützt Standard-Shortcodes, um Ihrer Dokumentation eine visuelle Note zu verleihen.
> Wir :heart: performante Dokumentationen! :rocket: :smile:

## Benutzerdefinierte Element-Attribute

Weisen Sie Überschriften, Bildern und Links mit der Syntax in geschweiften Klammern `{}` eindeutige IDs und CSS-Klassen zu. Dies ist die primäre Methode, um [Benutzerdefinierte CSS-Styles](/theming/custom-css-js) anzuwenden.

### Eindeutige semantische IDs
Nützlich für Deep-Links direkt zu technischen Unterabschnitten.
```markdown
## Performance-Benchmarks {#benchmarks-2026}
```

### Funktionale CSS-Klassen
Wenden Sie Styling-Utilities auf spezifische Elemente an.
```markdown
## Zentrierter Abschnitt {.text-center .text-blue}
```

### Aktions-Schaltflächen (Buttons)
Verwandeln Sie jeden Standard-Markdown-Link in eine gestaltete Call-to-Action-Schaltfläche.
```markdown
[Neuestes Release herunterladen](/download){.docmd-button}
```

## Zitate & Definitionen

### Fußnoten-Referenzen
Fügen Sie Zitate oder technische Vertiefungen[^1] hinzu, die automatisch gesammelt und am Ende der Seite gerendert werden.

```markdown
Architekturentscheidungen sind im RFC dokumentiert[^1].

[^1]: RFC-42: Isomorphe Rendering-Pipeline.
```

### Definitionslisten
Perfekt für API-Parameterbeschreibungen und Glossare.

```markdown
PropName
: Der eindeutige Bezeichner für den Konfigurationsschlüssel.
```

PropName
: Der eindeutige Bezeichner für den Konfigurationsschlüssel.

### Technische Abkürzungen
Definieren Sie Abkürzungen global innerhalb einer Seite. Das Bewegen der Maus über den Begriff offenbart seine vollständige Definition.

```markdown
*[SPA]: Single Page Application
Der docmd-Router ermöglicht ein nahtloses SPA-Erlebnis.
```
*[SPA]: Single Page Application
Der docmd-Router ermöglicht ein nahtloses SPA-Erlebnis.

::: callout tip "Kontextuelle Präzision für KI"
Die Verwendung von **Definitionen** und **Abkürzungen** liefert KI-Agenten hochwertige technische Signale. Wenn eine KI Ihren `llms-full.txt`-Kontext verarbeitet, verhindern diese expliziten Definitionen lexikalische Doppeldeutigkeiten und stellen sicher, dass das Modell logisch korrekte Erklärungen für die spezifische Terminologie Ihres Projekts generiert.
:::