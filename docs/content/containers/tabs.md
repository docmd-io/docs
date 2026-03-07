---
title: "Tabs"
description: "Organize alternative or dense information into switchable panes. Perfect for multi-language code snippets."
---

Tabs are the best way to present related but mutually exclusive information (like "npm vs yarn" or "Windows vs macOS" instructions) in a compact, interactive format.

## Syntax

The `tabs` container uses a special sub-delimiter: `== tab "Label"`.

```markdown
::: tabs

== tab "Tab Label 1"
Content for the first tab.

== tab "Tab Label 2"
Content for the second tab.

:::
```

## Detailed Example: Package Managers

````markdown
::: tabs

== tab "NPM"
```bash
npm install @docmd/core
```

== tab "Yarn"
```bash
yarn add @docmd/core
```

== tab "PNPM"
```bash
pnpm add @docmd/core
```

:::
````

::: tabs
== tab "NPM"
```bash
npm install @docmd/core
```
== tab "Yarn"
```bash
yarn add @docmd/core
```
== tab "PNPM"
```bash
pnpm add @docmd/core
```
:::

## Advanced Features

### Lazy Rendering
`docmd` implements **Conditional Lazy Rendering**. If a tab contains heavy assets like a **Mermaid.js** diagram or large images, they are only initialized once the user clicks that specific tab. This ensures your initial page load remains blazingly fast.

### Sticky Tab State
The `docmd` SPA router remembers the active tab's index when navigating between similar pages. This creates a cohesive experience for users switching between pages that share the same tab setup.

## Technical Constraints

| Constraint | Note |
| :--- | :--- |
| **No Tabs-in-Tabs** | To prevent UX loops, tabs cannot be nested inside other tabs. |
| **Steps-in-Tabs** | High-conflict syntax: If you need steps inside a tab, use a standard ordered list (`1. Step One`). |
| **Max Tabs** | Recommended maximum of 6 tabs for mobile responsiveness. |

::: callout tip
When using tabs for code snippets, always include the language in the tab label (e.g., `== tab "JavaScript"`). This allows LLMs to instantly identify the relevant block in the unified `llms-full.txt` stream.
:::