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
| **Colour** | `colour:VALUE` | Applies a background colour (supports CSS names or Hex codes). Automatically calculates a contrasting text colour. |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon inside the badge. |
| **Link** | `link:URL` | Makes the tag a clickable hyperlink. External URLs open in a new tab. |

## Examples

### Version Badge

Use a coloured tag inline to mark when a feature was introduced.

```markdown
This feature was added in ::: tag "v0.8.2" colour:blue and works perfectly.
```

This feature was added in ::: tag "v0.8.2" colour:blue and works perfectly.

### Status Labels

Use tags for status indicators across a page. Colours are fully customisable.

```markdown
::: tag "Deprecated" colour:#ef4444
::: tag "Beta" colour:#eab308
::: tag "Stable" colour:#22c55e
::: tag "Verified" icon:check-circle colour:#10b981
```

::: tag "Deprecated" colour:#ef4444
::: tag "Beta" colour:#eab308
::: tag "Stable" colour:#22c55e
::: tag "Verified" icon:check-circle colour:#10b981

### Linked Tag

Add `link:` to make a tag act as a hyperlink, useful for cross-referencing release notes or external resources.

```markdown
Check out the latest ::: tag "Release Notes" icon:external-link link:../../release-notes/0-8-2.md
```

Check out the latest ::: tag "Release Notes" icon:external-link link:../../release-notes/0-8-2.md