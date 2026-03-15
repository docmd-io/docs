---
title: "Plugin Installer"
description: "Seamlessly add and configure plugins using docmd's automated command-line installer."
---

The `docmd` plugin installer is a cross-platform utility that automates the process of managing dependencies and configuration. Instead of manually editing files and navigating terminal outputs, the installer handles the plumbing for you securely.

## Adding Plugins

To integrate an official or community plugin, use the `add` command followed by the plugin's short name or literal package name:

```bash
docmd add analytics
```

### Automated Workflow
1. **Dependency Detection**: The installer identifies your active package manager (`npm`, `pnpm`, `yarn`, or `bun`).
2. **Package Retrieval**: It resolves short names (e.g., `analytics`) to official scoped packages (e.g., `@docmd/plugin-analytics`).
3. **Clean Installation**: The installer executes the silent installation command to update your `package.json` without cluttering your terminal.
4. **Configuration Surgical Injection**: It parses your `docmd.config.js` and injects the necessary plugin key and an empty options object into the configuration file while preserving your formatting.

## Removing Plugins

To cleanly uninstall a plugin and strip its corresponding configuration:

```bash
docmd remove analytics
```

This ensures that your `docmd.config.js` remains clean and your project dependencies are properly synchronized with your active environment.

## Community Plugins

The installer also functions as a generic package manager for the docmd ecosystem. If you provide a name that isn't found in the official registry, the installer attempts to install it as a literal npm package:

```bash
docmd add docmd-custom-theme-extension
```

## Troubleshooting & Verbose Mode

By default, the installer operates in a high-privacy, silent mode. If you encounter network errors or installation conflicts, you can enable streaming logs from the underlying package manager:

```bash
docmd add sitemap --verbose
```

This will print the full standard output (stdout) and error stream (stderr) of the package manager, helping you diagnose environment-specific issues instantly.
