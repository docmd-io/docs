---
title: "Tags"
description: "Use tag containers to label versions, statuses, or highlight short text snippets inline in docmd."
---

The `tag` container is a self-closing component that inserts compact, pill-shaped badges inline. Tags retain their compact proportions across all contexts—they do not inherit surrounding heading font sizes or text weights.

## Container Syntax

```markdown
::: tag [title:"Badge Label"] [color:css_color|hex_code] [icon:icon_name] [url:[external:]address]
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Badge Label** | `"String"` \| `title:"..."` | Text string displayed inside the pill badge (1st positional arg or `title:"..."`). |
| **Background Colour** | `color:VALUE` | Applies background color (CSS names or Hex). Text contrast is auto-calculated. |
| **Iconography** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon inside the badge. |
| **Hyperlink URL** | `url:URL` | Converts badge into a link. Prefix with `external:` to open in a new browser tab. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Inline Version Badges

Use a coloured tag inline to indicate feature introductions or version constraints:

```markdown
This capability was introduced in ::: tag "v0.9.0" color:blue and is fully supported.
```

This capability was introduced in ::: tag "v0.9.0" color:blue and is fully supported.

### Status Indicators

Insert status labels across your documentation pages with custom color accents:

```markdown
::: tag title:"Deprecated" color:#ef4444
::: tag title:"Beta" color:#eab308
::: tag title:"Stable" color:#22c55e
::: tag title:"Verified" icon:check-circle color:#10b981
```

::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981

### Linked Tag Badges

Add `url:` to make a tag act as a hyperlink, useful for cross-referencing release notes or external resources.

```markdown
Check out the latest ::: tag "Release Notes" icon:external-link url:./#release-notes
```

Check out the latest ::: tag "Release Notes" icon:external-link url:./#release-notes

### External Links

Prefix the URL with `external:` to force the link to open in a new browser tab:

```markdown
::: tag title:"GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd