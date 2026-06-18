---
title: "Rust Engine"
description: "Explore the optional native Rust engine: use cases, file I/O capabilities, supported packages, and limitations."
---

The **Rust Engine** is an optional, high-performance execution engine. It accelerates heavy I/O workloads in massive documentation projects. By using native binaries through N-API, it bypasses standard event-loop constraints to deliver multi-threaded file reading and subprocess orchestration.

Available as an **experimental preview**, the Rust engine targets enterprise scale. It shines where thousands of markdown files and exhaustive Git logs introduce compilation bottlenecks.

## Configuration

To activate native Rust acceleration, configure the `engine` directive to `"rust"` within your `docmd.config.json` file.

```json "docmd.config.json"
{
  "title": "Global API Registry",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## Ideal Use Cases & Where It Shines

The Rust engine solves specific compilation bottlenecks. It provides excellent efficiency gains under the following scenarios:

- **Massive Repositories (1,000+ Files)**: Monolithic projects benefit immensely from asynchronous, parallel file system access orchestrated via Tokio.
- **Intensive Git Metadata Harvesting**: Extracting deep commit logs across hundreds of pages requires heavy subprocess spawning. The Rust engine processes `git:log` tasks up to **1.24× faster** than JavaScript.
- **Cold Build Acceleration in CI/CD**: In environments where warm disk caches are unavailable, raw file read throughput reduces total processing time. Real-world benchmarks demonstrate a **~25% speedup during cold builds** and a **~17% improvement on warm builds**.

## Supported Devices & Platform Packages

The engine executes pre-compiled machine code. It requires dedicated native binaries tailored to your target host architecture. The foundational `@docmd/engine-rust` package automatically lazy-loads the correct platform binary during startup.

The following platform packages are currently distributed:

| Platform Package | Target Architecture | Host Operating System |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (glibc environments) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (glibc environments) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "Transparent Graceful Fallback"
If your environment lacks an available pre-built binary, the engine logs a non-fatal notification and **automatically falls back** to the high-performance JavaScript engine. Your builds remain fully deterministic.
:::

## Capabilities & Strategic Limitations

To achieve maximum utility, you must understand its architectural trade-offs. The engine excels at I/O-bound operations but incurs overhead during cross-boundary serialisation.

| Capability / Task | Rust Engine Performance Profile | Architectural Verdict |
| :--- | :--- | :--- |
| **Batch File Discovery & Reads** | Accelerated via parallel Tokio workers. | ✅ Highly Effective for massive directories. |
| **Git Commit Log Harvest** | Fast subprocess orchestration bypassing Node event loops. | ✅ Excellent for cold-start Git metadata extraction. |
| **Persistent Disk Caching** | Native support for anchored disk caches to eliminate redundant reads. | ✅ Highly Effective for warm builds. |
| **CPU-Bound Search Indexing** | **Slower than native JavaScript JIT**. | ❌ Inefficient due to double serialisation overhead. |

### The Double-Serialisation Tax Explained

Communication between docmd's core orchestrator and the native Rust engine relies on stringified JSON passing across the N-API runtime boundary:

```text
JS Worker → JSON.stringify() → NAPI Boundary → Serde Deserialisation → [Rust Task] → Serde Serialisation → NAPI Boundary → JSON.parse()
```

For I/O-heavy operations like querying Git histories or reading disk buffers, the processing time saved vastly outweighs the string conversion cost. 

However, for highly iterative, CPU-bound tasks like full-text search indexing (`search:index`), **the serialisation round-trip consumes more CPU resources than the underlying task itself**. Serialising large arrays of content back and forth causes the Rust implementation to run slower than Node's native JIT string manipulation. 

As a result, **the JavaScript engine remains the recommended runtime for semantic search pipelines**. Enable the Rust engine selectively for large-scale Git and file management workloads.
