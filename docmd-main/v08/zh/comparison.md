---
title: "工具对比"
description: "docmd 与 Docusaurus、VitePress、MkDocs、Starlight、Mintlify 的真实数据对比。"
---

你选过文档工具，将来还会再选。这里是真正重要的指标，以及 docmd 的定位。

## 3 秒开始写作，而不是折腾 30 分钟

::: tabs
== tab "docmd"
```bash
npx @docmd/core dev
```
完成。文档已上线。无需配置文件，无需项目脚手架，无需陷入依赖地狱。

== tab "Docusaurus"
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
四条命令，`node_modules` 占用约 250MB，还得先编辑 `docusaurus.config.js` 才能做任何有用的事。

== tab "VitePress"
```bash
npx vitepress init
```
回答 5 个问题，生成配置文件，再运行 `vitepress dev`。流程还算简洁，但仍需脚手架。

== tab "MkDocs"
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python 生态。渲染第一个页面之前，你需要 `pip`、虚拟环境和一个 `mkdocs.yml`。
:::

## 体积差距是真实存在的

读者不应该为了看一段文字就下载整个 React 应用。以下是 50 页站点浏览器实际接收的数据量：

| 生成器 | 首次加载总量 | JS 体积 | CSS 体积 |
|:----------|:------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "为什么这很重要" icon:lightbulb
中端手机上每 100 KB JavaScript 需要约 50ms 解析时间。docmd 只有 12 KB JS，即使在 3G 网络下文档也能即时加载。Docusaurus 为相同内容传输了 16 倍以上的 JavaScript。
:::

## 构建速度

在 M1 MacBook Air 上构建同一个 50 页站点：

| 生成器 | 冷启动构建 | 热重载 (dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd 的重建速度极快，页面刷新比切换窗口还快。

## 真正能用的多语言支持

这是大多数工具的软肋。你添加了 6 种语言，翻译了 3 个印地语页面，然后用户在每个未翻译的页面上都遇到 404。

| 功能 | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| 未翻译页面回退到默认语言 | ✅ | ❌ (404) | ❌ (404) | ✅ |
| 显示本地化的"未翻译"提示 | ✅ | ❌ | ❌ | ✅ |
| 语言切换器中自动隐藏缺失语言 | ✅ | ❌ | ❌ | ❌ |
| 即时页面存在性检查（无需网络请求） | ✅ | ❌ | ❌ | ❌ |
| 版本控制与 i18n 同时使用 | ✅ | ❌ | ❌ | ❌ |
| 零配置（无需自定义 React/Vue） | ✅ | 部分支持 | ❌ | ✅ |

::: callout warning "VitePress 和 Docusaurus 的实际情况" icon:info
如果读者切换到印地语而该页面尚未翻译，他们会看到 **404 错误**。唯一的解决方案是服务器端重定向或编写自定义 React/Vue 组件。docmd 在构建阶段处理这个问题——缺失的语言在切换器中显示"N/A"标记，未翻译的页面会静默回退并显示一个本地化的提示框。
:::

## 工作区支持

在同一域名下维护多个产品文档的团队，需要各自独立的版本、导航和发布周期。大多数工具要么让你维护多个独立站点，要么在插件系统里凑合。

| 功能 | docmd | Docusaurus | VitePress | MkDocs | Starlight |
|:-----------|:-----:|:----------:|:---------:|:------:|:---------:|
| 原生工作区支持 | ✅ | 插件 | ❌ | 插件 | ❌ |
| 每个项目只需一行配置 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 每个项目独立版本控制 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 每个项目独立多语言 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 跨项目共享静态资源 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 单一 `site/` 输出（无需反向代理） | ✅ | ❌ | ❌ | ❌ | ❌ |
| 零配置自动检测 | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "docmd 的实现方式" icon:info
```json
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs", "title": "SDK" }
    ]
  }
}
```
每个项目目录有自己的 `docmd.config.json`。一次 `npx @docmd/core build` 生成一个可直接部署的目录——无需反向代理、无需 nginx、无需独立 CI 流水线。
:::

Docusaurus 通过多实例插件实现类似功能，但配置复杂——每个实例需要单独的插件入口、侧边栏文件和手动路由配置。MkDocs 需要第三方 `mkdocs-monorepo-plugin`。VitePress、Starlight 和 Mintlify 均不支持原生工作区。

## 完整功能对比

| 功能 | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **零配置启动** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **所需配置文件** | 无 | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **工作区支持** | ✅ | 插件 | ❌ | 插件 | ❌ | ❌ |
| **SPA 导航** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **原生版本控制** | ✅ | ✅ | ❌ | 插件 | ❌ | ✅ |
| **原生多语言** | ✅ | ✅ | 手动 | 插件 | ✅ | ✅ |
| **内置搜索** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | 云端 |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MCP 服务端** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent 技能** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker 镜像** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **页内评论** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA 支持** | ✅ | 社区插件 | ❌ | ❌ | ❌ | ❌ |
| **自托管** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **部署配置生成** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## 配置复杂度

实现版本控制、多语言、搜索和站点地图所需的配置行数：

| 生成器 | 配置行数 | 所需文件数 |
|:----------|:------------:|:--------------:|
| **docmd** | **约 15 行** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 行 | 1 + 插件 |
| VitePress | ~80 行 | 1 + 主题目录 |
| Docusaurus | ~120 行 | 3+ 个配置文件 |

## 质量保证

docmd 附带一套完整的测试套件，通过 **85 项断言**验证 **25 个独立场景**——涵盖每项功能的单独测试和组合测试。每个版本发布前必须通过全部 85 项断言和 13 项内部安全检查。

::: callout tip "自己跑一遍测试" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

同类文档生成器中，没有任何一个在源码中公开了同等规模的端到端功能测试套件。

