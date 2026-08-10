---
title: "Build API"
description: "Programmatic Node.js API reference for docmd — build sites, live editor bundles, and multi-project workspaces."
---

You can import and execute the docmd build engine programmatically from Node.js applications. This enables custom build pipelines, automated documentation generation, and monorepo integrations.

## Installation

Ensure `@docmd/core` is installed in your project:

```bash
npm install @docmd/core
```

## Primary Build Export Functions

### `buildSite(configPath, options)`

Executes standard static site compilation:

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    isDev: false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

Compiles the browser-based Live Editor application:

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    serve: false,
    port: 3000
  });
}
```

## Workspace Functions

Functions for managing multi-project workspaces programmatically:

* **`isWorkspace(config)`**: Evaluates whether a configuration object conforms to workspace schemas.
* **`detectWorkspace(configPath)`**: Resolves workspace configurations, returning normalised `WorkspaceRootConfig` or `null`.
* **`buildWorkspace(config, options)`**: Compiles all projects defined in a workspace root.
* **`devWorkspace(config, options)`**: Starts workspace development server with targeted rebuild tracking.

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAllWorkspaces() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## Custom Pipeline Example

Compose docmd compilation with custom build scripts:

```javascript
import { buildSite } from "@docmd/core";
import fs from "fs-extra";

async function deployPipeline() {
  // 1. Generate dynamic content sources
  await fs.writeFile("./docs/dynamic.md", "# Dynamically Generated Page");

  // 2. Execute static compilation
  await buildSite("./docmd.config.json");

  // 3. Move output directory
  await fs.move("./site", "./public/docs");
}
```

::: callout tip "AI Automation Compatibility" icon:cpu
The programmatic Build API allows background workers and AI agents to trigger builds after source modifications to verify site integrity automatically.
:::