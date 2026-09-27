---
title: "Python 引擎"
description: "了解可选的 Python 执行引擎：使用场景、文件 I/O 能力、支持的包以及限制。"
---

**Python 引擎** 是一款可选的多线程执行引擎。它通过持久化的 Python 3 后台 worker，绕过标准的事件循环限制，从而在文档项目中加速重型 I/O 负载、Git 历史遍历以及向量搜索运算，且无需平台编译的原生二进制扩展。

Python 引擎目前作为 **可扩展的执行后端** 发布，面向企业级规模与 AI 集成文档场景。当文档仓库中包含数以千计的 Markdown 文件、庞大的 Git 提交历史以及向量嵌入预处理引入编译瓶颈时，它能大显身手。

## 配置

要启用 Python 加速，只需在 `docmd.config.json` 中将 `engine` 指令设置为 `"python"`。

```json "docmd.config.json"
{
  "title": "全局 API 注册中心",
  "engine": "python",
  "src": "docs",
  "out": "site"
}
```

## 适用场景与闪光点

Python 引擎针对特定的编译瓶颈而生。在以下场景中能带来显著的效率提升：

- **巨型仓库（1000+ 文件）**：通过 Python 的 `ThreadPoolExecutor` 编排异步并发文件系统访问，让单体大型项目受益显著。
- **密集的 Git 元数据采集**：在数百个页面上提取深层 commit log 需要大量子进程派生；Python 引擎处理 `git:log` 任务比 JavaScript **快达 1.20×**。
- **离线语义向量运算**：内置标题感知文本分块（`search:chunk`）、Float32 至 Int8 向量量化（`search:quantize`）以及批量余弦相似度计算（`search:cosine`），无需云端依赖即可加速 `docmd-search` 工作流。
- **零二进制跨平台环境**：与需要预编译二进制的 C 或 Rust 扩展不同，Python 引擎可在任何安装了 Python 3.8+ 的 macOS、Linux 或 Windows 环境中直接运行通用源码。

## 支持的设备与平台包

该引擎通过宿主机的 Python 3 运行时执行解释型 Python 源码。与原生编译引擎不同，它不需要分发操作系统专属的二进制包；单个通用的 `@docmd/engine-python` 包即可服务所有受支持的平台。

目前支持的平台环境如下：

| 平台包 | 目标架构 | 宿主操作系统 |
| :--- | :--- | :--- |
| `@docmd/engine-python` | ARM64 (Apple Silicon) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 (Intel) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | ARM64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | x64 | Windows (Python 3.8+) |

::: callout info title:"透明的优雅回退" icon:info
若当前环境未安装 Python 3 或引擎初始化失败，引擎会打印一条非致命通知，并**自动回退**到高性能 JavaScript 引擎：您的构建依旧完全确定性。
:::

## 能力与战略性限制

要物尽其用，需要先理解它的架构权衡。引擎在 I/O 密集型操作与批量向量变换上表现出色，但在跨进程通信时会产生序列化开销。

| 能力 / 任务 | Python 引擎性能特性 | 架构评判 |
| :--- | :--- | :--- |
| **批量文件发现与读取** | 由并行的 `ThreadPoolExecutor` worker 加速 | ✅ 在巨型目录下极其有效 |
| **Git commit 日志采集** | 快速的多线程子进程编排，绕过 Node 事件循环 | ✅ 非常适合冷启动 Git 元数据抽取 |
| **语义向量运算** | 原生分块、Float32 至 Int8 量化与余弦相似度计算 | ✅ 离线向量搜索极其高效 |
| **单个极小文件读取** | **比原生进程内 JavaScript V8 执行更慢** | ❌ 进程间通信开销导致微型任务效率较低 |

### 双重序列化代价详解

docmd 核心调度器与 Python 引擎之间的通信，依赖行分隔的 JSON 跨越持久化的标准输入输出（`stdio`）管道：

```text
JS Worker -> JSON.stringify() -> stdio 管道 -> Python Worker (runner.py) -> [Python 任务] -> 序列化 -> stdio 管道 -> JSON.parse()
```

对 I/O 密集型操作（如查询 Git 历史、扫描数千个文件或批量量化嵌入向量）来说，处理时间节省的部分远超序列化成本。

但对单个微小文件读取或高频内联字符串处理来说，**跨进程通信往返所消耗的 CPU 比底层任务本身还要多**。跨进程分发微型任务会让 Python 实现比 Node 原生 JIT 字符串处理更慢。

因此，**对于常规文档站点，JavaScript 引擎仍然是推荐的默认运行时**。请在大型 Git 历史、并行目录索引和语义向量搜索流水线上有针对性地启用 Python 引擎。

## 插件与 API 集成

插件与构建生命周期钩子可以通过 `@docmd/api` 直接与 Python 引擎交互。API 层充当安全边界，在强制执行严格任务白名单的同时提供高级辅助方法：

```typescript
import { resolveEngine, chunkText, quantizeVectors, cosineSimilarity } from '@docmd/api';

// 解析已配置引擎或最佳可用引擎（优先尝试 Python，回退到 JS）
const engine = await resolveEngine(['python', 'js']);

// 执行基于标题的语义文本分块
const chunks = await chunkText(engine, markdownContent, 'guide.md');

// 将 Float32 嵌入向量量化为紧凑的 Int8 表示
const { quantized, mins, ranges } = await quantizeVectors(engine, embeddingVectors);

// 计算针对语料库向量的余弦相似度排序
const matches = await cosineSimilarity(engine, queryVector, corpusVectors, 10);
```
