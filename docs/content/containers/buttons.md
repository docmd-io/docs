---
title: "Container: Buttons"
description: "How to create stylish, clickable buttons within your documentation for calls to action."
---

# Buttons

The `button` container creates a stylish call-to-action button. 

Unlike other containers, **Buttons are self-closing**. You do not need a closing `:::` tag.

## Usage

**Syntax:**
```markdown
::: button "Button Text" URL [options]
```

*   **`"Button Text"`**: The text on the button. Wrap in quotes if it contains spaces.
*   **`URL`**: The target link.
    *   Internal: `/docs/intro`
    *   External: `external:https://google.com` (Opens in new tab)
    *   Mail: `mailto:support@example.com`
*   **`[options]`**:
    *   `color:#hex` (Custom background color)

### Examples

**1. Basic Internal Link**
```markdown
::: button "Get Started" /getting-started/installation
```
::: button "Get Started" /getting-started/installation

**2. External Link (New Tab)**
```markdown
::: button "View on GitHub" external:https://github.com/docmd-io/docmd
```
::: button "View on GitHub" external:https://github.com/docmd-io/docmd

**3. Custom Color**
```markdown
::: button "Download PDF" /assets/docs.pdf color:#ff4757
```
::: button "Download PDF" /assets/docs.pdf color:#ff4757

### Nesting
Because buttons are self-closing, they are safe to nest inside Cards, Tabs, or Steps without breaking the parent container.

```markdown
::: card Downloads
Get the latest version:
::: button "Download v1.0" /download color:#2ecc71
:::
```
::: card Downloads
Get the latest version:
::: button "Download v1.0" /download color:#2ecc71
:::