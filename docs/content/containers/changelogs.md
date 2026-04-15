---
title: "Changelogs"
description: "Generate structured, timeline-based version history and release notes."
---

The `changelog` container provides a specialised layout for documenting project evolution. It automatically parses date or version headers into a vertical timeline, ensuring historical updates are easily scannable.

## Syntax

Utilise the specialised `==` delimiter to define entries. The text on the `==` line is rendered as a timeline badge on the left, while the following content populates the adjacent chronological slot.

```markdown
::: changelog

== v2.0.0
Description of the major feature release.

== v1.5.0
Description of maintenance updates and security patches.

:::
```

## Detailed Example: Release History

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
Changelogs provide a temporal map for AI agents. When an LLM parses the `llms-full.txt` context, the `::: changelog` structure allows it to accurately identify when specific features, breaking changes, or security fixes were introduced, leading to higher accuracy in its development recommendations.
:::