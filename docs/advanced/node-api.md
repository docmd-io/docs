---
title: "Programmatic Node API"
description: "Integrate docmd's build engine directly into your custom Node.js scripts and automation pipelines."
---

# Programmatic Node API

For advanced workflows, you can import and use the `docmd` build engine directly within your own Node.js scripts. This is ideal for custom CI/CD pipelines, automated documentation generation from source code, or wrapping `docmd` in another tool.

## Installation

```bash
npm install @docmd/core
```

## Core Functions

### `build(configPath, options)`
The primary build function used by the CLI.

```javascript
import  from '';

async function run() {
  await build('./docmd.config.js', {
    isDev: false,      // Set to true for watch mode logic
    offline: false,    // Set to true to optimize for file:// access
    zeroConfig: false  // Set to true to bypass config file detection
  });
}
```

### `buildLive(options)`
Generates the browser-based **Live Editor** bundle.

```javascript
import  from '';

async function run() {
  await buildLive({
    serve: false,      // true starts a local server; false generates static files
    port: 3000         // Custom port if serve is true
  });
}
```

## Example: Custom Build Pipeline

You can combine `docmd` with other tools (like `fs-extra`) to create complex build artifacts.

```javascript
import  from '';
import  from '';

async function deployDocs() {
  try {
    // 1. Pre-build logic (e.g. generating markdown from code)
    await generateMarkdownFromJSDoc('./src', './docs/api');

    // 2. Run docmd build
    await build('./docmd.config.js', { offline: true });

    // 3. Post-build logic (e.g. moving files to a server folder)
    await fs.move('./site', '/var/www/html/docs');
    
    console.log('Documentation successfully deployed!');
  } catch (err) {
    console.error('Build Pipeline Failed:', err);
  }
}
```

::: callout tip
The Programmatic API allows AI agents to act as **Documentation Engineers**. An agent can trigger a `docmd build` after modifying content, verify that the `llms-full.txt` was generated correctly, and then handle the deployment—all without human intervention.
:::