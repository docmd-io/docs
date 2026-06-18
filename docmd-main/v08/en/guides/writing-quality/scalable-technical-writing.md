---
title: "Scalable Technical Writing"
description: "How to use Progressive Disclosure and structural containers to manage growing documentation complexity without overwhelming your users."
---

## Problem

In the early stages, documenting a feature takes a few paragraphs. As the product evolves, those paragraphs explode into a sea of edge cases, platform variations, and complex options. This results in "vertical bloat," where a page becomes an unreadable wall of text.

## Why it matters

Vertical bloat destroys comprehension and increases cognitive load. When users scroll through pages of irrelevant content, they become overwhelmed. They often assume the product is more complex than it actually is. Scalable writing ensures users only see the information they need at any given moment.

## Approach

Implement **Progressive Disclosure**. This technique involves presenting only the most critical information upfront (the "Happy Path"). You hide complex, technical, or specific details behind interactive UI structures. docmd provides built-in containers specifically designed to manage this complexity effectively.

## Implementation

### 1. Handling Variations with Tabs

Instead of listing instructions sequentially for multiple package managers, use the [Tabs Container](../../content/containers/tabs.md). This allows the user to select their specific environment. It instantly hides irrelevant commands and reduces visual noise.

````markdown
::: tabs

    == tab "npm"
        ```bash
        npm install docmd
        ```

    == tab "pnpm"
        ```bash
        pnpm add docmd
        ```
:::
````

### 2. Managing Edge Cases with Collapsibles

If a troubleshooting step only applies to a small percentage of users, do not let it interrupt the main tutorial's logical flow. Use the [Collapsible Container](../../content/containers/collapsible.md) to bury these details while keeping them accessible.

```markdown
1. Start the development server by running `npx @docmd/core dev`.

::: collapsible "Troubleshooting: Port already in use"
If you receive an `EADDRINUSE` error, you can specify a custom port using the `--port` flag: `npx @docmd/core dev --port 4000`.
:::
```

### 3. Progressive Detail with Callouts

Use [Callouts](../../content/containers/callouts.md) to provide supplementary information that isn't required for the primary task but offers valuable context for advanced users.

## Trade-offs

Hiding content inside tabs or collapsibles can occasionally make it harder for users to find information using the browser's native `Ctrl+F` search. However, docmd's integrated [Search Engine](../../plugins/search.md) indexes all content within these containers. This ensures users can still find exactly what they need while enjoying a cleaner reading experience.