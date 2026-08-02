---
title: "Node API Reference"
description: "Low-level Node API for plugin authors — URL utilities, action dispatchers, source tools, the engine loader, and TypeScript types."
---

::: callout info
**For plugin authors.** If you just want to *call* docmd from a Node script, see [Build API](/reference/build-api) instead. This page covers the lower-level utilities exposed by `@docmd/api` for writing plugins.
:::

The `@docmd/api` package is the dedicated home for the plugin system. It provides hook registration, WebSocket RPC dispatch, source editing tools, and centralised URL utilities.

```bash
npm install @docmd/api
```

::: callout tip
**Note:** All exports from `@docmd/api` are also available from `@docmd/core`. New projects should import directly from `@docmd/api`.
:::

## URL Utilities

Plugins should use these centralised utilities instead of rolling their own URL logic.

### `outputPathToSlug(outputPath)`

Convert a build engine output path to a clean directory-style slug.

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

### `outputPathToPathname(outputPath)`

Convert to a root-relative pathname.

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

### `outputPathToCanonical(outputPath, siteUrl)`

Build a full canonical URL.

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

### `sanitizeUrl(url)`

Collapse double slashes (except after protocol).

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

Build an absolute URL with locale and version prefixes.

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

### `resolveHref(href)`

Normalise user-written hrefs to clean URLs. Handles `.md` stripping, trailing slashes, `external:` and `raw:` prefixes.

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

## Pre-computed Page URLs

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

## Action & Event Dispatch

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

## Engine Loader API

The pluggable engine architecture allows programmatic resolution and instantiation of acceleration layers directly via `@docmd/api`.

### `loadEngine(engineName)`

Resolves and initialises the requested build engine backend. If native architecture binaries are unavailable, it gracefully falls back to the high-performance JavaScript engine.

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

### `registerEngine(engineName, engineInstance)`

Allows custom tools or third-party integrators to register custom execution engines programmatically.

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

## Type Exports

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

## What's Next

- [Building Plugins](/development/building-plugins) — start here.
- [Plugin Examples](/development/plugin-examples) — see a full plugin walkthrough.
- [Engines & Architecture](/development/engines/overview) — Rust engine, N-API, and engine loader internals.