---
title: "Using Plugins"
description: "Install, configure, and manage docmd plugins, from core built-ins to optional third-party extensions."
---

`docmd` features a modular plugin architecture. Built-in plugins ship directly with the core engine and require no separate installation. Optional and third-party plugins can be installed via the CLI or package managers.

## Installing Plugins

Use the `docmd` CLI to manage plugin packages:

```bash
# Install an official plugin
npx @docmd/core add <plugin-name>

# Remove an installed plugin
npx @docmd/core remove <plugin-name>
```

The installer detects your active package manager (npm, pnpm, yarn, or bun), resolves short names to full `@docmd/plugin-*` package names, and updates your `docmd.config.json` automatically.

Use `--verbose` (or `-V`) to view complete installer logs:

```bash
npx @docmd/core add <plugin-name> -V
```

## Core Built-in Plugins

These plugins ship bundled with `@docmd/core` and require no installation. Enable or configure them in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {},
    "ai": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "okf": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
}
```

::: callout tip title:"Git Repository Detection" icon:git-branch
The Git plugin detects whether your project root is a valid Git repository. If Git history is unavailable, it disables footer timestamp generation automatically.
::: /callout

::: callout info title:"OKF Bundle Support" icon:info
The `@docmd/plugin-okf` plugin generates an Open Knowledge Format bundle (`site/okf/`) containing typed manifests and concept files for AI agents. It is enabled by default; set `"plugins": { "okf": false }` to opt out. See [OKF Bundle Plugin](okf.md) for details.
::: /callout

## Optional Plugins

Optional plugins require explicit installation before activation:

| Plugin | Install Command | Purpose |
| :--- | :--- | :--- |
| [PWA Support](pwa.md) | `npx @docmd/core add pwa` | Progressive Web App manifest and offline service worker caching |
| [Threads](threads.md) | `npx @docmd/core add threads` | Markdown-native inline comment discussions |
| [Math (KaTeX)](math.md) | `npx @docmd/core add math` | Server-side LaTeX and KaTeX mathematical equation rendering |

## Auto-Installation Mechanics

If an official plugin is declared in `docmd.config.json` without being installed in `node_modules`, `docmd` automatically downloads and installs it during the next build execution:

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

The auto-installer:
* Restricts targets strictly to official `@docmd/plugin-*` packages.
* Matches dependency version tags to the installed `@docmd/core` version.
* Auto-detects project package managers (npm, pnpm, yarn, bun).
* Emits installation progress directly in the terminal interface.

::: callout tip title:"Resilient Module Resolution" icon:shield-check
The auto-installer uses dynamic ES module imports with fallback resolution paths, allowing seamless loading of ESM packages declaring explicit `exports` maps.
::: /callout

## Third-Party & Custom Plugins

For security, the automated installer enforces an official registry allowlist. Install third-party plugins directly using your package manager:

```bash
npm install my-custom-plugin
# or pnpm add / yarn add / bun add
```

Add the custom plugin to `docmd.config.json` using its full package identifier:

```json "docmd.config.json"
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

## Page-Level & `noStyle` Plugin Scopes

Plugins inject styles and behaviour globally by default. You can disable plugins on unstyled landing pages (`noStyle: true`) or per-page via frontmatter.

### Global Configuration Scope

Configure plugins to skip `noStyle` landing pages in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### Page-Level Frontmatter Scope

Selectively enable or disable specific plugins per document using [Page Frontmatter](../content/frontmatter.md):

```yaml
---
noStyle: true
plugins:
  math: true
  threads: false
---
```

## Plugin Architecture Lifecycle

Plugins hook into core build and development cycles:

| Lifecycle Hook | Technical Function |
| :--- | :--- |
| `markdownSetup(md, opts)` | Register custom Markdown-it parser rules |
| `generateMetaTags(config, page, root)` | Inject `<meta>` and `<link>` elements into `<head>` |
| `generateScripts(config, opts)` | Inject client scripts into `<head>` or `</body>` |
| `getAssets(opts)` | Register static assets or external CDN bundles |
| `onPostBuild(ctx)` | Execute post-processing tasks after HTML output finishes |
| `translations(localeId)` | Register localised UI string maps |
| `actions` | Register server-side RPC handlers for dev server WebSocket calls |
| `events` | Register client event listeners |

## Safety & Security Guarantees

* **Descriptor Validation**: Malformed plugin descriptors are rejected at startup.
* **Fault Isolation**: Every hook invocation is guarded by try/catch wrappers; a plugin error cannot crash the documentation build.
* **Capability Enforcement**: Plugins are granted execution rights solely for hooks explicitly declared in their manifest capabilities.

See [Building Plugins](../development/building-plugins.md) for full plugin development guidelines.