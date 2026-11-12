---
title: "MDX Syntax"
description: "Syntax guide for JSX tags, self-closing elements, compound tags, expressions, and attributes in docmd."
---

`docmd` supports MDX and JSX syntax powered by the lightweight `lite-mdx` compiler. You can write JSX tags, attributes, and dynamic JavaScript expressions directly within your Markdown files alongside standard Markdown syntax.

Both `.md` and `.mdx` file extensions are supported.

::: callout tip "Coexistence with Containers" icon:sparkles
You can freely mix standard Markdown, docmd containers (`::: callout`), and JSX tags (`<Callout>`) within the same document without conflict.
:::

## Tags and Elements

### Self-Closing Tags

Use self-closing tags for standalone widgets, badges, and inline indicators:

```jsx
<Badge text="v0.9.10" type="info" />
<Badge text="Stable" type="success" />
<Separator />
```

### Block Components

Block components wrap Markdown content. Standard Markdown formatting, code snippets, lists, and links continue to work inside:

```jsx
<Callout type="tip" title="Pro Tip">
  Standard Markdown formatting like **bold text**, `inline code`, and lists work inside block components:

  * First bullet point
  * Second bullet point
</Callout>
```

## Compound and Dotted Components

`docmd` parses nested and compound components using dotted notation:

```jsx
<Tabs>
  <Tabs.Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tabs.Tab>
  <Tabs.Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tabs.Tab>
</Tabs>
```

You can also use standard nested tags such as `<Tab>` inside `<Tabs>`, or `<Step>` inside `<Steps>`.

## Attributes and Properties

MDX supports standard JSX attribute syntaxes:

### String Attributes

```jsx
<Card title="Quick Start" href="/getting-started" icon="rocket" />
```

### Numeric and Boolean Attributes

Values wrapped in curly braces `{}` are parsed as numbers or booleans:

```jsx
<Cards cols={3} interactive={true} />
```

### Boolean Shorthand

Writing an attribute name on its own is equivalent to setting it to `true`:

```jsx
<Card interactive title="Clickable Card" />
```

### Objects and Arrays

Pass objects and arrays using nested curly braces:

```jsx
<Chart config={{ responsive: true, theme: "dark" }} data={[12, 19, 3]} />
```

### Spread Attributes

Spread existing property objects into components:

```jsx
<Card {...cardOptions} />
```

## Dynamic Expressions

MDX allows you to interpolate dynamic expressions into content using curly braces `{}`.

### Accessing Frontmatter

Interpolate frontmatter values declared at the top of your document:

```mdx
---
title: "Release Notes"
version: "0.9.10"
author: "docmd Team"
---

# {frontmatter.title}

Current release: **{frontmatter.version}**  
Maintained by: *{frontmatter.author}*
```

### Accessing Site Configuration

Read values from your `docmd.config.json` configuration file:

```jsx
Welcome to documentation for {config.title}.
```

### JavaScript Expressions

Simple JavaScript operations can be evaluated inline:

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Calculated timeout: {1000 * 5}ms.
```

::: callout note "Sandboxed Evaluation" icon:shield
Expressions run in a safe, isolated sandbox with access only to frontmatter properties, site configuration, and standard global mathematical utilities.
:::

## Code Block and Backtick Isolation

Code blocks and inline backticks are protected from JSX compilation. You can safely display JSX examples without them executing:

````markdown
```jsx
<Callout type="warning">This will render as raw code, not a component.</Callout>
```
````

Inline code like `<Badge />` inside backticks is also preserved as literal text.

## Comments

Use JSX comment syntax to leave notes that will not appear in the compiled output:

```jsx
{/* This is an internal comment and will not be rendered */}
```
