---
title: "Designing Custom Landing Pages"
description: "How to use docmd's hero and grid containers to create premium landing pages for your documentation."
---

## Problem

By default, the `index.md` file in most documentation generators looks like a standard technical page. Creating a high-impact, marketing-grade landing page usually requires a separate web framework (like Next.js or Astro), which adds complexity to your documentation workflow.

## Why it matters

Your documentation homepage is often the first interaction a developer has with your product. A generic Markdown-parsed page may fail to inspire confidence in your project's polish and professional quality. A custom landing page can better guide users to the most important sections while reinforcing your brand's visual identity.

## Approach

`docmd` provides specialized [Hero](../../content/containers/hero.md) and [Grids](../../content/containers/grids.md) containers designed specifically for building premium landing pages. For total creative freedom, you can also use the `noStyle` frontmatter property to take complete control over a page's HTML and styling.

## Implementation

### 1. Using the Hero Container

The `hero` container supports several layouts, including `split` (for side-by-side content) and `glow` (for a modern aesthetic).

```markdown
::: hero layout:split glow:true
# Build Faster with docmd
The zero-config documentation engine for modern developer teams.

[Get Started](/docs/start) [View on GitHub](https://github.com/docmd-io/docmd)

== side
![Dashboard Preview](../../static/img/hero-preview.png)
:::
```

### 2. Organising Content with Grids

Use [Grids and Cards](../../content/containers/grids.md) to create high-level navigation sections that help users find what they need quickly.

```markdown
::: grids
::: grid
::: card "Quick Start" icon:rocket
Get up and running in less than 5 minutes.
[Learn More](/docs/start.md)
:::
:::
::: grid
::: card "API Reference" icon:code
Comprehensive documentation for all our endpoints.
[Explore API](/api)
:::
:::
:::
```

### 3. Full Customisation with noStyle

If you need a completely custom design that ignores the standard documentation layout (no sidebar or header), use the `noStyle` property in the [Page Frontmatter](../../content/frontmatter.md).

```yaml
---
title: "Custom Dashboard"
noStyle: true
---
```
When `noStyle: true` is set, `docmd` will render only the raw HTML/Markdown content you provide, allowing you to inject your own CSS and JavaScript for a pixel-perfect experience.

## Trade-offs

Using `noStyle: true` means you forfeit the native navigation, search, and theme-switching features provided by `docmd`. You are responsible for ensuring that the custom page is mobile-responsive and accessible. For most use cases, combining the `hero` and `grid` containers within the standard layout provides the best balance of aesthetics and functionality.