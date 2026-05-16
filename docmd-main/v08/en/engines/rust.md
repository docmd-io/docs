---
title: "Rust Engine"
description: "Explore docmd's optional native Rust build acceleration engine: target use cases, high-performance file I/O capabilities, supported device packages, and cross-boundary limitations."
---

The **Rust Engine** is an optional, high-performance execution engine designed to accelerate heavy I/O workloads in massive documentation projects. By leveraging native platform binaries compiled via Rust and interfaced through N-API, it bypasses standard event-loop scheduling constraints to deliver maximum multi-threaded file reading and subprocess orchestration.

Currently available as an **experimental preview**, the Rust engine is tailored specifically for enterprise scale where thousands of markdown files and exhaustive Git commit logs introduce measurable bottlenecks during compilation.

## Configuration

To activate native Rust acceleration, install the foundational loader package and configure the `engine` directive to `"rust"` within your `docmd.config.json` file.

```json
{
  "title": "Global API Registry",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## Ideal Use Cases & Where It Shines

The Rust engine is engineered to solve specific compilation bottlenecks. It provides excellent efficiency gains under the following scenarios:

- **Massive Repositories (1,000+ Files)**: Monolithic documentation platforms containing over a thousand individual files benefit immensely from asynchronous, parallel file system access orchestrated via Tokio.
- **Intensive Git Metadata Harvesting**: Extracting deep commit logs, contribution histories, and accurate modification timestamps across hundreds of pages requires heavy subprocess spawning. The Rust engine processes `git:log` tasks up to **1.24× faster** than native JavaScript loops.
- **Cold Build Acceleration in CI/CD**: In ephemeral continuous integration environments where warm disk caches are unavailable, raw file read throughput reduces total processing time. Real-world benchmarks on an 886-page workspace site demonstrate a **~25% speedup during cold builds** and a **~17% improvement on warm builds**.

## Supported Devices & Platform Packages

Because the engine executes pre-compiled machine code, it requires dedicated native binaries tailored to your target host architecture. The foundational `@docmd/engine-rust` package automatically lazy-loads the correct platform binary during startup.

The following platform packages are currently distributed:

| Platform Package | Target Architecture | Host Operating System |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon M1/M2/M3) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (glibc environments) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (glibc environments) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "Transparent Graceful Fallback"
If your environment lacks an available pre-built binary package, or if security policies block dynamic N-API binary execution, the engine loader logs a non-fatal notification and **automatically falls back** to the high-performance JavaScript engine. Your builds remain fully deterministic and robust.
:::

## Capabilities & Strategic Limitations

To achieve maximum utility from the Rust engine, it is critical to understand its architectural trade-offs. The engine excels at I/O-bound operations but incurs operational overhead during continuous cross-boundary serialization.

| Capability / Task | Rust Engine Performance Profile | Architectural Verdict |
| :--- | :--- | :--- |
| **Batch File Discovery & Reads** | Genuinely accelerated via parallel Tokio workers. | ✅ Highly Effective for massive directories. |
| **Git Commit Log Harvest** | Fast subprocess orchestration bypassing Node event loops. | ✅ Excellent gains for cold-start Git metadata extraction. |
| **Persistent Disk Caching** | Native support for anchored disk caches to eliminate redundant reads. | ✅ Highly Effective for warm builds. |
| **CPU-Bound Search Indexing** | **Slower than native JavaScript JIT**. | ❌ Inefficient due to double serialisation overhead. |

### The Double-Serialisation Tax Explained

Communication between docmd's core orchestrator and the native Rust engine relies on stringified JSON passing across the N-API runtime boundary:

```text
JS Worker → JSON.stringify() → NAPI Boundary → Serde Deserialisation → [Rust Task] → Serde Serialisation → NAPI Boundary → JSON.parse()
```

For purely I/O-heavy operations like querying Git commit histories or reading disk buffers, the processing time saved vastly outweighs the cost of converting strings. 

However, for highly iterative, CPU-bound processing tasks like client-side full-text search indexing (`search:index`), **the serialization round-trip consumes more CPU resources than the underlying task itself**. Rigorous benchmarking reveals that serialising large arrays of content back and forth causes the Rust implementation to run slower than Node's native JIT string manipulation. 

Consequently, **the JavaScript engine remains the recommended runtime for semantic search indexing pipelines**, while the Rust engine should be selectively enabled for large-scale Git and file management workloads.
