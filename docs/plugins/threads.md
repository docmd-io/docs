---
title: "Threads Plugin — docmd Documentation"
description: "Add inline discussion threads to your documentation — stored directly in your markdown files."
---

The **Threads plugin** brings collaborative inline comments to your documentation. Select any text on the page, leave a comment, start a discussion — all stored directly in your markdown source files with zero database needed.

Original Author: [@svallory](https://github.com/svallory)

::: callout info "Alpha Release"
This plugin is in alpha. The API and storage format are stable, but the UI is under active development.
:::

## Setup

```bash
docmd add threads
```

```javascript
plugins: {
  threads: {}
}
```

### Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | When `true`, threads stay grouped at the bottom of the page. When `false` (default), threads are positioned inline next to their highlighted text. |

```javascript
// Keep threads at bottom of page instead of inline
plugins: {
  threads: {
    sidebar: true
  }
}
```

## How It Works

1. **Select text** on any documentation page during `docmd dev`
2. A **comment popover** appears — write your comment and submit
3. The selected text gets **highlighted** with a thread marker
4. Threads are stored as `::: threads` blocks at the bottom of the markdown file
5. **No database** — your markdown files are the source of truth

## Preview

Here's what threads look like on a live page. Text with discussions gets <span class="threads-preview-highlight">highlighted like this</span> and thread cards appear below.

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">Good idea — I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
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

And here's a <span class="threads-preview-highlight-blue">second highlight with a different color</span> — threads cycle through a palette of colors automatically.

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

Resolved threads appear dimmed:

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

A floating **discussion button** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> appears in the bottom-right corner showing the count of open threads. Click it to jump to the first thread on the page.

## Storage Format

Threads are embedded in your markdown using docmd's container syntax:

```markdown
# My Documentation Page

Some content with ==highlighted text=={t-a1b2c3d4} that has a thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text needs clarification.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated it — does this work?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

The `==text=={threadId}` syntax links highlighted text in the document body to a specific thread.

## Features

| Feature | Description |
| :--- | :--- |
| **Text Selection** | Select any text to start a new thread |
| **Replies** | Nested reply chains within each thread |
| **Reactions** | Emoji reactions on individual comments |
| **Edit / Delete** | Modify or remove your comments |
| **Resolve** | Mark threads as resolved with author + timestamp |
| **Author Profiles** | Git-based author detection with Gravatar support |
| **Highlight Markers** | Visual indicators on the page showing where threads are anchored |
| **Floating Button** | Quick-access FAB with open thread count |
| **Scroll Preservation** | Page stays in place after adding comments |

## Actions API

The threads plugin exposes the following actions via the WebSocket RPC system. These can be called from browser plugins using `docmd.call()`:

| Action | Description |
| :--- | :--- |
| `threads:get-threads` | Parse and return all threads from a file |
| `threads:add-thread` | Create a new thread with its first comment |
| `threads:add-comment` | Add a comment to an existing thread |
| `threads:edit-comment` | Edit an existing comment's body |
| `threads:delete-comment` | Remove a comment from a thread |
| `threads:delete-thread` | Remove an entire thread and cleanup highlights |
| `threads:resolve-thread` | Toggle resolved/unresolved status |
| `threads:toggle-reaction` | Toggle an emoji reaction on a comment |
| `threads:get-authors` | Read the author profile map |
| `threads:upsert-author` | Create or update an author profile |

## Author Profiles

Author information is stored in `<docsRoot>/.threads/authors.json`:

```json
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

During development, the plugin automatically detects your git username and email for author identification.

::: callout tip "Version Control Friendly"
Since threads are stored in your markdown files, they are automatically version-controlled with git. Review comments in PRs, track discussion history, and collaborate through your existing workflow.
:::