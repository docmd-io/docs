---
title: "横向对比"
description: "docmd 与 Docusaurus、VitePress、MkDocs、Starlight 及 Mintlify 的详细对比 —— 真实数据，真实功能。"
---

以下是 `docmd` 与同类工具的对比，测量数据取自基于相同硬件构建的 50 页文档站点。

## 3 秒开始编写，而不是 30 分钟

::: tabs
== tab "docmd" icon:rocket
```bash
npx @docmd/core dev
```
完成。你的文档已实时就绪。无需配置文件，无需项目初始化，无依赖臃肿。

== tab "Docusaurus" icon:box
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
四个命令，生成的项目在 `node_modules` 中占用约 250 MB，且在渲染任何有用内容前需要修改配置文件。

== tab "VitePress" icon:zap
```bash
npx vitepress init
```
提示回答 5 个交互式问题，生成配置文件，然后执行 `vitepress dev`。干净，但仍需要项目脚手架。

== tab "MkDocs" icon:terminal
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python 生态依赖。在渲染第一页前需要 `pip`、虚拟环境和 `mkdocs.yml`。
:::

## 载荷差距真实存在

读者不应下载数兆字节的 JavaScript 框架包来阅读技术文本。以下是 50 页站点上的实际浏览器网络载荷：

| 生成器 | 初始加载总量 | JS 载荷 | CSS 载荷 |
| :--- | :---: | :---: | :---: |
| **docmd** | **~18 KB** | **~12 KB** | **~6 KB** |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "为什么载荷大小很重要" icon:lightbulb
在中端移动处理器上，每 100 KB 的 JavaScript 会消耗约 50ms 的解析和执行时间。`docmd` 的 12 KB JavaScript 体积即使在受限的移动连接上也能确保即时页面渲染。Docusaurus 为相同内容传输了 16 倍的 JavaScript。
:::

## 构建性能

在 M1 MacBook Air 上针对 50 页站点的冷构建和热重构基准测试：

| 生成器 | 冷构建 | 热重构 (Dev) |
| :--- | :---: | :---: |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

`docmd` 的重构即时发生，在窗口焦点切换之前就更新了浏览器。

## 优雅处理缺失翻译的 i18n

当用户切换到特定页面缺少翻译的语言时，大多数文档生成器都会报错。`docmd` 在构建时自动将回退解析为默认语言。

| 功能 | docmd | VitePress | Docusaurus | Starlight |
| :--- | :---: | :---: | :---: | :---: |
| 单页回退至默认语言 | ✅ | ❌ (404) | ❌ (404) | ✅ |
| 本地化“未翻译”提示 | ✅ | ❌ | ❌ | ✅ |
| 切换器中自动隐藏缺失语言 | ✅ | ❌ | ❌ | ❌ |
| 即时页面存在性检查（无网络） | ✅ | ❌ | ❌ | ❌ |
| 版本控制 + i18n 组合 | ✅ | ❌ | ❌ | ❌ |
| 零配置（无需自定义 React/Vue） | ✅ | 部分 | ❌ | ✅ |

::: callout warning "VitePress 和 Docusaurus 中的 404 错误" icon:info
如果读者切换到特定页面尚未翻译的语言，VitePress 和 Docusaurus 会触发 **404 错误**。防止这种情况需要自定义服务器重定向或自定义框架组件。`docmd` 在构建时处理缺失的翻译 —— 未翻译的页面会平滑回退并带有本地化通知提示框。
:::

## 多项目工作区支持

在单个域名下维护多个产品（例如平台核心、SDK 和 CLI 工具）的团队需要独立的导航、不同的配置和单独的发布周期。

