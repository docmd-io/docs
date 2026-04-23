---
title: "Reducing JavaScript Payload for Faster Documentation Sites"
description: "A comprehensive guide on js payload reduction."
---

## Problem

For many React-based static site generators (like Docusaurus), the initial JS bundle is ~250kb compressed (often >1MB uncompressed). The browser must download, parse, compile, and execute this massive script exactly *before* the documentation site becomes fully interactive.

## Why it matters

Large JS payloads delay "Time to Interactive" (TTI). While the user might *see* the text, if they try to click the sidebar to expand a category or click "Copy" on a code block while the JS is still evaluating, nothing happens. This causes frustrating "ghost clicks".

## Approach

Use Vanilla JS (or a micro-framework) instead of React or Vue for static sites. Eliminate the Virtual DOM entirely. This is exactly what `docmd` does natively.

## Implementation

The `docmd` core engine ships less than **20kb** of JavaScript to the client.

### 1. Evaluate your `customJs` array
The easiest way to sabotage `docmd`'s performance is by importing heavy third-party scripts.

*Poor Payload:*
```javascript
export default defineConfig({
  customJs: [
    'https://code.jquery.com/jquery-3.7.1.min.js', // ~30kb bloated
    '/my-heavy-widget.js'
  ]
});
```

### 2. Defer Non-Critical Scripts
If you must load Analytics or external Chat widgets, ensure they are deferred so they do not block the main parser.

*Optimized Payload:*
Inject your chat widgets via inline scripts that set the `defer` or `async` attribute dynamically. Alternatively, `docmd` natively delegates analytics to background workers where possible.

## Trade-offs

Writing interactive features in Vanilla JS requires more manual DOM manipulation than using declarative frameworks like React. However, for a documentation site where 95% of the content is static text, paying the 200kb tax for a declarative Virtual DOM is empirically unjustified.
