---
title: "Installation"
description: "Instructions for installing docmd globally, locally, or using it on-the-fly with npx."
---

`docmd` is a Node.js-based documentation generator. It requires **Node.js (v18.x or higher)** to be installed on your system.

There are several ways to deploy and use `docmd`. You can execute it instantly without installation, or integrate it permanently into your development workflow.

## Option 1: Instant Execution (Zero-Config)

You can run `docmd` inside any directory containing Markdown files. It automatically scans your files, extracts headings for page titles, and generates a nested navigation structure. No configuration or formal setup is required.

```bash
# Start a local development server on http://localhost:3000
npx docmd dev -z

# Generate a production-ready static site in the /site directory
npx docmd build -z
```

::: callout warning "Beta Feature"
Zero-Config mode (`-z`) is currently in beta. While it is excellent for rapid prototyping and internal documentation, we recommend initializing a project configuration (`docmd.config.js`) for production-grade sites to ensure maximum stability and control.
:::

## Option 2: Local Project Installation (Recommended)

For long-term projects, we recommend installing `docmd` as a development dependency. This ensures version consistency across your team and CI/CD environments.

```bash
# 1. Install docmd as a development dependency
npm install -D @docmd/core

# 2. Initialize your project configuration
npx docmd init

# 3. Start the development server
npx docmd dev
```

## Option 3: Global Installation

If you prefer to have the `docmd` CLI available globally across your system:

```bash
# Install globally
npm install -g @docmd/core

# Use the 'docmd' command anywhere
docmd dev        # Start development server
docmd build      # Build static site
```

## Developer Integration (Browser-Only)

::: callout info "Library Use Only"
This method is intended for developers who wish to embed the `docmd` parsing and rendering engine inside another web application, such as a CMS, a Live Preview tool, or a custom dashboard. It is **not** the standard way to build standalone documentation sites.
:::

To render `docmd` syntax dynamically in a web application without a Node.js backend, include the following assets:

```html
<!-- 1. Core Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 2. Processing Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

Refer to the [Browser API](../api/browser-api.md) guide for integration details.

## Troubleshooting

::: callout warning "Permission Denied (EACCES)"
If you encounter `EACCES` errors on macOS or Linux during global installation, it indicates insufficient permissions for global directories.
**Resolution:** Use `sudo npm install -g @docmd/core` or, preferably, use a Node version manager like `nvm` to manage global packages without root access.
:::

::: callout info "PowerShell Script Execution"
On Windows, if you receive an error stating that "running scripts is disabled on this system," execute the following command in PowerShell as an Administrator:
`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
:::