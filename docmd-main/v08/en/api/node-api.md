---
title: "Node.js API"
description: "Integrate docmd's build engine into your custom Node.js scripts and automation pipelines."
---

You can import and use the docmd build engine directly within your Node.js applications. This is ideal for custom CI/CD pipelines, automated documentation generation, or extending docmd for specialised environments.

## Installation

Ensure `@docmd/core` is installed in your project:

```bash
npm install @docmd/core
```

## Core Functions

### `buildSite(configPath, options)`

The primary build function. It handles configuration loading, Markdown parsing, and asset generation.

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
Detects and loads a workspace configuration file. Returns a normalized `WorkspaceRootConfig` or `null`.

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

You can wrap docmd to create complex documentation workflows.

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
The programmatic API is highly compatible with **AI-Driven Documentation**. Agents can trigger builds after content updates to verify integrity and manage deployments autonomously.
:::

## Plugin API (`@docmd/api`)

The `@docmd/api` package is the dedicated home for the plugin system. It provides hook registration, WebSocket RPC dispatch, source editing tools, and **centralized URL utilities**.

```bash
npm install @docmd/api
```

### URL Utilities

Plugins should use these centralized utilities instead of rolling their own URL logic.

#### `outputPathToSlug(outputPath)`

Convert a build engine output path to a clean directory-style slug.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

#### `outputPathToPathname(outputPath)`

Convert to a root-relative pathname.

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

#### `outputPathToCanonical(outputPath, siteUrl)`

Build a full canonical URL.

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

#### `sanitizeUrl(url)`

Collapse double slashes (except after protocol).

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

#### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Build an absolute URL with locale and version prefixes.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

#### `resolveHref(href)`

Normalize user-written hrefs to clean URLs. Handles `.md` stripping, trailing slashes, `external:` and `raw:` prefixes.

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

### Pre-computed Page URLs

Every page object includes pre-computed URL data. Plugins can read these directly with zero computation needed.

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);      
    console.log(page.urls.canonical); 
    console.log(page.urls.pathname);  
  }
}
```

| Property | Type | Description |
|:---------|:-----|:------------|
| `slug` | `string` | Clean directory-style slug (e.g., `guide/` or `/`) |
| `canonical` | `string` | Full canonical URL (only if `config.url` is set) |
| `pathname` | `string` | Root-relative path (e.g., `/guide/`) |

> **Note:** All exports from `@docmd/api` are also available from `@docmd/core`. New projects should import directly from `@docmd/api`.

### `createActionDispatcher(hooks, options)`

Creates a dispatcher that routes WebSocket RPC messages to plugin action/event handlers.

```javascript
import { createActionDispatcher } from "@docmd/api";

const dispatcher = createActionDispatcher(
  { "actions": myPlugin.actions, "events": myPlugin.events },
  { "projectRoot": "/path/to/project", config, broadcast }
);

const { result, reload } = await dispatcher.handleCall("my-action", payload);
```

### `createSourceTools({ projectRoot })`

Creates source editing utilities for markdown file manipulation.

```javascript
import { createSourceTools } from "@docmd/api";

const source = createSourceTools({ "projectRoot": "/path/to/project" });

const block = await source.getBlockAt("docs/page.md", [10, 12]);
await source.wrapText("docs/page.md", [10, 12], "important", 0, "**", "**");
```

### `loadPlugins(config, options)`

Loads, validates, and registers all plugins declared in the config. Returns the populated hooks registry.

```javascript
import { loadPlugins, hooks } from "@docmd/api";

const registeredHooks = await loadPlugins(config, {
  "resolvePaths": [__dirname]  
});
```

### Engine Loader API

The pluggable engine architecture allows programmatic resolution and instantiation of acceleration layers directly via `@docmd/api`.

#### `loadEngine(engineName)`

Resolves and initialises the requested build engine backend. If native architecture binaries are unavailable, it gracefully falls back to the high-performance JavaScript engine.

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

#### `registerEngine(engineName, engineInstance)`

Allows custom tools or third-party integrators to register custom execution engines programmatically.

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

### Type Exports

For TypeScript plugin authors, the following types are available:

```typescript
import type {
  PluginModule,       
  PluginDescriptor,   
  PluginHooks,        
  PageContext,        
  BeforeBuildContext, 
  PostBuildContext,   
  Capability,         
  ActionContext,      
  ActionHandler,      
  EventHandler,       
  SourceTools,        
  BlockInfo,          
  TextLocation,       
  Engine,             
} from '@docmd/api';
```