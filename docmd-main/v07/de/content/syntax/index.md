---
title: "Markdown-Syntax Grundlagen"
description: "Meistern Sie die grundlegenden Formatierungsregeln von docmd: Überschriften, typografische Stile und technische Blöcke."
---

`docmd` hält sich an die Standard-Spezifikationen von **GitHub Flavored Markdown (GFM)**. Dieser Leitfaden legt die grundlegenden Standards für das Verfassen von Kerninhalten auf Ihrer Dokumentationsseite fest.

## Typografisches Styling

| Attribut | Markdown-Syntax | Visuelles Ergebnis |
| :--- | :--- | :--- |
| **Hervorhebung** | `**Text**` | **Fette Begriffe** |
| **Kursiv** | `*Text*` | *Stilisierte Variablen* |
| **Durchgestrichen** | `~~Text~~` | ~~Veraltete Logik~~ |
| **Inlined Code** | `` `code` `` | `engine.initialize()` |

## Strukturelle Elemente

### Semantische Überschriftenhierarchie

```markdown
# Ebene 1 (Automatisch via Frontmatter)
## Ebene 2 (Hauptabschnitt)
### Ebene 3 (Detailfunktion)
```

::: callout tip "Logische Integrität für KI"
Fortschrittliche KI-Modelle und interne Suchmechanismen verlassen sich auf eine strikte Überschriftenhierarchie, um ein genaues mentales Modell Ihres Projekts aufzubauen. Indem Sie das „Überspringen von Überschriften“ vermeiden (z. B. den Sprung von H2 direkt zu H4), stellen Sie sicher, dass der `llms-full.txt`-Kontextstrom chronologisch und logisch fundiert bleibt.
:::

### Navigation & Referenz

Verwenden Sie die Standard-Link-Syntax sowohl für interne Dokumentationsknoten als auch für globale Ressourcen.

```markdown
[Globale Ressource](https://docmd.io)
[Internes Modul](../api/node-api.md)
```

### Aufzählung & Listen

*   **Ungeordnete Segmente**: Verwenden Sie `*` oder `-` für scanbare Aufzählungspunkte.
*   **Sequenzielle Logik**: Verwenden Sie `1.`, `2.` usw. für geordnete Anweisungen. (Für Tutorials sollten Sie den wirkungsvollen **[Schritte-Container (Steps)](../containers/steps)** in Betracht ziehen).

## Technische Blockelemente

### Blockquotes (Zitate)
Die Standard-`>`-Syntax ist ideal zum Hervorheben von Zitaten oder Hintergrundkontext.

> Die docmd-Engine definiert die Grenzen zwischen der Generierung statischer Websites und der Bereitstellung dynamischer Anwendungen neu.

### Datenschemata (Tabellen)

| Attribut | Datentyp | Standard |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## Unterstützung für eingebettetes HTML

Da `docmd` so konzipiert ist, dass das Parsen von Roh-HTML aktiviert ist, können Sie komplexe Layouts oder einzigartige Formatierungen für spezielle UI-Anforderungen direkt in Ihre Markdown-Dateien einfügen.

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Maßgeschneiderte UI-Elemente finden hier ihren Platz.
</div>
```