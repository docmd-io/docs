---
title: "对比"
description: "docmd 与其他文档生成器的客观对比——真实数据，真实功能。"
---

`docmd` 定位于简单 Markdown 解析器和重量级框架应用之间。它以更小的体积，同时提供静态网站的速度与 SEO 优势，以及现代 SPA 的交互体验。

## 功能对比矩阵

| 功能 | docmd | Docusaurus | MkDocs Material | VitePress | Mintlify |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **语言** | Node.js | React | Python | Vue | SaaS |
| **是否需要配置** | **无需** | `docusaurus.config.js` | `mkdocs.yml` | `config.mts` | `mint.json` |
| **初始体积** | **~18kb** | ~250kb | ~40kb | ~50kb | ~120kb |
| **导航方式** | **SPA 路由** | React SPA | 全页刷新 | Vue SPA | Hosted SPA |
| **版本管理** | **原生支持（目录式）** | 原生（复杂） | mike 插件 | 手动 | 原生 |
| **多语言** | **原生支持（语言目录）** | 原生（复杂） | 插件 | 手动 | 原生 |
| **搜索** | **内置离线搜索** | Algolia（云端） | 内置 | MiniSearch | 云端 |
| **PWA** | **插件** | 社区插件 | 无 | 无 | Hosted |
| **llms.txt** | **自动生成** | 手动 | 无 | 无 | 专有 |
| **内联讨论** | **Threads 插件** | 无 | 无 | 无 | 无 |
| **自托管** | **是** | 是 | 是 | 是 | 否 |
| **零配置启动** | **`npx @docmd/core dev`** | 否 | 否 | 否 | 否 |

## 数据说话

### 构建体积

50 页文档网站，默认配置：

| 生成器 | 首页加载量 | JS 体积 | CSS 体积 |
| :--- | :--- | :--- | :--- |
| **docmd** | **~18kb** 合计 | ~12kb | ~6kb |
| VitePress | ~50kb 合计 | ~35kb | ~15kb |
| MkDocs Material | ~40kb 合计 | ~25kb | ~15kb |
| Docusaurus | ~250kb 合计 | ~200kb | ~50kb |
| Mintlify | ~120kb 合计 | ~80kb | ~40kb |

### 构建速度

在 M1 MacBook Air 上构建同一个 50 页网站：

| 生成器 | 冷启动构建 | 热重载（开发模式） |
| :--- | :--- | :--- |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

### 配置工作量

一个包含版本管理、多语言、搜索和站点地图功能的网站所需配置行数：

| 生成器 | 配置行数 | 所需文件数 |
| :--- | :--- | :--- |
| **docmd** | **~15 行** | 1（`docmd.config.js`） |
| VitePress | ~80 行 | 1 + 主题目录 |
| MkDocs Material | ~50 行 | 1（`mkdocs.yml`）+ 插件 |
| Docusaurus | ~120 行 | 3+ 个配置文件 |

## 质量保证

docmd 内置了一套暴力测试套件，覆盖 **25 种不同场景** 共 **85 项断言**——单独及组合验证每一项功能。每次发布前必须通过全部 85 项断言和 13 项内部故障保护检查。

::: callout tip "亲自运行测试"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

在同类文档生成器中，没有其他工具在其源码中公开了同等规模的端到端功能测试套件。