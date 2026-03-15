---
title: "Developer Guide"
description: "Professional automated onboarding, verification, and maintenance workflows for docmd contributors."
---

If you are a contributor who has forked the `docmd` monorepo, we provide a suite of **Dev Environment Tools** to ensure your workspace remains clean and consistent. While `contributing.md` outlines the basic setup, this guide details the professional automated workflows available for project maintenance.

## Automated Workflows

We provide high-level scripts to handle environmental health and project scaffolding across the monorepo.

### Project Scaffolding: `pnpm onboard`

Run this command after forking the repository or pulling major changes. It performs a full environment synchronization.

```bash
pnpm onboard
```

### Environment Synchronization: `pnpm onboard --link`

This extended command prepares the environment and makes the local `docmd` binary available globally for system-wide testing.

```bash
pnpm onboard --link-docmd
```

**Actions performed:**
- Executes a recursive `pnpm install` across all packages.
- Performs a full `pnpm build` for the core engine, UI templates, and plugins.
- **(Optional)**: Symlinks the `@docmd/core` binary to your system PATH via `npm link`.

### System Reset: `pnpm reset`

If your environment becomes unstable or you require a completely fresh start, use the reset command.

```bash
pnpm reset
```

**Actions performed:**
1. **Process Cleanup**: Stops all active `docmd dev` or `docmd live` background servers.
2. **Global Unlinking**: Recursively removes all `docmd` and `docmd-live` global symlinks.
3. **Deep Clean**: Deletes all `node_modules`, `dist/`, `public/`, `site/`, and TypeScript build caches across the monorepo.

## Granular Maintenance Commands

The following commands can be executed from the monorepo root for specific maintenance tasks:

| Command | Description |
| :--- | :--- |
| `pnpm build` | Compiles all TypeScript packages and bundles the Live Editor. |
| `pnpm stop` | Scans and terminates orphaned `docmd` processes. |
| `pnpm clean` | Safely removes build artifacts and caches. |
| `pnpm lint` | Executes ESLint and Prettier across the entire workspace. |
| `pnpm unlink:global` | Explicitly removes all global binary symlinks. |

## Verification Suite (`pnpm verify`)

The `docmd` verification suite is an aggressive integration testing system designed to verify engine integrity before a release.

```bash
pnpm verify
```

**Testing Methodology:**
- **Dynamic Scaffolding**: Creates a temporary, isolated directory and generates a raw documentation project.
- **Cross-Schema Validation**: Builds the test project using both Legacy and Modern configuration schemas.
- **Feature E2E**: Generates HTML and performs explicit assertions on structural elements, versioning, and link resolution.
- **Installer Resilience**: Simulates `docmd add` and `docmd remove` operations to ensure configuration injection logic is stable.

## The Playground Environment

To test core engine changes or UI template tweaks in real-time, use the dedicated `_playground` package.

```bash
pnpm run dev
```

This starts a development server bound to `packages/_playground`. Any modifications to the core engine, UI assets, or plugins will trigger an instant Hot Module Replacement (HMR) in the playground's browser tab.

## Local CLI Testing

When developing CLI features, avoid polluting the root project. Use the proxied playground commands to test logic in isolation:

```bash
pnpm run playground:add <plugin>
pnpm run playground:remove <plugin>
```

**Advantages:**
- Executes your local, uncompiled code from `packages/core/bin/docmd.js`.
- Confines all filesystem side-effects to the isolated `_playground` directory.
- Prevents accidental `package.json` modifications in the git tree.

## Arbitrary Playground Commands

If you need to execute a custom CLI command within the playground context from the root, use the pnpm filter bridge:

```bash
pnpm --filter @docmd/playground exec docmd [command]
```