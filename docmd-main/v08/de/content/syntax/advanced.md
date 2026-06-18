---
title: "Erweiterte Markdown-Syntax"
description: "Erweiterte Formatierungsfunktionen: Aufgabenlisten, benutzerdefinierte Elementattribute, Fußnoten und semantische Definitionen."
---

Über Standard-Markdown hinaus unterstützt docmd hochwertige Erweiterungen, die aus GitHub Flavored Markdown (GFM) und benutzerdefinierten Attribut-Plugins abgeleitet sind. Diese Werkzeuge bieten eine feinkörnige Kontrolle über Dokumentstruktur und -styling.

## Aufgabenlisten

Erstellen Sie interaktive oder schreibgeschützte Checklisten für Roadmap-Tracking und Release-Planung.

```markdown
- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit
```

- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit

## Emojis

Verwenden Sie Standard-Shortcodes, um visuelle Persönlichkeit hinzuzufügen. Emoji-Codes rendern inline mit umgebendem Text.

```markdown
We :heart: high-performance documentation! :rocket: :sparkles:
```

We :heart: high-performance documentation! :rocket: :sparkles:

## Benutzerdefinierte Element-Attribute

Weisen Sie Überschriften, Bildern und Links mit der `{}`-Syntax eindeutige IDs und CSS-Klassen zu.

### Benutzerdefinierte IDs

Nützlich für Deep-Links direkt zu technischen Unterabschnitten.

```markdown
## Performance Benchmarks {#benchmarks-2026}
```

### CSS-Klassen

Wenden Sie Styling-Utilities auf bestimmte Elemente an, ohne Ihr CSS anzufassen.

```markdown
## Centre-Aligned Section {.text-centre .text-blue}
```

### Button-artige Links

Wandeln Sie jeden Standard-Markdown-Link in eine gestylte Call-to-Action-Schaltfläche um.

```markdown
[Download Latest Release](#download){.docmd-button}
```

## Fußnoten

Fügen Sie Zitate oder technische Tiefgang als Fußnoten hinzu. Die Engine sammelt sie automatisch und rendert sie am unteren Seitenrand.

```markdown
Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.
```

Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.

## Definitionslisten

Perfekt für API-Parameterbeschreibungen und Glossare.

```markdown
PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.
```

PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.

## Abkürzungen

Definieren Sie Abkürzungen global auf einer Seite. Das Hovern über den Begriff zeigt die vollständige Definition.

```markdown
*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.
```

*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.

::: callout tip "Kontextuelle Präzision für KI"
Definitionen und Abkürzungen liefern hochwertige technische Signale für KI-Agenten. Explizite semantische Definitionen verhindern lexikalische Mehrdeutigkeit im `llms.txt`-Kontextstrom.
:::
