---
title: "docmd-search"
description: "面向文档的离线语义搜索引擎。本地向量嵌入，浏览器就绪的轻量索引。"
---

面向文档的离线语义搜索引擎。在构建阶段，使用 ONNX Runtime 在本地计算向量嵌入；在搜索阶段，浏览器客户端执行词条匹配与整数向量余弦相似度计算——无需将任何数据上传云端，也不向用户发布神经网络权重。

::: callout tip "零配置 CLI"
在任何目录中运行 `npx docmd-search ./docs`。开箱即用，无需 API 密钥或手动配置文件。
:::

## 使用方式

`docmd-search` 既可以作为独立的命令行工具使用，也可以作为 [docmd](https://docmd.io) 文档站点的插件。

::: grid

::: card "独立 CLI" icon:terminal
运行 `docmd-search ./my-folder` 索引任何目录并直接在终端中搜索。添加 `--ui` 启动本地浏览器预览。
:::

::: card "docmd 插件" icon:puzzle
在 `docmd.config.js` 中添加 `semantic: true`，以便在构建站点时自动生成搜索索引。
:::

:::

## 核心特性

::: grid

::: card "本地运行" icon:wifi-off
所有向量嵌入均在本地使用 ONNX Runtime 生成。数据绝不出你的电脑，无需云端 API 密钥。
:::

::: card "分批快速加载" icon:zap
首批索引加载后即可立即开始搜索。增量构建检查文件修改时间，仅对更改过的文件重新索引。
:::

::: card "极小客户端体积" icon:package
浏览器运行时体积小于 **3KB (gzipped)**。无需加载神经网络权重或沉重的 WASM 模块。
:::

::: card "断点续传构建" icon:refresh-cw
若索引过程中断，再次运行时将从上一个完成的批次恢复。已输出的索引文件即使部分完成也可正常使用。
:::

:::
