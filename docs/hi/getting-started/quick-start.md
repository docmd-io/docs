---
title: "त्वरित शुरुआत"
description: "Go from an empty folder to a running documentation site in under a minute."
---

Run docmd inside any folder containing Markdown files. No config file, no setup, no framework knowledge required.

## Start a dev server

```bash
npx @docmd/core dev


<!-- SCREENSHOT: Terminal output after running `npx @docmd/core dev` showing the local dev server URL and build summary with page count. -->
```

Opens `http://localhost:3000`. Your documentation is live.


<!-- SCREENSHOT: Browser showing the docmd default page at localhost:3000 — the auto-generated homepage with sidebar navigation visible. -->

<!-- IMAGE NEEDED: Screenshot of a fresh docmd dev server running with auto-generated navigation -->

## What happens automatically

docmd scans your project and sets everything up:

1. **Directory detection** — looks for `docs/`, `src/docs/`, `documentation/`, or any `.md` files
2. **Navigation generation** — builds a nested sidebar from your folder structure
3. **Metadata extraction** — reads `package.json` for the site title if available
4. **Theme activation** — applies the default theme with system-aware light/dark mode
5. **Search indexing** — enables built-in full-text search

No `docmd.config.js` is needed. Add one later when you need versioning, plugins, or custom navigation.

## Build for production

```bash
npx @docmd/core build
```

Outputs a static site to `./site/`, ready to deploy anywhere.
