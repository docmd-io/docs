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
::: card title="Live & Code View Toggle" icon:columns
Interactive header tabs allow instant switching between running component previews and underlying source code when `tabs` is enabled.
:::
::: card title="Graceful Warning & Error Handling" icon:shield-alert
Missing scripts render non-breaking warning banners with clean fallback code; runtime exceptions display structured execution notices.
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

## Technical Architecture & Internals

The Playground plugin is engineered around a zero-dependency architecture that keeps documentation pages fast, secure, and light.

```mermaid
flowchart TD
    MD[Markdown Source] --> AST[Markdown-It AST Parser]
    AST --> Check{Contains Playground?}
    Check -->|No| Clean[0 KB Extra Assets Emitted]
    Check -->|Yes| Assets[Inject docmd-playground.css & js]
    AST --> SourceCheck{Has src attribute?}
    SourceCheck -->|Yes| ReadFile[Resolve & Inline Local Script]
    SourceCheck -->|No| ParseFence[Parse Inner Code Fence]
    ReadFile -->|Missing File| WarnBlock[Emit Non-Breaking Warning Box]
    ReadFile -->|Success| Container[Generate Playground Container HTML]
    ParseFence --> Container
    Container --> Browser[Client Browser Runtime]
    Browser --> Exec[Sandbox Execution & Console Proxy]
    Browser --> RT[docmd-runtime Reactivity docmd.var]
```

### 1. Build-Time AST Interception

During the static site build:
- **Container Hook**: Registers a custom rule on `markdown-it-container` targeting the `playground` keyword.
- **Code Fence Hook**: Inspects code block language identifiers for `playground` or `live` flags (e.g. ```` ```js playground ````).
- **Asset Flagging**: When any playground container or fence is detected on a page, `docmd` flags the document metadata. Only pages with this flag include the `<link>` and `<script>` tags for the playground runtime. Static pages remain 100% clean with **0 KB asset overhead**.

### 2. Script Resolution Engine

When a container specifies an external script path using `src="./..."` or `file="./..."`:
- `docmd` resolves the file path relative to the active Markdown document's directory.
- If not found relative to the document, it falls back to resolving against the project root.
- The script content is read and safely escaped into the code editor DOM element at build time.
- **Graceful Warning Handling**: If the specified script cannot be found (e.g. relocated or deleted during refactoring), the builder does **not** abort. Instead, it generates a structured warning callout (`.docmd-playground-missing-alert`) detailing the missing path and renders empty fallback code, ensuring continuous deployment pipelines never fail due to missing doc snippets.

### 3. Client Runtime & Execution Sandbox

When a user clicks **Run** or executes via keyboard shortcut (<kbd class="docmd-kbd">Cmd</kbd>+<kbd class="docmd-kbd">Enter</kbd> / <kbd class="docmd-kbd">Ctrl</kbd>+<kbd class="docmd-kbd">Enter</kbd>):
- **Console Hijacking**: The runtime instantiates a sandboxed proxy around `console.log`, `console.info`, `console.warn`, and `console.error`. Messages are intercepted, formatted with syntax styling, and appended to the playground's output pane in real time while still mirroring to DevTools if open.
- **Isolated Function Context**: JavaScript is evaluated inside an asynchronous function wrapper with access to `window.docmd` and global browser APIs.
- **HTML/CSS Component Previews**: For HTML snippets, content is rendered into an isolated sandbox panel, enabling full interactive testing of buttons, forms, and custom widgets.


## Script-Based Examples & Workflows

### Script Example 1: Active Codebase Sourcing with `src`

Link directly to real scripts in your repository to eliminate out-of-sync copy-pasting:

```markdown
::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::
```

When built, `docmd` automatically reads `snippets/counter.js` and embeds it directly into the sandbox:

::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::

### Script Example 2: Interactive `docmd-runtime` Variable Script

Run JavaScript scripts that dynamically read and update client-side documentation variables:

```js playground title="Dynamic Variable Inspector" icon:braces live
// Query build-time and client-side runtime variables
const version = docmd.var.get("docmd.version");
const branch = docmd.var.get("docmd.gitBranch") || "main";

console.log("Active docmd version:", version);
console.log("Current git branch:", branch);

// Update reactive client variables
docmd.var.set("user.plan", "Enterprise");
console.info("Updated reactive variable 'user.plan' to:", docmd.var.get("user.plan"));

return `docmd v${version} running on branch ${branch}`;
```

### Script Example 3: Tabbed Live Component with Source Switching

Provide both an interactive UI preview and direct inspection of the underlying script using the `tabs` mode:

::: playground tabs title="Tabbed Component Script" icon:layout live
```html
<div style="padding: 16px; border-radius: 8px; background: #0f172a; border: 1px solid #1e293b; color: #f8fafc;">
  <p style="margin: 0 0 8px 0; font-size: 13px; color: #38bdf8; font-weight: 600;">Live Script Component</p>
  <button style="padding: 6px 12px; background: #0284c7; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;" onclick="console.log('Button clicked at: ' + new Date().toLocaleTimeString())">
    Log Timestamp to Console
  </button>
</div>
```
:::


## Container & Plugin Cross-Reference

* **[Playground Container Documentation](../content/containers/playground.md)**: Explore complete container syntax options, header tabs, layout configurations (`split` vs `stacked`), and Markdown container examples.
* **[Variables & Personalisation Engine](../variables/overview.md)**: Learn how `docmd-runtime` integrates with playground scripts for client-side reactivity.
* **[Containers Overview](../content/containers/index.md)**: Overview of all native containers supported in `docmd`.