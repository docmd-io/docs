---
title: "Markdown-Syntax-Grundlagen"
description: "Meistern Sie grundlegende Markdown-Typografie, Überschriftenhierarchie, Listen, Tabellen und Roh-HTML-Erweiterungen in docmd."
---

`docmd` hält sich an die Standard-Spezifikationen von **GitHub Flavored Markdown (GFM)**. Diese Seite behandelt grundlegende Typografie und strukturelle Primitiven, die in Ihrer gesamten Dokumentation verwendet werden.

## Typografie-Primitiven

| Stil | Syntax | Renderausgabe |
| :--- | :--- | :--- |
| **Fett** | `**text**` | **Starke Betonung** |
| *Kursiv* | `*text*` | *Sanfte Betonung* |
| ~~Durchgestrichen~~ | `~~text~~` | ~~Veralteter Inhalt~~ |
| `Inline-Code` | `` `text` `` | `engine.initialise()` |

## Regeln für die Überschriftenhierarchie

`docmd` leitet den Haupt-`<h1>`-Seitenheader automatisch aus der Frontmatter-Eigenschaft `title` ab. Strukturieren Sie Abschnittsüberschriften beginnend bei `##` (`h2`):

```markdown
## Ebene 2 - Hauptabschnitt
### Ebene 3 - Feature-Unterthema
#### Ebene 4 - Detaillierter Unterabschnitt
```

::: callout tip "Überschriftenstruktur für Suche & KI" icon:sparkles
Behalten Sie eine sequenzielle Überschriftenhierarchie bei, ohne Ebenen zu überspringen (z. B. direkt von `##` zu `####` zu springen). Eine konsistente Struktur ermöglicht es KI-Agenten und Such-Indexierern, Ihre Inhalte genau zuzuordnen.
:::

## Listen

Verwenden Sie Aufzählungslisten für scannbare Zusammenfassungen und geordnete Listen für sequenzielle Workflows. Für mehrstufige Tutorials verwenden Sie den dedizierten [Steps-Container](../containers/steps.md):

```markdown
*   Unsortierte Feature-Liste
*   Sekundärer Aufzählungspunkt

1.  Workspace-Umgebung initialisieren
2.  Build-Befehl ausführen
```

## Blockzitate

Standardmäßige `>`-Blockzitate heben externe Zitate oder kontextbezogene Hinweise hervor:

```markdown
> Die docmd-Engine definiert die Grenzen zwischen statischer Site-Generierung und dynamischer Web-Auslieferung neu.
```

> Die docmd-Engine definiert die Grenzen zwischen statischer Site-Generierung und dynamischer Web-Auslieferung neu.

## Tabellen

Formatieren Sie tabellarische Daten mithilfe der GFM-Pipe-Syntax:

```markdown
| Parameter | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Schlüssel-Bezeichner. |
| `active` | `Boolean` | `true` | Status-Umschalter aktivieren. |
```

| Parameter | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Schlüssel-Bezeichner. |
| `active` | `Boolean` | `true` | Status-Umschalter aktivieren. |

## Roh-HTML-Integration

`docmd` parst Inline-HTML direkt. Verwenden Sie Roh-HTML-Elemente beim Entwerfen massgeschneiderter Landing-Komponenten oder eingebetteter Widgets:

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Maßgeschneiderte HTML-Elemente werden nahtlos inline gerendert.
</div>
```