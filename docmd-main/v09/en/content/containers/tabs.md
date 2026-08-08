---
title: "Tabs"
description: "Organise alternative code snippets, platform instructions, and multi-language content into switchable tabs in docmd."
---

Tabs present mutually exclusive or alternative data sets (such as package manager choices or operating system commands). They condense technical instructions into clean, interactive tabbed containers.

::: callout info "Spaceless Syntax Support" icon:info
Both `::: tabs` and `:::tabs` (spaceless) syntax render identically. Choose whichever style suits your authoring workflow.
:::

## Syntax Reference

```markdown
::: tabs

== tab "Tab Label" [property:value...]
Tab content goes here.

== tab "Secondary Label"
Secondary tab content goes here.

:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Label** | `"String"` | Text displayed on the tab selector button. |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the label string. |

## Usage Examples

### Package Manager Switcher

Display installation commands across multiple package managers in a single compact block:

````markdown
::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::
````

::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::

### Multi-Language Code Snippets

Group language-specific implementations using tab icons for instant identification:

````markdown
::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::
````

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::

## Constraints & Behavior Rules

| Rule | Technical Note |
| :--- | :--- |
| **Nesting Limit** | Tabs cannot nest directly within other tab containers. |
| **Steps Compatibility** | Do not nest `::: steps` inside a tab pane. Use a standard ordered list instead. |
| **Viewport Limits** | Keep tab counts below 6 entries per block for mobile compatibility. |
| **State Persistence** | Selected tab states persist across page transitions during SPA navigation. |

::: callout tip "Contextual Labeling for AI" icon:sparkles
Specify target languages or operating systems in tab labels (e.g. `== tab "TypeScript"`). Explicit labels allow AI indexers to map alternative code blocks to their respective ecosystems accurately.
:::