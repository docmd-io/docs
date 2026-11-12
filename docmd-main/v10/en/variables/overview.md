---
title: Variables & Dynamic Runtime Overview
description: Learn how the docmd Variables & Personalisation Engine enables dynamic, maintainable, and interactive documentation across build-time and client runtime.
---

# Variables & Dynamic Runtime

docmd features a high-performance **Variables and Personalisation Engine** that unifies static build-time interpolation with client-side reactive personalisation.

Instead of hardcoding company names, API URLs, release years, or versions across dozens of markdown files, you can reference dynamic variables using clean template expressions.

```markdown
Welcome to the documentation for **\{{ site.title }}** v\{{ docmd.version }}!
Current copyright: © \{{ docmd.buildYear }}.
```

::: callout info "Live Evaluated Variables in This Build" icon:sparkles
The following values are resolved live by the docmd compiler during this documentation build:
- **Site Title:** {{ site.title }}
- **Compiler Version:** v{{ docmd.version }}
- **Build Year:** © {{ docmd.buildYear }}
- **Current Git Branch:** {{ docmd.gitBranch || "main" }}
- **Current Git Commit:** {{ docmd.gitCommit || "HEAD" }}
- **Current Page Slug:** `{{ page.slug }}`
:::

## Template Syntax

The Variables Engine uses curly-brace syntax:

```markdown
\{{ variableName }}
```

### Fallback Defaults

If a variable might not always be defined (such as in local preview environments or optional configurations), provide a fallback default using the `||` operator:

```markdown
Connect to our server at `\{{ server.endpoint || "https://api.example.com" }}`.
Welcome back, \{{ user.name || 'Guest' }}!
Built for version \{{ targetVersion || 2.0 }}.
```

The fallback can be:
* Single-quoted string: `'example'`
* Double-quoted string: `"example"`
* Number: `42` or `2.0`
* Identifier: `default`

### Whitespace Tolerant

Expressions tolerate spaces around variable names and fallback operators:

```markdown
\{{   myVar   }}
\{{ env.PORT || "8080" }}
```

## Markdown Syntax vs. JavaScript API Mapping

Every variable available in your Markdown templates maps directly to the client-side JavaScript SDK (`window.docmd.var.get()`):

| Variable Type | Markdown Template | Client JavaScript API | Namespace Rule |
| :--- | :--- | :--- | :--- |
| **User / Project Variable** | `\{{ apiEndpoint }}` | `window.docmd.var.get("apiEndpoint")` | Defined in `docmd.config.json` or frontmatter. No `docmd.` prefix. |
| **Nested User Variable** | `\{{ cloud.apiEndpoint }}` | `window.docmd.var.get("cloud.apiEndpoint")` | Nested JSON object in config. Traversed with dot notation. |
| **Engine Compiler Version** | `\{{ docmd.version }}` | `window.docmd.var.get("docmd.version")` | Reserved `docmd.` namespace for compiler metadata. |
| **Engine Build Year** | `\{{ docmd.buildYear }}` | `window.docmd.var.get("docmd.buildYear")` | Reserved `docmd.` namespace. |
| **Git Metadata** | `\{{ docmd.gitCommit }}` | `window.docmd.var.get("docmd.gitCommit")` | Reserved `docmd.` or `git.` namespace. |
| **Site Metadata** | `\{{ site.title }}` | `window.docmd.var.get("site.title")` | Reserved `site.` namespace from project configuration. |
| **Dynamic User Session** | `\{{ user.apiKey }}` | `window.docmd.var.get("user.apiKey")` | Prefixed with `user.` or declared under `dynamic`. Reactive in DOM. |

::: callout info "Namespace Standard: Why Not `{{ docmd.apiEndpoint }}`?" icon:shield-alert
* The `docmd.` namespace (`docmd.version`, `docmd.buildYear`, `docmd.gitCommit`, etc.) is **strictly reserved for docmd's internal compiler metadata**.
* User-defined variables (from `docmd.config.json` or page frontmatter) should **never** be prefixed with `docmd.`. If you define `"apiEndpoint": "https://api.example.com"`, write `{{ apiEndpoint }}` in Markdown and retrieve it with `window.docmd.var.get("apiEndpoint")` in JavaScript.
:::

