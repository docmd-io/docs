---
title: "Git Plugin"
description: "Repository-aware metadata, last-updated timestamps, and automated edit links derived from Git history."
---

The `@docmd/plugin-git` plugin adds repository intelligence to your documentation. It extracts data directly from Git history at build time. It displays when a page was last modified, who contributed, and provides an optional "Edit this page" link.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Repository URL (e.g. `https://github.com/org/repo`). Required for edit links. |
| `branch` | `string` | `'main'` | Branch name for edit links. |
| `editLink` | `boolean` | `true` | Show "Edit this page" link when `repo` is set. |
| `lastUpdated` | `boolean` | `true` | Show last updated timestamp. |
| `commitHistory` | `boolean` | `true` | Show commit history tooltip on hover. |
| `maxCommits` | `number` | `5` | Maximum commits to show in the tooltip (if `commitHistory` is true). |
| `dateFormat` | `string` | `'relative'` | Timestamp format: `relative` (default), `iso`, or `locale-aware`. |

### Example

```json
{
  "plugins": {
    "git": {
      "repo": "https://github.com/org/repo",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## Features

- **Last-updated timestamps**: shown in the page footer.
- **Commit history tooltip**: hover the timestamp to see recent commits for the page.
- **Edit links**: optional links to edit the source file on GitHub, GitLab, or Bitbucket.
- **Build-time caching**: Git history is queried once and cached, so site performance is unaffected.

## Behaviour

Once configured, the plugin works automatically. Timestamps and edit links appear in the page footer.

### Footer Example

::: callout info "Rendering Result"
The footer of this page is rendered by the Git plugin. Scroll to the bottom to see it in action. Hover over the **Last updated** date to see the commit history.
:::

## Per-Page Control

Disable Git features for specific pages via frontmatter:

```markdown
---
title: "Internal Notes"
plugins:
  git: false
---
```

## CI/CD Integration

The Git plugin reads your repository history at build time using local Git commands. Many CI/CD providers use "shallow clones" by default (fetching only the last commit). This causes the plugin to show only the most recent change across all pages.

To ensure accurate timestamps and history, configure your CI environment to perform a full fetch.

::: tabs

== tab "GitHub Actions"

Add `fetch-depth: 0` to your checkout step:

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

Set the `GIT_DEPTH` variable to `0`:

```yaml
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify fetches the full history by default. If you encounter issues, ensure your build command has access to the `.git` directory.

:::

::: callout warning "Git Data Requirement"
The `.git` directory must be present in the build environment. If building inside a Docker container or restricted CI environment, ensure Git history is preserved and the `git` binary is installed.
:::

## Localisation

The plugin includes built-in translations for English, German, and Chinese. Custom strings can be provided through the [UI Localisation](../configuration/localisation/ui-strings.md) system.