| 功能 | docmd | Docusaurus | VitePress | MkDocs | Starlight |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 原生工作区支持 | ✅ | 插件 | ❌ | 插件 | ❌ |
| 每个项目单行配置 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 每个项目独立版本控制 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 每个项目独立 i18n | ✅ | ❌ | ❌ | ❌ | ❌ |
| 跨项目共享资源 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 单个 `site/` 输出（无需代理） | ✅ | ❌ | ❌ | ❌ | ❌ |
| 零配置检测 | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "原生工作区配置" icon:info
```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs", "title": "SDK" }
    ]
  }
}
```
工作区中的每个项目文件夹都保留其自己的 `docmd.config.json` 用于项目级覆盖。运行 `npx @docmd/core build` 可编译统一、整合的发布目录，无需反向代理或多阶段 CI 管道。
:::

Docusaurus 需要具有重复配置文件的高复杂度多实例插件设置。MkDocs 依赖 `mkdocs-monorepo-plugin`。VitePress、Starlight 和 Mintlify 不提供原生工作区支持。

## 原生 AI 助手与 BYOK 架构

不同于依赖昂贵专有 SaaS 插件或第三方云端组件的传统文档工具，`docmd` 在开源引擎中直接内置了 RAG 驱动的交互式 AI 助手（`@docmd/plugin-ai`）。

| AI 与知识库能力 | docmd | Docusaurus | VitePress | MkDocs Material | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **交互式 AI 小部件** | ✅ (内置) | ❌ (第三方) | ❌ (第三方) | ❌ | ✅ (云端) |
| **BYOK (自带 API 密钥)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **本地模型支持 (Ollama / LocalAI)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **零配置云中继** | ✅ | ❌ | ❌ | ❌ | ✅ (仅限 SaaS) |
| **域名来源安全防护** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Open Knowledge Format (OKF)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **原生 MCP 服务 (`docmd mcp`)** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **上下文文件 (`llms.txt`)** | ✅ | ❌ | ❌ | ❌ | ✅ |

::: callout tip "为什么 BYOK 对文档团队至关重要" icon:shield
云端文档 SaaS 供应商会将团队绑定在按查询付费的订阅模式和专有 AI 模型上。`docmd` 通过 **BYOK (自带 API 密钥)** 赋予团队完全的自由度：可连接 OpenAI、Anthropic、Gemini、DeepSeek、Groq 或本地私有化部署的 Ollama 模型，同时保持对 API 预算与数据隐私的绝对掌控。
:::

## 综合功能矩阵

| 功能 | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **零配置启动** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **需要配置文件** | 无 | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **工作区 Monorepo** | ✅ | 插件 | ❌ | 插件 | ❌ | ❌ |
| **SPA 导航** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **原生版本控制** | ✅ | ✅ | ❌ | 插件 | ❌ | ✅ |
| **原生 i18n** | ✅ | ✅ | 手动 | 插件 | ✅ | ✅ |
| **内置搜索** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | 云端 |
| **交互式 AI 助手** | ✅ (BYOK) | ❌ | ❌ | ❌ | ❌ | ✅ (云端) |
| **BYOK (自带 API 密钥)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **llms.txt 支持** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **OKF 包 (知识库)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **原生 MCP 服务** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker 镜像** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **行内讨论** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA 支持** | ✅ | 社区 | ❌ | ❌ | ❌ | ❌ |
| **自托管** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **部署配置生成器** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## 配置开销

为具有版本控制、i18n、搜索和 sitemap 生成的站点所需的配置行数：

| 生成器 | 配置行数 | 所需文件 |
| :--- | :---: | :---: |
| **docmd** | **~15 行** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 行 | 1 + 插件 |
| VitePress | ~80 行 | 1 + 主题目录 |
| Docusaurus | ~120 行 | 3+ 配置文件 |

## 自动化质量保证

`docmd` 随附全面的集成测试套件，在 **85 个断言** 中验证 **25 个不同场景** —— 孤立和组合地覆盖每个核心功能和插件。每个版本在发布前必须通过所有 85 个断言和 13 个内部安全检查。

::: callout tip "在本地运行测试套件" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::
