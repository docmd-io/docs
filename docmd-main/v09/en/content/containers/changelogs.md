---
title: "Changelogs"
description: "Generate structured, timeline-based version history and release notes."
---

The `changelog` container provides a specialised layout for documenting project evolution. It parses version or date headers into a vertical timeline, ensuring historical updates are easily scannable.

## Syntax Reference

```markdown
::: changelog

== Label Text
Description of the entry goes here.

:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Entry Marker** | `==` | The delimiter that defines a new timeline entry within the changelog. |
| **Label** | `String` | The text (e.g., version number or date) that renders as a timeline badge on the left. |

## Examples

### Release History

Changelogs support rich Markdown within each entry, including lists, callouts, and code blocks.

```markdown
::: changelog

== v2.0.0 (2026-03-15)
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload navigation.
*   Introduced the **Isomorphic Plugin** system.

::: callout success
This release offers a 40% improvement in initial build speed.
:::

== v1.5.1 (2025-12-10)
### Security Patch
*   Resolved high-severity vulnerability in the internal parser.
*   Updated dependency `flatted` to `v3.3.2`.

== v1.0.0 (2024-05-01)
Initial public release.

:::
```

::: changelog

== v2.0.0 (2026-03-15)
### Major System Overhaul
The core engine has been rearchitected for isomorphic execution.

*   Implemented **SPA Router** for zero-reload navigation.
*   Introduced the **Isomorphic Plugin** system.

::: callout success
This release offers a 40% improvement in initial build speed.
:::

== v1.5.1 (2025-12-10)
### Security Patch
*   Resolved high-severity vulnerability in the internal parser.
*   Updated dependency `flatted` to `v3.3.2`.

== v1.0.0 (2024-05-01)
Initial public release.

:::

::: callout tip "Historical Context for AI"
Changelogs provide a temporal map for AI agents. The `::: changelog` structure allows an LLM to accurately parse when specific features or security fixes were introduced in the `llms.txt` context stream.
:::