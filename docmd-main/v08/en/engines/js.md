---
title: "JavaScript Engine"
description: "Deep dive into docmd's native JavaScript execution engine: standard use cases, maximum device portability, internal capabilities, and operational limits."
---

The **JavaScript Engine** is the foundational, universally compatible execution engine bundled directly into docmd. Designed to run seamlessly atop standard modern JavaScript runtimes, it delivers excellent performance out of the box without requiring external dependencies, complex compiler chains, or pre-built system binaries.

By default, every docmd repository relies on the JavaScript engine. It provides highly reliable file traversal, metadata indexing, and build generation tailored for modern web developers.

## Configuration

To explicitly instruct docmd to utilise the JavaScript backend, define the `engine` property as `"js"` inside your `docmd.config.json` file.

```json
{
  "title": "Developer Handbook",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## Ideal Use Cases & Where It Shines

The JavaScript engine is exceptionally versatile. It shines brightest under the following operational environments:

- **Standard Repositories**: Sites containing up to several hundred pages build extremely rapidly, leveraging highly optimised JIT compilation and native JSON parsing built directly into modern V8 engines.
- **Maximum Portability Requirements**: If your collaborative writing team spans disparate operating systems, custom containerised Linux distributions, or restricted enterprise networks, the JavaScript engine guarantees flawless builds everywhere.
- **Rapid Prototyping**: Local development builds benefit from instantaneous hot-reloading (`docmd dev`) with low initialisation latency.
- **Custom Scripting & Hooks**: Because configuration fallback layers and plugin integrations execute naturally within JavaScript, standard string parsing and inline file manipulation avoid cross-boundary serialisation costs.

## Available Devices & Host Compatibility

Because it operates entirely within native runtime environments, the JavaScript engine supports an exhaustive array of target architectures and platforms:

- **Operating Systems**: macOS, Linux, Windows, FreeBSD, and OpenBSD.
- **Hardware Architectures**: x64, ARM64 (Apple Silicon, AWS Graviton), ARMv7, and RISC-V.
- **Container Environments**: Alpine Linux, standard Debian/Ubuntu base images, serverless build runners (Vercel, Netlify, Cloudflare Pages), and embedded CI pipelines.

## Capabilities & Limitations

| Dimension | JavaScript Engine Profile | Operational Impact |
| :--- | :--- | :--- |
| **Concurrency Model** | Node.js Event Loop + Native Worker Threads | Excellent asynchronous scheduling for network and API responses. Disk-heavy blocks operate smoothly alongside client rendering. |
| **Git Metadata Handling** | Subprocess Orchestration (`child_process.execFile`) | Safely spawns native Git binaries to harvest commit histories and modification timestamps. Includes persistent disk-caching to accelerate warm builds. |
| **Setup & Initialisation** | Zero-Configuration | Boots instantaneously. No package postinstall compilation or remote CDNs required. |
| **Scalability Ceiling** | Highly Performant up to ~1,000 documents | On monolithic repositories exceeding a thousand complex files, sequential subprocess invocation overhead during cold builds can introduce minor latencies compared to native multi-threaded alternatives. |

## Feature Completeness

The JavaScript engine is absolutely **exclusive in its universal feature support**. Every core feature, advanced parsing syntax, templating zone, and optional official plugin is engineered to run seamlessly on this engine. 

Whether you are compiling intricate mathematical formulas, rendering client-side live search indices, or generating exhaustive static site maps, the JavaScript engine guarantees perfect fidelity and deterministic builds.
