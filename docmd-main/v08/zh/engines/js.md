---
title: "JavaScript 引擎"
description: "深入探索 docmd 的原生 JavaScript 执行引擎：用例、可移植性、功能和限制。"
---

**JavaScript 引擎**是内置到 docmd 中的基础执行引擎。它在现代 JavaScript 运行时上轻松运行。它在没有外部依赖或复杂编译器的情况下提供出色的性能。

默认情况下，每个 docmd 仓库都依赖于 JavaScript 引擎。它提供高度可靠的文件遍历、元数据索引和构建生成。

## 配置

要明确指示 docmd 使用 JavaScript 后端，在 `docmd.config.json` 中将 `engine` 属性定义为 `"js"`。

```json
{
  "title": "开发者手册",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## 理想用例和优势

JavaScript 引擎非常通用。它在以下条件下表现出色：

- **标准仓库**：包含多达数百个页面的网站构建速度极快。它利用优化的 JIT 编译和原生 JSON 解析。
- **最大可移植性**：如果你的团队使用不同的操作系统或受限的企业网络，JavaScript 引擎可保证在任何地方完美构建。
- **快速原型开发**：本地开发构建受益于即时热重载（`npx @docmd/core dev`），初始化延迟低。
- **自定义脚本**：配置回退和插件集成在 JavaScript 中自然执行。标准字符串解析避免了跨边界序列化成本。

## 可用设备和主机兼容性

因为它完全在原生运行时环境中运行，JavaScript 引擎支持详尽的目标平台阵列：

- **操作系统**：macOS、Linux、Windows、FreeBSD 和 OpenBSD。
- **硬件架构**：x64、ARM64（Apple Silicon、AWS Graviton）、ARMv7 和 RISC-V。
- **容器环境**：Alpine Linux、标准 Debian/Ubuntu、无服务器构建运行器（Vercel、Netlify）和嵌入式 CI 流水线。

## 功能和限制

| 维度 | JavaScript 引擎配置文件 | 操作影响 |
| :--- | :--- | :--- |
| **并发模型** | Node.js 事件循环 + 原生工作线程 | 出色的网络响应异步调度。磁盘密集型块平稳运行。 |
| **Git 元数据处理** | 子进程编排（`child_process.execFile`） | 安全地生成原生 Git 二进制文件以获取提交历史。包括持久磁盘缓存。 |
| **设置和初始化** | 零配置 | 瞬间启动。不需要包后安装编译。 |
| **可扩展性上限** | 在约 1,000 个文档内高性能 | 在超过一千个复杂文件的单体仓库上，顺序子进程开销可能会引入轻微的延迟。 |

## 功能完整性

JavaScript 引擎在**通用功能支持方面是独占的**。每个核心功能、高级语法、模板区域和官方插件都经过精心设计，可在此处轻松运行。

无论是编译数学公式、渲染实时搜索索引还是生成静态站点地图，JavaScript 引擎都保证确定性构建。