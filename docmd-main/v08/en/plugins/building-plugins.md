---
title: "Building Plugins"
description: "A comprehensive guide to extending docmd with custom logic, data injection, and interactive features."
---

Plugins are the primary extension mechanism for docmd. They allow you to inject HTML, modify Markdown parsing, inject build-time data, and automate post-build tasks. This guide outlines the plugin API.

## Plugin Descriptor

Every plugin must export a `plugin` descriptor declaring its identity and capabilities. This enables the engine to validate and isolate boundaries at load time.

```javascript
  "plugin": {
    "name": "my-analytics",
    "version": "1.0.0",
    "capabilities": ["head", "body", "post-build"]
  },

  "generateScripts": (config, opts) => { ... },
  "onPostBuild": async (ctx) => { ... }
```

> **Note:** The descriptor is strictly required. Plugins without it will fail to load.

## Core Capabilities

The `capabilities` array dictates which hooks your plugin is allowed to use.

| Capability | Allowed Hooks | Phase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Init |
| `markdown` | `markdownSetup` | Setup |
| `head` | `generateMetaTags`, `generateScripts` (head) | Render |
| `body` | `generateScripts` (body) | Render |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeBuild`, `onBeforeRender`, `onPageReady` | Build |
| `post-build`| `onPostBuild` | Post-Build |
| `dev` | `onDevServerReady` | Dev Server |
| `assets` | `getAssets` | Output |
| `actions` | `actions` | Interactive |
| `events` | `events` | Interactive |
| `translations`| `translations` | i18n |
| `template` *(new in 0.8.7)* | `templates`, `templateAssets` | Render |

> **Note:** the `template` capability is exclusive — if a plugin declares it, it cannot also declare `head`, `build`, `post-build`, etc. Templates ship slots and assets only; they do not run lifecycle hooks. If you need both, ship two separate packages.

## Plugin API Reference

A docmd plugin is a standard JavaScript object that implements one or more of the following hooks.

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extend the `markdown-it` instance. Synchronous. |
| `generateMetaTags(config, page, root)` | Inject `<meta>` or `<link>` tags into the `<head>`. |
| `generateScripts(config, opts)` | Return an object containing `headScriptsHtml` and `bodyScriptsHtml`. |
| `getAssets(opts)` | Define external files or CDN scripts to be injected. |
| `onPostBuild(ctx)` | Run logic after the generation of all HTML files. |
| `translations(localeId)` | Return an object of translated strings for the given locale. |
| `actions` | An object of named action handlers for WebSocket RPC calls. |
| `events` | An object of named event handlers for browser messages. |
| `templates[]` *(new in 0.8.7, capability: `template`)* | Array of `TemplateHook` entries — each `{ type, templatePath }` overrides one EJS slot. |
| `templateAssets[]` *(new in 0.8.7, capability: `template`)* | Array of `TemplateAssetHook` entries — each `{ type, path, priority?, position? }` ships the template's CSS/JS bundle. |

### Building a template plugin (new in 0.8.7)

A template is a plugin with `capabilities: ['template']`. It ships a `templates[]` array (slot overrides) and a `templateAssets[]` array (CSS/JS bundle). See the dedicated [Templates guide](../theming/templates.md) and [Theming → Templates](../theming/templates.md) for the full authoring walkthrough, slot table, and resolution chain. The minimum viable template looks like:

```javascript
export default {
  plugin: {
    name: 'template-foo',
    version: '1.0.0',
    capabilities: ['template'],
  },
  templates: [
    { type: 'menubar', templatePath: '/abs/path/to/templates/partials/menubar.ejs' },
    { type: 'footer',  templatePath: '/abs/path/to/templates/partials/footer.ejs' },
  ],
  templateAssets: [
    { type: 'css', path: '/abs/path/to/assets/css/foo.css', priority: 10, position: 'head' },
  ],
};
```

## Creating a Local Plugin

Creating a plugin is as simple as defining a JavaScript file. For example, `my-plugin.js`:

```javascript
import path from "path";

