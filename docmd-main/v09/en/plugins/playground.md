---
title: "Playground Plugin"
description: "Interactive live code runner and component playground with real-time console capture, live HTML preview sandboxes, and zero-config Markdown containers."
---

The `@docmd/plugin-playground` plugin brings interactive, runnable code blocks and live component previews directly to your `docmd` site. It enables documentation authors to embed self-contained JavaScript executions, live HTML/CSS components, and active script files from their repository without the bulky dependencies (like Monaco or React) found in heavier documentation frameworks.

::: callout success "Core Plugin Bundled with @docmd/core" icon:zap
Starting in **v0.9.9**, `@docmd/plugin-playground` ships directly with `@docmd/core` and is enabled by default. Thanks to `docmd`'s conditional asset loading, pages without playground blocks load **0 KB of extra assets**, ensuring zero performance impact on static content.
:::

## Key Features

::: cards
::: card title="Zero-Config Activation" icon:play
Write code blocks with ` ```js playground ` or container blocks with `::: playground` to immediately instantiate an interactive sandbox.
:::
::: card title="Active File Embedding" icon:file-code
Point directly to source scripts in your codebase using `::: playground src="./counter.js" /:::` to keep documentation automatically in sync with real project code.
:::
::: card title="Real-Time Console Capture" icon:terminal
Intercepts and formats `console.log()`, `console.info()`, `console.warn()`, and `console.error()` outputs in real time, alongside evaluated return values.
:::
::: card title="Live HTML & CSS Sandbox" icon:layout
Renders live HTML/CSS widgets inside an isolated preview panel with tab toggling between console logs and rendered UI.
:::
::: card title="docmd-runtime Integration" icon:braces
Direct, native access to the client-side `window.docmd` runtime and reactive page variables via `docmd.var.get()` and `docmd.var.set()`.
:::
::: card title="Ultra-Lightweight & Fast" icon:feather
Pure vanilla JavaScript and CSS (< 10 KB total bundle) with keyboard shortcuts (`Cmd+Enter` / `Ctrl+Enter` to run, `Tab` for indentation).
:::
:::

## Plugin Configuration

Because `@docmd/plugin-playground` is a core plugin, no configuration is required to start using it. However, you can customise global defaults or explicitly disable the plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "playground": {
      "enabled": true,
      "theme": "default",
      "defaultLayout": "split"
    }
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enables or disables playground rendering globally. |
| `theme` | `string` | `"default"` | Colour theme matching your active `docmd` layout (`default`, `dark`, `light`). |
| `defaultLayout` | `string` | `"split"` | Default layout arrangement (`split` for side-by-side or `stacked` for vertical). |

::: callout tip "Disabling the Plugin" icon:slash
To disable client-side code evaluation across your entire documentation site, set `"playground": false` under `"plugins"` in `docmd.config.json`. All playground code blocks will gracefully fallback to standard syntax-highlighted code blocks, and no playground scripts or stylesheets will be emitted.
:::

## Usage Options

`docmd` supports multiple ways to author playgrounds:

1. **[Container Syntax Guide](../content/containers/playground.md)**: Recommended for flexible configuration with `title`, `icon`, `live`, `readonly`, and active script embedding via `src="..."`.
2. **Standard Code Fences**: Use ` ```js playground ` or ` ```html playground ` for quick inline examples.
3. **Self-Closing Containers**: Use `::: playground src="..." /:::` to embed scripts from your codebase.

For full syntax references, custom icon configuration, and live reactive examples, refer to the **[Playground Container Reference](../content/containers/playground.md)**.
