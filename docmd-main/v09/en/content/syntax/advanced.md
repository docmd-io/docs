---
title: "Advanced Markdown Syntax"
description: "Master extended GFM features: task lists, element attributes, footnotes, definition lists, and abbreviations in docmd."
---

Beyond standard Markdown primitives, `docmd` supports GitHub Flavored Markdown (GFM) extensions and custom element attribute parsers. These primitives provide fine-grained control over document semantics and element styling.

## Task Lists

Render interactive or read-only task lists for release planning and feature tracking:

```markdown
- [x] Engine performance optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit & localisation sync
```

- [x] Engine performance optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit & localisation sync

## Inline Emojis

Incorporate standard emoji shortcodes inline within Markdown prose:

```markdown
We :heart: high-performance documentation engines! :rocket: :sparkles:
```

We :heart: high-performance documentation engines! :rocket: :sparkles:

## Custom Element Attributes (`{ }`)

Attach unique IDs, custom CSS classes, and inline styles to headings, images, and links using attribute block notation `{ }`.

### Element Identifiers (`#id`)

Assign custom HTML element IDs to enable direct deep-linking to technical subsections:

```markdown
## Performance Benchmarks {#benchmarks-2026}
```

### CSS Utility Classes (`.class`)

Apply utility classes directly without writing custom inline HTML:

```markdown
## Centred Section Title {.text-centre .text-accent}
```

### Button-Styled Links

Transform standard Markdown links into call-to-action buttons:

```markdown
[Download Latest Release](#download){.docmd-button}
```

## Document Footnotes

Inject technical citations or reference details as footnotes. The compiler collects and renders footnotes at the bottom of the document automatically:

```markdown
Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Engine Architecture.
```

Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Engine Architecture.

## Definition Lists

Structure API parameter reference lists and terminology glossaries:

```markdown
PropName
: The unique identifier string for the configuration property.

DefaultValue
: The fallback value applied when no property override is specified.
```

PropName
: The unique identifier string for the configuration property.

DefaultValue
: The fallback value applied when no property override is specified.

## Global Abbreviations

Define term abbreviations globally across a document. Hovering over the defined term displays an interactive tooltip explanation:

```markdown
*[SPA]: Single Page Application
The docmd router delivers a high-performance SPA reading experience.
```

*[SPA]: Single Page Application
The docmd router delivers a high-performance SPA reading experience.

::: callout tip "Semantic Precision for AI Agents" icon:sparkles
Explicit semantic definitions, footnotes, and abbreviations supply high-fidelity technical context to AI agents reading the `llms.txt` context stream.
:::