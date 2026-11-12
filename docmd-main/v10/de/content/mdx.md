---
title: "MDX-Komponenten"
description: "Verfassen Sie Dokumentationen mit MDX- und JSX-Komponenten über das offizielle mdx-Plugin und lite-mdx."
---

`docmd` bietet integrierte Unterstützung für MDX- und JSX-Komponenten über das Plugin `@docmd/plugin-mdx`. Angetrieben von `lite-mdx` kompiliert es JSX-Tags während des Builds in barrierefreies HTML und native `docmd`-Container – ganz ohne clientseitigen JavaScript-Overhead.

Sowohl `.md`- als auch `.mdx`-Dateierweiterungen können gleichwertig verwendet werden.

::: callout tip "Warum MDX in docmd?" icon:sparkles
MDX bietet eine vertraute Syntax für Teams, die von Frameworks wie Nextra, Docusaurus oder Mintlify migrieren. So können bestehende Komponenten-Markups gerendert werden, ohne Markdown-Dateien umschreiben zu müssen.
:::

## Installation

Installieren Sie das offizielle MDX-Plugin:

```bash
docmd add mdx
```

Alternativ registrieren Sie das Plugin in Ihrer `docmd.config.json`:

```json
{
  "plugins": {
    "mdx": {}
  }
}
```

## Integrierte Komponentenzuordnungen

Das Plugin ordnet gängige Dokumentationskomponenten direkt `docmd`-Containern zu:

### Hinweisboxen (`<Callout>`)

```jsx
<Callout type="tip" title="Profi-Tipp">
  Verwenden Sie Standard-JSX-Tags oder docmd-Container in derselben Datei.
</Callout>

<Callout type="warning" title="Achtung">
  Stellen Sie sicher, dass Ihre Abhängigkeiten vor dem Build aktualisiert sind.
</Callout>
```

| Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `type` | `String` | `info` | Stilvariante (`info`, `tip`, `warning`, `danger`). |
| `title` | `String` | `undefined` | Titel, der oben im Hinweis angezeigt wird. |
| `icon` | `String` | `undefined` | Optionaler Lucide-Icon-Name oder Iconify-Bezeichner. |

### Karten und Raster-Layouts (`<Card>`, `<Cards>`)

Gruppieren Sie Links und Referenzelemente in responsiven Rasterlayouts:

```jsx
<Cards cols={2}>
  <Card title="Schnellstart" href="/getting-started/quick-start" icon="rocket">
    Erfahren Sie, wie Sie Ihre erste docmd-Dokumentationsseite initialisieren und konfigurieren.
  </Card>
  <Card title="CLI-Referenz" href="/reference/cli-commands" icon="terminal">
    Befehlszeilenbefehle, Flags und Diagnosewerkzeuge.
  </Card>
</Cards>
```

| Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `cols` | `Number` | `2` | Rasterspalten (`1`, `2`, `3` oder `4`). |
| `title` | `String` | `undefined` | Kartentitel. |
| `href` | `String` | `undefined` | Ziel-URL des Links. |
| `icon` | `String` | `undefined` | Icon-Bezeichner der Karte. |

### Registerkarten (`<Tabs>`, `<Tab>`)

Präsentieren Sie plattformspezifische Code-Snippets oder mehrsprachige Anleitungen:

```jsx
<Tabs>
  <Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tab>
  <Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add docmd
    ```
  </Tab>
</Tabs>
```

Auch die zusammengesetzte Tag-Notation wird unterstützt:

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

Erstellen Sie nummerierte Schritt-für-Schritt-Installationsanleitungen und Tutorials:

```jsx
<Steps>
  ### Projekt initialisieren
  Führen Sie `docmd init` in Ihrem Projektverzeichnis aus.

  ### Inhalt hinzufügen
  Schreiben Sie Ihre Dokumentationsseiten in `docs/` mit Markdown oder MDX.

  ### Website erstellen
  Kompilieren Sie produktionsbereite statische Dateien mit `docmd build`.
</Steps>
```

## Syntaxvergleich

Sie können je nach persönlicher Vorliebe oder bestehenden Projektkonventionen zwischen nativer Container-Syntax und JSX-Tags wählen:

| Merkmal | Native Container (`:::`) | MDX-Komponenten (`<Component>`) |
| :--- | :--- | :--- |
| **Syntax-Stil** | Markdown-nativ (`::: callout`) | JSX/React-Stil (`<Callout>`) |
| **Abhängigkeiten** | Keine externen Abhängigkeiten | Integriert über `@docmd/plugin-mdx` |
| **Zusammengesetzte Tags** | Verschachtelte Container | Punktnotation (`<Tabs.Tab>`) |
| **Ausdrücke** | Vorlagenvariablen (`$var`) | Dynamische Ausdrücke (`{expr}`) |
| **Portabilität** | Sauberstes reines Markdown | Direkt kompatibel mit Docusaurus / Nextra |

::: callout tip "Vollständige Syntaxreferenz" icon:book-open
Ausführliche Details zu Ausdrücken, Attributtypen und Kommentarsyntax finden Sie im [MDX-Syntax-Leitfaden](syntax/mdx.md).
:::
