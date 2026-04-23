---
title: "Writing Technical Documentation That Scales with Your Product"
description: "A comprehensive guide on scalable content."
---

## Problem

As a startup, documenting "how to start the server" takes one paragraph. As the product evolves into a multi-service enterprise platform, that single paragraph explodes into edge cases about Docker, Kubernetes, env vars, and reverse proxies. The document becomes an unreadable wall of text.

## Why it matters

Vertical bloat destroys reading comprehension. When users must scroll past 4 pages of content irrelevant to their specific use case just to find their answer, they become exhausted and assume the product itself is overly bloated.

## Approach

Implement **Progressive Disclosure** using UI structures (Tabs, Collapsibles). Ensure documents start with the "Happy Path" and hide complex edge cases behind interactive containers.

## Implementation

`docmd` provides the structural containers needed to execute Progressive Disclosure out-of-the-box.

### 1. Hide Complex Variations in Tabs
Do not write out instructions for `npm`, `yarn`, and `pnpm` sequentially. 

```markdown
::: tabs

== tab "npm"
`npm install @my-org/sdk`

== tab "yarn"
`yarn add @my-org/sdk`

:::
```

### 2. Bury Edge Cases in Collapsibles
If an error only happens on Windows 10 prior to build 19041, do not interrupt the flow of the tutorial to explain it.

```markdown
Start the engine by running `engine start`.

::: collapsible "Troubleshooting Windows 10 Builds"
If you receive the error `WSL_NOT_FOUND`, ensure you have installed...
:::
```

## Trade-offs

Hiding content inside tabs means users who utilize `Ctrl+F` (or `Cmd+F`) native browser search might not find the text if it is hidden in an inactive tab (though `docmd-search` indexes this content gracefully). Ensure core concepts are never buried.
