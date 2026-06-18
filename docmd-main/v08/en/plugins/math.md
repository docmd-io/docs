---
title: "Math Plugin"
description: "Native KaTeX/LaTeX mathematics integration for docmd."
---

The **Math plugin** adds native LaTeX and KaTeX support to your docmd sites.

It uses `markdown-it-texmath` integrated with the `katex` computation engine. This renders inline and block-level equations smoothly without complex client-side javascript libraries.

## Configuration

The Math plugin is an optional plugin. Install it via the CLI:

```bash
npx @docmd/core add math
```

Enable it in your `docmd.config.json`:

### Example

```json
{
  "plugins": {
    "math": {}
  }
}
```

## How It Works

1. Enable the plugin via your `docmd.config.json`.
2. Wrap your standard LaTeX mathematics in `$` (inline) or `$$` (block) indicators.
3. The engine processes these rules during the build exactly as raw static HTML tags.
4. Minimal injected CSS styles the classes automatically. This yields immediate visualisation on page load.

## Conditional Asset Loading (new in 0.8.7)

The KaTeX stylesheet (~30 KB) only loads on pages that actually render math. Pages without any equations skip the fetch entirely, so a 100-page documentation site with only 5 math pages pays for the CSS on those 5 pages only. The detection scans each page's rendered HTML for `class="katex"` or `class="katex-display"` markers and injects the asset conditionally. No configuration needed - the behaviour is automatic.

## Usage

### Inline Mathematics

Inject standard equations within a paragraph using single dollar signs `$`:

```markdown
Here is an inline equation: $E = mc^2$
```

Here is an inline equation: $E = mc^2$

### Block Mathematics

For wider mathematical proofs or distinct formulations, use double dollar signs `$$` for block level formatting:

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$