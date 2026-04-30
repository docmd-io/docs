---
title: "Recipe: Documentation Writing Guide"
description: "Best practices for writing clear, scannable, and effective documentation with docmd."
---

Great documentation isn't just about correct information; it's about how that information is structured. This guide covers the best practices for using `docmd` features to help your readers.

## Scannability is Everything

Users rarely read documentation line-by-line. They scan for answers.

*   **Use Descriptive Headings:** Instead of "Setup," use "Installing the CLI via NPM."
*   **Keep Paragraphs Short:** Break up large walls of text into 2-3 sentence chunks.
*   **Use Bold Text:** Highlight key terms, file paths, or commands so they pop while scanning.

## Choosing the Right Container

`docmd` provides several containers. Using them correctly improves the user's mental model.

### Callouts vs. Cards
*   **Use Callouts** for "interruptions." Use `tip` for helpful shortcuts, `warning` for things that might break, and `danger` for critical errors.
*   **Use Cards** for "grouping." Cards are great for feature lists on a homepage or summarizing a large section.

### Steps for Tutorials
Whenever you have more than two actions the user must perform in order, use the `::: steps` container. It provides a visual timeline that feels much more encouraging than a plain numbered list.

## Linking Best Practices

Since `docmd` generates a Single Page Application, navigating between pages is instant.

*   **Use Relative Paths:** Always link using `./file.md` or `../folder/file.md`. This ensures your links work in your code editor (VS Code), on your web server, and even in offline mode.
*   **Self-Describing Links:** Avoid "Click here." Instead, use "[Read the Installation Guide](/getting-started/installation)."

## Organizing Code Blocks

*   **Specify Languages:** Always add the language tag (e.g., ` ```javascript `) to enable syntax highlighting.
*   **Copy Buttons:** Remember that `docmd` automatically adds a copy button to every code block, so you don't need to ask users to "copy and paste" manually.