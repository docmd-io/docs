---
title: Built-in Variables Reference
description: Complete reference of all zero-config built-in variables automatically provided by docmd during build and runtime.
---

# Built-in Variables Reference

docmd automatically registers a rich set of built-in variables during every build. These variables require zero configuration and can be used immediately in markdown content, template banners, footer copyright strings, and meta tags.

## System & Build Variables

| Variable | Alias | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | The current docmd compiler version running the build. |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | The 4-digit calendar year when the documentation was built. |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | The ISO calendar date (YYYY-MM-DD) of the build. |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | The full ISO 8601 UTC timestamp of the build. |

::: callout info "Live System Variables" icon:sparkles
These variables are rendered live in this documentation build:
- **Compiler Version:** `v{{ docmd.version }}`
- **Calendar Build Year:** `{{ docmd.buildYear }}`
- **Build Timestamp:** `{{ docmd.buildTime }}`
:::

### Dynamic Copyright Year in Footer

In your `docmd.config.json`, use `\{{ docmd.buildYear }}` to ensure your copyright year stays up to date on every deployment automatically:

```json
{
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} Acme Technologies, Inc. All rights reserved."
  }
}
```

## Git & Repository Metadata

When running inside a Git repository, docmd inspects repository metadata to provide version control variables:

| Variable | Alias | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `git.commit`, `GIT_COMMIT` | `7a9b1c2` | The 7-character short SHA of the current Git commit. |
| `docmd.gitBranch` | `git.branch`, `GIT_BRANCH` | `main` | The current active Git branch name. |

### Displaying Commit Information in Markdown

Use escaped variable syntax in markdown to reference repository commit details:

```markdown
> This documentation was generated from commit `\{{ docmd.gitCommit }}` on branch `\{{ docmd.gitBranch }}` on \{{ docmd.buildDate }}.
```

::: callout info "Live Git Metadata" icon:git-branch
This documentation page was compiled from commit `{{ docmd.gitCommit || 'HEAD' }}` on branch `{{ docmd.gitBranch || 'main' }}` at {{ docmd.buildDate }}.
:::

## Site & Page Context Variables

docmd exposes contextual variables representing the project configuration and the currently rendered document:

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `site.title` | `docmd docs` | The site title configured in `docmd.config.json`. |
| `site.base` | `/` | The configured base URL path. |
| `page.title` | `Built-in Variables Reference` | The title of the current page (from frontmatter or `# First Heading`). |
| `page.slug` | `variables/built-in-variables` | The relative URL path or slug of the current page without file extensions. |
| `page.path` | `variables/built-in-variables.md` | The relative source markdown file path of the page. |

### Dynamic Page Header Context

```markdown
# Welcome to \{{ site.title }}

You are currently viewing **\{{ page.title }}** (`\{{ page.slug }}`).
```

::: card "Current Page Context" icon:file-text
- **Page Title:** {{ page.title }}
- **Page Slug:** `{{ page.slug }}`
- **Page File Path:** `{{ page.path }}`
- **Site Title:** {{ site.title }}
- **Site Base:** `{{ site.base || '/' }}`
:::

::: callout tip "Configuration Field Interpolation" icon:lightbulb
All built-in variables are also available across configuration fields like `layout.banners.top.content` and `footer.copyright`. They resolve during the pre-rendering compilation pass.
:::