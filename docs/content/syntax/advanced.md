---
title: "Advanced Syntax"
description: "Beyond the basic syntax, docmd supports a variety of advanced Markdown features to help you create richer documentation."
---

# Advanced Markdown Capabilities

## GFM (GitHub Flavored Markdown)

docmd supports GitHub Flavored Markdown extensions including:

### Task Lists

Create interactive checklists:

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another item
```

- [x] Completed task
- [ ] Incomplete task
- [ ] Another item

### Autolinked References

URL and email addresses are automatically linked:

```markdown
Visit https://docmd.io for more information.
Contact support@example.com for help.
```

### Emojis

Use emoji shortcodes:

```markdown
I :heart: docmd! :rocket: :smile:
```
> I :heart: docmd! :rocket: :smile:

## Custom Attributes (IDs and Classes)

You can add custom IDs and CSS classes to headers, images, and links using curly braces `{}`.

### Custom IDs
```markdown
## My Header {#custom-id}
```

### Custom Classes
You can assign classes to elements. 
**Note:** You must define these classes in your own [Custom CSS](/theming/custom-css-js) file.

```markdown
## Styled Header {.text-center .text-red}
```

### Links and Buttons
```markdown
[Download Now](/download){.docmd-button}
```

## Footnotes

You can add footnotes to your content for references or additional information[^1].

```markdown
Here's a statement that needs citation[^1].

[^1]: This is the footnote content.
```

Multiple footnotes can be used throughout your document[^2], and the definitions can be collected at the bottom.

[^1]: This is the first footnote reference.
[^2]: This is the second footnote with more information.

## Definition Lists

Some Markdown parsers support definition lists:

```markdown
Term
: Definition for the term.
: Another definition for the same term.

Another Term
: Definition of another term.
```

Term
: Definition for the term.
: Another definition for the same term.

Another Term
: Definition of another term.

## Abbreviations

You can define abbreviations in your Markdown (depending on plugin support):

```markdown
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

HTML is defined by the W3C standards.
```

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

HTML is defined by the W3C standards.

## Container Extensions

Beyond standard Markdown, docmd provides custom containers for enhanced formatting. 
These are detailed in the [Custom Containers](/content/custom-containers/) guide, and include:

::: callout info
Use containers for callouts, cards, and steps to structure your documentation.
:::