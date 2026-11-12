---
title: "lite-matter"
description: "Ultra lightweight, zero-bloat frontmatter extractor for markdown and text engines."
---

`lite-matter` is an ultra-lightweight, zero-bloat frontmatter extractor. It parses YAML frontmatter blocks from Markdown documents, returns structured metadata objects, and preserves the document body untouched.

::: callout tip "Why lite-matter?" icon:zap
Traditional frontmatter parsers often pull in large legacy dependency graphs. `lite-matter` provides a drop-in replacement tailored for high-performance static site generators and build tools.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-matter
```
:::
::: tab label:npm
```bash
npm install lite-matter
```
:::
::: tab label:bun
```bash
bun add lite-matter
```
:::
:::

## Usage

Extract frontmatter metadata and document body using the `matter()` function:

```typescript
import { matter } from 'lite-matter';

const markdown = `---
title: "Release v0.10.0"
date: 2026-11-12
tags: ["release", "announcement"]
---

# Release Announcement

Welcome to the newest release.
`;

const { data, content } = matter(markdown);

console.log(data.title);   // "Release v0.10.0"
console.log(data.tags);    // ["release", "announcement"]
console.log(content);      // "# Release Announcement\n\nWelcome to the newest release.\n"
```

## Features

* **CRLF Support**: Handles Windows (`\r\n`) and POSIX (`\n`) line endings seamlessly.
* **Nested Structures**: Full support for nested YAML objects, arrays, and multiline strings.
* **Safe Failsafes**: Gracefully returns empty metadata when frontmatter is absent or malformed without throwing exceptions.
* **Content Preservation**: Document body is preserved byte-for-byte with no unwanted stripping.

## API Reference

### `matter(input, options?)`

Parses a raw string and returns an extraction result object:

```typescript
interface MatterResult<T = Record<string, any>> {
  data: T;
  content: string;
}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `input` | `string` | The raw document string containing frontmatter delimiters. |
| `options` | `object` | Optional parser configuration settings. |