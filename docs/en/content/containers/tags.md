---
title: "Tags"
description: "Use the tag container to label versions, statuses, or highlight short text snippets seamlessly inline."
---

The `tag` container is a self-closing component used to insert small, pill-shaped badges directly into your text. Unlike block containers, tags do not inherit massive sizing from parent elements like headings, they retain their tight, clean proportions no matter where they are placed.

## Basic Usage

To create a basic tag, simply provide the text you want to display:

::: tabs
    == tab "Preview"
        This feature was added in ::: tag "v0.7.4" color:blue and works perfectly.
    == tab "Markdown Source"
        ```markdown
        This feature was added in ::: tag "v0.7.4" and works perfectly.
        ```
:::

## Customising Colors

You can override the default tag styling by providing any valid CSS color string (e.g., `#ff0000`, `blue`, or `hsl(...)`) using the `color:` attribute. `docmd` will automatically calculate a beautiful tinted background with perfectly contrasted text and borders!

::: tabs

== tab "Preview"
::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
== tab "Markdown Source"
````markdown
::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
````

:::

## Adding Icons

Just like buttons and callouts, you can easily attach an icon from the `docmd` icon library using the `icon:` attribute.

::: tabs

== tab "Preview"
::: tag "Verified" icon:check-circle color:#10b981
== tab "Markdown Source"
````markdown
::: tag "Verified" icon:check-circle color:#10b981
````

:::

## Linking Tags

If you need your tag to act as a hyperlink (for instance, linking a version tag directly to its release notes), you can use the `link:` attribute. External links are automatically detected and opened in a new tab.

::: tabs

== tab "Preview"
Check out the latest ::: tag "Release Notes" icon:external-link link:/release-notes/0-7-4
== tab "Markdown Source"
````markdown
Check out the latest ::: tag "Release Notes" icon:external-link link:/release-notes/0-7-4
````

:::

## Using Tags in Headings

Because tags are true inline elements, they look gorgeous when used to label major headings. They will automatically align to the baseline without inheriting the heading's massive font-size.

::: tabs

== tab "Preview"
# Search Filtering ::: tag "New" color:#8b5cf6
== tab "Markdown Source"
````bash
# Search Filtering ::: tag "New" color:#8b5cf6
````

:::