---
title: "Iconify Icons Plugin"
description: "On-demand vector icon integration supporting over 200,000+ open-source icons with zero client runtime overhead."
---

The `@docmd/plugin-iconify` plugin extends `docmd`'s icon system beyond built-in Lucide icons, giving you on-demand access to over 200,000+ open-source vector icons across 100+ popular icon sets including Material Design Icons, IBM Carbon, Tabler, FontAwesome, Solar, and Simple Icons.

Icons are fetched and inlined directly as clean SVGs at build time, cached locally on disk, and require zero client-side JavaScript runtime overhead.

::: callout success title:"Zero Client Overhead" icon:zap
Because SVGs are resolved and inlined during the static build phase, your site incurs zero client bundle bloat or runtime font loading delays regardless of how many different icon sets you reference.
:::

## Installation & Setup

Install the plugin via the CLI:

```bash
npx @docmd/core add iconify
```

Enable the plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

::: callout tip title:"Auto-Installation" icon:sparkles
If `@docmd/plugin-iconify` is declared in `docmd.config.json` before being installed locally, `docmd` will automatically download and install it during your next build run.
:::

## Plugin Configuration

Configure the plugin options in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Globally enable or disable on-demand Iconify icon resolution. |

## Key Capabilities

* **200,000+ Icons**: Access virtually any open-source icon set without installing separate icon libraries or font stylesheets.
* **Build-Time Inlining**: SVGs are resolved and embedded directly into HTML during compilation, preserving instant page loads.
* **Local Disk Caching**: Downloaded icons are cached under `.docmd/cache/icons/`, ensuring lightning-fast subsequent builds and offline development workflows.
* **Offline Fallback**: If an icon cannot be retrieved over the network, a clean SVG placeholder preserves layout stability without breaking page rendering.
* **Seamless Container Support**: Supported across all `docmd` containers including callouts, buttons, cards, tabs, and tags.
* **Doctor Diagnostics**: Built-in health check runs with `docmd doctor` to audit caching status and resolver integrity.

## Usage & Icon Syntax

Use the `icon:` property on any container component. The resolver supports both colon-separated and hyphenated collection syntax:

| Syntax Format | Example | Description |
| :--- | :--- | :--- |
| `iconify:<collection>:<icon>` | `icon:iconify:mdi:home` | Standard colon-separated collection and icon identifier |
| `iconify:<collection>-<icon>` | `icon:iconify:carbon-logo-github` | Colon-prefixed with hyphenated icon identifier |
| `iconify-<collection>:<icon>` | `icon:iconify-solar:shield-check-bold` | Hyphen-prefixed with colon separator |
| `iconify-<collection>-<icon>` | `icon:iconify-tabler-brand-docker` | Fully hyphenated shorthand |

::: callout info title:"Lucide Fallback" icon:info
Standard icon names without the `iconify:` or `iconify-` prefix (e.g. `icon:rocket` or `icon:shield-check`) continue to resolve to built-in Lucide icons via `docmd` core.
:::

### Examples Across Containers

#### Callouts

```markdown
::: callout icon:iconify:mdi:home title:"Welcome"
Welcome to our documentation portal.
:::

::: callout success title:"Security Verified" icon:iconify-solar:shield-check-bold
End-to-end encryption and audit logging are active.
:::
```

#### Buttons

```markdown
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "Join Discord Community" external:https://discord.gg/docmd icon:iconify:simple-icons:discord
```

#### Cards

```markdown
::: card title:"Docker Deployment" icon:iconify:tabler:brand-docker
Deploy containerised documentation sites using lightweight Alpine Linux images.
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
Host static assets and serverless runtimes on Cloud Storage and Cloud Run.
:::
```

#### Tabs

```markdown
== tab "Docker Compose" icon:iconify:tabler:brand-docker
```yaml
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
    ports:
      - "3000:3000"
```

== tab "Kubernetes" icon:iconify:simple-icons:kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docmd-site
```
```

#### Tags

```markdown
::: tag "Production Ready" icon:iconify:solar:verified-check-bold color:green
::: tag "npm Package" icon:iconify:simple-icons:npm color:red
```

## Popular Icon Collections

Below are common icon collections available through Iconify:

| Collection ID | Collection Name | Example Icon Syntax | Use Case |
| :--- | :--- | :--- | :--- |
| `mdi` | Material Design Icons | `icon:iconify:mdi:home` | General UI, utilities, and material design |
| `carbon` | IBM Carbon Design | `icon:iconify:carbon:logo-github` | Developer tools, cloud architecture, and systems |
| `tabler` | Tabler Icons | `icon:iconify:tabler:brand-docker` | Clean, modern outlined strokes |
| `solar` | Solar Icons | `icon:iconify-solar:shield-check-bold` | Modern bold and duotone indicators |
| `simple-icons` | Simple Icons | `icon:iconify:simple-icons:googlecloud` | Logos for brands, languages, databases, and tech platforms |
| `fa6-solid` | FontAwesome 6 Solid | `icon:iconify:fa6-solid:server` | Classic solid icons and infrastructure symbols |
| `fa6-brands` | FontAwesome 6 Brands | `icon:iconify:fa6-brands:aws` | Popular company, vendor, and brand marks |
| `ph` | Phosphor Icons | `icon:iconify:ph:lightning-bold` | Flexible geometric icon library |

::: button "Explore 200,000+ Iconify Icons" external:https://icon-sets.iconify.design/ icon:external-link

## Custom CSS Styling

Icons rendered via `@docmd/plugin-iconify` output inline SVGs with the `.iconify-icon` CSS class and a collection-specific `.icon-<collection>-<name>` class.

Style icons globally or target specific collections in your `customCss`:

```css
/* Customise all Iconify icons */
.iconify-icon {
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Target specific icon collections */
.iconify-icon[class*="icon-mdi-"] {
  fill: currentColor;
}

/* Target individual icons */
.icon-simple-icons-googlecloud {
  color: #4285f4;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}
```

## Pre-flight Diagnostics

Verify that `@docmd/plugin-iconify` is operational and inspect your local icon cache count using `docmd doctor`:

```bash
npx @docmd/core doctor
```

```text
  Plugins
  ────────────────────────────────────────────────────────────
  ✓ Iconify Integration: Active with support for 200,000+ open-source icons (cached: 14)
```
