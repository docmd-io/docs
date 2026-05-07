---
title: "Git Plugin"
description: "Repository-aware metadata, last-updated timestamps, and automated edit links derived from Git history."
---

The `@docmd/plugin-git` plugin adds repository intelligence to your documentation. It automatically displays when each page was last modified, who contributed to it, and provides an optional "Edit this page" link—all extracted directly from your Git history at build-time.

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

### Usage

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

## Features

- **Last Updated Timestamps**: Automatically shows when a page was last modified in the footer.
- **Commit History Tooltip**: Hovering over the timestamp reveals a list of recent commits for that specific page.
- **Automated Edit Links**: Provides a link to edit the source file on GitHub, GitLab, or Bitbucket.
- **Performance-First**: Git history is queried once and cached at build-time, ensuring zero impact on site performance.

## Usage

Once configured, the plugin works automatically. Timestamps and edit links appear in the page footer.

### Footer Example

::: callout info "Rendering Result"
The footer of this page (and all others in this documentation) is rendered by the Git plugin. Scroll to the bottom to see it in action—hover over the **Last updated** date to see the commit history.
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

## Localisation

The plugin includes built-in translations for English, German, and Chinese. Custom strings can be provided through the [UI Localisation](../configuration/localisation/ui-strings.md) system.