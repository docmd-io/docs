---
title: "对比"
description: "docmd 与 Docusaurus、VitePress、MkDocs、Starlight 和 Mintlify 的对比 — 真实数据，真实功能。"
---

你曾经选择过文档工具。你还会再选择一次。这是真正重要的内容 — 以及 docmd 的定位。

## 3秒钟开始编写，而不是30分钟

::: tabs
tab: docmd
```bash
npx @docmd/core dev
```
搞定。你的文档上线了。没有配置文件，没有项目脚手架，没有依赖迷宫。

tab: Docusaurus
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
四个命令，一个在 `node_modules` 中有 ~250MB 的生成项目，以及一个在你做任何有用的事情之前需要编辑的 `docusaurus.config.js`。

tab: VitePress
```bash
npx vitepress init
```
问你 5 个问题，生成一个配置文件，然后你运行 `vitepress dev`。很干净 — 但仍然需要脚手架。

tab: MkDocs
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python 生态系统。你需要 `pip`，一个虚拟环境，以及一个 `mkdocs.yml`，然后才能渲染第一个页面。
:::

## 有效载荷差距是真实的

你的读者不应该仅仅为了阅读一个段落而下载一个 React 应用程序。以下是一个 50 页的站点浏览器实际接收到的内容：

| 生成器 | 总初始加载 | JS 载荷 | CSS 载荷 |
|:----------|:------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "为什么这很重要"
每 100 KB 的 JavaScript 在中端手机上要花费约 50 毫秒的解析时间。docmd 的 12 KB JS 意味着你的文档瞬间加载 — 即便是在 3G 网络下。Docusaurus 为相同的内容传送了 16 倍以上的 JavaScript。
:::

## 构建速度

在 M1 MacBook Air 上构建同一个 50 页的站点：

| 生成器 | 冷构建 | 热重载 (dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd 的重载速度足够快，以至于在你切换窗口之前页面就已经刷新了。

## 真正有效的 i18n

这正是大多数工具失效的地方。你添加了 6 种语言，将 3 个页面翻译成印地语，突然你的用户在每个未翻译的页面上都遇到了 404 错误。

| 能力 | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| 逐页回退到默认语言 | ✅ | ❌ (404) | ❌ (404) | ✅ |
| 本地化"未翻译"警告 | ✅ | ❌ | ❌ | ✅ |
| 自动禁用缺失语言区域 | ✅ | ❌ | ❌ | ❌ |
| 即时页面存在检查 (无网络) | ✅ | ❌ | ❌ | ❌ |
| 版本控制 + i18n 组合 | ✅ | ❌ | ❌ | ❌ |
| 零配置 (无需自定义 React/Vue) | ✅ | 部分 | ❌ | ✅ |

::: callout warning "VitePress 和 Docusaurus 中会发生什么"
如果读者切换到印地语并且该页面尚未翻译，他们会收到 **404 错误**。唯一的解决方法是服务器端重定向或编写自定义的 React/Vue 组件。docmd 在构建时处理此问题 — 不可用的语言区域会显示 "N/A" 标记，未翻译的页面会静默回退，并带有本地化的警告提示。
:::

## 完整功能矩阵

| 功能 | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **零配置启动** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **必需的配置** | 无 | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **SPA 导航** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **原生版本控制** | ✅ | ✅ | ❌ | 插件 | ❌ | ✅ |
| **原生 i18n** | ✅ | ✅ | 手动 | 插件 | ✅ | ✅ |
| **内置搜索** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | 云端 |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **内联讨论** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA 支持** | ✅ | 社区 | ❌ | ❌ | ❌ | ❌ |
| **自托管** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **部署配置生成器** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## 配置开销

拥有版本控制、i18n、搜索和网站地图的站点所需的配置行数：

| 生成器 | 配置行数 | 需要的文件 |
|:----------|:------------:|:--------------:|
| **docmd** | **~15 行** | 1 (`docmd.config.js`) |
| MkDocs Material | ~50 行 | 1 + 插件 |
| VitePress | ~80 行 | 1 + 主题目录 |
| Docusaurus | ~120 行 | 3+ 配置文件 |

## 质量保证

docmd 附带了一个暴力测试套件，验证涵盖 **85 个断言** 的 **25 个不同场景** — 涵盖每个功能的独立运行和组合运行。每个发布版本在发布前都必须通过所有 85 个断言和 13 个内部故障保护检查。

::: callout tip "自己运行测试"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

在这个级别的文档生成器中，没有其他工具将其作为源代码的一部分发布可比拟的端到端功能测试套件。