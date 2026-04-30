---
title: "Live Editor"
description: "Understanding the docmd Live Editor and its browser-based authoring workflow."
---

The `docmd` Live Editor is a dedicated environment for real-time documentation authoring. It uses the isomorphic core of `docmd` to provide an instant, side-by-side preview of your Markdown content without requiring a backend build process.

## Launching the Editor

Start the local Live Editor by running:

```bash
docmd live
```

The editor will typically be available at `http://localhost:3000`.

## Architecture

Unlike the standard `dev` server which rebuilds files on the disk, the Live Editor runs the `docmd` engine directly in your browser. This enables:

1.  **Instant Feedback**: Content is re-rendered as you type.
2.  **Portable Playgrounds**: The editor can be bundled into a static site for hosting on platforms like GitHub Pages.
3.  **Cross-Platform Consistency**: The preview uses the exact same rendering logic as the production build.

## Static Deployment

Generate a shareable, standalone version of the editor:

```bash
docmd live --build-only
```

This creates a `dist/` directory containing the editor's HTML and the bundled isomorphic engine.