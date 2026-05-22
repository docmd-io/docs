---
title: "Tabs"
description: "Organise dense, alternative, or multi-language information into switchable interactive panes."
---

Tabs present mutually exclusive or related data sets - such as "pnpm vs npm" or "macOS vs Windows". They condense information into a compact, interactive format.

::: callout info "Spaceless Syntax"
Both `::: tabs` and `:::tabs` (spaceless) work natively. Use whichever style you prefer.
:::

## Syntax Reference

```markdown
::: tabs

== tab "Label" [property:value...]
Content for this tab.

== tab "Another Label"
Content for the second tab.

:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Label** | `"String"` | The text displayed on the tab trigger button. |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the label text. |

## Examples

### Package Manager Instructions

Show installation commands for multiple package managers in a single compact block.

````markdown
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
````

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

### Multi-Language Code Snippets

Keep programming environments cleanly separated with tab icons for quick visual identification.

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

## Constraints

| Constraint | Note |
| :--- | :--- |
| **Nesting Depth** | Tabs cannot nest inside other tab components. |
| **Interactive Conflict** | Do not nest `::: steps` inside a tab. Use a standard ordered list instead. |
| **Responsive Limit** | Limit tab counts to 6 per block for mobile compatibility. |
| **State Persistence** | The active tab is tracked by the SPA router. Selecting "pnpm" on one page activates it on subsequent pages. |

::: callout tip "AI Context Mapping"
Always include the target language or platform in the tab label (e.g., `== tab "TypeScript"`). This helps AI agents instantly identify the correct context stream without having to infer it from code content.
:::