---
title: "Using Plugins"
description: "Install, configure, and manage docmd plugins - from required defaults to optional add-ons."
---

docmd features a modular plugin architecture. Required plugins ship with the core and need no installation. Optional plugins can be installed with a single CLI command.

## Installing Plugins

Use the docmd CLI to install and remove plugins:

```bash
# Install a plugin
npx @docmd/core add <plugin-name>

# Remove a plugin
npx @docmd/core remove <plugin-name>
```

The installer detects your package manager (npm, pnpm, yarn, or bun). It resolves short names to full package names and injects the config into your `docmd.config.json`.

Use `--verbose` (or `-V`) for full installer output:

```bash
npx @docmd/core add <plugin-name> -V
```

## Required Plugins

These plugins are bundled with `@docmd/core`. No installation is needed. Enable them in your `docmd.config.json`:

```json
  "plugins": {
    "search": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
```

::: callout tip "Git Plugin"
The Git plugin detects if your project is a Git repository. If not, it disables itself automatically. No configuration is required for last-updated timestamps.
:::

## Optional Plugins

Optional plugins require installation before enabling.

| Plugin | Install Command | Description |
| :--- | :--- | :--- |
| [PWA](pwa.md) | `npx @docmd/core add pwa` | Progressive Web App support with offline caching |
| [Threads](threads.md) | `npx @docmd/core add threads` | Inline discussion comments stored in Markdown |
| [Math](math.md) | `npx @docmd/core add math` | Native KaTeX and LaTeX mathematics rendering |

## Auto-Installation

When you add an official plugin to your `docmd.config.json` without installing it, docmd automatically downloads and installs it on the next build. This works for all plugins in the official registry.

```json
{
  "plugins": {
    "pwa": {}
  }
}
```

The auto-installer:
- Targets official `@docmd/plugin-*` packages only.
- Pins the version to match your `@docmd/core` installation.
- Detects and uses your project's package manager.
- Reports progress in the terminal as it runs.

## Third-Party & Custom Plugins

For security, the installer enforces an official registry allowlist. Third-party plugins must be installed natively using your package manager:

```bash
npm install my-custom-plugin
# or pnpm add, yarn add, bun add
```

After installation, add the plugin to your `docmd.config.json` using its exact package name:

```json
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

If the plugin meets docmd's requirements, it activates automatically during the build. Otherwise, the engine reports an error.

## Plugin Scopes and `noStyle` Overrides

Plugins inject CSS and behaviour globally. However, you can configure them to bypass specific pages or entirely disable their execution on unstyled landing pages (`noStyle: true`).

### Global Config Extent

Instruct any plugin to automatically skip `noStyle` pages via your `docmd.config.json`:

```json
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### Page Local Scope (Frontmatter)

You can definitively enable or disable any plugin per-document via markdown frontmatter.

```markdown
---
noStyle: true
plugins:
  math: true
  threads: false
---

# Only Math renders here, Threads are completely blocked
```

## Plugin Lifecycle

Plugins hook into different stages of the build and development process:

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extend the Markdown parser with custom rules. |
| `generateMetaTags(config, page, root)` | Inject `<meta>` and `<link>` tags into the `<head>`. |
| `generateScripts(config, opts)` | Inject scripts into `<head>` or `</body>`. |
| `getAssets(opts)` | Define external files or CDN scripts to inject. |
| `onPostBuild(ctx)` | Run logic after all HTML files finish generating. |
| `translations(localeId)` | Return translated UI strings for a locale. |
| `actions` | Server-side handlers callable via WebSocket RPC. |
| `events` | Fire-and-forget handlers for browser-pushed events. |

## Plugin Safety

The plugin system guarantees build safety:

- **Validation**: Invalid plugin descriptors are rejected at load time.
- **Isolation**: Every hook invocation is wrapped in a try/catch. A broken plugin cannot crash the build.
- **Capability enforcement**: Plugins can only register for hooks they have declared.

See [Building Plugins](building-plugins.md) for the full API reference.

::: callout tip "Traceable Architecture" icon:sparkles
Every meta-tag and script the engine emits is generated from explicit config and plugin output. There are no hidden side effects.
:::