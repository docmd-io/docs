---
title: "Migrating from Docusaurus"
description: "A step-by-step guide to migrating your documentation from Docusaurus to docmd, focusing on performance gains and syntax mapping."
---

## Problem

Docusaurus is a powerful framework, but its reliance on heavy React runtimes, complex MDX abstractions, and slow build times for large sites can become a burden. Teams often look for a more lightweight, zero-config alternative that prioritizes speed and simplicity without sacrificing rich UI components and a professional developer experience.

## Why it matters

Migrating between documentation engines is often avoided due to the perceived effort of converting proprietary syntax and restructuring large volumes of content. `docmd` minimizes this friction by remaining close to standard Markdown while providing high-fidelity, zero-overhead replacements for common Docusaurus features.

## Approach

`docmd` provides a high-performance alternative for standard Markdown content. While `docmd` does not support the execution of arbitrary React components within Markdown (MDX), its native [Container Syntax](../../content/containers) provides first-class replacements for Docusaurus admonitions, tabs, and layout grids with significantly faster build times and zero client-side framework overhead.

## Implementation

### 1. Admonition (Callout) Mapping

Docusaurus uses `:::type` style admonitions. `docmd` uses a similar but more semantically flexible [Callout](../../content/containers/callouts) syntax. Most migrations can be handled with a simple global find-and-replace:

*   `:::note` → `::: callout info`
*   `:::tip` → `::: callout tip`
*   `:::warning` → `::: callout warning`
*   `:::danger` → `::: callout danger`

### 2. Tabs and Layouts

Docusaurus relies on React components for interactive elements like tabs. `docmd` provides a native [Tabs Container](../../content/containers/tabs) that requires no imports and builds instantly into lightweight, accessible HTML.

```markdown
::: tabs
::: tab "npm"
npm install docmd
:::
::: tab "yarn"
yarn add docmd
:::
:::
```

### 3. Navigation Translation

Convert your `sidebars.js` logic into `docmd`'s [Navigation Configuration](../../configuration/navigation). `docmd` uses a clean JSON-based structure that can be defined globally or decentralized within subdirectories using `navigation.json` files.

### 4. Moving from MDX to Plugins

If your documentation relies on custom React components for complex logic, we recommend transitioning that logic into [Custom Plugins](../../customisation/extending-custom-plugins) or standard HTML/JavaScript. This ensures your content remains readable and portable while keeping the rendering engine fast.

## Trade-offs

The primary trade-off is the move away from MDX. `docmd` enforces a clear separation of concerns: **Content belongs in Markdown, and Logic belongs in Plugins.** This architectural decision results in build times that are often 10-50x faster than Docusaurus and a JavaScript payload that is significantly smaller, leading to a much faster "Time to Interactive" for your users.
