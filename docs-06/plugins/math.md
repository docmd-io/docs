---
title: "Math Plugin"
description: "Native KaTeX/LaTeX mathematics integration for docmd."
---

The **Math plugin** adds native LaTeX and KaTeX support to your docmd sites.

It utilizes `markdown-it-texmath` as securely integrated with the `katex` computation engine to render both inline and block-level mathematical equations smoothly without requiring complex client-side javascript libraries.

## Setup

```bash
docmd add math
```

```javascript
plugins: {
  math: {}
}
```

## How It Works

1. Enable the plugin via your `docmd.config.js`.
2. Wrap your standard LaTeX mathematics in `$` (inline) or `$$` (block) indicators.
3. The server intelligently processes these math rules during the static-site build exactly as raw static HTML tags.
4. Minimal injected CSS automatically scopes these classes directly, yielding immediate visualization the moment the user views the page!

## Usage

### Inline Mathematics

You can inject standard equations flawlessly within a paragraph utilizing single dollar signs `$`:

```markdown
Here is an inline equation: $E = mc^2$
```

Here is an inline equation: $E = mc^2$

### Block Mathematics

For wider mathematical proofs or distinct formulations, leverage double dollar signs `$$` for block level formatting:

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
