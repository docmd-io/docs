---
title: "LLM Context Plugin"
description: "Optimise your documentation for AI consumption with automated llms.txt and llms-full.txt generation."
---

The `@docmd/plugin-llms` plugin follows the `llms.txt` standard. It generates
two files at build time: a structured summary (`llms.txt`) and a full
concatenated context (`llms-full.txt`). AI assistants and tools that
understand the standard can use these to ingest your documentation directly.

The plugin is **enabled by default** in 0.8.8. To produce absolute links,
set `url` in your `docmd.config.json`.

## Generated Output

The plugin produces three files at the site root:

- `llms.txt` — structured list of all pages with title + description + URL
- `llms-full.txt` — the same list but with each page's full markdown body
  concatenated below the entry
- `llms.json` — a machine-readable manifest of every page (title, url,
  description, priority)

These files are linked in the page `<head>` for automatic discovery by
AI tools.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable the LLM context generation. |
| `fullContext` | `boolean` | `true` | If true, generates `llms-full.txt` containing the full markdown of every page. |
| `maxTokenLimit` | `number` | `null` | Optional limit on the total characters/tokens for context files. |
| `i18n` | `boolean` | `false` | When `true`, write per-locale files (`llms.<locale>.txt`, etc.) in addition to the default-locale set. See [Multi-locale output](#multi-locale-output) below. |

### Example

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "llms": {
      "fullContext": true
    }
  }
}
```

## Default behaviour (0.8.8)

The plugin writes files for the **default locale only**. This is a
deliberate change from earlier versions where the plugin wrote
per-locale output by default. The reason: the unsuffixed
`llms.txt` / `llms-full.txt` / `llms.json` filenames are the
standard names that downstream consumers (Cursor, Claude, GPT, etc.)
look for. Splitting them into `llms.en.txt` + `llms.hi.txt` +
`llms.fr.txt` would have broken every existing integration.

For single-locale projects (no `config.i18n` block) this is invisible —
the plugin writes a single set of files at the site root, same as
before. For multi-locale projects, only the default-locale pages
are in the bundle.

## Multi-locale output (opt-in)

To get per-locale files, set `i18n: true`:

```json "docmd.config.json"
{
  "plugins": {
    "llms": { "i18n": true }
  }
}
```

The plugin then writes:

```text
site/llms.txt          ← default locale (en) — UNSUFFIXED
site/llms-full.txt     ← default locale (en) — UNSUFFIXED
site/llms.json         ← default locale (en) — UNSUFFIXED
site/llms.ja.txt       ← Japanese — suffixed
site/llms-full.ja.txt  ← Japanese — suffixed
site/llms.ja.json      ← Japanese — suffixed
site/llms.fr.txt       ← French — suffixed
site/llms-full.fr.txt  ← French — suffixed
site/llms.fr.json      ← French — suffixed
```

Notice the pattern: **the default locale never gets a suffix** — its
files keep the unsuffixed names so existing consumers don't break.
Only the non-default locales get a `.<locale>` suffix.

For sites with only one locale configured, no per-locale files are
written regardless of the `i18n` flag (the suffix would just add
noise).

## Excluding a Page

If a page contains sensitive information or internal notes you don't
want AI models to learn, use the `llms: false` flag in your
frontmatter:

```markdown
---
llms: false
---
```

This excludes the page from the LLMS files. The page is still
rendered in the regular site HTML and is still included in
search results.

## See also

- [OKF Bundle Plugin](./okf.md) — the complementary bundle format
  for AI-agent consumption (typed manifest, graph viewer, per-page
  concept files). LLMS is the flat list; OKF is the structured graph.
- [Building AI-ready docs](../guides/ai-optimisation/generating-ai-ready-docs.md)
- [Structure for LLMs](../guides/ai-optimisation/structure-for-llms.md)

::: callout tip "Maximising AI Accuracy"
For detailed best practices on structuring your markdown (semantic headings, alt
-text, etc.), see our [Optimising for AI Agents](../guides/ai-optimisation/gener
ating-ai-ready-docs.md) guide.
:::
