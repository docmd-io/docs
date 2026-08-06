---
title: "快速开始"
description: "安装、首次运行与模型选择的 docmd-search 快速入门指南。"
---

在几秒钟内安装并体验 `docmd-search` 离线语义搜索引擎。

## 安装

::: tabs
== tab "独立 CLI" icon:terminal
```bash
npm install -g docmd-search
npm install -g @huggingface/transformers onnxruntime-node
```
== tab "docmd 项目" icon:puzzle
```bash
npm install docmd-search
```
:::

## 首次运行

在文档目录中运行 `docmd-search`：

```bash
docmd-search ./docs
```

交互式向导将引导你选择适合的嵌入模型，并自动开始爬取和切分你的文档。

## 配置文件

在项目根目录下创建 `_docmd-search/config.json` 来自定义索引参数：

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "chunkSize": 256,
  "chunkOverlap": 32
}
```

## 模型选择

- `Xenova/all-MiniLM-L6-v2`: 适合英文文档，速度最快，体积仅 ~23MB。
- `Xenova/paraphrase-multilingual-MiniLM-L12-v2`: 适合 50+ 种语言的多语言站点。
