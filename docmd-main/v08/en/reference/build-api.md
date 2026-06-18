---
title: "Build API"
description: "Programmatic build API — call docmd from Node.js to build sites, live editor bundles, and workspace projects."
---

You can import and use the docmd build engine directly from your Node.js applications. This is ideal for custom CI/CD pipelines, automated documentation generation, and pre-rendering docs in monorepos.

## Installation

Ensure `@docmd/core` is installed in your project:

```bash
npm install @docmd/core
```

## Core Functions

### `buildSite(configPath, options)`

The primary build function. Handles configuration loading, Markdown parsing, and asset generation.

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    "isDev": false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

Generates the browser-based **Live Editor** bundle.

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    "serve": false,
    port: 3000
  });
}
```

## Workspace Management

For managing workspaces programmatically, use the dedicated workspace functions.

### `isWorkspace(config)`
Returns `true` if the provided configuration object follows the Workspace schema.

### `detectWorkspace(configPath)`
Detects and loads a workspace configuration file. Returns a normalised `WorkspaceRootConfig` or `null`.

### `buildWorkspace(config, options)`
Builds all projects within a workspace. Handles shared assets and project-specific prefixing.

### `devWorkspace(config, options)`
Starts the workspace dev server. Watches all projects for changes and performs targeted rebuilds.

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAll() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## Example: Custom Pipeline

Wrap docmd to compose complex documentation workflows — generate dynamic content, build, then move the output to your final location.

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. Generate dynamic content
  await fs.writeFile('./docs/dynamic.md', '# Generated Content');

  // 2. Execute build
  await buildSite('./docmd.config.json');

  // 3. Move output
  await fs.move('./site', './public/docs');
}
```

::: callout tip
The programmatic API is highly compatible with **AI-driven documentation**. Agents can trigger builds after content updates to verify integrity and manage deployments autonomously.
:::

## What's Next

- [Plugins](/plugins/usage) — extend docmd without touching the engine.
- [CLI Commands](/reference/cli-commands) — the recommended path for most CI/CD.
- [Workspaces](/configuration/workspaces) — multi-project configuration reference.
