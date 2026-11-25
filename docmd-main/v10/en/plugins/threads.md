---
title: "Threads Plugin"
description: "Inline comments and review threads, stored in your Markdown files. Works under docmd dev and docmd serve, with optional git sync."
---

The `@docmd/plugin-threads` plugin lets readers select text on a page and comment on it. Comments are stored in the page's own Markdown file, in `::: threads` blocks. There is no database: comments live in your repository, next to the text they discuss.

Comments start as private drafts. A commenter publishes them as one **review**, the way a code review works. Under [`docmd serve`](../deployment/docmd-serve), comments are tied to the identity your reverse proxy sends, permissions apply, and published reviews can be committed and pushed to a git branch.

Original Author: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha Release" icon:flask
This plugin is currently in Alpha. Core APIs and storage schemas are stable, whilst UI components are undergoing active iteration.
:::

## Installation

```bash
npx @docmd/core add threads
```

Then enable it in `docmd.config.json`. With no options, every default applies:

```json "docmd.config.json"
{
  "plugins": {
    "threads": {}
  }
}
```

See the [options reference](#options-reference) for everything you can set.

## Where it runs

Threads needs a live server: the page talks to the server over a WebSocket to read and write comments.

* **`docmd dev`**: always on. Anyone using the dev server can comment. The commenter types a name, and no permission is enforced.
* **`docmd serve`**: on when [`serve.actions`](../deployment/docmd-serve#plugin-actions) is enabled. Commenters are identified by your reverse proxy, and [permissions](#under-docmd-serve-permissions) apply.
* **`docmd build`**: the comment UI is left out of static builds. Existing `::: threads` blocks and `==text=={t-...}` marks still parse cleanly. Set `"devOnly": false` in `plugins.threads` to bundle the client assets anyway.

## Interactive Preview

Text with attached discussions receives <span class="threads-preview-highlight">inline colour highlights</span>. Thread cards render below:

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
      <div class="threads-preview-reaction">+1 <span>2</span></div>
      <div class="threads-preview-reaction">Idea <span>1</span></div>
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

Additional highlights cycle through <span class="threads-preview-highlight-blue">distinct colour palettes</span> automatically:

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
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5d ago&nbsp;&nbsp;<span class="threads-preview-resolved-badge">Resolved</span></div>
    <div class="threads-preview-body">Fixed the typo in the config example.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

A right-docked tab trigger <span class="threads-preview-fab"><span class="threads-preview-fab-badge">2</span></span> hugs the right edge of the viewport, displaying unresolved thread counts. Hovering over any highlighted text reveals an inline comment preview card directly within the content, while clicking the tab opens the discussion drawer. Threads persist smoothly across drawer open and close states without reloading the page.

## How comments are stored

Published comments are written into the page they belong to. The highlighted text gets a mark with the thread id, and the threads go into a `::: threads` block:

```markdown
# Engine Overview

Core architecture features ==highlighted text=={t-a1b2c3d4} with an attached thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: anchor
      highlighted text
    :::

    ::: comment c-e5f6a7b8 "Alice" "2026-04-09" by alice review r-1a2b3c4d
      This text requires additional technical detail.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-10" reply-to c-e5f6a7b8 by bob review r-5e6f7a8b
      Updated with extra specifications.

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

* `::: thread <id>` holds one thread. A resolved thread reads `::: thread <id> resolved "<name>" "<date>"`.
* `::: anchor` keeps the quoted text, so the thread can still show what it was about if the text changes.
* `::: comment <id> "<name>" "<date>"` is one comment. It may be followed by `reply-to <id>`, `edited "<date>"`, `by <author key>` and `review <review id>`, in that order, each only when set.
* `by` is the commenter's author key: under `docmd serve`, the identity your proxy sends. `review` is the review that published the comment.
* A page can have several `::: threads` blocks. All of them are read. New threads go into the last block; a block is added at the end of the page only when the page has none. A `::: threads` example inside a code fence, like the one above, is ignored.

Older pages without `by`, `review` or `::: anchor` still parse as before.

## Drafts and reviews

Comments are not written to the page right away. Each new thread, reply, edit, delete, resolve and reaction goes into the commenter's private **draft journal**. Only the commenter sees their drafts, marked with a Draft badge. Other readers see the page as published.

When the commenter publishes, all their drafts are written into the pages at once, as one **review**. Every page is written, or none is. If a draft's target is gone (for example, someone deleted the thread meanwhile), that change is skipped and the rest is published.

### Auto-publish and collect mode

Each commenter has a mode, kept in their journal:

* **Auto**: drafts publish by themselves `autoPublish.seconds` after the last change (180 seconds by default). The countdown is shown in the review section and survives a page reload.
* **Collect**: drafts wait until the commenter presses **Publish**.

The play/pause button switches between them. `autoPublish.startOn` sets the mode a new commenter starts in (`true` means auto). Set `autoPublish` to `false` to make the site collect-only: there is no play/pause button and nothing publishes by itself.

### Review title and summary

While a commenter has unpublished comments, the review section shows a **Review title** and a **Summary** field. Saving them restarts the auto-publish countdown.

* The title is one line, at most 120 characters. Without one, the review gets a default title such as `Comments by Alice: 3 comments on Engine Overview, +1 page`.
* The summary is optional, keeps its line breaks and is cut to 2000 characters.
* With [git sync](#git-sync), the title is the commit subject and the summary is the commit body.

The next review starts with an empty title and summary.

### Discarding a review

* **Your open review**: **Discard** drops all your unpublished comments after a confirmation. No page is written.
* **A published review**: its author, or an admin, can discard it from the Reviews tab. The threads it started are removed with their replies and highlights. Replies it added are removed. Its edits, deletes, resolves and reactions are undone. The review stays in the list, marked Discarded.

Under `docmd dev` anyone can discard any review.

## The review drawer

On a live page, the threads drawer has two tabs.

* **Threads** lists the page's threads. Threads whose highlighted text is no longer in the page are listed in their own **Orphaned** group, with their stored quote. The drawer also tells you how many of your own threads lost their anchor, across the whole site.
* **Reviews** lists every review, newest first: title, author, date, a Published or Discarded badge, and a link to each comment. A published review shows **Discard** when you may discard it.

At the bottom of the drawer, the **review section** shows your unpublished comment count, **Publish**, the auto/collect button with its countdown, **Discard**, and the title and summary fields. It keeps working while the drawer is closed, so auto-publish fires on time. With the drawer closed, the tab handle shows a marker with your unpublished comment count.

A link to `<page>#thread-<id>` scrolls to that thread and flashes it.

## Under docmd serve

### Identity

docmd has no login of its own. Under `docmd serve`, the commenter is whoever your authenticating reverse proxy says they are, through the header named in [`serve.actions.identityHeader`](../deployment/docmd-serve#plugin-actions-identity-behind-a-reverse-proxy). The page never asks for a name, and whatever name or key the page sends is ignored.

```json "docmd.config.json"
{
  "serve": {
    "actions": {
      "enabled": true,
      "origins": ["https://docs.example.com"],
      "identityHeader": "x-auth-request-user"
    }
  }
}
```

The header must carry a **stable user id**, not an e-mail address. For oauth2-proxy, use `X-Auth-Request-User`, not `X-Auth-Request-Email`.

The identity becomes the author key. It is written into your Markdown (`by <key>`) and into `.threads/authors.json`, and `authors.json` is embedded in every page of the site. An e-mail address there would be published to every reader and kept in your git history. So, under `docmd serve`, an identity that looks like an e-mail address is refused for every write with `threads/email-identity`. Reads still work, without drafts, as for an anonymous reader. The server logs one warning, without the value.

A request without the header can read threads but cannot write: writes are refused with `threads/no-identity`.

Display names and avatars come from `.threads/authors.json`. Each commenter sets their own in the identity panel and can only change their own entry. Without an entry, the name shown is the author key.

::: callout warning "Only trust a header your proxy controls" icon:shield-alert
See [Identity behind a reverse proxy](../deployment/docmd-serve#plugin-actions-identity-behind-a-reverse-proxy). If clients can set the header themselves, anyone can comment as anyone.
:::

### Permissions

Under `docmd serve`:

* A comment can be edited or deleted by its author. A comment with no author key can be edited or deleted only by an admin.
* A thread can be deleted by the author of all its published comments.
* Deleting the opening comment of a thread that has replies removes the whole thread, so only an admin can do it.
* Resolving a thread follows `permissions.resolve`: `"anyone"` (the default) lets every identified commenter resolve, `"author"` only the thread's author.
* A published review can be discarded by its author.
* Admins, listed by author key in `permissions.admins`, can do all of the above on anyone's comments. They cannot change someone else's profile.
* Your own drafts are always yours to change.

A refused action returns `threads/forbidden`. The page hides the buttons you cannot use. The admin list is never sent to the page.

Under `docmd dev` nothing is enforced.

## Git sync

With the `git` option, every published review under `docmd serve` becomes one commit pushed to a branch, and the server pulls that branch to pick up what other people changed. Under `docmd dev` the option is ignored: the server logs one line saying so and runs no git command.

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "git": {
        "branch": "main"
      }
    }
  }
}
```

Start the server with a token that can push to the branch:

```bash
DOCMD_THREADS_GIT_TOKEN=<token> npx @docmd/core serve
```

`docmd serve` refuses to start when `git` is set and `DOCMD_THREADS_GIT_TOKEN` is unset or empty. The token is passed to git through a credential helper, with the user name `x-access-token`. It never appears in a command argument, a remote URL, a file, a log line or an error. Use an HTTPS remote: the credential helper answers HTTPS only.

### What a publish does

1. Fetches the branch and resets the server's checkout to it.
2. Writes the review into the pages, as without git.
3. Makes one commit with the touched pages and the review's record. The commenter is the commit author; `git.committer` is the committer.
4. Pushes it to the branch.

The commit subject is the review title followed by `git.skipDeployMarker` (`[skip ci]` by default), so your CI can skip a deploy for a comment-only commit. The review summary, when set, is the commit body.

Discarding a published review is one more commit, `revert(threads): discard review "<title>" [skip ci]`, authored by whoever discards it. Discarding your own open review makes no commit.

If the push is rejected because the branch moved, the server fetches again, applies the review on the new head and pushes again, up to 3 attempts in all. If it still fails, or a fetch or commit fails, the commenter gets `threads/push-failed`. Nothing is left half done: the review stays open with all its comments and can be published again.

With git sync on, a change to your display name or avatar waits in your journal and goes out with your next publish. A profile change alone counts as one unpublished change and is committed as `<name> updated their profile [skip ci]`.

### Pulling other people's changes

Every `git.pullSeconds` (60 by default) the server fetches the branch. When it moved, the server resets its checkout to it and rebuilds what changed: only the edited pages when every change is an edited Markdown page, otherwise the whole site. A failed pull or rebuild is logged on one line and retried on the next tick. Draft journals are ignored by git and survive the reset.

::: callout warning "The server owns its checkout" icon:git-branch
Every publish, discard and pull resets the checkout to the remote branch. Do not edit files in the server's working tree: commit and push them to the branch instead.
:::

### Startup check

Because of that reset, `docmd serve` refuses to start (`threads/config`) when the checkout holds work the remote branch does not have:

* changes to tracked files;
* untracked pages, `.threads/authors.json` or review records under the docs source;
* local commits that are not on the remote branch.

The error lists the files and commits. Ignored files and other untracked files do not count, and a checkout that is only behind the remote starts normally.

To keep that work instead, start once with `DOCMD_THREADS_GIT_COMMIT_PENDING=1` (or `true`). The server puts the local commits and one commit of the listed changes on top of the remote branch, pushes them, and only then moves the checkout. If that fails (a conflict, a rejected push), the checkout is left exactly as it was and the server does not start. This needs git 2.40 or later.

### Commit author e-mail

By default a commit's author e-mail is `<author key>@threads.invalid`. The commenter's identity is never used as an e-mail address.

To use the commenter's real address, set `git.authorEmailHeader` to a header your proxy sends with it, for example `X-Auth-Request-Email`. The header is read only while making that commenter's commit, and only under `docmd serve`. The address goes into the commit author and nowhere else: it is not stored in any file, log line, error or response. If the header is missing or does not hold a valid address, the `@threads.invalid` fallback is used.

Only set `authorEmailHeader` when your proxy removes any copy of that header the client sent.

## Limits

Two limits guard against a runaway script or agent posting comments. They are not a moderation feature.

* `limits.maxCommentChars` (default `5000`): the longest comment body, counted in characters (Unicode code points). It applies to new threads, replies and edits. A longer body is refused with `threads/limit-chars`.
* `limits.commentsPerMinute` (default `10`): how many new threads and replies one author key may add in any 60 seconds. The next one is refused with `threads/rate-limited`. Edits, deletes, resolves, reactions and review actions are not counted.

A refused comment is not saved. The comment box keeps the typed text and shows a short message: "This comment is too long. Shorten it and try again." or "You are commenting too fast. Wait a minute and try again."

The counters are kept in memory and reset when the server restarts. Both limits apply under `docmd dev` and `docmd serve`.

## Options reference

All options go under `plugins.threads`. An invalid value is reported as a `threads/config` error that names the option, and `docmd serve` does not start.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Show threads in a dedicated panel instead of inline next to the highlights. |
| `devOnly` | `boolean` | `true` | Leave the client assets out of static builds. Set `false` to bundle them. |
| `autoPublish` | `false` or object | `{ "seconds": 180, "startOn": true }` | `false` makes the site collect-only. |
| `autoPublish.seconds` | `number` | `180` | Seconds after the last change before drafts publish in auto mode. Must be positive. |
| `autoPublish.startOn` | `boolean` | `true` | Whether a new commenter starts in auto mode. |
| `permissions.admins` | `string[]` | `[]` | Author keys that may change and discard anyone's comments and reviews under `docmd serve`. |
| `permissions.resolve` | `"anyone"` or `"author"` | `"anyone"` | Who may resolve a thread under `docmd serve`. |
| `limits.maxCommentChars` | `integer` | `5000` | Longest comment body, in characters. Must be positive. |
| `limits.commentsPerMinute` | `integer` | `10` | New threads and replies per author key per minute. Must be positive. |
| `git` | object or `null` | `null` | [Git sync](#git-sync), under `docmd serve` only. Off when absent or `null`. |
| `git.branch` | `string` | none (required) | Branch to commit to and pull from. |
| `git.remote` | `string` | `"origin"` | Remote to fetch from and push to. |
| `git.skipDeployMarker` | `string` | `"[skip ci]"` | Appended to every commit subject. |
| `git.pullSeconds` | `number` | `60` | Seconds between pulls. Must be positive. |
| `git.authorEmailHeader` | `string` | none | Request header that carries the commenter's e-mail for the commit author. Cannot be `cookie` or `set-cookie`. |
| `git.committer.name` | `string` | `"docmd threads"` | Committer name. |
| `git.committer.email` | `string` | `"threads@docmd.invalid"` | Committer e-mail. |

`git.branch` and `git.remote` cannot start with `-`.

| Environment variable | Description |
| :--- | :--- |
| `DOCMD_THREADS_GIT_TOKEN` | Token used to fetch and push. Required when `git` is set, under `docmd serve`. |
| `DOCMD_THREADS_GIT_COMMIT_PENDING` | `1` or `true`: at startup, commit and push the work found in the checkout instead of refusing to start. Any other non-empty value is an error. |

## Full example

```json "docmd.config.json"
{
  "serve": {
    "actions": {
      "enabled": true,
      "origins": ["https://docs.example.com"],
      "identityHeader": "x-auth-request-user"
    }
  },
  "plugins": {
    "threads": {
      "sidebar": true,
      "autoPublish": { "seconds": 180, "startOn": true },
      "permissions": {
        "admins": ["alice"],
        "resolve": "author"
      },
      "limits": { "maxCommentChars": 5000, "commentsPerMinute": 10 },
      "git": {
        "branch": "main",
        "remote": "origin",
        "skipDeployMarker": "[skip ci]",
        "pullSeconds": 60,
        "authorEmailHeader": "x-auth-request-email",
        "committer": { "name": "docmd threads", "email": "threads@docmd.invalid" }
      }
    }
  }
}
```

```bash
DOCMD_THREADS_GIT_TOKEN=<token> npx @docmd/core serve
```

## Error codes

Errors returned to the page start with `threads/<code>: `.

| Code | When |
| :--- | :--- |
| `threads/config` | An option has an invalid value; `git` is set without `DOCMD_THREADS_GIT_TOKEN`; or the [startup check](#git-sync-startup-check) found work that is not on the remote branch. |
| `threads/no-identity` | A write under `docmd serve` came without the identity header. |
| `threads/email-identity` | A write under `docmd serve` came with an identity that looks like an e-mail address. Point `serve.actions.identityHeader` at a user id header. |
| `threads/forbidden` | The commenter may not do this. See [Permissions](#under-docmd-serve-permissions). |
| `threads/not-found` | The thread or comment does not exist. |
| `threads/invalid` | The request is missing a field or has a wrong value. |
| `threads/empty-review` | Publish was called with nothing to publish. |
| `threads/push-failed` | Git sync could not fetch, commit or push. The review is unchanged and can be published again. |
| `threads/limit-chars` | The comment is longer than `limits.maxCommentChars`. |
| `threads/rate-limited` | The author added more than `limits.commentsPerMinute` threads and replies in the last minute. |

## Files the plugin writes

All under the docs source, in `.threads/`:

| Path | Contents | In git |
| :--- | :--- | :--- |
| `.threads/drafts/` | One draft journal per commenter. | No: the folder has its own `.gitignore`. |
| `.threads/reviews/<id>.json` | One record per published review: author, title, summary, dates, and what it changed, so it can be listed and discarded. | Yes |
| `.threads/authors.json` | Display name and avatar per author key. Embedded in every page. | Yes |

```json ".threads/authors.json"
{
  "alice": {
    "name": "Alice",
    "avatarUrl": "https://example.com/avatars/alice.png"
  }
}
```

## Actions API

The page talks to the server through these [plugin actions](../development/building-plugins), callable with `docmd.call()`:

| Action | Description |
| :--- | :--- |
| `threads:get-threads` | Published threads of a page, plus the caller's own drafts. Orphaned threads are flagged. |
| `threads:add-thread` | Draft a new thread with its first comment. |
| `threads:add-comment` | Draft a reply. |
| `threads:edit-comment` | Draft an edit of a comment. |
| `threads:delete-comment` | Draft the removal of a comment. |
| `threads:delete-thread` | Draft the removal of a thread and its highlight. |
| `threads:resolve-thread` | Draft a resolve or reopen. |
| `threads:toggle-reaction` | Draft adding or removing a reaction. |
| `threads:whoami` | The caller's identity and draft journal. |
| `threads:set-mode` | Switch the caller between `auto` and `collect`. |
| `threads:update-review` | Set the title and summary of the caller's open review. |
| `threads:publish-review` | Publish the caller's drafts as one review. |
| `threads:discard-review` | Discard the caller's open review, or a published review. |
| `threads:list-reviews` | Every review, newest first. |
| `threads:get-authors` | The contents of `authors.json`. |
| `threads:upsert-author` | Set the caller's display name and avatar. |
