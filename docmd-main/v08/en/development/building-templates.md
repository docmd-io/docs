---
title: "Building Templates"
description: "Author a docmd template package — directory layout, descriptor, EJS context, asset priorities, and API reference."
---

# Building Templates

> **For template authors.** If you want to *use* a template in your docs site, see [Templates](/theming/templates) instead.

A template is a regular npm package that declares `capabilities: ['template']` and ships a `templates[]` array of `.ejs` file overrides. The template resolver in `@docmd/ui` handles the per-page lookup, honours frontmatter / config overrides, and falls back to the default if anything goes wrong.

## Package layout

```
@docmd/template-summer/
├── package.json
├── index.js                # Plugin entry — exports templates[] + templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # Only the partials you need to override
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # Layers on top of docmd-main.css; does not replace it.
    └── js/
        └── summer.js
```

## `package.json`

```json "package.json"
{
  "name": "@docmd/template-summer",
  "version": "0.1.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "@docmd/core": ">=0.8.7"
  },
  "docmd": {
    "kind": "template",
    "displayName": "Summer",
    "description": "A bright summer-inspired layout for the 0.8.7+ template system."
  }
}
```

## `index.js`

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugin: {
    name: 'template-summer',
    version: '0.1.0',
    capabilities: ['template'],
  },

  templates: [
    // Only the slots you actually want to override.
    { type: 'layout',   templatePath: path.join(__dirname, 'templates/layout.ejs') },
    { type: 'menubar',  templatePath: path.join(__dirname, 'templates/partials/menubar.ejs') },
    { type: 'footer',   templatePath: path.join(__dirname, 'templates/partials/footer.ejs') },
  ],

  templateAssets: [
    {
      type: 'css',
      path: path.join(__dirname, 'assets/css/summer.css'),
      priority: 10,           // higher than theme (5), lower than customCss (15)
      position: 'head',
    },
    {
      type: 'js',
      path: path.join(__dirname, 'assets/js/summer.js'),
      priority: 10,
      position: 'body',
    },
  ],
};
```

## `layout.ejs` context

Templates receive the same EJS context as the default layout. The most common locals:

| Local | Description |
|---|---|
| `config` | The normalised site config. |
| `frontmatter` | Per-page frontmatter. |
| `relativePathToRoot` | E.g. `./` or `../` — use this to build relative URLs. |
| `renderIcon(name, opts)` | Render a Lucide icon. |
| `t(key, params?)` | Translation function. |
| `buildRelativeUrl(url)` | Resolve a URL relative to the current page. |
| `pageTitle`, `siteTitle`, `appearance` | Common strings. |
| `_template` | Metadata about the resolved template (new in 0.8.7). |

You can include default partials from `@docmd/ui` by reading them at build time. The simplest pattern is to keep a copy of the partials you reuse; templates do not inherit partial paths automatically.

## Asset priority chain

CSS and JS load in this order (lower loads first, higher wins cascade ties):

| Priority | Layer | Notes |
|---|---|---|
| 0  | Base (`docmd-main.css`, `docmd-main.js`) | Always present. |
| 5  | Theme colour overlay (`docmd-theme-sky.css`, etc.) | From `theme.name`. Skipped when the name auto-promoted to a template (see `_noCssOverlay`). |
| 10 | **Template structure** (default) | Your template's CSS — this is the default if you omit `priority`. |
| 15 | User `customCss` / `customJs` | Always wins — that's the contract. |
| 20 | Plugin CSS/JS | lightbox, search, analytics, etc. |
| 25+ | Higher template priority | **Use only when you must override plugins.** The official Summer template declares `priority: 25` so it loads after plugin CSS. Higher values cascade later. |

Templates may declare a higher priority than 10 — Summer itself uses **25** so it overrides plugin styles. The recommended band is **10–20** for "user-overridable" templates and **20+** for "opinionated layout" templates.

::: callout warning "Do not use !important"
Templates should write CSS that can be overridden by `customCss` at priority 15. Using `!important` breaks the contract and means users can't restyle your template without forking it. (Summer's CSS file header enforces this — `!important` is removed during 0.8.7 cleanup so users can finally override Summer without resorting to `!important` themselves.)
:::

## Auto-promotion of `theme.name`

The `theme.name` → `theme.template` promotion happens inside `normalizeConfig()`, not the resolver:

- When `theme.name` is a non-reserved value and `theme.template` is unset, the config is rewritten to `theme.template = theme.name` and `theme._noCssOverlay = true` (so the generator skips the `docmd-theme-${name}.css` lookup that would 404).
- At resolve time the resolver only ever sees `theme.template`.

This is why a non-reserved `theme.name` automatically loads your template — no need to also list it in `config.plugins`.

## Template localisation

The `i18n` config still applies — the active locale is passed to your template as a normal local. Translations are looked up via the `t(key)` helper as in the default templates.

## API reference

### `resolveTemplate(ctx)` from `@docmd/ui`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // any TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // may carry `template: "..."`
  config,                                 // normalised site config
  localeId: 'en',                         // optional
  versionId: '0.8',                       // optional
});

// resolved.templatePath → absolute path to the .ejs file
// resolved.source       → 'default' | 'frontmatter' | 'config' | 'plugin'
// resolved.pluginName   → plugin name (when source === 'plugin')
// resolved.type         → the resolved slot
```

### Types from `@docmd/api`

```ts
import type {
  TemplateSlot,         // union of 12 slot names
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // now includes 'template'
} from '@docmd/api';
```

## Troubleshooting

### "Template declared slot X but file not found"

The template's `index.js` listed a `templatePath` that does not exist on disk. The resolver fell back to the default. Check the path is absolute (use `fileURLToPath(import.meta.url)`) and the file is included in the published package's `files` field.

### My template's CSS is being overridden by something else

CSS priority is final. User `customCss` (priority 15) always wins. If you want users to be able to override specific selectors without overriding the whole template, document the public CSS class names and let users target them with `customCss`.

### Per-page template override not working

Make sure the frontmatter `template` value matches a registered plugin. The resolver matches against the plugin's `descriptor.name`, stripping `@docmd/` and `template-` prefixes. So all of these are equivalent:

- `template: "summer"`
- `template: "template-summer"`
- `template: "@docmd/template-summer"`

If none of those match, the resolver falls through to `config.theme.template` and then the default.
