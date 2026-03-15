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