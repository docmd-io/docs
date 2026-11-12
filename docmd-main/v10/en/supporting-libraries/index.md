---
title: "Supporting Libraries"
description: "Zero-dependency, standalone micro-libraries developed by docmd.io for markdown processing, templating, and compilation."
---

`docmd` is built on a modular ecosystem of standalone, zero-dependency micro-libraries. Each library is designed with a strict zero-bloat philosophy: fast performance, zero external dependencies, full TypeScript types, and isomorphic execution across Node.js, browsers, and Edge runtimes.

While these packages power the core `docmd` compilation engine, they are fully independent and can be used in any JavaScript or TypeScript project.

::: callout tip "Independent Open Source" icon:sparkles
Every supporting library is published independently on npm and maintained in its own GitHub repository under the `docmd-io` organization.
:::

## Overview of Libraries

::: cards cols:2
::: card title:"lite-matter" icon:file-text href:"/supporting-libraries/lite-matter"
Ultra lightweight frontmatter extractor and YAML parser for Markdown and text engines.
:::
::: card title:"lite-mdx" icon:code href:"/supporting-libraries/lite-mdx"
Zero-dependency MDX and JSX compiler with component mapping, props, and sandboxed expressions.
:::
::: card title:"lite-template" icon:layout href:"/supporting-libraries/lite-template"
Sub-millisecond asynchronous template engine compatible with basic EJS syntax.
:::
::: card title:"lite-hl" icon:highlighter href:"/supporting-libraries/lite-hl"
Heuristic code tokenizer and syntax highlighter requiring zero configuration.
:::
::: card title:"embed-lite" icon:video href:"/supporting-libraries/embed-lite"
Static URL-to-HTML parser generating responsive embeds for YouTube, Twitter/X, Spotify, and more.
:::
:::

## Design Principles

All supporting libraries adhere to the following principles:

* **Zero External Dependencies**: Pure TypeScript and standard web APIs without heavy dependency trees.
* **Isomorphic Execution**: Run identically in Node.js, modern browsers, Cloudflare Workers, and Deno.
* **Deterministic Output**: Fast execution with predictable parsing and strict boundary isolation.
* **Type Safety**: Export clean, complete TypeScript definitions out of the box.