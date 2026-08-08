---
title: "Tags"
description: "Use tag containers to label versions, statuses, or highlight short text snippets inline in docmd."
---

The `tag` container is a self-closing component that inserts compact, pill-shaped badges inline. Tags retain their compact proportions across all contexts—they do not inherit surrounding heading font sizes or text weights.

## Syntax Reference

```markdown
::: tag "Label text" [property:value...]
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Label** | `"String"` | Text string displayed inside the pill badge. |
| **Colour** | `color:VALUE` | Applies a background colour (supports standard CSS names or Hex codes). Automatically calculates contrasting text color. |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon inside the badge. |
| **URL** | `url:URL` | Converts the tag into a clickable link. Prefix with `external:` to open in a new tab. Uses unquoted URL strings matching [buttons](buttons.md). |

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
::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981
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
::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd