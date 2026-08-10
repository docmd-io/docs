---
title: "Buttons"
description: "Inject prominent call-to-action buttons for internal SPA navigation and external links in docmd."
---

Buttons are interactive components designed for navigation and explicit call-to-actions. They support internal SPA routing, external links, custom color overrides, and Lucide icons.

## Container Syntax

```markdown
# Standalone Line Button
::: button ["Label Text"] ["target_url" | url:"target_url"] [icon:icon_name] [color:hex_code|css_color] [::: /button]

# Explicit Named Key-Value
::: button title:"Label Text" url:"target_url" icon:icon_name color:hex_code [::: /button]

# Inline Sentence Button
Click ::: button title:"Label Text" url:"target_url" icon:icon_name ::: /button to continue.
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Title / Label** | `"String"` \| `title:"..."` | Text label displayed inside the button (positional 1st parameter or `title:"..."`). |
| **Target URL** | `"URL"` \| `url:URL` | Navigation target (positional 2nd parameter or `url:"..."`). Supports relative SPA paths, mailto, tel, or external links. |
| **External Link** | `external:URL` | Opens the target link in a new browser tab (`target="_blank"` with `rel="noopener noreferrer"`). |
| **Background Color** | `color:VALUE` | Custom background and border color (supports CSS color names or Hex codes). |
| **Iconography** | `icon:NAME` | Injects a [Lucide](external:https://lucide.dev/icons) icon before the text label. |
| **Self-Closing & Inline** | `::: /button` \| `:::` | Self-closing by default, or optionally closed with `::: /button` when used inline inside text. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::

## Usage Examples

### Internal SPA Navigation

Use relative Markdown paths to ensure seamless transitions within the single-page router:

```markdown
::: button title:"Installation Guide" url:"../../getting-started/installation.md"
```

::: button "Installation Guide" ../../getting-started/installation.md

### External Resource Links

Prepend `external:` to the URL to force links to open in a new browser tab:

```markdown
::: button title:"View GitHub Monorepo" url:"external:https://github.com/docmd-io/docmd"
```

::: button "View GitHub Monorepo" external:https://github.com/docmd-io/docmd

### Custom Branding & Iconography

Match buttons to your brand identity using colour overrides and Lucide icon names:

```markdown
::: button title:"Success Action" url:"./#success" color:#228B22 icon:check
::: button title:"Danger Action" url:"./#delete" color:crimson icon:alert-circle
::: button title:"View Source" url:"external:https://github.com/docmd-io/docmd" icon:github
```

::: button "Success Action" ./#success color:#228B22 icon:check
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

### Inline Sentence Buttons

Buttons can be used inline within text sentences with explicit closing tags (`::: /button`):

```markdown
Click ::: button title:"Download v0.9.1" url:"https://docmd.io" icon:download ::: /button to get started!
```

Click ::: button "Download v0.9.1" https://docmd.io icon:download ::: /button to get started!