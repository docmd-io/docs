---
title: "Buttons"
description: "Inject clear, highly visible call-to-actions directly into your documentation."
---

Buttons are interactive components designed for navigation and call-to-actions. They can point to internal documentation pages or external resources.

## Syntax Reference

```markdown
::: button "Label text" target_url [property:value...]
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Path** | `/path/` | Relative project URL. Resolves automatically for SPA navigation. |
| **External** | `external:URL`| Opens the target URL in a new browser tab (`target="_blank"`). |
| **Colour** | `colour:VALUE` | Applies a background colour (supports CSS names or Hex codes). |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon before the label. |

## Examples

### Internal Navigation

Use relative Markdown paths to ensure seamless transitions within the docmd SPA.

```markdown
::: button "Install docmd" ../../getting-started/installation.md
```

::: button "Install docmd" ../../getting-started/installation.md

### External Resource Link

Prepend `external:` to the URL to force the link to open in a new tab.

```markdown
::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd
```

::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### Styling & Icons

Match buttons to your brand identity using colour overrides and Lucide icons to enhance visual clarity.

```markdown
::: button "Success Confirmation" ./#success colour:#228B22
::: button "Danger Action" ./#delete colour:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github
```

::: button "Success Confirmation" ./#success colour:#228B22
::: button "Danger Action" ./#delete colour:crimson icon:alert-circle
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

## Critical Note: Self-Closing Logic

Buttons are self-closing. Adding a terminal `:::` line immediately after a button will terminate the **parent container** (e.g., a Card or Tab), potentially breaking your layout.

**Incorrect Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
    :::        <-- Error: This closes the Card prematurely.
:::
```

**Correct Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin" ../../setup.md
:::        <-- Correct: This closes the Card cleanly.
```