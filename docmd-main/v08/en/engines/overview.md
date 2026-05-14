---
title: "Engines Overview"
description: "Understand docmd's pluggable build engine architecture, capabilities, and how to select the best processing backend for your documentation."
---

docmd features a highly modular, multi-threaded **Pluggable Engine Architecture** designed to execute heavy processing workloads efficiently. Rather than hardcoding all parsing and I/O tasks into a single run-loop, docmd decouples core orchestration from its computational engines.

This design empowers you to choose between the zero-configuration **JavaScript Engine** and the highly scalable, accelerated **Rust Engine** depending on your repository size, host platform, and performance requirements.

## Available Engines

| Engine | Identifier | Default | Target Use Case | Key Strength |
| :--- | :--- | :---: | :--- | :--- |
| **JavaScript Engine** | `"js"` | ✅ Yes | Standard documentation websites, rapid local prototyping, maximum portability. | Runs universally on any device supporting Node.js with zero native binary setup. |
| **Rust Engine (Preview)** | `"rust"` | ❌ No | Massive repositories (1,000+ files), highly intensive Git metadata harvesting, enterprise CI/CD builds. | Maximises parallel file I/O and asynchronous OS process orchestration via Tokio. |

## Configuration Options

Configuring your chosen build engine is exceptionally straightforward. You define the `engine` parameter directly within your `docmd.config.json` file.

```json
{
  "title": "Enterprise Reference",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

### Complete Options Reference

| Key | Supported Values | Default | Description |
| :--- | :--- | :--- | :--- |
| `engine` | `"js"`, `"rust"` | `"js"` | Determines which underlying execution layer processes internal file discovery, Git log extraction, and high-throughput batch reads. |

## High-Level Capabilities & Limitations

Both engines share a rigorous execution boundary enforced by docmd's core API layer, ensuring uniform security and deterministic output regardless of your choice.

### Shared Capabilities
- **Thread Isolation**: Both engines execute asynchronous tasks securely inside isolated worker threads, preventing heavy tasks from blocking the primary server event loop.
- **Task Verification**: Strict allowlists prevent unauthorised disk access or unverified execution patterns.
- **Seamless Interoperability**: Plugins request data via standardised interfaces (`runWorkerTask`), unaware of which backend satisfies the demand.

### Architectural Limitations
- **Serialisation Overhead**: Because data crosses native runtime boundaries (N-API) when communicating with external layers, highly iterative tasks passing extremely large JSON objects incur a round-trip serialisation penalty. For standard builds, this cost is vastly overshadowed by asynchronous speedups.
- **Binary Compatibility**: While the JavaScript engine runs natively on any architecture, the Rust engine relies on pre-built, OS-specific platform binaries distributed via npm packages.

## How the Engine Loader Works

When docmd boots, the internal engine loader inspects your active configuration:

1. **Resolution**: If configured to use `"rust"`, docmd attempts to lazy-load the appropriate architecture-specific native package (e.g., `@docmd/engine-rust-darwin-arm64`).
2. **Graceful Fallback**: Should the platform binary be missing, unsupported, or fail to initialise due to strict environment constraints, docmd logs an informative advisory notice and **transparently falls back** to the high-performance JavaScript engine. Your build is guaranteed to succeed uninterrupted.

Explore the deep-dive documentation for each engine to decide which best suits your deployment strategies:
- [JavaScript Engine Reference](js.md)
- [Rust Engine Reference](rust.md)
