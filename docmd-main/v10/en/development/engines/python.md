---
title: "Python Engine"
description: "Explore the optional Python execution engine: use cases, file I/O capabilities, supported packages, and limitations."
---

The **Python Engine** is an optional, multi-threaded execution engine. It accelerates heavy I/O workloads, Git history traversal, and vector search operations in documentation projects. By orchestrating a persistent Python 3 background worker, it bypasses standard event-loop constraints to deliver concurrent file reading and subprocess orchestration.

Available as an **extensible execution backend**, the Python engine targets enterprise scale. It shines where thousands of markdown files, exhaustive Git logs, and vector embedding preparation introduce compilation bottlenecks.

## Configuration

To activate Python acceleration, configure the `engine` directive to `"python"` within your `docmd.config.json` file.

```json "docmd.config.json"
{
  "title": "Global API Registry",
  "engine": "python",
  "src": "docs",
  "out": "site"
}
```

## Ideal Use Cases & Where It Shines

The Python engine solves specific compilation bottlenecks. It provides excellent efficiency gains under the following scenarios:

- **Massive Repositories (1,000+ Files)**: Monolithic projects benefit immensely from asynchronous, parallel file system access orchestrated via Python's `ThreadPoolExecutor`.
- **Intensive Git Metadata Harvesting**: Extracting deep commit logs across hundreds of pages requires heavy subprocess spawning. The Python engine processes `git:log` tasks up to **1.20× faster** than JavaScript.
- **Offline Semantic Vector Processing**: Native handlers for heading-aware text chunking (`search:chunk`), Float32 to Int8 vector quantisation (`search:quantize`), and batch cosine similarity scoring (`search:cosine`) accelerate `docmd-search` workflows without cloud dependencies.
- **Zero-Binary Cross-Platform Environments**: Unlike native C or Rust addons that require pre-compiled platform binaries, the Python engine executes standard Python source code universally across macOS, Linux, and Windows wherever Python 3.8+ is installed.

## Supported Devices & Platform Packages

The engine executes interpreted Python code via the host's Python 3 runtime. Unlike native compiled engines, it does not require separate per-platform native binary packages; a single universal `@docmd/engine-python` package serves all supported platforms.

The following platform packages are currently distributed:

| Platform Package | Target Architecture | Host Operating System |
| :--- | :--- | :--- |
| `@docmd/engine-python` | ARM64 (Apple Silicon) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 (Intel) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | ARM64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | x64 | Windows (Python 3.8+) |

::: callout info title:"Transparent Graceful Fallback" icon:info
If your environment lacks Python 3 or the engine fails to initialise, the engine logs a non-fatal notification and **automatically falls back** to the high-performance JavaScript engine. Your builds remain fully deterministic.
:::

## Capabilities & Strategic Limitations

To achieve maximum utility, you must understand its architectural trade-offs. The engine excels at I/O-bound operations and batch vector transformations but incurs overhead during cross-boundary serialisation.

| Capability / Task | Python Engine Performance Profile | Architectural Verdict |
| :--- | :--- | :--- |
| **Batch File Discovery & Reads** | Accelerated via parallel `ThreadPoolExecutor` workers. | ✅ Highly Effective for massive directories. |
| **Git Commit Log Harvest** | Fast subprocess orchestration bypassing Node event loops. | ✅ Excellent for cold-start Git metadata extraction. |
| **Semantic Vector Operations** | Native chunking, Float32 to Int8 quantisation, and cosine similarity. | ✅ Highly Effective for offline vector search. |
| **Single Tiny File Reads** | **Slower than native in-process JavaScript V8 execution**. | ❌ Inefficient due to inter-process communication overhead. |

### The Double-Serialisation Tax Explained

Communication between docmd's core orchestrator and the Python engine relies on line-delimited JSON passing across a persistent standard input/output (`stdio`) pipe:

```text
JS Worker -> JSON.stringify() -> stdio Pipe -> Python Worker (runner.py) -> [Python Task] -> Serialisation -> stdio Pipe -> JSON.parse()
```

For I/O-heavy operations like querying Git histories or reading disk buffers, the processing time saved vastly outweighs the string conversion cost.

However, for single small file reads or iterative inline string operations, **the serialisation round-trip consumes more CPU resources than the underlying task itself**. Dispatching micro-tasks across the process boundary causes the Python implementation to run slower than Node's native JIT string manipulation.

As a result, **the JavaScript engine remains the recommended runtime for standard documentation sites**. Enable the Python engine selectively for large-scale Git histories, parallel directory indexing, and vector search pipelines.

## Plugin & API Integration

Plugins and build lifecycle hooks can interact directly with the Python engine via `@docmd/api`. The API layer acts as a security boundary, enforcing strict task allowlists whilst exposing high-level convenience helpers:

```typescript
import { resolveEngine, chunkText, quantizeVectors, cosineSimilarity } from '@docmd/api';

// Resolve configured engine or best available (tries Python, falls back to JS)
const engine = await resolveEngine(['python', 'js']);

// Perform heading-aware semantic chunking
const chunks = await chunkText(engine, markdownContent, 'guide.md');

// Quantise Float32 embedding vectors to compact Int8 representations
const { quantized, mins, ranges } = await quantizeVectors(engine, embeddingVectors);

// Compute cosine similarity ranking against corpus vectors
const matches = await cosineSimilarity(engine, queryVector, corpusVectors, 10);
```