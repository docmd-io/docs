---
title: "对比 (Comparison)"
description: "为什么选择 docmd？了解它与 Docusaurus、VitePress、MkDocs 和其他工具的对比情况。"
---

你以前选择过文档工具，以后也会再次选择。这里是真正重要的东西 —— 以及 docmd 的优势所在。

## 3 秒钟开始编写，而不是 30 分钟

::: tabs
== tab "docmd"
```bash
npx @docmd/core dev
```
搞定。你的文档已经上线。无需配置文件，无需项目脚手架，无需陷入依赖迷宫。

== tab "Docusaurus"
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
四个命令，一个在 `node_modules` 中占用约 250MB 空间的生成项目，以及一个在你做任何有用的事情之前需要编辑的 `docusaurus.config.js`。

== tab "VitePress"
```bash
npx vitepress init
```
问你 5 个问题，生成一个配置文件，然后你运行 `vitepress dev`。很整洁 —— 但仍然需要脚手架。

== tab "MkDocs"
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python 生态。在渲染第一页之前，你需要 `pip`、虚拟环境和一个 `mkdocs.yml`。
:::

## 载荷差距是真实的

你的读者不应该为了读一个段落而下载整个 React 应用。以下是在一个有 50 个页面的网站上，浏览器实际接收到的数据：

| 生成器 | 总初始加载量 | JS 载荷 | CSS 载荷 |
|:----------|:------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "为什么这很重要"
在中端手机上，每 100 KB 的 JavaScript 都会耗费约 50ms 的解析时间。docmd 仅 12 KB 的 JS 意味着你的文档可以瞬间加载，即使在 3G 网络下也是如此。Docusaurus 为同样的内容传输了 16 倍以上的 JavaScript。
:::

## 构建速度

在 M1 MacBook Air 上构建同一个拥有 50 个页面的网站：

| 生成器 | 冷启动构建 | 热重载 (dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd 的重新构建非常快，在你切换窗口之前页面就已经刷新了。

## 真正可用的多语言支持 (i18n)

这是大多数工具折戟的地方。你添加了 6 种语言，翻译了 3 个印地语页面，突然间你的用户在每个未翻译的页面上都会遇到 404 错误。

| 能力 | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| 每页可回退到默认语言环境 | ✅ | ❌ (404) | ❌ (404) | ✅ |
| 本地化的“未翻译”警告 | ✅ | ❌ | ❌ | ✅ |
| 在切换器中自动禁用缺失的语言 | ✅ | ❌ | ❌ | ❌ |
| 瞬时页面存在检查 (无需网络) | ✅ | ❌ | ❌ | ❌ |
| 版本控制 + i18n 组合 | ✅ | ❌ | ❌ | ❌ |
| 零配置 (无需自定义 React/Vue) | ✅ | 部分 | ❌ | ✅ |

::: callout warning "在 VitePress 和 Docusaurus 中会发生什么"
如果读者切换到印地语且该页面尚未翻译，他们将看到 **404 错误**。唯一的解决方法是服务器端重定向或编写自定义 React/Vue 组件。docmd 在构建时处理此问题 —— 不可用的语言环境会显示“N/A”徽章，而未翻译的页面会静默回退并带有一个本地化的警告标注。
:::

## 完整功能矩阵

| 特性 | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **零配置启动** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **需要配置** | 无 | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **SPA 导航** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **原生版本控制** | ✅ | ✅ | ❌ | 插件 | ❌ | ✅ |
| **原生多语言 (i18n)** | ✅ | ✅ | 手动 | 插件 | ✅ | ✅ |
| **内置搜索** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | 云端 |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **行内讨论** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA 支持** | ✅ | 社区 | ❌ | ❌ | ❌ | ❌ |
| **私有化部署** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **部署配置生成器** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## 配置负担

对于一个包含版本控制、多语言、搜索和站点地图的网站，所需的配置行数：

| 生成器 | 配置行数 | 所需文件 |
|:----------|:------------:|:--------------:|
| **docmd** | **~15 行** | 1 (`docmd.config.js`) |
| MkDocs Material | ~50 行 | 1 + 插件 |
| VitePress | ~80 行 | 1 + 主题目录 |
| Docusaurus | ~120 行 | 3+ 配置文件 |

## 质量保证

docmd 附带了一套暴力测试套件，通过 **85 项断言** 验证 **25 个不同的场景** —— 覆盖了每个功能的独立运行以及组合运行的情况。每个版本在发布前必须通过所有 85 项断言和 13 项内部故障安全检查。

::: callout tip "亲自运行测试"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

同类文档生成器中，没有任何一个会在其源码中发布如此规模的端到端功能测试套件。