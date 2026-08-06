---
title: "JavaScript Engine"
description: "Deep explore docmd's native JavaScript execution engine: use cases, portability, capabilities, and limits."
---

The **JavaScript Engine** is the foundational execution engine bundled into docmd. It runs easily on modern JavaScript runtimes. It delivers excellent performance without external dependencies or complex compilers.

By default, every docmd repository relies on the JavaScript engine. It provides highly reliable file traversal, metadata indexing, and build generation.

## Configuration

To explicitly instruct docmd to utilise the JavaScript backend, define the `engine` property as `"js"` inside `docmd.config.json`.

```json "docmd.config.json"
{
  "title": "Developer Handbook",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## Ideal Use Cases & Where It Shines

The JavaScript engine is exceptionally versatile. It shines under the following conditions:

- **Standard Repositories**: Sites containing up to several hundred pages build extremely fast. It leverages optimised JIT compilation and native JSON parsing.
- **Maximum Portability**: If your team uses diverse operating systems or restricted enterprise networks, the JavaScript engine guarantees flawless builds everywhere.
- **Rapid Prototyping**: Local development builds benefit from instantaneous hot-reloading (`npx @docmd/core dev`) with low initialisation latency.
- **Custom Scripting**: Configuration fallbacks and plugin integrations execute naturally within JavaScript. Standard string parsing avoids cross-boundary serialisation costs.

## Available Devices & Host Compatibility

Because it operates entirely within native runtime environments, the JavaScript engine supports an exhaustive array of target platforms:

- **Operating Systems**: macOS, Linux, Windows, FreeBSD, and OpenBSD.
- **Hardware Architectures**: x64, ARM64 (Apple Silicon, AWS Graviton), ARMv7, and RISC-V.
- **Container Environments**: Alpine Linux, standard Debian/Ubuntu, serverless build runners (Vercel, Netlify), and embedded CI pipelines.

## Capabilities & Limitations

| Dimension | JavaScript Engine Profile | Operational Impact |
| :--- | :--- | :--- |
| **Concurrency Model** | Node.js Event Loop + Native Worker Threads | Excellent asynchronous scheduling for network responses. Disk-heavy blocks operate smoothly. |
| **Git Metadata Handling** | Subprocess Orchestration (`child_process.execFile`) | Safely spawns native Git binaries to harvest commit histories. Includes persistent disk caching. |
| **Setup & Initialisation** | Zero-Configuration | Boots instantaneously. No package postinstall compilation required. |
| **Scalability Ceiling** | Highly Performant up to ~1,000 documents | On monolithic repositories exceeding a thousand complex files, sequential subprocess overhead may introduce minor latencies. |

## Feature Completeness

The JavaScript engine is **exclusive in its universal feature support**. Every core feature, advanced syntax, templating zone, and official plugin is engineered to run easily here. 

Whether compiling mathematical formulas, rendering live search indices, or generating static site maps, the JavaScript engine guarantees deterministic builds.