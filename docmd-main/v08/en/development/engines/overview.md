---
title: "Engines Overview"
description: "Understand the pluggable build engine architecture and select the best processing backend."
---

The compiler features a highly modular, multi-threaded **Pluggable Engine Architecture**. It decouples orchestration from computational tasks to execute heavy workloads efficiently.

Choose between the zero-configuration **JavaScript Engine** and the accelerated **Rust Engine**. Select the engine based on your repository size, platform, and performance needs.

## Available Engines

| Engine | Identifier | Default | Target Use Case | Key Strength |
| :--- | :--- | :---: | :--- | :--- |
| **JavaScript Engine** | `"js"` | ✅ Yes | Standard websites, rapid local prototyping, portability. | Runs universally on any device supporting Node.js. |
| **Rust Engine (Preview)** | `"rust"` | ❌ No | Massive repositories (1,000+ files), enterprise CI/CD builds. | Maximises parallel file I/O via Tokio. |

## Configuration Options

Configure your build engine in the `docmd.config.json` file. Set the `engine` parameter directly.

```json "docmd.config.json"
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
| `engine` | `"js"`, `"rust"` | `"js"` | The execution layer processing file discovery and batch reads. |

## High-Level Capabilities & Limitations

Both engines share a rigorous execution boundary. The core API layer enforces uniform security and deterministic output.

### Shared Capabilities
- **Thread Isolation**: Engines execute asynchronous tasks securely inside isolated worker threads. This prevents blocking the primary server loop.
- **Task Verification**: Strict allowlists prevent unauthorised disk access or unverified execution patterns.
- **Seamless Interoperability**: Plugins request data via standardised interfaces (`runWorkerTask`). They remain unaware of the underlying backend.

### Architectural Limitations
- **Serialisation Overhead**: Data crosses native runtime boundaries (N-API). Highly iterative tasks passing large JSON objects incur a small serialisation penalty.
- **Binary Compatibility**: The JavaScript engine runs natively everywhere. The Rust engine relies on OS-specific platform binaries distributed via npm.

## How the Engine Loader Works

When `@docmd/core` boots, the internal loader inspects your active configuration:

1. **Resolution**: If configured for `"rust"`, the engine lazy-loads the architecture-specific native package (e.g., `@docmd/engine-rust-darwin-arm64`).
2. **Graceful Fallback**: If the binary is missing or unsupported, the engine logs an advisory notice. It then transparently falls back to the JavaScript engine. Your build always succeeds.

Explore the deep-dive documentation for each engine:
- [JavaScript Engine Reference](js.md)
- [Rust Engine Reference](rust.md)