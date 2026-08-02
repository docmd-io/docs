---
title: "Zero-Config"
description: "Understand the heuristics engine of docmd that automatically structures your site without files."
---

`docmd` features a smart heuristics engine designed to parse and structure your documentation automatically. You can start building, serving, and translating your documentation without writing a single line of configuration.

## How It Works

When run without a `docmd.config.json` file, the engine automatically triggers **Zero-Config Mode**. It scans the workspace directory for content and applies the following heuristics:

### 1. Source Directory Detection

The engine looks for documentation files in these candidate directories in order:
1.  `docs/`
2.  `src/docs/`
3.  `documentation/`
4.  `content/`
5.  `.` (Root directory fallback)

If one of the candidate directories is found and contains Markdown files, it is selected as the source. If no directory is found, but the project root has Markdown files, the root directory is used (automatically ignoring `node_modules`, `.git`, output folders like `site/`, `dist/`, and `out/`).

If no documentation content is found at all, `docmd` initializes a fresh starter structure automatically.

### 2. Heuristics for Versions and Locales

The folder structure is scanned to dynamically extract versioning and localization metadata:
-   **Versions**: Subdirectories matching `v[0-9]+` (e.g., `v1.0`, `v08`) are parsed as documentation versions.
-   **Locales**: Subdirectories with two-letter language codes (e.g., `en`, `de`, `zh`) are treated as localized variants.
-   **Structure Extraction**: The highest version is designated as the current release, and the first locale found (prioritizing `en` if present) is set as the default language.

### 3. Automatic Navigation Routing

If there are no root-level versions or locales, the engine builds a navigation tree dynamically by analyzing the file structure:
-   Subdirectories are mapped to navigation groups.
-   Titles are generated dynamically from file basenames. E.g., `getting-started.md` is formatted as `Getting Started`.
-   Index files (`index.md`, `README.md`) are routed as the landing page of the current directory.

## Zero-Config Best Practices

To get the most out of Zero-Config mode, follow these structure recommendations:

-   **Explicit file naming**: Use clear, hyphenated or camelCase file names. The autoloader converts them to readable titles.
-   **Folder-based sections**: Place related documents inside subfolders to automatically group them in the sidebar.
-   **Index fallback**: Always place an `index.md` or `README.md` at the root of your source folder to serve as the landing page.
-   **Clean output path**: If you are using the root folder `.` as your source, keep your built assets in the default `site/` folder which is automatically ignored.

## Built-in Defaults (new in 0.8.7)

A `docmd.config.json` (or no config at all) gives you a usable site out of the box. The following keys ship with sensible defaults, so you only need to set them when you want a different value.

::: callout info "How to opt out"
Set the key to `false` (or the appropriate empty value) to disable a default. For example, `pageNavigation: false` removes prev/next links; `theme.appearance: "dark"` overrides the colour mode.
:::

### Top-level QoL defaults

| Key | Default | Notes |
|---|---|---|
| `pageNavigation` | `true` | prev/next links at the bottom of each article |
| `copyCode` | `true` | copy-code buttons on `<pre>` blocks |
| `autoTitleFromH1` | `true` | use the first `# H1` as the page title when frontmatter is absent |

### Layout & sidebar defaults

| Key | Default | Notes |
|---|---|---|
| `layout.spa` | `true` | SPA navigation between pages |
| `layout.breadcrumbs` | `true` | breadcrumb row above the page header |
| `layout.header.enabled` | `true` | top page header |
| `layout.sidebar.collapsible` | `true` | sidebar can collapse on desktop |
| `layout.sidebar.defaultCollapsed` | `false` | sidebar starts expanded |
| `layout.optionsMenu.position` | `"header"` | options menu (search / theme switch / sponsor) goes in the header |
| `layout.optionsMenu.components.search` | `true` | search trigger in the menu |
| `layout.optionsMenu.components.themeSwitch` | `true` | light/dark toggle in the menu |
| `layout.optionsMenu.components.sponsor` | `null` | opt-in — set to a URL to enable |

### Footer defaults

| Key | Default | Notes |
|---|---|---|
| `layout.footer.style` | `"minimal"` | one-line footer bar |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | auto-generated current-year copyright |
| `layout.footer.branding` | `true` | show "Built with docmd" by default |

### Theme defaults

| Key | Default | Notes |
|---|---|---|
| `theme.name` | `"default"` | base CSS theme; reserved values: `default`, `sky`, `ruby`, `retro`. Any other value is auto-promoted to a [template name](../theming/templates.md). |
| `theme.appearance` | `"system"` | default colour mode (follows `prefers-color-scheme`). Set to `"light"` or `"dark"` to force. |
| `theme.codeHighlight` | `true` | syntax highlighting on `<pre>` blocks |

### New opt-in features (off by default)

| Key | Default | Notes |
|---|---|---|
| `cookie` | `null` | opt-in cookie consent dialog — see [Cookie Consent](cookie-consent.md) |
| `layout.banner` | `null` | opt-in site-wide announcement banner — see [Site Banner](site-banner.md) |
| `theme.template` | `null` | opt-in template selection — see [Templates](../theming/templates.md) |

The defaults were chosen to give brand-new sites a usable look and feel without any config. Older configs keep their explicit values untouched — only `undefined` keys are filled in.