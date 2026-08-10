---
title: "Changelogs"
description: "Generate structured, timeline-based version histories and release notes in docmd."
---

The `changelog` container provides a specialised layout for documenting project evolution. It parses version or date headers into vertical timeline entries, ensuring release notes remain clear and scannable.

## Container Syntax

```markdown
::: changelog # Outer release history container opener
::: log [title:"v1.0.0 (YYYY-MM-DD)"] # Version entry item opener
Release details (markdown headings, bullet points, callouts)...
::: /log # Explicit log item closer

::: log [title:"v0.9.0 (YYYY-MM-DD)"] # Secondary release entry opener
Release notes...
::: /log
::: /changelog # Explicit changelog closer
```

## Features & Supported Attributes

| Parameter / Element | Type | Description |
| :--- | :--- | :--- |
| **Version Label** | `"String"` \| `title:"..."` | Version tag or date rendered as a timeline badge on the left margin. |
| **Sub-Containers** | `::: log` ... `::: /log` | Explicit version entry wrappers. Legacy `== Version` header markers are also supported. |
| **Closing Tags** | `::: /changelog`, `::: /log`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Release History Timeline

Changelogs support full Markdown formatting within each entry, including lists, callouts, and code snippets:

```markdown
::: changelog # Production release history
::: log "v2.0.0 (2026-03-15)" # Major release
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload page navigation.
*   Introduced the **Isomorphic Plugin** architecture.

::: callout success
This release delivers a 40% improvement in initial build compilation speed.
::: /callout
::: /log

::: log "v1.5.1 (2025-12-10)" # Patch update
### Security Patch
*   Resolved vulnerability in internal parser.
*   Updated dependencies.
::: /log

::: log "v1.0.0 (2024-05-01)"
Initial public release.
::: /log
::: /changelog
```

::: changelog # Production release history
::: log "v2.0.0 (2026-03-15)" # Major release
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload page navigation.
*   Introduced the **Isomorphic Plugin** architecture.

::: callout success
This release delivers a 40% improvement in initial build compilation speed.
:::
::: /log

::: log "v1.5.1 (2025-12-10)" # Patch update
### Security Patch
*   Resolved vulnerability in internal parser.
*   Updated dependencies.
::: /log

::: log "v1.0.0 (2024-05-01)"
Initial public release.
::: /log
::: /changelog

::: callout tip "Legacy == Entry Marker Syntax" icon:archive
Existing documentation utilizing `==` entry markers continues to parse seamlessly:

```markdown
::: changelog
== v1.0.0 (2024-05-01)
Initial public release.
::: /changelog
```
:::

::: callout tip "Historical Context for AI Agents" icon:sparkles
Changelog containers supply a temporal roadmap for AI agents. The `::: changelog` structure allows LLMs to parse when specific APIs or security fixes were introduced in the `llms.txt` context stream.
:::