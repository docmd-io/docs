---
title: "docmd docs: deploy production-ready docs from Markdown"
description: "Build production-ready documentation from Markdown in seconds. Zero setup, fast by default, SEO-friendly, and AI-ready."
titleAppend: false
---

::: hero

# docmd

Markdown to production docs in one command. Static HTML for SEO. SPA for speed. Works with AI tools out of the box.

::: button "Get Started" ./getting-started/quick-start.md icon:rocket
::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github
:::

## Overview

docmd is a zero-configuration documentation generator. It builds fast static websites directly from your Markdown files.

```bash
npx @docmd/core dev
```

Run this single command. The engine builds your site, generates navigation, and enables search automatically.

## Core Capabilities

Everything needed for solid documentation ships built in. No extra plugins required for the essentials.

::: grids
    ::: grid
        ::: card "Instant Setup" icon:rocket
        Start immediately without boilerplate. The engine auto-detects files and structures navigation in seconds.
        :::
    :::
    ::: grid
        ::: card "AI Context" icon:brain-circuit
        Generates `llms.txt` and `llms-full.txt` automatically. Your docs stay readable to AI assistants.
        :::
    :::
    ::: grid
        ::: card "Local-First Search" icon:search
        Fast, client-side full-text search powered by MiniSearch. Works out of the box across versions and locales.
        :::
    :::
    ::: grid
        ::: card "Live Previews" icon:monitor
        Render Markdown instantly in the browser with the `docmd.compile` API. Power live editors, CMS previews, and in-app docs.
        :::
    :::
    ::: grid
        ::: card "Flexible Theming" icon:palette
        Switch between built-in themes or apply custom styling. Fully supports dark mode and system preferences.
        :::
    :::
    ::: grid
        ::: card "Native Translation" icon:globe
        First-class i18n support. Features locale-first routing, individual search indexes, and translated UI strings.
        :::
    :::
:::

::: callout info "Rich Content Containers" icon:info
    Go beyond standard Markdown. Use structured visual patterns like steps, tabs, cards, grids, and callouts directly in your text.
    ::: button "Explore Containers" ./content/containers/index.md icon:blocks
:::