---
title: "docmd-search"
description: "Offline-Semantik-Suchmaschine für Dokumentationswebsites。本地向量嵌入，浏览器就绪的索引。"
---

Offline-Semantik-Suchmaschine für Dokumentationswebsites。向量嵌入在构建时使用 ONNX Runtime 在本地生成。Browser-Client执行关键字匹配和整数向量余弦相似度计算——无需向云服务发送任何数据，也不向用户分发神经网络权重。

::: callout tip "零配置 CLI"
在任何目录中运行 `npx docmd-search ./docs`。开箱即用，无需设置、API 密钥或手动配置文件。
:::

## 使用方式

`docmd-search` 既可以作为独立的命令行工具使用，也可以作为 [docmd](https://docmd.io) 文档站点的插件使用。

::: grid

::: card "独立 CLI" icon:terminal
运行 `docmd-search ./my-folder` 索引任何目录并直接在终端中搜索。添加 `--ui` 打开本地浏览器界面。
:::

::: card "docmd 插件" icon:puzzle
在 `docmd.config.js` 中添加 `semantic: true`，以在构建站点时自动构建搜索索引。
:::

:::

## 架构概览

```
构建阶段 (Node.js)                      搜索阶段 (浏览器, <3KB)
───────────────────                     ──────────────────────────
 爬取 Markdown 文件                      加载 manifest.json
   → 标题感知切分                          → 加载 batches/000.json (立即搜索)
     → ONNX 向量嵌入                         → 在后台加载其余批次
       → Float32 → Int8 量化                 → BM25 关键字 + 余弦相似度打分
         → 积 / 三进制压缩                     → 显示排序后的搜索结果
           → 保存索引文件 (_docmd-search/)
```

在构建阶段，嵌入向量由你的计算机上的 ONNX Runtime 计算。Browser-Client接收预先计算好的整数向量，并在本地计算词条匹配和向量得分。

## 核心特性

::: grid

::: card "本地运行" icon:wifi-off
所有向量嵌入均在本地使用 ONNX Runtime 生成。数据绝不出你的计算机，无需云端 API 密钥。
:::

::: card "分批快速加载" icon:zap
首批索引加载完成后即可立即开始搜索。增量重新索引会检查修改时间，仅重新索引更改过的文件。
:::

::: card "极小客户端运行时" icon:package
浏览器运行时体积小于 **3KB gzipped**。运行时无需神经网络权重或沉重的 WASM 模块。
:::

::: card "可断点续传构建" icon:refresh-cw
如果索引被打断，再次运行时将从上一个完成的批次恢复。输出的索引文件即使部分完成也可正常使用。
:::

:::

## Erste Schritte

::: tabs
== tab "独立 CLI" icon:terminal
```bash
# 全局安装
npm install -g docmd-search

# 安装嵌入依赖项（一次性设置）
npm install -g @huggingface/transformers onnxruntime-node

# 索引任何文件夹
docmd-search ./my-folder

# 启动浏览器预览
docmd-search ./my-folder --ui
```
== tab "docmd 插件" icon:puzzle
```bash
# 在你的 docmd 项目仓库中
npm install docmd-search
```

在你的配置文件中启用语义搜索：

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,  // 激活 docmd-search 索引器
    }
  }
};
```
:::

首次运行时，交互式提示将协助你选择嵌入模型。你的文档将被爬取，按标题切分为章节，生成嵌入向量，并保存到 `_docmd-search/`。

## 文档目录

| 页面 | 说明 |
| :--- | :---------- |
| [Erste Schritte](getting-started) | 安装、首次运行与模型选择 |
| [Konfiguration](configuration) | 全局、项目与命令行配置选项 |
| [Funktionsweise](how-it-works) | 架构、切分、量化与混合打分 |
| [CLI 命令行参考](cli) | 命令行选项、Flag 与退出代码 |
| [Programmierbare API](api) | 用于自定义构建脚本的 Node.js API 方法 |
| [Browser-Client](browser-client) | Browser-Client集成 API 与打分逻辑 |

## 系统架构

`docmd-search` 和 `docmd` 是独立的工具，旨在无缝协同工作：

```
┌─────────────────────────────────────────────────────────────────────┐
│                        docmd-search (独立)                           │
│                                                                     │
│  CLI → 索引目录 → _docmd-search/ 批次 → 终端搜索                     │
│                              │                                      │
│                              │ --ui Flag                            │
│                              ▼                                      │
│                    启动 docmd 预览服务器                             │
│                    (docmd 负责托管 Web UI)                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        docmd (文档引擎)                             │
│                                                                     │
│  配置 → 构建站点 → plugin-search 执行                                │
│                              │                                      │
│                              │ semantic: true                       │
│                              ▼                                      │
│                    运行 docmd-search 索引器                         │
│                    (生成 _docmd-search/ 资源包)                     │
└─────────────────────────────────────────────────────────────────────┘
```

当使用 `--ui` Flag 独立运行时：
1. `docmd-search` 构建搜索索引。
2. 它生成指向 `_docmd-search/` 的临时 `docmd` 配置。
3. 它启动 `docmd` 作为本地预览服务器来显示搜索 UI。

当作为插件使用时 (`semantic: true`)：
1. `docmd` 在构建站点期间导入 `docmd-search`。
2. 索引器将多批次 JSON 文件写入输出构建目录下的 `_docmd-search/`。
3. Browser-Client直接搜索这些预构建的索引文件。
