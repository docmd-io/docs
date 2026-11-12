---
title: "MDX Components"
description: "Author documentation with MDX and JSX components using the official mdx plugin and lite-mdx."
---

`docmd` provides built-in support for MDX and JSX components through the `@docmd/plugin-mdx` plugin. Powered by `lite-mdx`, it compiles JSX tags into accessible HTML and native `docmd` containers during build time with zero client JavaScript runtime overhead.

Both `.md` and `.mdx` file extensions can be used interchangeably.

::: callout tip "Why Use MDX in docmd?" icon:sparkles
MDX provides a familiar authoring syntax for teams migrating from frameworks like Nextra, Docusaurus, or Mintlify, allowing existing component markup to render without rewriting Markdown files.
:::

## Installation

Install the official MDX plugin:

```bash
docmd add mdx
```

Alternatively, register the plugin in your `docmd.config.json`:

```json
{
  "plugins": {
    "mdx": {}
  }
}
```

## Built-in Component Mappings

The plugin maps common documentation components directly to `docmd` containers:

### Callouts (`<Callout>`)

```jsx
<Callout type="tip" title="Pro Tip">
  Use standard JSX tags or docmd containers in the same file.
</Callout>

<Callout type="warning" title="Caution">
  Ensure your dependencies are updated before building.
</Callout>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `String` | `info` | Callout style variant (`info`, `tip`, `warning`, `danger`). |
| `title` | `String` | `undefined` | Header title displayed at the top of the callout. |
| `icon` | `String` | `undefined` | Optional Lucide icon name or Iconify identifier. |

### Cards and Grid Layouts (`<Card>`, `<Cards>`)

Group links and reference items into responsive grid layouts:

```jsx
<Cards cols={2}>
  <Card title="Quick Start" href="/getting-started/quick-start" icon="rocket">
    Learn how to initialise and configure your first docmd documentation site.
  </Card>
  <Card title="CLI Reference" href="/reference/cli-commands" icon="terminal">
    Command-line interface commands, flags, and diagnostic tools.
  </Card>
</Cards>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `cols` | `Number` | `2` | Grid columns (`1`, `2`, `3`, or `4`). |
| `title` | `String` | `undefined` | Card header title. |
| `href` | `String` | `undefined` | Link target URL. |
| `icon` | `String` | `undefined` | Card icon identifier. |

### Tabs (`<Tabs>`, `<Tab>`)

Present platform-specific code snippets or multi-language instructions:

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

Compound tag notation is also supported:

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

Create numbered step-by-step installation guides and tutorials:

```jsx
<Steps>
  ### Initialise Project
  Run `docmd init` in your project directory.

  ### Add Content
  Write your documentation pages in `docs/` using Markdown or MDX.

  ### Build Site
  Compile production-ready static files with `docmd build`.
</Steps>
```

## Syntax Comparison

You can choose between native container syntax and JSX tags based on personal preference or existing project conventions:

| Feature | Native Containers (`:::`) | MDX Components (`<Component>`) |
| :--- | :--- | :--- |
| **Syntax Style** | Markdown-native (`::: callout`) | JSX/React-style (`<Callout>`) |
| **Dependencies** | Zero external dependencies | Built-in via `@docmd/plugin-mdx` |
| **Compound Tags** | Nested containers | Dotted notation (`<Tabs.Tab>`) |
| **Expressions** | Template variables (`$var`) | Dynamic expressions (`{expr}`) |
| **Portability** | Cleanest plain Markdown | Drop-in compatible with Docusaurus / Nextra |

::: callout tip "Full Syntax Reference" icon:book-open
For complete details on expressions, attribute types, and comment syntax, see the [MDX Syntax Guide](syntax/mdx.md).
:::