export default {
  plugin: {
    "name": "my-plugin",
    "version": "1.0.0",
    "capabilities": ["head", "post-build"]
  },

  markdownSetup: (md, options) => {
    // Add custom parser rules
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Custom Plugin: Verified ${pages.length} pages.`);
  }
};
```

To enable your plugin, reference its **full package name** in your `docmd.config.json`:

```json
  "plugins": {
    "my-awesome-plugin": {}
  }
```

> **Note:** Shorthand names (e.g. `math`, `search`) are reserved for official `@docmd/plugin-*` packages. Third-party plugins must always use their full npm package name.

### Plugin Resolution

The docmd engine resolves plugin names as follows:
- **Official shorthands** (`math`, `search`) expand to `@docmd/plugin-<name>`. Only official packages can exist under the `@docmd` scope.
- **Third-party plugins** must use their full package name (e.g. `my-awesome-plugin`, `@myorg/docmd-extras`). There is no alias system for external plugins. This eliminates supply-chain attack vectors.

### Plugin Isolation

Every hook invocation is wrapped in a try/catch block. A broken plugin cannot crash the build or interfere with other plugins. Errors are logged and collected into a summary.

### Scoping Plugins (`noStyle`)

Plugins inject their CSS/JS universally by default. Developers can explicitly prevent their plugin from rendering on `noStyle` pages by exporting a `noStyle` boolean:

```javascript
export default {
  noStyle: false, 

  generateScripts: () => { ... }
}
```

Users can override this via configuration (`plugins: { math: { noStyle: false } }`) or dynamically via Markdown frontmatter (`plugins: { math: true }`).

## Lifecycle Hooks

Docmd provides deep integration hooks. They allow plugins to manipulate configuration, raw sources, and page data.

| Hook | Description | Expected Return |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Reads or modifies the active config right after initialisation. | `void` or `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Exposes the raw Node.js server during `npx @docmd/core dev`. | `void` or `Promise<void>` |
| **`onBeforeParse(src, frontmatter, filePath?)`** | Pre-processes raw markdown string data immediately before parsing. | `string` or `Promise<string>` |
| **`onAfterParse(html, frontmatter, filePath?)`** | Post-processes generated HTML representing the markdown body. | `string` or `Promise<string>` |
| **`onBeforeBuild(ctx)`** | Called after all markdown is parsed but before HTML generation. Used for heavy pre-computation. | `void` or `Promise<void>` |
| **`onBeforeRender(page)`** | Called before template rendering. Mutations to `frontmatter` and `html` are reflected in output. | `void` or `Promise<void>` |
| **`onPageReady(page)`** | Accesses fully assembled page metadata just before it is written to the destination file. | `void` or `Promise<void>` |

### Engine Acceleration & Background Tasks (`runWorkerTask`)

docmd executes intensive operations via a **Pluggable Engine Architecture**. Plugins can easily offload custom heavy I/O or CPU-bound subroutines through the configured build engine (e.g., JavaScript or native Rust workers).

The `runWorkerTask` method is injected transparently into `PageContext`, `PostBuildContext`, and `ActionContext`.

```javascript
{
  "plugin": { "name": "my-plugin", "version": "1.0.0", "capabilities": ["post-build"] },

  "onPostBuild": async (ctx) => {
    // Pass a registered engine action name or absolute script path
    const result = await ctx.runWorkerTask('/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### Data Fetching and Indexing (`onBeforeBuild`)

The `onBeforeBuild` hook runs *after* markdown parsing but *before* the HTML rendering loop begins. It is optimal for heavy data indexing or API calls.

It receives the `BeforeBuildContext`, containing all `pages` and the `tui` instance. This allows plugins to show isolated progress bars.

```typescript
export async function onBeforeBuild({ pages, tui }) {
  tui.step('Fetching remote plugin data', 'WAIT');

  let processed = 0;
  for (const page of pages) {
    if (page.sourcePath) {
      page.frontmatter.remoteData = await fetchHeavyData(page.sourcePath);
    }
    processed++;
    if (processed % 10 === 0 || processed === pages.length) {
      tui.progress('Fetching remote plugin data', processed, pages.length);
    }
  }

  tui.step('Fetching remote plugin data', 'DONE');
}
```

### `onBeforeRender` and `PageContext`

Use `onBeforeRender` to inject build-time data derived from the source file.

```typescript
interface PageContext {
  sourcePath: string;           
  frontmatter: Record<string, any>; 
  html: string;                 
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
  runWorkerTask<T = any>(modulePath: string, functionName: string, args: any[]): Promise<T>; 
}
```

```javascript
export default {
  plugin: {
    name: "my-metadata-plugin",
    version: "1.0.0",
    capabilities: ["build"]
  },

  onBeforeRender: async (page) => {
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
}
```

## Deep Dive: Asset Injection

The `getAssets()` hook allows your plugin to bundle client-side logic securely.

```javascript
export default {
  getAssets: (options) => {
    return [
      {
        url: "https://example.com/script.js",
        type: "js",
        location: "head"
      },
      {
        src: path.join(__dirname, "plugin-init.js"), 
        dest: "assets/js/plugin-init.js",            
        type: "js",
        location: "body"
      }
    ];
  }
}
```

## Translating Plugins (i18n)

Plugins rendering client-side UI should expose strings via the `translations(localeId)` hook. The engine merges these with core strings automatically.

The standard pattern stores a JSON file for each language in an `i18n/` directory:

```javascript
import fs from "fs";
import path from "path";

export default {
  plugin: {
    name: "my-plugin",
    version: "1.0.0",
    capabilities: ["translations", "body"]
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, "i18n", `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch { }

    return {};
  }
}
```

## WebSocket RPC Actions

Plugins can register **action handlers** and **event handlers** that run on the dev server. They are callable from the browser via the `window.docmd` API.

```javascript
export default {
  plugin: {
    name: "my-live-plugin",
    version: "1.0.0",
    capabilities: ["actions", "events"]
  },

  actions: {
    "my-plugin:save-note": async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + "\n\n> " + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { "saved": true };
    }
  },

  events: {
    "my-plugin:page-viewed": (data, ctx) => {
      console.log(`Page viewed: ${data.path}`);
    }
  }
};
```

The `ctx` (ActionContext) provides:

| Method | Description |
| :--- | :--- |
| `ctx.readFile(path)` | Read a file relative to the project root. |
| `ctx.writeFile(path, content)` | Write a file (triggers rebuild + reload). |
| `ctx.readFileLines(path)` | Read a file as an array of lines. |
| `ctx.broadcast(event, data)` | Push an event to all connected browsers. |
| `ctx.runWorkerTask(module, fn, args)` | Offload heavy CPU tasks to the worker pool. |
| `ctx.source` | Source editing tools for block-level markdown manipulation. |
| `ctx.projectRoot` | Absolute path to the project root. |
| `ctx.config` | Current docmd site configuration. |

All file operations are sandboxed to the project root.

::: callout info "Dev Mode Only 🛡️"
The WebSocket RPC system is only active during `npx @docmd/core dev`. Production builds do not include the API client or server-side action handling.
:::

## Best Practices

1.  **Declare Capabilities**: Always export a `plugin` descriptor with declared capabilities.
2.  **Use `onBeforeRender` for data injection**: If your plugin computes frontmatter fields, use `onBeforeRender`.
3.  **Async/Await**: Always use `async` functions for `onPostBuild`, `onBeforeRender`, and action handlers.
4.  **Statelessness**: Avoid maintaining state within the plugin object. The engine may re-initialise plugins dynamically.
5.  **Naming Convention**: Prefix community package names with `docmd-plugin-`.
6.  **Action Namespacing**: Prefix action names with your plugin name (e.g., `my-plugin:save-note`).
7.  **Action Validation**: Define and require an explicit payload schema in your actions.
8.  **Logging**: Use the provided `log()` helper in `onPostBuild` to respect user verbosity settings.

::: callout tip "AI-Ready Design 🤖"
The docmd plugin API is **LLM-Optimal**. Because the hooks use standard JavaScript objects, AI agents can generate bug-free plugins with minimal instruction.
:::