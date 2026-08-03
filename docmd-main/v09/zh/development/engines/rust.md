---
title: "Rust 引擎"
description: "了解可选的原生 Rust 引擎：使用场景、文件 I/O 能力、支持的包以及限制。"
---

**Rust 引擎** 是一款可选的高性能执行引擎。它通过 N-API 调用原生二进制，绕过标准的事件循环限制，从而在巨型文档项目中显著加速 I/O 密集型负载，并提供多线程文件读取与子进程编排能力。

Rust 引擎目前以 **实验性预览** 的形式发布，面向企业级规模而生。当文档中包含成千上万的 Markdown 文件与冗长的 Git 日志，并因此带来编译瓶颈时，它能大显身手。

## 配置

要启用原生 Rust 加速，只需在 `docmd.config.json` 中将 `engine` 指令设置为 `"rust"`。

```json "docmd.config.json"
{
  "title": "全局 API 注册中心",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## 适用场景与闪光点

Rust 引擎针对特定的编译瓶颈而生。在以下场景中能带来显著的效率提升：

- **巨型仓库（1000+ 文件）**：通过 Tokio 编排的异步并行文件系统访问，让单体项目受益巨大。
- **密集的 Git 元数据采集**：在数百个页面上提取深层 commit log 需要大量子进程派生；Rust 引擎处理 `git:log` 任务比 JavaScript **快达 1.24×**。
- **CI/CD 中的冷启动加速**：在没有热缓存的环境下，原始文件读取吞吐能直接缩短总处理时间。真实基准显示 **冷构建提速约 25%**，**热构建提速约 17%**。

## 支持的设备与平台包

该引擎执行的是预编译的机器码，因此需要为宿主机架构准备专门的原生二进制。基础包 `@docmd/engine-rust` 会在启动时惰性加载匹配当前平台的二进制。

目前发布的平台包如下：

| 平台包 | 目标架构 | 宿主操作系统 |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (glibc 环境) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (glibc 环境) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "透明的优雅回退"
若当前环境找不到可用的预编译二进制，引擎会打印一条非致命通知，并**自动回退**到高性能 JavaScript 引擎 —— 您的构建依旧完全确定性。
:::

## 能力与战略性限制

要物尽其用，需要先理解它的架构权衡。引擎在 I/O 密集型操作上极强，但在跨边界序列化时会产生开销。

| 能力 / 任务 | Rust 引擎性能特性 | 架构评判 |
| :--- | :--- | :--- |
| **批量文件发现与读取** | 由并行的 Tokio worker 加速 | ✅ 在巨型目录下极其有效 |
| **Git commit 日志采集** | 高速的子进程编排，绕过 Node 事件循环 | ✅ 非常适合冷启动的 Git 元数据抽取 |
| **持久化磁盘缓存** | 原生支持"锚定式"磁盘缓存，避免重复读取 | ✅ 热构建极其高效 |
| **CPU 密集型搜索索引** | **比原生 JavaScript JIT 更慢** | ❌ 双重序列化开销导致效率低下 |

### 双重序列化代价详解

docmd 核心调度器与原生 Rust 引擎之间的通信，依赖字符串化的 JSON 跨越 N-API 运行时边界：

```text
JS Worker → JSON.stringify() → NAPI 边界 → Serde 反序列化 → [Rust 任务] → Serde 序列化 → NAPI 边界 → JSON.parse()
```

对 I/O 密集型操作（如查询 Git 历史、读取磁盘缓冲）来说，处理时间节省的部分远超字符串转换的代价。

但对高度迭代、CPU 密集型的任务（如 `search:index` 这种全文搜索索引）来说，**序列化往返所消耗的 CPU 比任务本身还要多**。一来一回序列化大数组内容会让 Rust 实现比 Node 原生 JIT 的字符串处理更慢。

因此，**对于语义搜索流水线，JavaScript 引擎仍然是推荐的运行时**。请在大型 Git 与文件管理负载上有选择地启用 Rust 引擎。