---
title: "Git Plugin"
description: "Display last-updated timestamps and commit history derived directly from your Git repository."
---

The **Git plugin** adds repository-aware metadata to your documentation pages. It displays when each page was last modified, who contributed, and provides an optional "Edit this page" link - all derived directly from your Git history with zero configuration.

::: callout info "Core Plugin"
The Git plugin is bundled with `@docmd/core` and enabled by default. It automatically detects if your project is in a Git repository and gracefully disables itself if not. No installation or configuration is required for basic functionality.
:::

## Features

### Last Updated Timestamps

Every page automatically displays when it was last modified, shown in the page footer alongside the edit link. The timestamp is derived from the most recent Git commit that touched the source file.

<!-- SCREENSHOT: Page footer showing "Last updated: 3 days ago" on the left and "Edit this page" on the right -->

Timestamps use relative formatting for recent changes ("2h ago", "3d ago") and switch to absolute dates for older content ("15 Mar 2026").

### Commit History Tooltip

Hover over the "Last updated" text to reveal a tooltip showing the most recent commits for that page. Each entry displays the commit message, author (with Gravatar avatar), and relative timestamp.

<!-- SCREENSHOT: Commit history tooltip showing 4-5 recent commits with author avatars and messages -->

This provides quick context about recent changes without leaving the page - useful for understanding what has been updated and by whom.

### Edit Links

When configured with a repository URL, the plugin displays an "Edit this page" link that opens the source file directly in your Git provider's web editor.

```javascript
plugins: {
  git: {
    repo: 'https://github.com/your-org/your-docs',
    branch: 'main'
  }
}
```

The plugin automatically detects GitHub, GitLab, and Bitbucket URLs and constructs the correct edit link format for each provider.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Repository URL (e.g. `https://github.com/org/repo`). Required for edit links. |
| `branch` | `string` | `'main'` | Branch name for edit links. |
| `editLink` | `boolean` | `true` | Show "Edit this page" link when `repo` is set. |
| `lastUpdated` | `boolean` | `true` | Show last updated timestamp. |
| `commitHistory` | `boolean` | `true` | Show commit history tooltip on hover. |
| `maxCommits` | `number` | `6` | Maximum commits to show in the tooltip. |
| `dateFormat` | `string` | `'relative'` | Timestamp format: `relative` (default), `iso`, or `locale-aware`. |

### Full Example

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    git: {
      repo: 'https://github.com/docmd-io/docs',
      branch: 'main',
      editLink: true,
      lastUpdated: true,
      commitHistory: true,
      maxCommits: 5
    }
  }
});
```

## Per-Page Control

Disable the Git plugin for specific pages using frontmatter:

```markdown
---
title: "Internal Notes"
plugins:
  git: false
---

This page won't show last updated or edit links.
```

## How It Works

The plugin reads Git history at build time using standard Git commands. For each markdown file:

1. Runs `git log` to fetch the commit history
2. Extracts timestamps, authors, and commit messages
3. Injects the data into the page context
4. Client-side JavaScript renders the UI components

::: callout tip "Performance"
Git data is cached during the build process. Each file's history is queried only once, regardless of how many times the page is rendered (e.g. across multiple locales).
:::

## Requirements

- The documentation source must be inside a Git repository
- Git must be available in the build environment
- Files must have at least one commit in their history

Pages without Git history (new files not yet committed) will not display timestamps or commit history.

## Migration from editLink

If you were previously using the `editLink` configuration option, the Git plugin provides the same functionality with additional features:

**Before (editLink config):**
```javascript
export default defineConfig({
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/org/repo/edit/main/docs',
    text: 'Edit this page'
  }
});
```

**After (Git plugin):**
```javascript
export default defineConfig({
  plugins: {
    git: {
      repo: 'https://github.com/org/repo',
      branch: 'main'
    }
  }
});
```

The Git plugin automatically constructs the edit URL from the repository and branch, so you no longer need to manually specify the full edit path.

::: callout warning "Deprecation Notice"
The standalone `editLink` configuration option is deprecated and will be removed in a future release. Please migrate to the Git plugin for edit link functionality.
:::

## Localisation

The plugin includes translations for all UI strings. Supported languages:

- English (en)
- German (de)
- Chinese (zh)

Custom translations can be provided through the standard [UI strings](../configuration/localisation/ui-strings.md) system.
