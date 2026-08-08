---
title: "Buttons"
description: "Inject prominent call-to-action buttons for internal SPA navigation and external links in docmd."
---

Buttons are interactive components designed for navigation and explicit call-to-actions. They support internal SPA routing, external links, custom color overrides, and Lucide icons.

## Syntax Reference

```markdown
::: button "Label text" target_url [property:value...]
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Path** | `/path/` | Relative project URL. Resolves automatically via the SPA router. |
| **External** | `external:URL` | Opens the target URL in a new browser tab (`target="_blank"`). |
| **Colour** | `color:VALUE` | Applies a background colour (supports standard CSS names or Hex codes). |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon before the label text. |

## Usage Examples

### Internal SPA Navigation

Use relative Markdown paths to ensure seamless transitions within the single-page router:

```markdown
::: button "Installation Guide" ../../getting-started/installation.md
```

::: button "Installation Guide" ../../getting-started/installation.md

### External Resource Links

Prepend `external:` to the URL to force links to open in a new browser tab:

```markdown
::: button "View GitHub Monorepo" external:https://github.com/docmd-io/docmd
```

::: button "View GitHub Monorepo" external:https://github.com/docmd-io/docmd

### Custom Branding & Iconography

Match buttons to your brand identity using colour overrides and Lucide icon names:

```markdown
::: button "Success Action" ./#success color:#228B22 icon:check
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github
```

::: button "Success Action" ./#success color:#228B22 icon:check
::: button "Danger Action" ./#delete color:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

## Self-Closing Parsing Behavior

Buttons are single-line, self-closing components. Adding a terminal `:::` line immediately after a button terminates the **parent container** (e.g. an enclosing Card or Tab), which will disrupt your layout.

**Incorrect Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin Setup" ../../setup.md
    :::        <-- Error: This closes the Card prematurely.
:::
```

**Correct Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin Setup" ../../setup.md
:::        <-- Correct: This closes the Card cleanly.
```