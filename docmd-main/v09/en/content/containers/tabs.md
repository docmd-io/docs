---
title: "Tabs"
description: "Organise alternative code snippets, platform instructions, and multi-language content into switchable tabs in docmd."
---

Tabs present mutually exclusive or alternative data sets (such as package manager choices or operating system commands). They condense technical instructions into clean, interactive tabbed containers.

## Container Syntax

```markdown
::: tabs # Outer tab group container opener
::: tab [title:"Tab Label"] [icon:icon_name] # Individual tab item opener
Tab 1 content (code blocks, text, lists)...
::: /tab # Explicit tab item closer

::: tab [title:"Tab Label 2"] [icon:icon_name] # Second tab opener
Tab 2 content...
::: /tab
::: /tabs # Explicit tab group closer
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Tab Label** | `"String"` \| `title:"..."` | Text displayed on the tab selector button (1st positional arg or `title:"..."`). |
| **Iconography** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the tab label. |
| **Sub-Containers** | `::: tab` ... `::: /tab` | Explicit tab item wrappers. Legacy `== tab` syntax is also fully supported. |
| **Closing Tags** | `::: /tabs`, `::: /tab`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Package Manager Switcher

Display installation commands across multiple package managers using explicit sub-containers and inline comments:

````markdown
::: tabs # Package manager options
::: tab "pnpm" icon:box # Recommended package manager
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs
````

::: tabs # Package manager options
::: tab "pnpm" icon:box # Recommended package manager
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs

### Multi-Language Code Snippets

Group language-specific implementations using tab icons and named closing tags:

````markdown
::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs
````

::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs

::: callout tip "Legacy == tab Syntax" icon:archive
Existing documentation utilizing `== tab` syntax continues to parse seamlessly:

```markdown
::: tabs
== tab "JavaScript"
console.log("Legacy syntax");
::: /tabs
```
:::