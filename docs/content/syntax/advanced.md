---
title: "Advanced Syntax"
description: "Master docmd's extended Markdown features: Task lists, custom attributes, footnotes, and more."
---

Beyond standard Markdown, `docmd` supports several GitHub Flavored Markdown (GFM) extensions and custom attribute syntaxes to give you total control over your content.

## GFM Extensions

### Task Lists
Create interactive or static checklists:
```markdown
- [x] Completed task
- [ ] Incomplete task
```
- [x] Completed task
- [ ] Incomplete task

### Autolinks
URL and email addresses are automatically linked without extra syntax: `https://docmd.io`

### Emojis
Use standard emoji shortcodes like `:rocket:` or `:smile:`.
> I :heart: docmd! :rocket: :smile:

## Custom Attributes (IDs and Classes)

You can assign custom IDs and CSS classes directly to headers, images, and links using the `{}` syntax. 

### Custom IDs
Useful for deep-linking to specific sections.
```markdown
## My Header {#custom-id}
```

### Custom Classes
Assign classes to elements to apply [Custom CSS](/theming/custom-css-js).
```markdown
## Styled Header {.text-center .text-red}
```

### Direct Button Links
Turn any link into a styled button.
```markdown
[Download Now](/download){.docmd-button}
```

## Footnotes & References

Add footnotes for citations or technical deep-dives[^1]. Definitions are automatically moved to the bottom of the page.

```markdown
Here is a statement needing a citation[^1].

[^1]: This is the footnote content.
```

## Abbreviations & Definitions

### Definition Lists
```markdown
Term
: Definition for the term.
```

Term
: Definition for the term.

### Abbreviations
Define abbreviations globally within a page. Hovering over the word will show the full name.
```markdown
*[HTML]: Hyper Text Markup Language
HTML is defined by the W3C.
```
*[HTML]: Hyper Text Markup Language
HTML is defined by the W3C.

::: callout tip
Using **Definitions** and **Abbreviations** provides high-quality semantic context to AI agents. When an AI processes your `llms-full.txt`, these explicit definitions help it resolve technical acronyms correctly without guessing, leading to more accurate code generation.
:::