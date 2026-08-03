---
title: "Tags"
description: "Use the tag container to label versions, statuses, or highlight short text snippets inline."
---

The `tag` container is a self-closing component that inserts small, pill-shaped badges inline. Tags retain their compact proportions everywhere - they do not inherit heading sizes or surrounding text styles.

## Syntax Reference

```markdown
::: tag "Label text" [property:value...]
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Label** | `"String"` | The text displayed inside the pill-shaped badge. |
| **Colour** | `color:VALUE` | Applies a background colour (supports CSS names or Hex codes). Automatically calculates a contrasting text colour. |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon inside the badge. |
| **URL** | `url:URL` | Makes the tag a clickable hyperlink. Prefix with `external:` to force a new tab. Matches the unquoted-URL convention used by [buttons](button). |

## Examples

### Version Badge

Use a coloured tag inline to mark when a feature was introduced.

```markdown
This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.
```

This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.

### Status Labels

Use tags for status indicators across a page. Colours are fully customisable.

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

### Linked Tag

Add `url:` to make a tag act as a hyperlink, useful for cross-referencing release notes or external resources. The value is unquoted to match the convention used by [buttons](buttons.md).

```markdown
Check out the latest ::: tag "Release Notes" icon:external-link url:/release-notes/0-8-2.md
```

Check out the latest ::: tag "Release Notes" icon:external-link url:/release-notes/0-8-2.md

### External Link

Prefix the URL with `external:` to force the link to open in a new tab, even when the target lives on your own domain.

```markdown
::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd