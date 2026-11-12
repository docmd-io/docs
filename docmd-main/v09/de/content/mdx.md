---
title: "MDX-Komponenten"
description: "Erstellen Sie interaktive Dokumentationen mit MDX, JSX-Komponentensyntax, dynamischen Ausdrücken und zusammengesetzten Komponenten in docmd."
---

docmd unterstützt **MDX** nativ, sodass Sie JSX-/React-ähnliche Komponenten und dynamische Ausdrücke nahtlos direkt in Ihre Markdown-Inhalte einbetten können. Angetrieben von docmds abhängigkeitsfreiem Hochleistungs-Compiler wird MDX in schlankes, barrierefreies statisches HTML kompiliert – ganz ohne schwere Bundler oder clientseitigen Laufzeit-Overhead.

Sie können sowohl `.md`- als auch `.mdx`-Dateiendungen austauschbar verwenden.

## Warum MDX in docmd?

* **Abhängigkeitsfreie Kompilierung**: Schnelle statische Erstellung ohne Webpack, Babel oder externe React-Build-Chains.
* **Vertraute JSX-Syntax**: Nahtloser Umstieg für Entwickler, die von Nextra, Docusaurus, Astro Starlight oder Mintlify kommen.
* **Koexistenz von Komponenten**: Nutzen Sie JSX-Tags (`<Callout>`, `<Card>`, `<Tabs>`) Seite an Seite mit der nativen Container-Syntax von docmd (`::: callout`).
* **Sichere dynamische Ausdrücke**: Binden Sie Frontmatter-Werte, Konfigurationsvariablen und JavaScript-Ausdrücke in einer sicheren Sandbox-Umgebung ein.
* **Zusammengesetzte Komponenten mit Punktnotation**: Vollständige Unterstützung für hierarchische Strukturen wie `<Tabs.Tab>` und `<Steps.Step>`.

---

## Grundlegende Komponentensyntax

### Selbstschließende Tags

Selbstschließende Tags eignen sich hervorragend für Inline-Hinweise, Badges und eigenständige UI-Elemente:

```jsx
<Badge text="Stabil" type="success" />
<Badge text="v0.9.10" type="info" />
<Badge text="Veraltet" type="danger" />
```

### Block-Komponenten mit Markdown-Inhalten

Block-Komponenten umschließen Markdown-Inhalte, wobei Standardformatierungen, Code-Snippets, Listen und Links wie gewohnt erhalten bleiben:

```jsx
<Callout type="tip" title="Profi-Tipp">
  Sie können **fettgedruckten Text**, `Inline-Code` und sogar Code-Blöcke innerhalb von JSX-Tags verwenden:

  ```bash
  npx @docmd/core build
  ```
</Callout>
```

---

## Integrierte MDX-Komponenten

docmd bietet integrierte Mappings für gängige Dokumentationskomponenten:

### Hinweise (`<Callout>`)

```jsx
<Callout type="info" title="Information">
  Liefert kontextbezogene Anleitungen oder Systemhinweise.
</Callout>

<Callout type="warning" title="Warnung">
  Hebt wichtige Vorsichtsmaßnahmen und Breaking Changes hervor.
</Callout>
```

| Prop | Typ | Beschreibung |
| :--- | :--- | :--- |
| `type` | `String` | Variantenstil: `info`, `tip`, `warning`, `danger` (Standard: `info`). |
| `title` | `String` | Optionaler Titel der Hinweisbox. |
| `icon` | `String` | Benutzerdefinierter Lucide-Icon-Name oder Iconify-Bezeichner. |

### Karten und Raster-Layouts (`<Card>`, `<Cards>`)

Gruppieren Sie Links, Funktionen oder Schnellzugriffe in strukturierten responsiven Rastern:

```jsx
<Cards cols={2}>
  <Card title="Schnellstart" href="/getting-started/quick-start" icon="rocket">
    Erfahren Sie, wie Sie Ihre erste docmd-Dokumentationswebsite initialisieren und konfigurieren.
  </Card>
  <Card title="CLI-Referenz" href="/reference/cli-commands" icon="terminal">
    Umfassende Befehlszeilen-Flags, Optionen und Serverkonfigurationen.
  </Card>
</Cards>
```

### Tabs (`<Tabs>`, `<Tab>`)

Präsentieren Sie mehrsprachige Code-Beispiele oder plattformspezifische Anleitungen:

```jsx
<Tabs>
  <Tab label="npm">
    ```bash
    npm install @docmd/core
    ```
  </Tab>
  <Tab label="pnpm">
    ```bash
    pnpm add @docmd/core
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add @docmd/core
    ```
  </Tab>
</Tabs>
```

Auch die Punktnotation `<Tabs.Tab>` wird unterstützt:

```jsx
<Tabs>
  <Tabs.Tab label="macOS">
    `brew install docmd`
  </Tabs.Tab>
  <Tabs.Tab label="Linux">
    `curl -fsSL https://docmd.io/install.sh | sh`
  </Tabs.Tab>
</Tabs>
```

### Schritte (`<Steps>`)

Erstellen Sie nummerierte Schritt-für-Schritt-Anleitungen für Tutorials oder Installationsprozesse:

```jsx
<Steps>
  ### Projekt initialisieren
  Führen Sie `npx @docmd/core init` im Terminal aus.

  ### Inhalte verfassen
  Erstellen Sie Ihre Dokumentationsseiten in `docs/` mit Markdown oder MDX.

  ### Bereitstellen
  Kompilieren Sie produktionsbereite statische Website-Dateien mit `npx @docmd/core build`.
</Steps>
```

---

## Dynamische Ausdrücke & Interpolation

Mit MDX können Sie dynamische Ausdrücke in geschweiften Klammern `{}` einbetten. Ausdrücke werden sicher in einer Sandbox ausgeführt und haben Zugriff auf das Frontmatter des aktuellen Dokuments sowie auf die Website-Konfiguration.

### Zugriff auf Frontmatter

```mdx
---
title: "Authentifizierungs-Leitfaden"
version: "2.4.0"
author: "docmd-Team"
---

# {frontmatter.title}

Dokumentationsversion: **{frontmatter.version}**  
Gepflegt von: *{frontmatter.author}*
```

### Zugriff auf die Website-Konfiguration

```jsx
Willkommen bei der Dokumentation für {config.title}.
```

### JavaScript-Ausdrücke

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Berechnetes Build-Budget: {500 * 2}ms.
```

---

## Props und Attribute

MDX unterstützt gängige JSX-Attribut-Syntaxen:

```jsx
{/* Zeichenketten-Attribute */}
<Card title="Konfiguration" href="/configuration/overview" />

{/* Numerische und boolesche Ausdrücke */}
<Cards cols={3} animated={true} />

{/* Boolesche Kurzschreibweise (äquivalent zu interactive={true}) */}
<Card interactive title="Interaktive Karte" />

{/* Attribut-Spread */}
<Card {...cardProps} />
```

---

## Wahl zwischen Containern und MDX

Sowohl native docmd-Container (`::: container`) als auch MDX-Komponenten (`<Komponente>`) werden in docmd erstklassig unterstützt:

| Funktion | Native Container (`:::`) | MDX-Komponenten (`<Komponente>`) |
| :--- | :--- | :--- |
| **Syntax-Stil** | Markdown-nativ (`::: callout`) | JSX-/React-Stil (`<Callout>`) |
| **Tooling-Abhängigkeiten** | Keine externen Abhängigkeiten | Keine externen Abhängigkeiten (via `lite-mdx`) |
| **Hierarchie** | Verschachtelte Einrückung | Punktnotation (`<Tabs.Tab>`) |
| **Dynamische Ausdrücke** | Variablensyntax (`$var`) | JavaScript-Ausdrücke (`{expr}`) |
| **Portabilität im Ökosystem** | Optimale Klartext-Lesbarkeit | Direkt kompatibel mit Docusaurus / Nextra |

::: callout tip "Koexistenz" icon:sparkles
Sie können native Container und MDX-Komponenten problemlos auf derselben Dokumentationsseite ohne Konflikte kombinieren.
:::
