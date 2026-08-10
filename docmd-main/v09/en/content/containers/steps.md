---
title: "Steps"
description: "Convert numbered steps and ordered lists into high-impact visual timelines and tutorials in docmd."
---

The `steps` container transforms sequential instructions into numbered vertical timelines with hover permalinks. It is designed for technical tutorials and sequential how-to guides.

## Container Syntax

```markdown
::: steps # Outer sequential timeline wrapper opener
::: step [title:"Step Heading"] # Individual step item opener
Step 1 content (markdown text, code blocks, callouts, images)...
::: /step # Explicit step item closer

::: step [title:"Step 2 Heading"] # Second step item opener
Step 2 content...
::: /step
::: /steps # Explicit timeline closer
```

## Features & Supported Attributes

| Parameter / Element | Type | Description |
| :--- | :--- | :--- |
| **Step Title** | `"String"` \| `title:"..."` | Heading text displayed at the top of each timeline node (1st positional arg or `title:"..."`). |
| **Timeline Nodes** | Automatic | Each `::: step` block auto-increments the step index (1, 2, 3...). |
| **Sub-Containers** | `::: step` ... `::: /step` | Explicit step wrappers. Legacy ordered list (`1.`, `2.`) syntax is also fully supported. |
| **Closing Tags** | `::: /steps`, `::: /step`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Basic Workflow Sequence

A straightforward sequence for developer onboarding tasks using explicit `::: step` containers:

```markdown
::: steps # Onboarding workflow
::: step "Initialise Project" # Step 1
Run `npx @docmd/core init` to scaffold your directory structure.
::: /step

::: step "Author Content" # Step 2
Write documentation using standard Markdown files.
::: /step

::: step "Build & Deploy" # Step 3
Run `npx @docmd/core build` to compile production static output.
::: /step
::: /steps
```

::: steps # Onboarding workflow
::: step "Initialise Project" # Step 1
Run `npx @docmd/core init` to scaffold your directory structure.
::: /step

::: step "Author Content" # Step 2
Write documentation using standard Markdown files.
::: /step

::: step "Build & Deploy" # Step 3
Run `npx @docmd/core build` to compile production static output.
::: /step
::: /steps

### Steps with Rich Embedded Content

Steps support embedded code blocks, callout alerts, and nested containers:

````markdown
::: steps # Complex deployment guide
::: step "Configure Environment"
Define project options in `docmd.config.json`.

::: callout info title:"IDE Hint"
Use `defineConfig` to enable IDE autocompletion for configuration schema keys.
::: /callout
::: /step

::: step "Generate Production Build"
Execute the build command to generate an optimised static site.

```bash
npx @docmd/core build
```
::: /step

::: step "Deploy to Infrastructure"
Publish the compiled `site/` directory to S3, Cloudflare Pages, or Vercel.
::: /step
::: /steps
````

::: steps # Complex deployment guide
::: step "Configure Environment"
Define project options in `docmd.config.json`.

::: callout info "IDE Hint"
Use `defineConfig` to enable IDE autocompletion for configuration schema keys.
::: /callout
::: /step

::: step "Generate Production Build"
Execute the build command to generate an optimised static site.

```bash
npx @docmd/core build
```
::: /step

::: step "Deploy to Infrastructure"
Publish the compiled `site/` directory to S3, Cloudflare Pages, or Vercel.
::: /step
::: /steps

::: callout tip "Legacy List Syntax" icon:archive
Existing documentation utilizing `1.` ordered lists continues to parse seamlessly:

```markdown
::: steps
1.  **Configure Environment**
    Define options in `docmd.config.json`.
::: /steps
```
:::