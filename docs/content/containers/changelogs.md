---
title: "Changelogs"
description: "Create beautiful, timeline-based version history pages."
---

# Changelog Container

The `changelog` container formats version history into a clean, vertical timeline. It is specifically designed to parse date/version headers and body content separately.

## Syntax

Use `==` to separate entries. The text on the `==` line becomes the timeline badge (left side), and the content below becomes the body (right side).

```markdown
::: changelog

== Version 2.0
Description of version 2.0.

== Version 1.0
Description of version 1.0.

:::
```

## Example

```markdown
::: changelog

== v2.0.0 (2026)
### Major Overhaul
We rewrote the core engine for better performance.

*   Added SPA Router
*   Added Plugin System

== v1.5.0 (2025)
### Maintenance
Bug fixes and performance improvements.

::: callout info
This was the last version to support Node 14.
:::

== v1.0.0 (2024)
Initial Release.

::: button "Just Getting Started" #

:::
```

**Rendered Output:**

::: changelog

== v2.0.0 (2026)
### Major Overhaul
We rewrote the core engine for better performance.

*   Added SPA Router
*   Added Plugin System

== v1.5.0 (2025)
### Maintenance
Bug fixes and performance improvements.

::: callout info
This was the last version to support Node 14.
:::

== v1.0.0 (2024)
Initial Release.

::: button "Just Getting Started" #

:::