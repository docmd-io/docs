---
title: "Advanced Markdown Syntax"
description: "Leverage docmd's extended feature set: Custom attributes, GFM extensions, and semantic definitions."
---

Beyond standard Markdown, `docmd` supports several high-fidelity extensions derived from GitHub Flavored Markdown (GFM) and custom attribute plugins. These tools provide total control over your document's structure and styling.

## GFM Extensions

### Task Lists
Create interactive or read-only checklists for roadmap tracking.
```markdown
- [x] Engine Optimization Complete
- [ ] Plugin API Finalization
```
- [x] Engine Optimization Complete
- [ ] Plugin API Finalization

### Automatic Link Resolution
Standard URLs and email addresses are automatically identified and linked without additional markup: `https://docmd.io`

### Shortcode Emojis
`docmd` supports standard shortcodes to inject visual personality into your documentation.
> We :heart: high-performance documentation! :rocket: :smile:

## Custom Element Attributes

Assign unique IDs and CSS classes directly to headers, images, and links using the curly-brace `{}` syntax. This is the primary method for applying [Custom CSS Styles](/theming/custom-css-js).

### Unique Semantic IDs
Useful for deep-linking directly to technical subsections.
```markdown
## Performance Benchmarks {#benchmarks-2026}
```

### Functional CSS Classes
Apply styling utilities to specific elements.
```markdown
## Center-Aligned Section {.text-center .text-blue}
```

### Actionable Button Links
Transform any standard markdown link into a styled call-to-action button.
```markdown
[Download Latest Release](/download){.docmd-button}
```

## Citations & Definitions

### Footnote References
Add citations or technical deep-dives[^1] that are automatically collected and rendered at the bottom of the page.

```markdown
Architectural decisions are documented in the RFC[^1].

[^1]: RFC-42: Isomorphic Rendering Pipeline.
```

### Definition Lists
Perfect for API parameter descriptions and glossaries.

```markdown
PropName
: The unique identifier for the configuration key.
```

PropName
: The unique identifier for the configuration key.

### Technical Abbreviations
Define abbreviations globally within a page. Hovering over the term reveals its full definition.

```markdown
*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.
```
*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.

::: callout tip "Contextual Precision for AI"
Utilizing **Definitions** and **Abbreviations** provides high-quality technical signals to AI agents. When an AI processes your `llms-full.txt` context, these explicit definitions prevent lexical ambiguity, ensuring the model generates logically correct explanations for your project's specific terminology.
:::