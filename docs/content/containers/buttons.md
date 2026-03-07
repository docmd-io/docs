---
title: "Buttons"
description: "Inject call-to-action buttons for internal routing or external resources. No closing tag required."
---

Buttons are used to create prominent links. Unlike most `docmd` containers, the `button` is **self-closing**. You define it on a single line and do not use a closing `:::` tag.

## Syntax

```markdown
::: button "Label" Path [Option]
```

### Options

| Property | Value | Description |
| :--- | :--- | :--- |
| **Path** | `/path` | Relative URL to a page in your docs. |
| **Path** | `external:URL` | Opens the link in a new tab with `target="_blank"`. |
| **Color** | `color:#hex` | Custom background color (e.g. `color:#4f46e5`). |


## Examples

### 1. Internal Link
Use relative paths to link between pages.
```markdown
::: button "Back to Installation" /getting-started/installation
```
::: button "Back to Installation" /getting-started/installation

### 2. External Link
Prepend `external:` to ensure the link opens in a new tab.
```markdown
::: button "View on GitHub" external:https://github.com/docmd-io/docmd
```
::: button "View on GitHub" external:https://github.com/docmd-io/docmd

### 3. Styled Branding
You can use standard CSS colors or Hex codes to match your brand.
```markdown
::: button "Critical Action" /delete-account color:red
::: button "Success" /confirm color:#228B22
```
::: button "Critical Action" ./#delete-account color:crimson
::: button "Success" ./#confirm color:#228B22

## Troubleshooting: Accidental Over-closing
Because buttons are self-closing, adding a second `:::` line will actually **close the parent container** (like a Card or a Tab) that the button is sitting inside.

**Incorrect (Will break layout):**
```markdown
::: card
::: button "Click" /path
:::
:::
```

**Correct:**
```markdown
::: card
::: button "Click" /path
:::
```