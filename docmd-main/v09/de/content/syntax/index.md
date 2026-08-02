---
title: "Markdown-Syntax-Grundlagen"
description: "Die Basis-Formatierungsregeln für alle docmd-Inhalte: Typografie, Struktur, Listen und Tabellen."
---

`docmd` folgt der Standard-**GitHub Flavored Markdown (GFM)**-Spezifikation. Diese Seite behandelt die zentralen Formatierungsgrundelemente, die für jede Seite Ihres Projekts gelten.

## Typografie

| Stil | Syntax | Wird gerendert als |
| :--- | :--- | :--- |
| **Fett** | `**text**` | **Starke Betonung** |
| *Kursiv* | `*text*` | *Sanfte Betonung** |
| ~~Durchgestrichen~~ | `~~text~~` | ~~Veralteter Inhalt~~ |
| `Inline-Code` | `` `text` `` | `engine.initialise()` |

## Überschriftenhierarchie

`docmd` leitet das Seiten-`<h1>` automatisch aus dem `title`-Feld in Ihrem Frontmatter ab. Beginnen Sie Ihre Überschriftenstruktur bei `##`.

```markdown
## Ebene 2 - Hauptabschnitt
### Ebene 3 - Feature-Detail
#### Ebene 4 - Unter-Detail
```

::: callout tip "Logische Integrität für KI"
KI-Modelle und Suchmaschinen-Indexer verlassen sich auf eine strenge Überschriftenhierarchie, um ein genaues mentales Modell Ihres Projekts aufzubauen. Vermeiden Sie das Überspringen von Ebenen (z. B. von `##` zu `####`), um den `llms-full.txt`-Kontextstrom logisch konsistent zu halten.
:::

## Listen

Verwenden Sie unsortierte Listen für scanbare Aufzählungspunkte und sortierte Listen für sequenzielle Schritte. Erwägen Sie für nummerierte Tutorials den wirkungsvolleren [Steps-Container](../containers/steps.md).

```markdown
*   Unsortierter Punkt
*   Ein weiterer Punkt

1.  Erster Schritt
2.  Zweiter Schritt
```

## Blockzitate

Die Standard-`>`-Syntax hebt externe Zitate oder Hintergrundkontext hervor.

```markdown
> Die docmd-Engine definiert die Grenzen zwischen statischer Site-Generierung und dynamischer Anwendungsauslieferung neu.
```

> Die docmd-Engine definiert die Grenzen zwischen statischer Site-Generierung und dynamischer Anwendungsauslieferung neu.

## Tabellen

```markdown
| Parameter | Typ | Standard |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |
```

| Parameter | Typ | Standard |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## Eingebettetes HTML

docmd aktiviert das Parsen von rohem HTML. Injizieren Sie benutzerdefinierte Layouts oder einzigartiges Styling direkt in Markdown-Dateien für spezielle UI-Anforderungen.

```html
<div style="padding: 2rem; border: 1px solid var(--border-colour); border-radius: 12px; text-align: centre;">
  Bespoke UI elements live here.
</div>
```