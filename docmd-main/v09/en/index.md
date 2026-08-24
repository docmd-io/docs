---
title: "docmd docs: documentation for humans and machines"
description: "Open-source documentation compiler. One Markdown source, one command — generates website, search, AI context, agent protocols, and knowledge formats together."
titleAppend: false
---

::: hero

# docmd

Documentation for humans and machines. One command compiles Markdown into a website, search index, AI context, and knowledge formats — zero configuration.

::: button "Get Started" ./getting-started/quick-start.md icon:rocket ::: /button ::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github ::: /button

:::

## Overview

docmd is an open-source documentation compiler. It takes your Markdown files and generates a complete documentation stack — website, search, AI context, and more — in a single build.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

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
        ::: card "AI Assistant" icon:sparkles
        Built-in RAG-powered chat assistant. Delivers instant, context-aware answers directly on your documentation site.
        :::
    :::
    ::: grid
        ::: card "AI Context" icon:brain-circuit
        Generates `llms.txt` and `llms-full.txt` automatically. Your docs stay readable to AI assistants.
        :::
    :::
    ::: grid
        ::: card "Native MCP Server" icon:terminal
        Built-in Model Context Protocol server with native tools. AI agents query and validate your docs over a local stdio connection — no network, no remote service.
        :::
    :::
    ::: grid
        ::: card "OKF Bundles" icon:database
        Generates an Open Knowledge Format bundle and typed concept graph for AI agents. Read [more](external:https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing).
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
        ::: card "Native Translation" icon:globe
        First-class i18n support. Features locale-first routing, individual search indexes, and translated UI strings.
        :::
    :::
:::

::: callout info "Rich Content Containers" icon:info
Go beyond standard Markdown. Use structured visual patterns like steps, tabs, cards, grids, and callouts directly in your text.
::: button "Explore Containers" ./content/containers/index.md icon:blocks
:::