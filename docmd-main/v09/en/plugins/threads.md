---
title: "Threads Plugin"
description: "Collaborative inline discussion threads and text highlighting stored natively inside Markdown files."
---

The `@docmd/plugin-threads` plugin enables collaborative inline commenting and text annotation across documentation pages. Highlights and discussion threads are stored natively inside Markdown source files using custom container blocks (`::: threads`). No external database is required.

Original Author: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha Release" icon:flask
This plugin is currently in Alpha. Core APIs and storage schemas are stable, whilst UI components are undergoing active iteration.
:::

## Installation & Setup

Install the plugin via CLI:

```bash
npx @docmd/core add threads
```

Enable thread configuration in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | When `true`, threads display in a dedicated panel; when `false`, threads attach inline to text highlights. |

### Global Configuration Example

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true
    }
  }
}
```

## Workflow Overview

1. **Text Selection**: Select prose during local live development (`npx @docmd/core dev`).
2. **Comment Popover**: Enter feedback in the popover modal.
3. **Anchor Injection**: Selected prose is highlighted with a thread identifier (`==highlighted text=={t-a1b2c3d4}`).
4. **Markdown Persist**: Thread structures append to the bottom of the Markdown file as a `::: threads` block.
5. **Git Synchronisation**: Discussion history is saved in source control alongside document edits.

## Interactive Preview

Text with attached discussions receives <span class="threads-preview-highlight">inline color highlights</span>. Thread cards render below:

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">Good idea - I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;12h ago</div>
    <div class="threads-preview-body">Perfect. A simple flowchart would be ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

Additional highlights cycle through <span class="threads-preview-highlight-blue">distinct color palettes</span> automatically:

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;3d ago</div>
    <div class="threads-preview-body">Should we mention backward compatibility here?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

Resolved discussions display in a dimmed state:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5d ago&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Resolved</span></div>
    <div class="threads-preview-body">Fixed the typo in the config example.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

A floating discussion trigger <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> displays unresolved thread counts in the bottom corner.

## Markdown Storage Format

Threads are saved inside document source files using container block syntax:

```markdown
# Engine Overview

Core architecture features ==highlighted text=={t-a1b2c3d4} with an attached thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text requires additional technical detail.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated with extra specifications.

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

## Core Features

* **Text Selection**: Highlight arbitrary prose to anchor new threads.
* **Threaded Replies**: Nested conversation threads.
* **Emoji Reactions**: Add reaction counters to comments.
* **Resolution State**: Mark threads as resolved with author attribution.
* **Author Identity**: Local Git credentials resolve avatar and profile details automatically.

## RPC Actions API

The Threads plugin exposes WebSocket RPC endpoints accessible via `docmd.call()`:

| RPC Method | Technical Description |
| :--- | :--- |
| `threads:get-threads` | Retrieve all parsed threads for a given file path. |
| `threads:add-thread` | Anchor a new thread and initial comment. |
| `threads:add-comment` | Append a reply to an existing thread. |
| `threads:edit-comment` | Update comment text body. |
| `threads:delete-comment` | Remove a comment entry. |
| `threads:delete-thread` | Remove thread container and clean up body highlight anchors. |
| `threads:resolve-thread` | Toggle thread resolution state. |
| `threads:toggle-reaction` | Add or remove emoji reactions. |

## Author Profile Storage

Author profiles are cached in `<docsRoot>/.threads/authors.json`:

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

::: callout tip "Git-Native Versioning" icon:git-commit
Because thread metadata resides entirely inside `.md` files, comments follow standard Git branching, pull request reviews, and commit history workflows.
:::