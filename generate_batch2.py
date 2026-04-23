import os

base_dir = '/Users/mac/Workspace/GitHub/docmd-io/docs/docs/en/guides'


workflows = [
    {
        "slug": "workflows-teams/setting-up-workflow.md",
        "content": """---
title: "Setting Up a Documentation Workflow for Teams Using docmd"
description: "A comprehensive guide on workflow setup."
---

## Problem

When teams lack a structured documentation workflow, updates are either forgotten or written as ad-hoc Slack messages. Content becomes fragmented, formatting becomes inconsistent, and technical writers spend more time formatting PRs than writing content.

## Why it matters

Without process, documentation rots. If deploying a documentation hotfix requires waiting on a core backend release cycle, the documentation will perpetually remain 2-3 weeks out of date. 

## Approach

Decouple documentation deployments from software deployments, but share the same Git-ops process (Branches -> PRs -> CI/CD Previews). `docmd`'s zero-config setup enables teams to treat documentation as code.

## Implementation

### 1. Separate Repository vs Monorepo
Depending on your company size, either:
- **Monorepo:** Keep a `docs/` folder in your root. Require documentation changes simultaneously with API changes in the same PR.
- **Separate Repo:** Best for large orgs. Engineers update OpenAPI specs separately, and technical writers pull those generated schemas into the isolated docmd repo.

### 2. Linting and Validation
Add Husky hooks to run `docmd build` on pre-commit. `docmd` will automatically validate broken relative links and malformed frontmatter.

```json
// package.json
"scripts": {
  "test:docs": "docmd build --strict"
}
```

## Trade-offs

Treating "docs as code" imposes an engineering barrier on non-technical contributors (e.g., Product Managers). They must learn Git and Markdown just to fix a typo. You will need to rely heavily on GitHub's web-editor UI or integrate headless CMS platforms for less technical members.
"""
    },
    {
        "slug": "workflows-teams/git-based-workflows.md",
        "content": """---
title: "Using Git-Based Workflows for Documentation Contributions"
description: "A comprehensive guide on git-based flows."
---

## Problem

Allowing anyone to push documentation straight to master results in broken links, duplicated sections, and stylistic nightmares. However, imposing too much friction discourages external contributors.

## Why it matters

Open-source projects and internal developer platforms survive on community contributions. If a user finds a typo, they should be able to fix it in 60 seconds.

## Approach

Use the "Fork & Pull Request" model bolstered by automated CI checks. `docmd` integrates flawlessly with this model because it natively operates on flat markdown files.

## Implementation

### 1. Enable Edit Links
`docmd` provides built-in support for "Edit this page" links in the footer of every document.

```javascript
// docmd.config.js
export default defineConfig({
  editLink: {
    pattern: 'https://github.com/my-org/my-docs/edit/main/docs/:path',
    text: 'Edit this page on GitHub'
  }
});
```

When a user clicks this, GitHub's web UI opens, automatically handles forking the repo on their behalf, and opens a PR upon save.

### 2. The Threads Plugin
For inline reviews, use the `@docmd/plugin-threads` module locally so authors can drop discussion nodes (`::: thread`) into PRs. This keeps review conversations contextualized with the text block directly in the Vscode diff.

## Trade-offs

Relying entirely on GitHub PRs for docs can slow down urgent announcements (e.g., posting a quick notice about a server outage) if branch protection rules require multiple approvals. Consider having an exemption process or a simple automated status-page integration.
"""
    },
    {
        "slug": "workflows-teams/previewing-changes.md",
        "content": """---
title: "Previewing Documentation Changes Before Deployment"
description: "A comprehensive guide on preview changes."
---

## Problem

Authors often write markdown, guess the formatting, and merge it. In production, tables break out of their containers, images fail to load due to incorrect relative paths, and nested lists render incorrectly.

## Why it matters

A broken container or unrendered React component in production looks incredibly unprofessional and ruins the reader's trust in the technical accuracy of the content.

## Approach

Implement ephemeral preview environments using Vercel, Netlify, or Cloudflare pages tied to your PR webhooks.

## Implementation

1. **Configure CI/CD Integrations:**
Because `docmd` uses zero custom runtimes and outputs standard HTML, platforms like Vercel automatically detect it as a static project.

2. **Pull Request Automations:**
When a PR is opened, the CI/CD pipeline runs `npx @docmd/core build` and hosts the output on a temporary domain (e.g., `pr-123.docs.mycompany.com`).

3. **Live Editor APIs:**
For authors who need a local preview before pushing, `docmd dev` utilizes HMR (Hot Module Replacement). Saving a `.md` file updates the browser instantaneously.

## Trade-offs

Generating a full static site build on every single commit in a PR can consume CI/CD minutes and bloat hosting bills for very large sites (1000+ pages). Consider configuring your CI to only build documentation if files in the `docs/` folder have actually changed.
"""
    },
    {
        "slug": "workflows-teams/maintaining-consistency.md",
        "content": """---
title: "Maintaining Consistency Across Large Documentation Teams"
description: "A comprehensive guide on consistency at scale."
---

## Problem

Every technical writer has a different style. Some use `*` for italics, others use `_`. Some say "Click here", others say "Select the element". Over time, the document reads like a patchwork quilt written by ten different people.

## Why it matters

Consistency breeds familiarity. When users are learning complex APIs, changing vocabulary mid-tutorial forces them to pause and translate terminology. "Wait, is an 'Instance' the same as a 'Node'?"

## Approach

Enforce consistency mechanically using linters, rather than relying solely on human review. Combine `markdownlint`, Vale (for prose), and `docmd`'s strict parsing.

## Implementation

### 1. Vale Prose Linter
Install Vale to enforce terminology, tone, and brand safety.

```ini
# .vale.ini
MinAlertLevel = suggestion
Packages = Microsoft
[*]
BasedOnStyles = Vale, Microsoft
```

### 2. Standardized docmd Containers
Force writers to use built-in, thematic `docmd` containers for warnings instead of improvising with bold text.

```markdown
<!-- Reject this in PRs -->
**Warning:** Do not format the disk.

<!-- Require this -->
::: callout warning
Do not format the disk.
:::
```
Use `markdownlint` to blacklist custom HTML elements to force usage of thematic containers.

## Trade-offs

Aggressive linting frustrates new contributors. If a community member fixes a typo but the PR fails because they used the passive voice (flagged by Vale), they might abandon the PR out of frustration. Always ensure open-source contribution linters are less strict than internal ones.
"""
    },
    {
        "slug": "workflows-teams/versioning-release-workflows.md",
        "content": """---
title: "Versioning and Release Workflows for Documentation Systems"
description: "A comprehensive guide on release workflows."
---

## Problem

Releasing software `v2.0` simultaneously with the `v2.0` documentation is stressful. Often, the docs are updated on the live site before the code is actually deployed (confusing current users) or deployed days after (confusing new users).

## Why it matters

Desync between code behavior and documentation behavior is the #1 cause of developer frustration. Accuracy must map strictly to chronography.

## Approach

Isolate active development documentation into a "Next" or "Beta" version directory using `docmd`'s version engine, and only promote it to "Current" upon semantic release.

## Implementation

During the development cycle of `v2.0`:

1. Maintain `docs/` as the current `v1.0` production environment.
2. Create a `docs-next/` directory for writers to draft `v2.0` features asynchronously.

```javascript
// docmd.config.js
export default defineConfig({
  versions: {
    current: 'v1.0',
    all: [
      { id: 'v1.0', dir: 'docs', label: 'v1.0 (Stable)' },
      { id: 'next', dir: 'docs-next', label: 'v2.0 (Beta)' }
    ]
  }
});
```

*When Release Day arrives:*
1. Rename `docs/` to `docs-v1/`.
2. Rename `docs-next/` to `docs/`.
3. Update config: `current: 'v2.0'`.

This workflow ensures PRs for the new version can be merged continuously without accidentally leaking beta documentation to stable users.

## Trade-offs

This approach requires writers to maintain two separate folders simultaneously for months. If a hotfix typo is corrected in `docs/` (v1.0), the writer must deliberately cherry-pick that fix into `docs-next/` (v2.0) to prevent the typo from returning upon release promotion.
"""
    },
    {
        "slug": "integrations/openapi-generation.md",
        "content": """---
title: "Generating API Documentation from OpenAPI with docmd"
description: "A comprehensive guide on openapi generation."
---

## Problem

Manually maintaining API documentation means that the moment an engineer changes a REST endpoint, the documentation is immediately obsolete.

## Why it matters

Inaccurate API references directly cause integration failures for your clients. Manually syncing payload schemas is tedious, error-prone, and a waste of engineering time.

## Approach

Use an asynchronous pipeline to convert `swagger.json` or `openapi.yaml` into static `docmd` Markdown files. Since `docmd` natively supports complex layouts (Grids, Callouts, Code blocks), the generated output looks highly curated.

## Implementation

There is no native OpenAPI plugin in `docmd` yet, but it integrates perfectly with standard generators like `widdershins` or custom scripts.

1. **The Build Step**
Add a pre-build step in `package.json` to fetch the schema and generate markdown.

```json
"scripts": {
  "prebuild": "npx widdershins --search false --language_tabs 'shell:cURL' 'javascript:Node' openapi.yaml -o docs/api/reference.md",
  "build": "docmd build"
}
```

2. **Layout Overrides**
Force API reference pages into a "fullscreen" or "no-sidebar" layout to accommodate wide JSON response tables using frontmatter.

```yaml
---
title: "API Reference"
layout: "fullscreen"
---
```

## Trade-offs

Widdershins-generated markdown can be dense and lacks the "human touch" of handwritten guides. We highly recommend using OpenAPI generation purely for the **Reference** section, and keeping handwritten guides for the **Tutorials**, utilizing docmd routing to link between them seamlessly.
"""
    },
    {
        "slug": "integrations/github-actions-cicd.md",
        "content": """---
title: "Integrating docmd with GitHub Actions for CI/CD"
description: "A comprehensive guide on github actions."
---

## Problem

Building and deploying documentation manually from a local machine leads to unpredictable environments (e.g., someone deploying with the wrong node version) and blocks deployments when the "deployment engineer" is on vacation.

## Why it matters

Continuous Deployment is mandatory for modern SaaS. Documentation updates should reach production within 3 minutes of a merged Pull Request automatically.

## Approach

Leverage GitHub Actions to run the `docmd build` pipeline on an Ubuntu runner, and push the `site/` output securely via SSH to your VPS or natively to GitHub Pages.

## Implementation

### Standard GitHub Pages Deploy

Create `.github/workflows/docs.yml`:

```yaml
name: Deploy docmd to GitHub Pages
on:
  push:
    branches: ["main"]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 22 }
      
      # Build
      - run: npm i -g @docmd/core
      - run: docmd build
      
      # Deploy using peaceiris action
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

Ensure your `docmd.config.js` sets the `url` properly if deploying to a subpath (e.g., `https://user.github.io/repo/`).

## Trade-offs

Relying entirely on GitHub Actions means relying on Microsoft's uptime. Additionally, managing edge-caching invalidations (e.g., purging Cloudfront caches via GH Action script) requires careful IAM secret management.
"""
    },
    {
        "slug": "integrations/existing-markdown-repos.md",
        "content": """---
title: "Using docmd with Existing Markdown Repositories"
description: "A comprehensive guide on existing repos."
---

## Problem

You have an established repository with thousands of raw Markdown files (e.g., an Obsidian Vault, a Hugo blog, or a legacy wiki directory). Converting all frontmatter and syntax manually to fit a new engine is impossible.

## Why it matters

Vendor lock-in is dangerous. A high-quality documentation engine should map to your files, rather than forcing your files to map to the engine.

## Approach

`docmd` adheres to strict CommonMark specifications and requires **zero configuration**. You can point `docmd` at any existing markdown directory and it will intelligently bootstrap itself without altering your files.

## Implementation

Navigate to your existing markdown folder and execute:

```bash
cd my-obsidian-vault/
npx @docmd/core dev
```

1. **Auto-Navigation:** If `navigation.json` is missing, `docmd` recursively maps your folder structure, capitalizes folder names, and generates an automatic sidebar taxonomy.
2. **Title Inference:** If frontmatter `title` is missing, `docmd` extracts the first `# H1` tag from the markdown.
3. **Syntax Fallback:** Unsupported legacy shortcodes are safely rendered as raw text rather than throwing compilation errors.

## Trade-offs

Auto-generated sidebars sort alphabetically by filename. If you have "01-Intro.md" and "02-Setup.md", the engine will render them accurately, but using random filenames like "install.md" and "welcome.md" will sort alphabetically (Install before Welcome). Transitioning to a manual `navigation.json` is recommended for production aesthetics.
"""
    },
    {
        "slug": "integrations/migrating-docusaurus.md",
        "content": """---
title: "Migrating Documentation from Docusaurus to docmd"
description: "A comprehensive guide on from docusaurus."
---

## Problem

Docusaurus is a phenomenal tool, but its reliance on heavy React runtimes, complex Webpack/Babel configurations, and slow build times for large sites prompts many users to seek lightweight alternatives.

## Why it matters

Migrating between frameworks often means rewriting thousands of pages due to proprietary Markdown abstractions (MDX vs MD). 

## Approach

`docmd` was designed as a drop-in replacement for standard Markdown/MDX content. While we do not execute React components in markdown, `docmd`'s native Container syntax perfectly polyfills 90% of Docusaurus' custom Admonitions and Tabs.

## Implementation

### 1. The Admonition Translation
Docusaurus uses `:::note`. `docmd` uses the same syntax dynamically via `::: callout info`.

To migrate without editing files, simply map Docusaurus classes via CSS arrays if needed, or run a one-time global find/replace:
- `:::note` -> `::: callout info`
- `:::danger` -> `::: callout danger`

### 2. MDX Components
If your Docusaurus docs are littered with `<MyCustomReactComponent />`, this will render as raw text in `docmd`. You must replace these with `docmd` HTML injection or custom plugins.

### 3. Navigation
Copy your `sidebars.js` logic and translate it into a single `navigation.json` array. `docmd` dramatically simplifies the nesting logic, relying on simple `children` arrays instead of category objects.

## Trade-offs

Losing MDX support means you can no longer script arbitrary Javascript loops directly inside your markdown files. `docmd` enforces a strict separation of concerns: Logic belongs in scripts, Content belongs in Markdown.
"""
    },
    {
        "slug": "integrations/migrating-mkdocs.md",
        "content": """---
title: "Migrating Documentation from MkDocs to docmd"
description: "A comprehensive guide on from mkdocs."
---

## Problem

Python-reliant teams have utilized MkDocs (and MkDocs Material) for years. However, wrestling with `pip` dependency environments, `requirements.txt` mismatches in CI, and Python versioning can be frustrating for JS/TS heavy organizations.

## Why it matters

Consolidating your documentation toolchain into the NPM ecosystem (where the rest of your web developers operate) improves internal contribution rates and speeds up your Vercel/Netlify deployments.

## Approach

`docmd` embraces highly similar paradigms to MkDocs Material (native versioning, search, tabs). The primary migration effort revolves around moving `mkdocs.yml` logic into `docmd.config.js`.

## Implementation

1. **Move Configuration:**
Translate your YAML configuration to JS.
```yaml
# mkdocs.yml
site_name: My Project
theme:
  name: material
  palette:
    scheme: slate
```

Becomes:
```javascript
// docmd.config.js
export default defineConfig({
  title: 'My Project',
  theme: { appearance: 'dark' }
});
```

2. **Admonitions & Plugins:**
MkDocs `!!! warning` admonitions use a different syntax. Use a quick regex substitution to convert them to `docmd` callouts:
- Search: `!!! warning "(.+)"`
- Replace: `::: callout warning "$1"`

3. **Versioning:**
Replace the complex `mike` mkdocs plugin with `docmd`'s native `versions:` array. `docmd` handles the compilation natively without needing external python utilities.

## Trade-offs

MkDocs Material has an absolutely massive plugin ecosystem via PyPI (e.g., pdf exporters, strict linters). While `docmd`'s plugin ecosystem is modern and growing, you may find specific obscure MkDocs plugins do not yet have 1:1 Javascript equivalents in `docmd`.
"""
    },
    {
        "slug": "integrations/alongside-other-tools.md",
        "content": """---
title: "Using docmd Alongside Other Documentation Tools"
description: "A comprehensive guide on parallel tools."
---

## Problem

Large enterprises rarely use a single tool. Your company might use Confluence for internal specs, Stoplight for APIs, and want `docmd` for user-facing SDK tutorials. Integrating these disparate silos into a seamless user journey is critical.

## Why it matters

If a user clicks an SDK method and is thrown into a jarring, completely unstyled Swagger UI hosted on a different subdomain, context is lost, and the developer experience shatters.

## Approach

Utilize `docmd` as your "Glass Pane" routing hub. Use its powerful menubar linking and container embedding capabilities to unify tools without replacing them.

## Implementation

### 1. Iframe Embeds
If you use a hosted API explorer (like ReadMe or Scalar), you can embed it directly inside a `docmd` container, keeping the user encompassed by your docmd sidebar and layout.

```markdown
::: embed "https://api.mycompany.com/explorer"
:::
```

### 2. Header and Routing Unification
If you must use separate subdomains (`docs.site.com` and `api.site.com`), replicate the `docmd` menubar globally. You can use docmd's `layout` config to map external URLs precisely.

```javascript
// docmd.config.js
export default defineConfig({
  layout: {
    menubar: {
      left: [
        { text: 'SDK Guides', url: '/' }, // Handled by docmd
        { text: 'REST API', url: 'https://api.site.com', external: false } // Avoids opening a new tab
      ]
    }
  }
});
```

## Trade-offs

Iframe embedding creates "scroll within a scroll" UX issues on mobile devices. Furthermore, using `docmd` purely as a router means your global search index (`docmd-search`) will not be able to natively index the content buried in external tools like Confluence or Stoplight unless you write custom scraping scripts.
"""
    }
]

for item in workflows:
    file_path = os.path.join(base_dir, item['slug'])
    print(f"Writing {file_path}")
    with open(file_path, 'w') as f:
        f.write(item['content'])

