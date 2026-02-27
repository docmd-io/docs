---
title: "Tabs"
description: "Organize content into switchable tabbed panes."
---

# Tabs Container

Tabs are essential for showing alternative content (like code snippets for different languages or instructions for different OSs) without cluttering the page.

## Syntax

Use `== tab "Name"` to define a new tab pane.

```markdown
::: tabs

    == tab "Tab 1 Name"
        Content for tab 1.

    == tab "Tab 2 Name"
        Content for tab 2.

:::
```

## Example

### Code Switching

````markdown
::: tabs

    == tab "JavaScript"
        ```javascript
        console.log("Hello World");
        ```

    == tab "Python"
        ```python
        print("Hello World")
        ```

:::
````

**Rendered Output:**

::: tabs

    == tab "JavaScript"
        ```javascript
        console.log("Hello World");
        ```

    == tab "Python"
        ```python
        print("Hello World")
        ```

:::

## Lazy Rendering
`docmd` is smart. If you put heavy content (like a **Mermaid diagram**) inside a hidden tab, it will wait to render it until the user actually clicks the tab. This keeps your page load fast.

## Best Practices

1. **Clear Labels** - Use descriptive tab names
2. **Consistent Content** - Keep similar content types in each tab
3. **Logical Order** - Arrange tabs in a logical sequence
4. **Not Too Many** - Limit to 5-7 tabs for best usability
5. **Mobile Friendly** - Consider mobile users when organizing content

## Nesting Limitations

- **Tabs cannot contain tabs** - This prevents infinite recursion
- **Steps inside tabs not supported** - Use regular ordered lists instead
- **Maximum depth** - While technically unlimited, keep it under 3-4 levels for readability
- **Performance** - Very deep nesting may impact rendering performance

::: callout warning Steps Inside Tabs
**Steps containers cannot be used inside tabs** due to parsing conflicts. If you need step-by-step instructions within tabs, use regular numbered lists or consider restructuring your content.
:::