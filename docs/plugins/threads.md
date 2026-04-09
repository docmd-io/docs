---
title: "Threads Plugin"
description: "Add inline discussion threads to your documentation — stored directly in your markdown files."
---

The **Threads plugin** brings collaborative inline comments to your documentation. Select any text on the page, leave a comment, start a discussion — all stored directly in your markdown source files with zero database needed.

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

## How It Works

1. **Select text** on any documentation page during `docmd dev`
2. A **comment popover** appears — write your comment and submit
3. The selected text gets **highlighted** with a thread marker
4. Threads are stored as `::: threads` blocks at the bottom of the markdown file
5. **No database** — your markdown files are the source of truth

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