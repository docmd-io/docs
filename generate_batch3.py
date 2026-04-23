import os

base_dir = '/Users/mac/Workspace/GitHub/docmd-io/docs/docs/en/guides'


final_batch = [
    {
        "slug": "content-ux/scalable-technical-writing.md",
        "content": """---
title: "Writing Technical Documentation That Scales with Your Product"
description: "A comprehensive guide on scalable content."
---

## Problem

As a startup, documenting "how to start the server" takes one paragraph. As the product evolves into a multi-service enterprise platform, that single paragraph explodes into edge cases about Docker, Kubernetes, env vars, and reverse proxies. The document becomes an unreadable wall of text.

## Why it matters

Vertical bloat destroys reading comprehension. When users must scroll past 4 pages of content irrelevant to their specific use case just to find their answer, they become exhausted and assume the product itself is overly bloated.

## Approach

Implement **Progressive Disclosure** using UI structures (Tabs, Collapsibles). Ensure documents start with the "Happy Path" and hide complex edge cases behind interactive containers.

## Implementation

`docmd` provides the structural containers needed to execute Progressive Disclosure out-of-the-box.

### 1. Hide Complex Variations in Tabs
Do not write out instructions for `npm`, `yarn`, and `pnpm` sequentially. 

```markdown
::: tabs

== tab "npm"
`npm install @my-org/sdk`

== tab "yarn"
`yarn add @my-org/sdk`

:::
```

### 2. Bury Edge Cases in Collapsibles
If an error only happens on Windows 10 prior to build 19041, do not interrupt the flow of the tutorial to explain it.

```markdown
Start the engine by running `engine start`.

::: collapsible "Troubleshooting Windows 10 Builds"
If you receive the error `WSL_NOT_FOUND`, ensure you have installed...
:::
```

## Trade-offs

Hiding content inside tabs means users who utilize `Ctrl+F` (or `Cmd+F`) native browser search might not find the text if it is hidden in an inactive tab (though `docmd-search` indexes this content gracefully). Ensure core concepts are never buried.
"""
    },
    {
        "slug": "content-ux/navigation-large-sites.md",
        "content": """---
title: "Designing Navigation That Works for Large Documentation Sites"
description: "A comprehensive guide on large site nav."
---

## Problem

Building the sidebar for a 5-page site naturally results in a flat list. For a 500-page site, treating the sidebar as an expanding tree of nested folders creates a labyrinth where users expand 6 levels deep, lose context of where they are, and cannot find their way back.

## Why it matters

If navigation feels like a chore, users rely entirely on the search bar. This indicates the Information Architecture (IA) has failed. Good navigation teaches the user the taxonomy of your product without them realizing it.

## Approach

Use **Top-Level Context Switching** rather than **Deep Nesting**. The left sidebar should rarely exceed 2 levels of depth.

## Implementation

### 1. Utilize the Menubar for Domains
In `docmd`, use the top menubar to shift the user between entirely different domains (e.g., Tutorials vs API Reference), completely swapping out the sidebar content.

### 2. Flatten the Hierarchy
Collapse deeply nested concepts into long-form parent pages utilizing anchor links (Table of Contents), rather than splitting a concept across 5 separate small markdown pages.

*Poor IA:*
- Auth Setup (Page)
  - Setting up OAuth (Page)
  - Setting up JWT (Page)
  - Setting up SAML (Page)

*Better IA:*
- Auth Setup (One Page)
  -> *Uses right-side TOC to navigate to OAuth, JWT, SAML sections*

### 3. Default to Collapsed
If you must use folders, set `collapsible: true` and ensure they default to closed except for the actively highlighted path.

```json
{
  "title": "Reference",
  "collapsible": true,
  "children": [ /* 50 items hidden safely */ ]
}
```

## Trade-offs

Consolidating many small pages into fewer, longer pages makes those specific long pages harder to digest if not structured cleanly with Markdown headers. It requires the author to be highly disciplined about using the right-side Table of Contents effectively.
"""
    },
    {
        "slug": "content-ux/improving-readability.md",
        "content": """---
title: "Improving Readability and Information Hierarchy in Documentation"
description: "A comprehensive guide on readability & hierarchy."
---

## Problem

Engineers naturally write like they code: dense, logically packed, and utilizing jargon. When writing encounters dense technical matter without visual relief (whitespace), the eye glazes over, leading to "skimming."

## Why it matters

Skimming leads to missed steps. A missed step in a deployment tutorial leads to a broken server. Visual readability is not an aesthetic choice; it is an operational requirement.

## Approach

Enforce strict visual rhythms. Break up text walls mathematically and employ thematic `docmd` containers to establish a predictable information hierarchy.

## Implementation

### 1. The 3-Sentence Rule
Never allow a paragraph to exceed three sentences. Technical concepts must breathe.

### 2. Thematic Breakouts
Use `docmd` callouts consistently to establish a visual language.
- `info`: Contextual background.
- `tip`: Best practices.
- `warning`: Destructive actions.

By color-coding the intent, a user scrolling rapidly can instantly spot dangerous actions (Red/Yellow) without reading a word.

### 3. Step Structuring
When outlining sequential actions, do not use narrative text. Use numbered lists or `docmd` step containers.

```markdown
::: steps
1. Initialize the project.
2. Configure the database.
3. Deploy to production.
:::
```

This draws the eye downwards and clearly defines the progression.

## Trade-offs

Breaking content into highly stylized blocks requires the author to learn the specific Markdown extensions (e.g., `::: callout`). This slightly raises the barrier to entry for casual open-source contributors compared to pure standard Markdown.
"""
    },
    {
        "slug": "content-ux/task-vs-concept.md",
        "content": """---
title: "Creating Task-Oriented vs Concept-Oriented Documentation"
description: "A comprehensive guide on task vs concept."
---

## Problem

A common mistake is mixing *Why* something works with *How* to do it. A tutorial on "Deploying to AWS" becomes bogged down with 5 paragraphs explaining the philosophical history of AWS IAM roles.

## Why it matters

When an engineer is trying to fix a broken pipeline at 2 AM, they do not want to read philosophy. They want the structural CLI commands. If the page mixes the two, both the academic reader and the panicked engineer are frustrated.

## Approach

Physically split docs according to the Diátaxis framework. Separate "How-To Guides" (Task-oriented) from "Explanation" (Concept-oriented).

## Implementation

### 1. The Task-Oriented Guide (How-To)
Focus entirely on the objective. Strip out explanations.

**Title**: "How to Rotate IAM Keys"
- Step 1: Open the CLI.
- Step 2: Run `aws iam create-access-key`.
- Step 3: Store securely.

### 2. The Concept-Oriented Guide (Explanation)
Focus entirely on the architecture. Do not instruct the user to execute commands.

**Title**: "Understanding Identity Management"
- Section 1: The Principle of Least Privilege.
- Section 2: How Keys Interface with Roles.
- Section 3: The Rotation Lifecycle.

### 3. Link Between Them
Instead of mixing them, use docmd's robust linking tools to bridge the gap.

*In the How-To guide:*
> For a deeper understanding of why 90-day rotation is enforced, read [Understanding Identity Management](/concepts/iam).

## Trade-offs

Splitting tasks and concepts effectively doubles the number of files in your repository. It requires rigorous cross-linking discipline to ensure that a user reading a conceptual theoretical doc can easily find the practical guide to implement the theory.
"""
    },
    {
        "slug": "content-ux/avoiding-anti-patterns.md",
        "content": """---
title: "Avoiding Common Documentation Anti-Patterns"
description: "A comprehensive guide on anti-patterns."
---

## Problem

Over time, documentation teams independently invent "solutions" to content problems that actually erode the user experience. These "Anti-Patterns" become entrenched in the repository.

## Why it matters

Anti-patterns accumulate technical debt in content. They ruin search engine rankings and increase the cognitive load on readers.

## Approach

Identify and ruthlessly eliminate the three most common documentation anti-patterns during code review. Use linters or peer review processes to catch them.

## Implementation

### Anti-Pattern 1: "Click Here" Links
Do not use non-descriptive hyperlink text. It destroys accessibility (screen readers) and removes contextual SEO value.

*Bad:* To configure the database, [click here](/db-config).
*Good:* Review the [Database Configuration Guide](/db-config) to setup PostgreSQL.

### Anti-Pattern 2: The "Wall of Imports"
In code examples, pasting 20 lines of standard imports before a single line of logic distracts the reader.

*Solution:* Utilize `docmd`'s specific code block collapsing (if applying custom plugins) or extract the core logic out, mentioning that standard boilerplate is omitted for brevity. (Note: Ensure the exact required imports are noted somewhere to prevent AI hallucinations).

### Anti-Pattern 3: FAQs as Trash Cans
"Frequently Asked Questions" pages easily become dumping grounds for information that should have been integrated into the actual tutorials. If a question is "frequently asked," your core documentation has failed.

*Solution:* Delete the FAQ page. Instead, inject the answer physically into the relevant tutorial or conceptual guide where the user actually encounters the friction.

## Trade-offs

Eliminating FAQs forces documentation writers to constantly refactor existing hierarchical documents whenever a new support issue is discovered, adding maintenance overhead compared to simply appending a bullet point to a global FAQ markdown file.
"""
    },
    {
        "slug": "customisation/custom-landing-pages.md",
        "content": """---
title: "Designing Custom Documentation Landing Pages with docmd"
description: "A comprehensive guide on landing pages."
---

## Problem

The default rendering for `index.md` in most generators looks like a standard wall-of-text documentation page. Generating a beautiful, high-converting product landing page usually requires spinning up a separate Next.js or React repository.

## Why it matters

Your documentation `index.md` is often the first interaction a developer has with your brand. First impressions matter. If it looks like a generic markdown parsed output, it fails to inspire confidence in your product's polish. 

## Approach

`docmd` provides `noStyle` page configurations, Hero containers, and extensive Grid architectures to convert any standard Markdown file into a premium Marketing-grade landing surface without requiring a separate web framework.

## Implementation

### 1. The Native Approach (Using Containers)
You can build a rich dashboard landing page entirely in markdown using grids and hero blocks.

```markdown
---
title: "Welcome"
titleAppend: false
---

::: hero
# Building the Future
Discover tools to launch your ideas faster.
:::

::: grids {cols=3}
::: grid
::: card "Quick Start" /start icon:rocket
Get up and running in 5 minutes.
:::
:::
<!-- More grids -->
:::
```

### 2. The Full Override (noStyle)
If you need complete pixel-perfect control (custom videos, external layout libraries), instruct `docmd` to step away entirely while still handling routing and output generation.

```yaml
---
title: "Product Homepage"
noStyle: true
---
```
`<div class="my-custom-html-dashboard">...</div>`

## Trade-offs

Utilizing `noStyle: true` means you forfeit the native docmd menubar, sidebar, and theme toggler for that specific HTML page. You take on the responsibility of coding a mobile-responsive navigation header from scratch and ensuring dark-mode CSS logic functions correctly via your own scripts.
"""
    },
    {
        "slug": "customisation/custom-fonts-branding.md",
        "content": """---
title: "Adding Custom Fonts and Branding to Your Documentation"
description: "A comprehensive guide on fonts & branding."
---

## Problem

White-labeling a documentation platform to seamlessly match your corporate identity is critical. The generic system font stack (`sans-serif`, `system-ui`) is highly performant but lacks distinct brand personality.

## Why it matters

Documentation isn't just an instruction manual; it's a brand touchpoint. If your SaaS landing page utilizes a crisp "Inter" font with distinct purple primary colors, your documentation should reflect that exact same aesthetic.

## Approach

`docmd` utilizes highly targeted CSS custom properties (variables) representing root layout tokens. Override these tokens in a custom stylesheet.

## Implementation

### 1. Define Variables 
Create an `assets/css/theme.css` file and override the `:root` variables.

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Brand Typography */
  --font-family-sans: "Outfit", system-ui, sans-serif;
  
  /* Brand Colors (Light Mode) */
  --color-primary: #8a2be2;      /* Purple Accent */
  --color-bg-body: #f8f9fa;      /* Off-white background */
}

/* Dark Mode Overrides */
[data-theme="dark"] {
  --color-bg-body: #0d1117;
}
```

### 2. Inject Globally
Register this script in your `docmd.config.js`.

```javascript
export default defineConfig({
  theme: {
    customCss: ['/assets/css/theme.css']
  }
});
```

## Trade-offs

Importing heavy @font-face rules from Google Fonts imposes an inevitable latency penalty that delays First Contentful Paint (FCP). To mitigate this, consider hosting your `.woff2` font files locally within the `assets/fonts/` directory and utilizing `font-display: swap` to ensure text remains visible while fonts lazily load.
"""
    },
    {
        "slug": "customisation/custom-favicons-metadata.md",
        "content": """---
title: "Implementing Custom Favicons and Metadata"
description: "A comprehensive guide on favicons & meta."
---

## Problem

The uncustomized state of any site leads to generic browser tabs (the default globe icon) and terrible social media previews when links are shared on Slack or Twitter, diminishing click-through rates.

## Why it matters

When an engineer pins your documentation tab, the Favicon is the only visual identifier they see. When they share an article internally, rich social previews containing branding and accurate titles validate the link's authority.

## Approach

`docmd` natively handles standard metadata injection automatically based on your configuration `url` and `description` root tags. However, customized favicons and distinct social (OpenGraph) images must be placed manually.

## Implementation

### 1. The Favicon Array
Generate your favicons (e.g., using a tool like realfavicongenerator.net) and place them in the `assets/` directory. Target them using the `head` array in `docmd.config.js`.

```javascript
export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/apple-touch-icon.png' }]
  ]
});
```

### 2. Page-Level Open Graph Images
If a specific major release post needs a custom banner image when shared, use the `image` frontmatter property explicitly on that markdown file.

```yaml
---
title: "Release v3.0: The Future"
image: "https://docs.mycompany.com/assets/v3-hero.png"
---
```
`docmd` will automatically extract this and map it to `og:image` and `twitter:image` tags in the `<head>`.

## Trade-offs

Managing custom `<head>` tags in the central JS config file requires hardcoding asset paths. If an asset is moved or renamed in your file system without updating the config array, `docmd` will not inherently throw a compilation error, and the image will 404 silently in production.
"""
    },
    {
        "slug": "customisation/extending-custom-plugins.md",
        "content": """---
title: "Extending docmd with Custom Plugins"
description: "A comprehensive guide on custom plugins."
---

## Problem

You have a hyper-specific internal requirement. For example, replacing all instances of the word `TODO-VER` with the actual version string pulled dynamically from a proprietary internal API server during build time. Native tools do not support this.

## Why it matters

Extensibility is the difference between a tool you outgrow in a year versus a framework that scales with you for a decade. Without an escape hatch, custom requirements force teams to maintain dirty shell-script wrappers around their builds.

## Approach

`docmd` utilizes a powerful, hook-based plugin architecture. You can inject Node.js logic at specific lifecycle phases (e.g., `preBuild`, `onRender`, `postBuild`) to arbitrarily modify the AST or HTML outputs.

## Implementation

Create a local javascript file that exports a valid `docmd` plugin object, and pass it directly to the configuration block.

```javascript
// plugins/version-injector.js
export default function VersionInjectorPlugin(options) {
  return {
    name: 'custom-version-injector',
    
    // Hook runs right before the site builds
    async preBuild(context) {
      this.versionData = await fetch('https://api.internal.com/version/latest').then(r => r.text());
    },

    // Hook intercepts HTML generated for every page
    onRender(html, pageContext) {
      if (!html) return html;
      return html.replace(/TODO-VER/g, this.versionData);
    }
  };
}
```

```javascript
// docmd.config.js
import VersionInjector from './plugins/version-injector.js';

export default defineConfig({
  plugins: {
    custom: [VersionInjector()]
  }
});
```

## Trade-offs

Writing custom plugins requires diving into Node.js asynchronous architecture. Furthermore, any custom logic running in the `onRender` loop applies to *every single page*. A slow regex or a heavy API call inside `onRender` will transform `docmd`'s native ~1-second execution time into a multi-minute crawl.
"""
    }
]

for item in final_batch:
    file_path = os.path.join(base_dir, item['slug'])
    print(f"Writing {file_path}")
    with open(file_path, 'w') as f:
        f.write(item['content'])

