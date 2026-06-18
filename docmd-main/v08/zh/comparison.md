---
title: "横向对比"
description: "docmd 与 Docusaurus、VitePress、MkDocs、Starlight、Mintlify 的真实对比 —— 用真实数字说话。"
---

以下是 docmd 与各替代方案的对比，测量数据来自部署在同一台硬件上的一个 50 页站点。

## 3 秒即可开始写作，而非 30 分钟

::: tabs
== tab "docmd"
```bash
npx @docmd/core dev
```
搞定。您的文档已上线。没有配置文件、没有脚手架、没有依赖迷宫。

== tab "Docusaurus"
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
四条命令、一个生成的项目（约 250 MB `node_modules`），以及一份在"看到任何有意义的东西"之前必须编辑的配置文件。

== tab "VitePress"
```bash
npx vitepress init
```
会询问 5 个问题、生成配置文件，然后您再运行 `vitepress dev`。很干净 —— 但仍需要脚手架。

== tab "MkDocs"
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python 生态。您需要 `pip`、一个虚拟环境，以及一份 `mkdocs.yml`，才能看到第一页的渲染。
:::

## 资源体积差距是真实存在的

读者不应该为了读一段文字而下载整个 React 应用。在一个 50 页站点上，浏览器实际收到的是：

| 生成器 | 总初始加载 | JS 载荷 | CSS 载荷 |
|:----------|:----------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "为什么这很重要" icon:lightbulb
每多 100 KB JavaScript，在中端手机上大约多耗 50 ms 解析时间。docmd 的 12 KB JS 意味着即便在 3G 网络下文档也能瞬间加载。承载同样的内容，Docusaurus 输出的 JavaScript 体积是 docmd 的 16 倍。
:::

## 构建速度

在 M1 MacBook Air 上构建同一个 50 页站点：

| 生成器 | 冷构建 | 热重载 (dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2 s** | **~80 ms** |
| VitePress | ~2.5 s | ~150 ms |
| MkDocs Material | ~3.0 s | ~500 ms |
| Docusaurus | ~15 s | ~2 s |

docmd 的重建快到您切个窗口回来，页面就已经更新了。

## 能妥善处理"未翻译"情况的 i18n

当读者切到某门语言，而其中部分页面尚未翻译时，多数工具都会失灵。docmd 会在构建时回退到默认 locale。

| 能力 | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| 按页面回退到默认 locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| 本地化的"未翻译"提示 | ✅ | ❌ | ❌ | ✅ |
| 在切换器中自动隐藏缺失的 locale | ✅ | ❌ | ❌ | ❌ |
| 即时页面存在性检查（不发网络请求） | ✅ | ❌ | ❌ | ❌ |
| 版本管理 + i18n 组合 | ✅ | ❌ | ❌ | ❌ |
| 零配置（无需自写 React/Vue） | ✅ | 部分 | ❌ | ✅ |

::: callout warning "VitePress 与 Docusaurus 的表现" icon:info
如果读者切到 Hindi，但该页面未翻译，他们会看到一个 **404 错误**。唯一的变通办法是服务端重定向，或者自己写一个 React/Vue 组件。docmd 在构建时就处理好了 —— 不可用的 locale 会显示 "N/A" 徽标，未翻译的页面会静默回退，并附带本地化的提示 Callout。
:::

## Workspace

需要在同一域名下维护多个产品文档的团队（例如核心平台 + SDK），往往需要为每个产品准备独立的文档、各自的导航与发布节奏。多数生成器要么需要分别部署，要么需要用插件粘合。

| 能力 | docmd | Docusaurus | VitePress | MkDocs | Starlight |
|:-----------|:-----:|:----------:|:---------:|:------:|:---------:|
| 原生 Workspace 支持 | ✅ | 插件 | ❌ | 插件 | ❌ |
| 每个项目只需一行配置 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 每个项目独立版本管理 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 每个项目独立 i18n | ✅ | ❌ | ❌ | ❌ | ❌ |
| 项目间共享资源 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 单一 `site/` 输出（无需反代） | ✅ | ❌ | ❌ | ❌ | ❌ |
| 零配置自动检测 | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "docmd 的做法" icon:info
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
每个项目目录都拥有自己的 `docmd.config.json`，配置彼此独立。一次 `npx @docmd/core build` 就产出一个可部署目录 —— 不需要反向代理、不需要 Nginx、也不需要多条 CI 流水线。
:::

Docusaurus 通过多实例插件达到类似效果，但每个实例都需要独立的插件条目、侧边栏文件与手工路由配置；MkDocs 则需要第三方插件 `mkdocs-monorepo-plugin`；VitePress、Starlight 与 Mintlify 干脆没有原生 Workspace 能力。

## 完整功能矩阵

| 特性 | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **零配置启动** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **必需配置** | 无 | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **Workspace** | ✅ | 插件 | ❌ | 插件 | ❌ | ❌ |
| **SPA 导航** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **原生版本管理** | ✅ | ✅ | ❌ | 插件 | ❌ | ✅ |
| **原生 i18n** | ✅ | ✅ | 手动 | 插件 | ✅ | ✅ |
| **内置搜索** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | 云端 |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MCP 服务器** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker 镜像** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **内联讨论** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA 支持** | ✅ | 社区 | ❌ | ❌ | ❌ | ❌ |
| **可自托管** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **部署配置生成器** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## 配置成本

为同时包含版本管理、i18n、搜索与站点地图的站点，所需的配置行数：

| 生成器 | 配置行数 | 所需文件 |
|:----------|:-------------:|:---------------------:|
| **docmd** | **~15 行** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 行 | 1 + 插件 |
| VitePress | ~80 行 | 1 + 主题目录 |
| Docusaurus | ~120 行 | 3+ 配置文件 |

## 质量保障

docmd 自带一套 brute-test 套件，覆盖 **25 个不同场景** 与 **85 条断言** —— 既覆盖每个独立功能，也覆盖它们的组合。每次发布都必须通过全部 85 条断言以及 13 项内部 failsafe 检查。

::: callout tip "亲自运行测试" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

同级别文档生成器中，没有谁把可比的端到端功能测试套件作为源码的一部分公开。
