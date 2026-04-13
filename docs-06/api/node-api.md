---
title: "Node.js API"
description: "Integrate docmd's build engine into your custom Node.js scripts and automation pipelines."
---

For advanced workflows, you can import and use the `docmd` build engine directly within your own Node.js applications. This is ideal for custom CI/CD pipelines, automated documentation generation, or extending `docmd` for specialized environments.

## Installation

Ensure `@docmd/core` is installed in your project:

```bash
npm install @docmd/core
```

## Core Functions

### `buildSite(configPath, options)`

The primary build function. It handles configuration loading, Markdown parsing, and asset generation.

```javascript
import { buildSite } from '@docmd/core';

async function runBuild() {
  await buildSite('./docmd.config.js', {
    isDev: false,      // Set to true for watch mode logic
    offline: false,    // Set to true to optimize for file:// access
    zeroConfig: false  // Set to true to bypass config file detection
  });
}
```

### `buildLive(options)`

Generates the browser-based **Live Editor** bundle.

```javascript
import { buildLive } from '@docmd/core';

async function generateEditor() {
  await buildLive({
    serve: false, // true starts a local server; false generates static files
    port: 3000    // Custom port if serve is true
  });
}
```

## Example: Custom Pipeline

You can wrap `docmd` to create complex documentation workflows.

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. Generate dynamic content
  await fs.writeFile('./docs/dynamic.md', '# Generated Content');

  // 2. Execute docmd build
  await buildSite('./docmd.config.js');

  // 3. Move output
  await fs.move('./site', './public/docs');
}
```

::: callout tip
The programmatic API is highly compatible with **AI-Driven Documentation**. Agents can trigger builds after content updates to verify integrity and manage deployments autonomously.
:::

## Plugin API Exports

`@docmd/core` also exports utilities for building advanced plugins with server-side action handling.

### `createActionDispatcher(hooks, options)`

Creates a dispatcher that routes WebSocket RPC messages to plugin action/event handlers.

```javascript
import { createActionDispatcher } from '@docmd/core';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/path/to/project', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

Creates source editing utilities for markdown file manipulation.

```javascript
import { createSourceTools } from '@docmd/core';

const source = createSourceTools({ projectRoot: '/path/to/project' });

// Get block information at a specific line range
const block = await source.getBlockAt('docs/page.md', [10, 12]);

// Wrap text with syntax markers
await source.wrapText('docs/page.md', [10, 12], 'important', 0, '**', '**');
```

### Type Exports

For TypeScript plugin authors, the following types are available:

```typescript
import type {
  PluginModule,     // Full plugin contract interface
  ActionContext,    // Context passed to action/event handlers
  ActionHandler,    // Signature for action handlers
  EventHandler,     // Signature for event handlers
  SourceTools,      // Source editing tools interface
  BlockInfo,        // Block information returned by getBlockAt
  TextLocation,     // Text location returned by findText
} from '@docmd/core';
```