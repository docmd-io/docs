---
title: "Tabs"
description: "Organise dense, alternative, or multi-language information into switchable interactive panes."
---

Tabs are the optimal UI pattern for presenting mutually exclusive or related data sets (e.g., "Install via NPM vs. Yarn" or "macOS vs. Windows" instructions) within a compact, interactive format.

## Syntax Reference

The `tabs` container utilises the specialised sub-delimiter `== tab "Label"`. You can optionally add an icon using the `icon:name` syntax.

```markdown
::: tabs

== tab "Label 1" icon:rocket
Content for the first tab.

== tab "Label 2" icon:settings
Content for the second tab.

:::
```

## Implementation Gallery

### 1. Package Management
Tabs are most commonly used to show installation instructions for different package managers in a single view.

::: tabs

== tab "pnpm"
```bash
pnpm add @docmd/core
```

== tab "npm"
```bash
npm install @docmd/core
```

== tab "yarn"
```bash
yarn add @docmd/core
```

:::

### 2. Multi-Language Code Snippets
Keep your logic clean by separating different programming languages or environments.

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.js');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.js');
```

:::

## Core Capabilities

### Isomorphic Lazy Rendering
`docmd` implements **Conditional Resource Laziness**. If a tab contains computationally expensive elements (e.g., **Mermaid.js** diagrams or high-resolution images), these assets are only initialised and rendered once the user activates that specific tab. This ensures rapid initial page loads.

### State Persistence
The default SPA router tracks the active tab's index across similar documentation pages. If a user selects "pnpm" on one page and navigates to another page with a matching tab structure, the "pnpm" tab will remain active automatically.

## Technical Constraints

| Constraint | Note |
| :--- | :--- |
| **Nesting Depth** | To preserve layout integrity, tabs cannot be nested inside other tab components. |
| **Interactive Conflict**| High-conflict syntax: To nest Steps inside a Tab, use a standard ordered list (`1. Step One`) instead of the `::: steps` container. |
| **Responsive Limit** | It is recommended to limit tab counts to 6 per block to ensure mobile device compatibility. |

::: callout tip "AI Context Mapping"
When utilising tabs for code snippets, always include the target language directly in the tab label (e.g., `== tab "TypeScript"`). This allows LLMs to instantly identify and extract the technically relevant section from the `llms-full.txt` context stream.
:::