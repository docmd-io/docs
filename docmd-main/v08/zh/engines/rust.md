---
title: "Rust 引擎"
description: "探索可选的原生 Rust 引擎：用例、文件 I/O 功能、支持的包和限制。"
---

**Rust 引擎**是一个可选的高性能执行引擎。它加速大型文档项目中繁重的 I/O 工作负载。通过 N-API 使用原生二进制文件，它绕过标准事件循环限制，实现多线程文件读取和子进程编排。

作为**实验性预览**提供，Rust 引擎面向企业规模。它在数千个 Markdown 文件和详尽的 Git 日志引入编译瓶颈时表现出色。

## 配置

要激活原生 Rust 加速，在 `docmd.config.json` 文件中将 `engine` 指令配置为 `"rust"`。

```json
{
  "title": "全球 API 注册表",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## 理想用例和优势

Rust 引擎解决特定的编译瓶颈。在以下场景下它提供出色的效率提升：

- **大型仓库（1,000+ 文件）**：单体项目从通过 Tokio 编排的异步并行文件系统访问中获益巨大。
- **密集的 Git 元数据提取**：跨数百个页面提取深层提交日志需要大量子进程生成。Rust 引擎处理 `git:log` 任务的速度比 JavaScript **快约 1.24 倍**。
- **CI/CD 中的冷构建加速**：在磁盘缓存不可用的环境中，原始文件读取吞吐量可减少总处理时间。实际基准测试显示**冷构建速度提升约 25%**，**热构建改善约 17%**。

## 支持的设备和平台包

引擎执行预编译的机器码。它需要专用的原生二进制文件，这些文件针对你的目标主机架构进行了定制。基础的 `@docmd/engine-rust` 包在启动时自动延迟加载正确的平台二进制文件。

目前分发以下平台包：

| 平台包 | 目标架构 | 主机操作系统 |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64（Apple Silicon） | macOS |
| `@docmd/engine-rust-darwin-x64` | x64（Intel） | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux（glibc 环境） |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux（glibc 环境） |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "透明优雅降级"
如果你的环境缺少可用的预构建二进制文件，引擎会记录一条非致命通知并**自动降级**到高性能 JavaScript 引擎。你的构建保持完全确定性。
:::

## 功能和战略限制

为了实现最大效用，你必须了解其架构权衡。引擎擅长 I/O 密集型操作，但在跨边界序列化期间会产生开销。

| 功能 / 任务 | Rust 引擎性能配置文件 | 架构评估 |
| :--- | :--- | :--- |
| **批量文件发现和读取** | 通过并行 Tokio 工作线程加速。 | ✅ 对大型目录非常有效。 |
| **Git 提交日志提取** | 快速子进程编排，绕过 Node 事件循环。 | ✅ 对冷启动 Git 元数据提取非常出色。 |
| **持久磁盘缓存** | 原生支持锚定磁盘缓存以消除冗余读取。 | ✅ 对热构建非常有效。 |
| **CPU 密集型搜索索引** | **比原生 JavaScript JIT 更慢。** | ❌ 由于双重序列化开销而效率低下。 |

### 双重序列化税的解释

docmd 核心编排器与原生 Rust 引擎之间的通信依赖于跨 N-API 运行时边界传递的字符串化 JSON：

```text
JS Worker → JSON.stringify() → NAPI Boundary → Serde Deserialisation → [Rust Task] → Serde Serialisation → NAPI Boundary → JSON.parse()
```

对于 I/O 密集型操作（如查询 Git 历史或读取磁盘缓冲区），节省的处理时间远超字符串转换成本。

然而，对于高度迭代的 CPU 密集型任务（如全文搜索索引 `search:index`），**序列化往返消耗的 CPU 资源比底层任务本身更多**。来回序列化大型内容数组会导致 Rust 实现比 Node 的原生 JIT 字符串操作运行得更慢。

因此，**JavaScript 引擎仍然是语义搜索管道的推荐运行时**。有选择地为大规模 Git 和文件管理工作负载启用 Rust 引擎。