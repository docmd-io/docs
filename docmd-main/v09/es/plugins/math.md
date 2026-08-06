---
title: "Math Plugin"
description: "Native KaTeX and LaTeX mathematical expression rendering with conditional asset loading."
---

The `@docmd/plugin-math` plugin provides native LaTeX and KaTeX mathematical equation rendering for docmd. Powered by `markdown-it-texmath` and KaTeX, equations compile into static HTML elements with optional CSS asset injection.

## Installation & Setup

Install the plugin via CLI:

```bash
npx @docmd/core add math
```

Enable the plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## Key Capabilities

* **Inline & Block Parsing**: Parse equations bounded by `$` (inline) or `$$` (block) delimiters.
* **Conditional Asset Injection**: The KaTeX stylesheet (~30 KB) is injected only on pages containing equation elements (`class="katex"` or `class="katex-display"`). Pages without equations incur zero asset overhead.
* **Fast Initialisation**: Math markup is evaluated during build time to ensure zero layout shift upon page load.

## Usage & Syntax

### Inline Mathematics

Embed expressions within prose using single dollar signs (`$`):

```markdown
The energy-mass equivalence equation is $E = mc^2$.
```

The energy-mass equivalence equation is $E = mc^2$.

### Block Mathematics

Render multiline proofs and centred equations using double dollar signs (`$$`):

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$

::: callout tip "Performance Optimisation" icon:zap
Because KaTeX assets load conditionally per-page, adding mathematical formulas to a subset of pages will not degrade load times across the rest of your documentation site.
:::