---
title: "Advanced Markdown Syntax"
description: "Extended formatting features: task lists, custom element attributes, footnotes, and semantic definitions."
---

Beyond standard Markdown, docmd supports high-fidelity extensions derived from GitHub Flavored Markdown (GFM) and custom attribute plugins. These tools provide fine-grained control over document structure and styling.

## Task Lists

Create interactive or read-only checklists for roadmap tracking and release planning.

```markdown
- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit
```

- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit

## Emojis

Use standard shortcodes to add visual personality. Emoji codes render inline with surrounding text.

```markdown
We :heart: high-performance documentation! :rocket: :sparkles:
```

We :heart: high-performance documentation! :rocket: :sparkles:

## Custom Element Attributes

Assign unique IDs and CSS classes to headings, images, and links using the `{}` syntax.

### Custom IDs

Useful for deep-linking directly to technical subsections.

```markdown
## Performance Benchmarks {#benchmarks-2026}
```

### CSS Classes

Apply styling utilities to specific elements without touching your CSS.

```markdown
## Centre-Aligned Section {.text-centre .text-blue}
```

### Button-Style Links

Transform any standard Markdown link into a styled call-to-action button.

```markdown
[Download Latest Release](#download){.docmd-button}
```

## Footnotes

Add citations or technical deep-dives as footnotes. The engine automatically collects and renders them at the page bottom.

```markdown
Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.
```

Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.

## Definition Lists

Perfect for API parameter descriptions and glossaries.

```markdown
PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.
```

PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.

## Abbreviations

Define abbreviations globally within a page. Hovering over the term reveals its full definition.

```markdown
*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.
```

*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.

::: callout tip "Contextual Precision for AI"
Definitions and abbreviations provide high-quality technical signals to AI agents. Explicit semantic definitions prevent lexical ambiguity in the `llms.txt` context stream.
:::