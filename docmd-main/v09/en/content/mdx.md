---
title: "MDX Components"
description: "Author interactive documentation with MDX, JSX component syntax, dynamic expressions, and compound components in docmd."
---

docmd natively supports **MDX**, allowing you to seamlessly integrate JSX/React-style components and dynamic expressions directly within your Markdown content. Powered by docmd's zero-dependency, high-performance compiler, MDX compiles to lightweight, accessible static HTML without heavy bundlers or client-side runtime bloat.

You can use both `.md` and `.mdx` file extensions interchangeably.

## Why MDX in docmd?

* **Zero-Dependency Compilation**: Fast, static compilation without requiring Webpack, Babel, or external React bundler toolchains.
* **JSX Syntax Familiarity**: Drop-in familiarity for developers transitioning from Nextra, Docusaurus, Astro Starlight, or Mintlify.
* **Component Coexistence**: Use JSX tags (`<Callout>`, `<Card>`, `<Tabs>`) side-by-side with docmd's native container syntax (`::: callout`).
* **Safe Dynamic Expressions**: Safely interpolate frontmatter values, configuration variables, and JavaScript expressions with sandboxed evaluation.
* **Compound & Dotted Tags**: Full support for hierarchical components like `<Tabs.Tab>` and `<Steps.Step>`.

---

## Basic Component Syntax

### Self-Closing Tags

Self-closing tags are ideal for inline indicators, badges, and standalone widgets:

```jsx
<Badge text="Stable" type="success" />
<Badge text="v0.9.10" type="info" />
<Badge text="Deprecated" type="danger" />
```

### Block Components with Markdown Children

Block components wrap Markdown content, which continues to support standard Markdown formatting, code snippets, lists, and links:

```jsx
<Callout type="tip" title="Pro Tip">
  You can include **bold text**, `inline code`, and even code blocks inside JSX tags:

  ```bash
  npx @docmd/core build
  ```
</Callout>
```

---

## Built-in MDX Components

docmd provides built-in mappings for common documentation components:

### Callouts (`<Callout>`)

```jsx
<Callout type="info" title="Information">
  Provides contextual guidance or system notes.
</Callout>

<Callout type="warning" title="Warning">
  Highlights critical cautions and breaking changes.
</Callout>
```

| Prop | Type | Description |
| :--- | :--- | :--- |
| `type` | `String` | Variant style: `info`, `tip`, `warning`, `danger` (default: `info`). |
| `title` | `String` | Optional callout header text. |
| `icon` | `String` | Custom Lucide icon name or Iconify identifier. |

### Cards and Grid Layouts (`<Card>`, `<Cards>`)

Group links, features, or quick navigations into structured responsive grids:

```jsx
<Cards cols={2}>
  <Card title="Quick Start" href="/getting-started/quick-start" icon="rocket">
    Learn how to initialise and configure your first docmd documentation site.
  </Card>
  <Card title="CLI Reference" href="/reference/cli-commands" icon="terminal">
    Comprehensive command-line interface flags, options, and server configurations.
  </Card>
</Cards>
```

### Tabs (`<Tabs>`, `<Tab>`)

Present multi-language code snippets or platform-specific instructions:

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

Compound notation `<Tabs.Tab>` is also supported:

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

### Steps (`<Steps>`)

Create numbered, sequential walkthroughs for tutorials or installation guides:

```jsx
<Steps>
  ### Initialise Project
  Run `npx @docmd/core init` in your terminal.

  ### Add Content
  Write your documentation pages in `docs/` using Markdown or MDX.

  ### Deploy
  Compile production-ready static assets with `npx @docmd/core build`.
</Steps>
```

---

## Dynamic Expressions & Interpolation

MDX enables embedding dynamic expressions using curly braces `{}`. Expressions are evaluated in a safe sandbox with access to current document frontmatter and site configuration.

### Accessing Frontmatter

```mdx
---
title: "Authentication Guide"
version: "2.4.0"
author: "docmd Team"
---

# {frontmatter.title}

Documentation version: **{frontmatter.version}**  
Maintained by: *{frontmatter.author}*
```

### Accessing Site Configuration

```jsx
Welcome to documentation for {config.title}.
```

### JavaScript Expressions

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Calculated build budget: {500 * 2}ms.
```

---

## Props and Attributes

MDX supports standard JSX attribute syntaxes:

```jsx
{/* String attributes */}
<Card title="Configuration" href="/configuration/overview" />

{/* Numeric and boolean expressions */}
<Cards cols={3} animated={true} />

{/* Boolean shorthand (equivalent to interactive={true}) */}
<Card interactive title="Interactive Card" />

{/* Attribute spread */}
<Card {...cardProps} />
```

---

## Choosing Between Containers and MDX

Both docmd native containers (`::: container`) and MDX components (`<Component>`) are first-class citizens in docmd:

| Feature | Native Containers (`:::`) | MDX Components (`<Component>`) |
| :--- | :--- | :--- |
| **Syntax Style** | Markdown-native (`::: callout`) | JSX/React-style (`<Callout>`) |
| **Tooling Dependencies** | Zero external dependencies | Zero external dependencies (via `lite-mdx`) |
| **Compound Hierarchy** | Nested indentation | Dotted tags (`<Tabs.Tab>`) |
| **Dynamic Expressions** | Variable syntax (`$var`) | JavaScript expressions (`{expr}`) |
| **Ecosystem Portability** | Cleanest plain-text readability | Drop-in compatible with Docusaurus / Nextra |

::: callout tip "Coexistence" icon:sparkles
You can freely mix native containers and MDX components within the same documentation page without any conflicts.
:::
