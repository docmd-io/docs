---
title: "Developer Guide"
description: "Professional automated onboarding, verification, and maintenance workflows for docmd contributors."
---

If you are a contributor who has forked the `docmd` monorepo, we provide a suite of **Dev Environment Tools** to ensure your workspace remains clean, consistent, and ready for development. While `contributing.md` outlines the basic setup, this guide details the professional automated workflows available to you. 

## Automated Onboarding & Maintenance

To ensure a seamless developer experience regardless of your system configuration, we provide two primary "one-command" workflows for environmental health.

### Getting Started: `pnpm onboard`
If you have just forked the repository or pulled new changes that require a clean setup:
```bash
pnpm onboard
```

### Global Linking: `pnpm onboard --link-docmd`
If you want to make the `docmd` command available everywhere on your system immediately after setup:
```bash
pnpm onboard --link-docmd
```
**What it does:**
- Runs a silent `pnpm install` across the entire monorepo.
- Executes a full `pnpm build` for all core packages and themes.
- **(Optional)**: Symlinks the `@docmd/core` binary to your system PATH via `npm link`.
- Displays a confirmation logo once the environment is ready for development.

### Total System Reset: `pnpm reset`
If your environment becomes unstable, or you need to wipe out all traces of `docmd` for a truly fresh start:
```bash
pnpm reset
```
**What it does:**
1. **Stops all background servers**: Automatically runs `pnpm stop`.
2. **Unlinks Global Binaries**: Aggressively removes `docmd` and `docmd-live` pointers from your system path (both npm and pnpm).
3. **Deep Clean**: Recursively deletes all `node_modules`, `dist/`, `public/`, `site/`, and TypeScript caches across every package.

## Manual Workflow (Granular Commands)

While the automated commands are recommended, you can run granular tasks as needed from the monorepo root:

| Command | Description |
| :--- | :--- |
| `pnpm build` | Compiles all TypeScript packages and bundles the Live Editor. |
| `pnpm stop` | Scans and kills any running `docmd dev` or `docmd live` processes. |
| `pnpm clean` | Deletes build artifacts (`dist`, `public`, `site`) and caches. |
| `pnpm lint` | Runs ESLint and Prettier checks across the workspace. |
| `pnpm unlink:global` | Safely removes all global symlinks from the system path. |

## The Universal Failsafe (`failsafe.js`)

Before any release, or when verifying major architectural changes, we rely on the Universal Failsafe.

```bash
pnpm verify
```
*(This triggers the automated verification suite with branding and E2E checks)*

### What does it do?
`failsafe.js` is an aggressive integration testing script. Instead of relying on mocked unit tests, it:
1. Creates a raw, temporary OS directory.
2. Installs the local monorepo packages.
3. Scaffolds dummy Markdown files featuring deep nesting, complex containers, and edge cases.
4. Generates both Legacy and Modern `docmd.config.js` schemas.
5. Executes `docmd build` across these configurations and generates explicit HTML assertions.
6. **Plugin Installer Testing**: It simulates `docmd add search` and `docmd remove search` on a raw environment to prove regex configuration injection and scaffold fallback schemas never break.
7. Compiles and executes the Isomorphic `docmd live` editor runtime inside a sandbox Node instance.

**Rule of Thumb:** If you modify core parsers, builders, or installers, run `pnpm verify`. If it passes, your code is structurally sound for production releases.

## The Playground Workspace (`_playground`)

Developing plugins or tweaking the core engine requires a live environment. We provide a dedicated `packages/_playground` directory specifically for this purpose. 

```bash
pnpm run dev
```
*(This triggers the Dev Server bound solely to the Playground workspace)*

Any changes you make to the core engine, the theme packages, or the UI layout templates will instantly hot-reload in the playground's browser tab.

## Testing the CLI (Add / Remove)

When working on CLI features like `docmd add` or `docmd remove`, you shouldn't test them globally, nor should you pollute the root `package.json` with arbitrary plugin additions.

We provide dedicated root workspace aliases to proxy CLI commands securely into your playground workspace directory:

```bash
pnpm run playground:add search
pnpm run playground:remove search
```

**Why use this?**
- It runs your *local*, uncompiled code directly from `packages/core/bin/docmd.js`.
- It executes the filesystem modifications strictly inside the isolated `packages/_playground` directory maintaining its pristine state.
- It guarantees you aren't accidentally tracking plugin additions in your root git tree.

## Arbitrary Executions

If you ever need to test an arbitrary CLI command exclusively inside your playground context without `cd`'ing in and out, utilize the pnpm filter bridging syntax natively:

```bash
pnpm --filter @docmd/playground exec docmd [command]
```