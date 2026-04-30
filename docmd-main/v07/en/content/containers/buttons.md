---
title: "Buttons"
description: "Inject call-to-action buttons for internal routing or external resources with a single-line syntax."
---

Buttons are high-impact UI elements used for prominent navigation. Unlike block containers, the `button` is **self-closing**—it is defined on a single line and does not require a closing `:::` tag.

## Syntax

```markdown
::: button "Label" Path [Options]
```

### Options Reference

| Property | Format | Description |
| :--- | :--- | :--- |
| **Path** | `/path/` | Relative project URL (resolves automatically for SPA navigation). |
| **External** | `external:URL`| Opens the target URL in a new browser tab (`target="_blank"`). |
| **Color** | `color:VALUE` | Applies a background color (supports CSS names or Hex codes). |
| **Icon** | `icon:NAME` | Adds a [Lucide](external:https://lucide.dev/icons) icon before the button label. |

## Usage Examples

### 1. Internal Navigation
Use relative paths to ensure seamless, zero-reload transitions within the `docmd` SPA.
```markdown
::: button "Install docmd" /getting-started/installation
```
::: button "Install docmd" /getting-started/installation

### 2. External Resource Link
Prepend `external:` to the URL to secure safe external linking.
```markdown
::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd
```
::: button "View GitHub Repository" external:https://github.com/docmd-io/docmd

### 3. Semantic & Brand Styling
Match buttons to your brand identity or semantic priority using color overrides.
```markdown
::: button "Danger Action" /delete color:crimson
::: button "Success Confirmation" /success color:#228B22
```
::: button "Danger Action" ./#delete color:crimson
::: button "Success Confirmation" ./#success color:#228B22

### 4. Buttons with Icons
Add a Lucide icon to enhance visual clarity.
```markdown
::: button "Get Started" /getting-started/installation icon:arrow-right
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github
```
::: button "Get Started" /getting-started/installation icon:arrow-right
::: button "View Source" external:https://github.com/docmd-io/docmd icon:github

## Critical Note: Self-Closing Logic

Because buttons are self-closing, adding a terminal `:::` line will terminate the **parent container** (e.g., a Card or Tab) that the button resides in, potentially breaking your layout.

**Incorrect Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin" /setup
    :::        <-- Error: This closes the Card prematurely.
:::
```

**Correct Sequence:**
```markdown
::: card "Setup"
    ::: button "Begin" /setup
:::        <-- Correct: This closes the Card.
```