---
title: "Live Editor"
description: "Architecture and execution reference for the docmd browser-based Live Editor environment."
---

The docmd Live Editor provides a browser-native authoring environment. Utilizing the isomorphic compilation core, it presents instant, side-by-side Markdown previews without requiring local disk compilation steps.

## Launch Commands

Start the local Live Editor instance:

```bash
npx @docmd/core live
```

The editor opens at `http://localhost:3000` by default.

## Architecture

Unlike the `dev` server process which monitors file changes on disk, the Live Editor runs the compilation engine directly within the browser runtime:

1. **Instant Feedback**: Content re-renders in real-time during user typing.
2. **Standalone Playgrounds**: The editor can be exported as a static Web bundle for hosting on GitHub Pages or static host providers.
3. **Parity**: Previews leverage the identical rendering pipeline as production `build` outputs.

## Standalone Static Builds

Export a standalone, shareable Live Editor bundle:

```bash
npx @docmd/core live --build-only
```

Emits a `dist/` directory containing the editor HTML application and bundled isomorphic engine.