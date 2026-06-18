---
title: "JavaScript 引擎"
description: "深入了解 docmd 自带的 JavaScript 执行引擎：使用场景、可移植性、能力与限制。"
---

**JavaScript 引擎** 是 docmd 内置的基础执行引擎。它能轻松运行在现代 JavaScript 运行时上，无需任何外部依赖或复杂的编译器，即可提供出色性能。

默认情况下，每个 docmd 仓库都使用 JavaScript 引擎。它提供高可靠性的文件遍历、元数据索引与构建生成。

## 配置

要显式告诉 docmd 使用 JavaScript 后端，只需在 `docmd.config.json` 中将 `engine` 属性设为 `"js"`。

```json "docmd.config.json"
{
  "title": "开发者手册",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## 适用场景与闪光点

JavaScript 引擎极其全能，在以下场景尤为出色：

- **标准仓库**：包含几百个页面的站点构建极快，得益于优化的 JIT 编译与原生 JSON 解析。
- **最强可移植性**：若团队使用不同的操作系统或受限的企业内网，JavaScript 引擎能保证所有环境都能稳定构建。
- **快速原型**：本地开发构建可借助 `npx @docmd/core dev` 即时热刷新，启动延迟极低。
- **自定义脚本**：配置兜底逻辑与插件集成都自然运行在 JavaScript 中，标准字符串解析不会产生跨边界序列化成本。

## 可用设备与宿主兼容性

由于完全运行在原生运行时中，JavaScript 引擎支持极其广泛的目标平台：

- **操作系统**：macOS、Linux、Windows、FreeBSD 与 OpenBSD。
- **硬件架构**：x64、ARM64（Apple Silicon、AWS Graviton）、ARMv7 与 RISC-V。
- **容器环境**：Alpine Linux、标准 Debian/Ubuntu、无服务器构建执行器（Vercel、Netlify）以及嵌入式 CI 流水线。

## 能力与限制

| 维度 | JavaScript 引擎特性 | 实际影响 |
| :--- | :--- | :--- |
| **并发模型** | Node.js 事件循环 + 原生 Worker 线程 | 对网络响应的异步调度非常出色；磁盘密集型任务也能顺畅运行。 |
| **Git 元数据处理** | 子进程编排 (`child_process.execFile`) | 安全地派生原生 Git 二进制来收集提交历史，包含持久化磁盘缓存。 |
| **安装与初始化** | 零配置 | 启动瞬时，无需在 postinstall 阶段编译任何包。 |
| **可扩展性上限** | 在约 1000 个文档以内性能出色 | 在超过一千个复杂文件的单体仓库中，串行的子进程开销可能带来轻微延迟。 |

## 功能完整度

JavaScript 引擎 **独占"通用功能全支持"的位置**。每一项核心特性、进阶语法、模板区域与官方插件都被设计为可在此顺畅运行。

无论是编译数学公式、渲染实时搜索索引，还是生成静态站点地图，JavaScript 引擎都能保证确定的构建结果。
