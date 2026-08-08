---
title: "Changelogs"
description: "Generate structured, timeline-based version histories and release notes in docmd."
---

The `changelog` container provides a specialised layout for documenting project evolution. It parses version or date headers into vertical timeline entries, ensuring release notes remain clear and scannable.

## Syntax Reference

```markdown
::: changelog

== Label Text
Description of the entry goes here.

:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Entry Marker** | `==` | Delimiter that initiates a new timeline entry within the changelog block. |
| **Label** | `String` | Text string (e.g. version number or ISO date) rendered as a timeline badge on the left margin. |

## Usage Examples

### Release History Timeline

Changelogs support full Markdown formatting within each entry, including lists, callouts, and code snippets:

```markdown
::: changelog

== v2.0.0 (2026-03-15)
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload page navigation.
*   Introduced the **Isomorphic Plugin** architecture.

::: callout success
This release delivers a 40% improvement in initial build compilation speed.
:::

== v1.5.1 (2025-12-10)
### Security Patch
*   Resolved high-severity vulnerability in internal parser.
*   Updated dependency `flatted` to `v3.3.2`.

== v1.0.0 (2024-05-01)
Initial public release.

:::
```

::: changelog

== v2.0.0 (2026-03-15)
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload page navigation.
*   Introduced the **Isomorphic Plugin** architecture.

::: callout success
This release delivers a 40% improvement in initial build compilation speed.
:::

== v1.5.1 (2025-12-10)
### Security Patch
*   Resolved high-severity vulnerability in internal parser.
*   Updated dependency `flatted` to `v3.3.2`.

== v1.0.0 (2024-05-01)
Initial public release.

:::

::: callout tip "Historical Context for AI Agents" icon:sparkles
Changelog containers supply a temporal roadmap for AI agents. The `::: changelog` structure allows LLMs to parse when specific APIs or security fixes were introduced in the `llms.txt` context stream.
:::