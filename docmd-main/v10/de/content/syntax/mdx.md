---
title: "MDX-Syntax"
description: "Syntax-Leitfaden für JSX-Tags, selbstschließende Elemente, zusammengesetzte Tags, Ausdrücke und Attribute in docmd."
---

`docmd` unterstützt MDX- und JSX-Syntax über den leichtgewichtigen `lite-mdx`-Compiler. Sie können JSX-Tags, Attribute und dynamische JavaScript-Ausdrücke direkt in Ihren Markdown-Dateien neben der Standard-Markdown-Syntax verwenden.

Sowohl `.md`- als auch `.mdx`-Dateierweiterungen werden unterstützt.

::: callout tip "Koexistenz mit Containern" icon:sparkles
Sie können Standard-Markdown, docmd-Container (`::: callout`) und JSX-Tags (`<Callout>`) im selben Dokument frei und ohne Konflikte kombinieren.
:::

## Tags und Elemente

### Selbstschließende Tags

Verwenden Sie selbstschließende Tags für eigenständige Widgets, Badges und Inline-Indikatoren:

```jsx
<Badge text="v0.9.10" type="info" />
<Badge text="Stabil" type="success" />
<Separator />
```

### Block-Komponenten

Block-Komponenten umschließen Markdown-Inhalte. Standard-Markdown-Formatierungen, Code-Snippets, Listen und Links funktionieren darin weiterhin:

```jsx
<Callout type="tip" title="Profi-Tipp">
  Standard-Markdown-Formatierungen wie **fetter Text**, `Inline-Code` und Listen funktionieren innerhalb von Block-Komponenten:

  * Erster Listenpunkt
  * Zweiter Listenpunkt
</Callout>
```

## Zusammengesetzte und punktierte Komponenten

`docmd` verarbeitet verschachtelte und zusammengesetzte Komponenten mittels Punktnotation:

```jsx
<Tabs>
  <Tabs.Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tabs.Tab>
  <Tabs.Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tabs.Tab>
</Tabs>
```

Sie können auch standardmäßige verschachtelte Tags wie `<Tab>` innerhalb von `<Tabs>` oder `<Step>` innerhalb von `<Steps>` verwenden.

## Attribute und Eigenschaften

MDX unterstützt gängige JSX-Attributsyntaxen:

### Zeichenfolgen-Attribute

```jsx
<Card title="Schnellstart" href="/getting-started" icon="rocket" />
```

### Numerische und boolesche Attribute

In geschweifte Klammern `{}` eingeschlossene Werte werden als Zahlen oder boolesche Werte ausgewertet:

```jsx
<Cards cols={3} interactive={true} />
```

### Boolesche Kurzform

Die Angabe eines Attributnamens allein entspricht dem Setzen auf `true`:

```jsx
<Card interactive title="Interaktive Karte" />
```

### Objekte und Arrays

Übergeben Sie Objekte und Arrays mit verschachtelten geschweiften Klammern:

```jsx
<Chart config={{ responsive: true, theme: "dark" }} data={[12, 19, 3]} />
```

### Spread-Attribute

Übertragen Sie vorhandene Eigenschaftsobjekte in Komponenten:

```jsx
<Card {...cardOptions} />
```

## Dynamische Ausdrücke

Mit MDX können Sie dynamische Ausdrücke über geschweifte Klammern `{}` in Inhalte einbinden.

### Zugriff auf Frontmatter

Binden Sie Frontmatter-Werte ein, die am Anfang Ihres Dokuments deklariert wurden:

```mdx
---
title: "Versionshinweise"
version: "0.9.10"
author: "docmd-Team"
---

# {frontmatter.title}

Aktuelle Version: **{frontmatter.version}**  
Gepflegt von: *{frontmatter.author}*
```

### Zugriff auf die Website-Konfiguration

Lesen Sie Werte aus Ihrer Konfigurationsdatei `docmd.config.json` aus:

```jsx
Willkommen bei der Dokumentation für {config.title}.
```

### JavaScript-Ausdrücke

Einfache JavaScript-Operationen können inline ausgewertet werden:

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Berechnetes Zeitlimit: {1000 * 5}ms.
```

::: callout note "Sandbox-Auswertung" icon:shield
Ausdrücke werden in einer sicheren, isolierten Sandbox ausgeführt und haben nur Zugriff auf Frontmatter-Eigenschaften, die Website-Konfiguration und mathematische Standarddienstprogramme.
:::

## Codeblock-Isolation

Codeblöcke und Inline-Backticks sind vor der JSX-Kompilierung geschützt. Sie können JSX-Beispiele sicher anzeigen, ohne dass sie ausgeführt werden:

````markdown
```jsx
<Callout type="warning">Dies wird als Rohcode gerendert, nicht als Komponente.</Callout>
```
````

Inline-Code wie `<Badge />` innerhalb von Backticks bleibt ebenfalls als Klartext erhalten.

## Kommentare

Verwenden Sie die JSX-Kommentarsyntax, um Notizen zu hinterlassen, die nicht in der kompilierten Ausgabe erscheinen:

```jsx
{/* Dies ist ein interner Kommentar und wird nicht gerendert */}
```
