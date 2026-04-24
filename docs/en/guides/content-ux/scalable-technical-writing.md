---
title: "Scalable Technical Writing"
description: "How to use Progressive Disclosure and structural containers to manage growing documentation complexity without overwhelming your users."
---

## Problem

In the early stages of a product, documenting a feature might only take a few paragraphs. However, as the product evolves into an enterprise platform, those paragraphs can explode into a sea of edge cases, platform-specific variations (Docker, Kubernetes, Cloud), and complex configuration options. This results in "vertical bloat," where a single page becomes an unreadable wall of text that is difficult to navigate and maintain.

## Why it matters

Vertical bloat destroys comprehension and increases cognitive load. When users are forced to scroll through pages of content that is irrelevant to their specific environment or use case, they become overwhelmed and often assume the product is more complex than it actually is. Scalable writing ensures that users only see the information they need at any given moment, maintaining a clear path to success.

## Approach

Implement **Progressive Disclosure**. This technique involves presenting only the most critical information upfront (the "Happy Path") and hiding more complex, technical, or specific details behind interactive UI structures. `docmd` provides several built-in containers specifically designed to help you manage this complexity effectively and elegantly.

## Implementation

### 1. Handling Variations with Tabs

Instead of listing instructions for multiple package managers, operating systems, or cloud providers sequentially, use the [Tabs Container](../../content/containers/tabs). This allows the user to select their specific environment, instantly hiding irrelevant commands and reducing visual noise.

```markdown
::: tabs
::: tab "npm"
```bash
npm install docmd
```
:::
::: tab "pnpm"
```bash
pnpm add docmd
```
:::
:::
```

### 2. Managing Edge Cases with Collapsibles

If a troubleshooting step or a specific edge case only applies to a small percentage of users, do not let it interrupt the logical flow of your main tutorial. Use the [Collapsible Container](../../content/containers/collapsible) to bury these details while keeping them easily accessible when needed.

```markdown
1. Start the development server by running `npx @docmd/core dev`.

::: collapsible "Troubleshooting: Port already in use"
If you receive an `EADDRINUSE` error, you can specify a custom port using the `--port` flag: `npx @docmd/core dev --port 4000`.
:::
```

### 3. Progressive Detail with Callouts

Use [Callouts](../../content/containers/callouts) to provide supplementary information that isn't required for the primary task but offers valuable context for advanced users.

## Trade-offs

Hiding content inside tabs or collapsibles can occasionally make it harder for users to find information using the browser's native `Ctrl+F` search. However, `docmd`'s integrated [Search Engine](../../plugins/search) indexes all content within these containers, ensuring that users can still find exactly what they need through the site's primary search interface while enjoying a much cleaner reading experience.
