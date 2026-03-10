---
title: "Plugin Installer"
description: "How to use the docmd plugin installer to seamlessly add and configure plugins."
---

The `docmd` plugin installer is a built-in cross-platform utility that fully automates downloading npm packages and injecting their configurations directly into your `docmd.config.js`.

## Adding Official Plugins

To add an official docmd plugin, you can simply run its short name:

```bash
docmd add analytics
```

### What happens under the hood?
1. **Package Manager Detection:** The installer scans your project to detect if you use `npm`, `pnpm`, `yarn`, or `bun`.
2. **Registry Lookup:** It translates `analytics` to `@docmd/plugin-analytics` via the official registry.
3. **Silent Installation:** It silently runs the respective install command (e.g. `pnpm add @docmd/plugin-analytics`) without polluting your terminal.
4. **Configuration Injection:** It surgically parses your `docmd.config.js` and injects `'analytics': {}` into your `plugins` object natively.

## Removing Plugins

To safely uninstall a plugin and remove its configuration from your active environment:

```bash
docmd remove analytics
```

This will cleanly uninstall the dependency using your active package manager and elegantly strip the active configuration bounds from your `docmd.config.js` without breaking your formatting or code schema.

## Third-Party (Community) Plugins

The installer also serves as a generic package installer. If you provide a plugin name that is *not* in the official docmd registry, it elegantly falls back to installing that literal module:

```bash
docmd add docmd-custom-theme-plugin
```

1. The installer downloads `docmd-custom-theme-plugin` natively.
2. It assumes an empty configuration standard and injects `'docmd-custom-theme-plugin': {}` securely into your active configuration file.

## Advanced Usage

### Verbose Logging

By default, the installer runs completely silently to keep your terminal perfectly clean. If you are experiencing network issues or want to see the underlying package manager logs, run with the `--verbose` (or `-v`) flag:

```bash
docmd add search --verbose
```

This will print the full NPM/Yarn/PNPM/Bun streaming output and detailed Node.js stack traces if an error occurs.
