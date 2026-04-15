---
title: "Recipe: Technical Writing Standards"
description: "Best practices for authoring clear, scannable, and AI-optimised documentation."
---

High-quality documentation is defined by its architectural clarity and scannability. This guide outlines the professional standards for utilising `docmd` features to optimise the user and machine experience.

## Scannability & Semantic Density

Technical users rarely read documentation linearly; they scan for specific solutions.

*   **Descriptive Semantic Headings**: Avoid generic titles. Use "Initializing the Production Pipeline" instead of "Startup."
*   **Concise Paragraphs**: Encapsulate single concepts into 2-3 sentence blocks to prevent cognitive overload.
*   **Lexical Emphasis**: Utilise **Bold Text** for key technical terms, file paths, and terminal commands to ensure they remain distinct during rapid scanning.

## Strategy for Interactive Containers

`docmd` provides specialised UI blocks. Use them intentionally to reinforce your document's mental model.

### Callouts vs. Cards
*   **Callouts (Alerts)**: Use for "Out-of-band" information. `tip` for performance shortcuts, `warning` for cautionary logic, and `danger` for critical breaking changes.
*   **Cards (Structural Blocks)**: Use for "In-band" content clustering. Cards are ideal for feature summaries on a landing page or grouping related configuration keys.

### Sequential Workflows
When documenting a multi-step procedure, always utilise the `::: steps` container. This provides a high-impact visual timeline that is significantly more legible than a standard numbered list for both humans and AI agents.

## High-Fidelity Linking

`docmd`’s SPA router enables instant, zero-reload navigation. Maintain this experience through reliable referencing:

*   **Filesystem-Aware Paths**: Always utilise relative paths to your source `.md` files (e.g., `../core/engine.md`). This ensures link integrity across IDEs, local dev servers, and production builds.
*   **Descriptive Anchors**: Avoid "Read more." Utilise high-fidelity descriptors like "[Analyze the Browser API Reference](/api/browser-api)."

## Code Block Professionalism

*   **Explicit Language Labeling**: Always specify the language identifier (e.g., ` ```typescript `). This enables both accurate syntax highlighting and reliable AI parsing.
*   **Automated Portability**: `docmd` automatically attaches interactive copy buttons to every code block; prioritize concise, ready-to-execute snippets to maximize developer utility.