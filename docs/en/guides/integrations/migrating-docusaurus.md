---
title: "Migrating Documentation from Docusaurus to docmd"
description: "A comprehensive guide on from docusaurus."
---

## Problem

Docusaurus is a phenomenal tool, but its reliance on heavy React runtimes, complex Webpack/Babel configurations, and slow build times for large sites prompts many users to seek lightweight alternatives.

## Why it matters

Migrating between frameworks often means rewriting thousands of pages due to proprietary Markdown abstractions (MDX vs MD). 

## Approach

`docmd` was designed as a drop-in replacement for standard Markdown/MDX content. While we do not execute React components in markdown, `docmd`'s native Container syntax perfectly polyfills 90% of Docusaurus' custom Admonitions and Tabs.

## Implementation

### 1. The Admonition Translation
Docusaurus uses `:::note`. `docmd` uses the same syntax dynamically via `::: callout info`.

To migrate without editing files, simply map Docusaurus classes via CSS arrays if needed, or run a one-time global find/replace:
- `:::note` -> `::: callout info`
- `:::danger` -> `::: callout danger`

### 2. MDX Components
If your Docusaurus docs are littered with `<MyCustomReactComponent />`, this will render as raw text in `docmd`. You must replace these with `docmd` HTML injection or custom plugins.

### 3. Navigation
Copy your `sidebars.js` logic and translate it into a single `navigation.json` array. `docmd` dramatically simplifies the nesting logic, relying on simple `children` arrays instead of category objects.

## Trade-offs

Losing MDX support means you can no longer script arbitrary Javascript loops directly inside your markdown files. `docmd` enforces a strict separation of concerns: Logic belongs in scripts, Content belongs in Markdown.
