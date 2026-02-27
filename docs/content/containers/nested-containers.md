---
title: "Nested Containers"
description: "Learn how to use the advanced nested container system to create complex, interactive documentation layouts with seamless container nesting."
---

# Nested Containers

The advanced nested container system in docmd allows you to create complex, interactive documentation layouts by nesting containers within each other. This powerful feature enables you to build rich, structured content that was previously impossible.

## Nesting Rules

### Best Practices

1. **Logical Structure** - Nest containers in a way that makes logical sense
2. **Readability** - Don't nest too deeply (3-4 levels maximum for readability)
3. **Performance** - Complex nesting is supported but keep it reasonable
4. **Content Organization** - Use nesting to organize related content
5. **Use the Right Tool** - Use steps for simple sequences, cards/tabs for complex content

### Limitations

While `docmd` has improved the parser significantly over the period, there are still logical limits:

1.  **Steps inside Tabs:** This is technically difficult to parse in Markdown. We recommend keeping Steps as top-level elements or inside Cards, but not inside Tabs.
2.  **Buttons:** Buttons are now **self-closing**. Do not add a `:::` after a button line, or it might close a parent container (like a Card) accidentally.

## Examples

### Cards with Nested Content

```markdown
::: card Installation Guide

Here's how to install the application:

   ::: callout tip Pro Tip
   Make sure to download the correct version for your platform.
   :::

   ::: button "Download Now" /downloads

:::
```

::: card Installation Guide

Here's how to install the application:

::: callout tip Pro Tip
Make sure to download the correct version for your platform.
:::

::: button "Download Now" #

:::

### Tabs with Nested Content

```markdown
::: tabs

   == tab "Windows"
      Download the Windows installer (.exe) file.

      ::: callout tip
         Make sure to run as administrator for best results.
      :::

      ::: button "Download Windows" /downloads/windows

   == tab "macOS"
      Download the macOS package (.pkg) file.

      ::: callout warning
         You may need to allow the app in Security & Privacy settings.
      :::

      ::: button "Download macOS" /downloads/macos

   == tab "Linux"
      Download the Linux tarball (.tar.gz) file.

      ::: button "Download Linux" /downloads/linux

:::
```

::: tabs

== tab "Windows"
Download the Windows installer (.exe) file.

::: callout tip
Make sure to run as administrator for best results.
:::

::: button "Download Windows" #

== tab "macOS"
Download the macOS package (.pkg) file.

::: callout warning
You may need to allow the app in Security & Privacy settings.
:::

::: button "Download macOS" #

== tab "Linux"
Download the Linux tarball (.tar.gz) file.

::: button "Download Linux" #

:::

### Steps Container with Nested Elements

Steps containers are designed for simple, sequential instructions and work well with other containers:

```markdown
::: steps

1. **Download the Application**
   Get the latest version from our download page.

   ::: button "Download Now" /downloads

2. **Install the Application**
   Run the installer and follow the setup wizard.

   ::: callout tip Pro Tip
      Check our system requirements page for detailed information.
   :::

3. **Configure Settings**
   Set up your preferences and start using the app.

   ::: card Configuration
      - Choose your theme
      - Set up notifications
      - Configure integrations
   :::

:::
```

::: steps

1. **Download the Application**
   Get the latest version from our download page.

   ::: button "Download Now" #

2. **Install the Application**
   Run the installer and follow the setup wizard.

   ::: callout tip Pro Tip
      Check our system requirements page for detailed information.
   :::

3. **Configure Settings**
   Set up your preferences and start using the app.

   ::: card Configuration
      - Choose your theme
      - Set up notifications
      - Configure integrations
   :::

:::

## Troubleshooting

### Common Issues

1. **Container not rendering** - Ensure proper spacing and syntax
2. **Nested content not showing** - Check for proper closing tags
3. **Performance issues** - Reduce nesting depth if experiencing slowdowns

### Debugging Tips

- **Check syntax** - Ensure all containers have proper opening and closing tags
- **Verify nesting** - Make sure containers are properly nested
- **Test incrementally** - Build complex structures step by step
- **Use browser dev tools** - Inspect the generated HTML for issues
- **Use the right container** - Steps for simple sequences, cards/tabs for complex content