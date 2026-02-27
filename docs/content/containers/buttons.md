---
title: "Buttons"
description: "Create call-to-action buttons for links, downloads, and external resources."
---

# Buttons

Buttons are perfect for "Call to Action" links, such as downloads, sign-ups, or navigating to key sections.

::: callout warning Self-Closing
The button container is **self-closing**. Do not add a closing `:::` tag, or it may accidentally close parent containers (like Cards).
:::

## Syntax

```markdown
::: button "Label Text" Link [Options]
```

## Examples

### Internal Links
Use relative paths to link to other pages in your documentation.

```markdown
::: button "Get Started" /getting-started/installation
```
::: button "Get Started" /getting-started/installation

### External Links
Prepend `external:` to the URL to force it to open in a new tab with `target="_blank"`.

```markdown
::: button "View Source" external:https://github.com/docmd-io/docmd
```
::: button "View Source" external:https://github.com/docmd-io/docmd

### Custom Colors
You can customize the button color using a hex code or CSS color name.

```markdown
::: button "Critical Action" /delete-account color:#ef4444
::: button "Success" /confirm color:green
```
::: button "Critical Action" /delete-account color:#ef4444
::: button "Success" /confirm color:green