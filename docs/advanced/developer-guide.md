---
title: "Developer Guide"
description: "Advanced debugging, testing, and contribution tools for developers working directly on the docmd monorepo."
---

If you are a contributor who has forked the `docmd` monorepo, understanding the internal testing and debugging infrastructure is crucial. While `contributing.md` outlines how to get the project running, this guide details **how** to safely develop and test your changes inside the monorepo architecture. 

## The Universal Failsafe (`failsafe.js`)

Before any release, or when verifying major architectural changes, we rely on the Universal Failsafe.

```bash
pnpm test
```
*(This triggers `node scripts/failsafe.js`)*

### What does it do?
`failsafe.js` is an aggressive integration testing script. Instead of relying on mocked unit tests, it:
1. Creates a raw, temporary OS directory.
2. Installs the local monorepo packages.
3. Scaffolds dummy Markdown files featuring deep nesting, complex containers, and edge cases.
4. Generates both Legacy and Modern `docmd.config.js` schemas.
5. Executes `docmd build` across these configurations and generates explicit HTML assertions.
6. **Plugin Installer Testing**: It simulates `docmd add search` and `docmd remove search` on a raw environment to prove regex configuration injection and scaffold fallback schemas never break.
7. Compiles and executes the Isomorphic `docmd live` editor runtime inside a sandbox Node instance.

**Rule of Thumb:** If you modify core parsers, builders, or installers, run `pnpm test`. If it passes, your code is structurally sound for production releases.

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
