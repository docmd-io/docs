---
title: "Engines Overview"
description: "Understand the pluggable build engine architecture and select the best processing backend."
---

The compiler features a highly modular, multi-threaded **Pluggable Engine Architecture**. It decouples orchestration from computational tasks to execute heavy workloads efficiently.

Choose between the zero-configuration **JavaScript Engine**, the accelerated **Rust Engine**, and the multithreaded **Python Engine**. Select the engine based on your repository size, platform, and performance needs.

## Available Engines

| Engine | Identifier | Default | Target Use Case | Key Strength |
| :--- | :--- | :---: | :--- | :--- |
| **JavaScript Engine** | `"js"` | ✅ Yes | Standard websites, rapid local prototyping, portability. | Runs universally on any device supporting Node.js. |
| **Rust Engine (Preview)** | `"rust"` | ❌ No | Massive repositories (1,000+ files), enterprise CI/CD builds. | Maximises parallel file I/O via Tokio. |
| **Python Engine** | `"python"` | ❌ No | Large repositories, AI/semantic vector processing, cross-platform workflows. | Multi-threaded file I/O, vector quantisation and cosine tasks without native binaries. |

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
| `engine` | `"js"`, `"rust"`, `"python"` | `"js"` | The execution layer processing file discovery, batch reads, and vector tasks. |

## High-Level Capabilities & Limitations

All engines share a rigorous execution boundary. The core API layer enforces uniform security and deterministic output.

### Shared Capabilities
- **Thread Isolation**: Engines execute asynchronous tasks securely inside isolated worker threads. This prevents blocking the primary server loop.
- **Task Verification**: Strict allowlists prevent unauthorised disk access or unverified execution patterns.
- **Direct Interoperability**: Plugins request data via standardised interfaces (`runWorkerTask`). They remain unaware of the underlying backend.

### Architectural Limitations
- **Serialisation Overhead**: Data crosses native runtime boundaries (N-API or stdio). Highly iterative tasks passing large JSON objects incur a small serialisation penalty.
- **Binary Compatibility**: The JavaScript engine runs natively everywhere. The Rust engine relies on OS-specific platform binaries distributed via npm, whilst the Python engine requires a host Python 3.8+ installation.

## How the Engine Loader Works

When `@docmd/core` boots, the internal loader inspects your active configuration:

1. **Resolution**: If configured for `"rust"`, the engine lazy-loads the architecture-specific native package (e.g., `@docmd/engine-rust-darwin-arm64`). If configured for `"python"`, it initialises the persistent worker via the host's Python 3 runtime.
2. **Graceful Fallback**: If the required binary or runtime is missing or unsupported, the engine logs an advisory notice. It then transparently falls back to the JavaScript engine. Your build always succeeds.

Explore the deep-dive documentation for each engine:
- [JavaScript Engine Reference](js.md)
- [Rust Engine Reference](rust.md)
- [Python Engine Reference](python.md)