## Variable Lifecycles: Build-time vs. Runtime

docmd cleanly separates the variable lifecycle into two distinct stages:

::: mermaid title:"Variable Resolution Pipeline" icon:workflow align:center zoom:true
graph TD
    subgraph Source["1. Inputs & Definitions"]
        B1["docmd.config.json<br/><code>variables</code> block"]
        B2["Git & Environment<br/><code>env.*</code>, <code>DOCMD_VAR_*</code>, Git root"]
        B3["Built-in Metadata<br/><code>version</code>, <code>buildYear</code>, <code>page.slug</code>"]
    end

    subgraph Compiler["2. Build-Time Static Resolution"]
        Source --> VReg["VariableRegistry (@docmd/parser)"]
        VReg --> Interp["Markdown & Config Interpolator"]
        Interp --> HTML["Static HTML (Zero-JS overhead)"]
        Interp --> Markers["Dynamic Markers &lt;span data-docmd-var&gt;"]
    end

    subgraph Runtime["3. Client-Side Reactive Runtime"]
        Markers --> DRuntime["docmd-runtime.js (window.docmd)"]
        DRuntime --> DOM["Live Rehydration & Code Snippets"]
        DRuntime --> Events["Cross-Frame postMessage & Events"]
    end
::: /mermaid

::: grids
    ::: grid
        ::: card "Build-Time Static Variables" icon:cpu
        Static variables are compiled directly into HTML during `docmd build`. They incur zero client-side JavaScript execution, zero network requests, and zero Cumulative Layout Shift (CLS).
        :::
    :::
    ::: grid
        ::: card "Client-Side Reactive Variables" icon:sparkles
        Dynamic session variables (such as API keys and usernames) are hydrated live by `docmd-runtime.js`. When updated via JavaScript or user input, all matching tokens on the page react instantly.
        :::
    :::
::: /grids

### Static Build-Time Variables

Variables resolved during `docmd build` are compiled directly into static HTML. There is zero client-side JavaScript overhead or layout shift for these values.

### Reactive Dynamic Variables

Variables marked as dynamic or containing user session attributes (such as `user.name` or `user.apiKey`) are wrapped in non-intrusive DOM markers:

```html
<span data-docmd-var="user.name" class="docmd-var">Guest</span>
```

At runtime, `docmd-runtime.js` automatically populates and synchronises these values across the page, code snippets, and SPA navigation transitions without reloading.

## Architecture: Engine vs. UI Separation

To guarantee maximum speed and stability, docmd maintains a strict boundary between UI presentation and the headless dynamic runtime:

* **`docmd-runtime.js`**: Headless dynamic engine loaded across all templates (`default`, `summer`, etc.). It manages variable registries, subscriptions, client storage, and cross-window events. It never interferes with DOM animations or styling.
* **`docmd-main.js`**: The UI presentation script responsible for theme switches, mobile menus, SPA navigation, and DOM interactions. Upon each SPA page transition, it triggers `window.docmd.sync()` to ensure dynamic variables remain fully hydrated.

::: callout tip "Universal Compatibility" icon:check-circle
Because `docmd-runtime.js` is bundled in every template, any custom theme or third-party layout plugin automatically inherits variable support and dynamic personalisation out of the box.
:::

## Next Steps

Explore the complete guide across all variable topics:

::: grids
    ::: grid
        ::: card "Built-in Variables" icon:terminal
        Built-in system variables for build years, dates, versions, and Git metadata.
        [Read Guide](./built-in-variables.md)
        :::
    :::
    ::: grid
        ::: card "Config & Custom Variables" icon:settings
        Declaring variables in `docmd.config.json` and using variables inside footer, banners, and docs.
        [Read Guide](./config-variables.md)
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "Environment Variables" icon:server
        CI/CD environment variables and `DOCMD_VAR_*` zero-prefix promotion.
        [Read Guide](./environment-variables.md)
        :::
    :::
    ::: grid
        ::: card "Client Runtime & Personalisation" icon:sparkles
        Client-side runtime SDK (`window.docmd`), reactive sessions, and interactive code blocks.
        [Read Guide](./runtime-personalisation.md)
        :::
    :::
::: /grids