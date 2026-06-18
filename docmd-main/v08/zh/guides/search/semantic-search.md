---
title: "语义搜索集成"
description: "如何使用本地向量嵌入，在 docmd 中配置并部署客户端的混合语义搜索。"
---

## 问题

传统全文搜索完全依赖精确的关键词匹配。若用户搜索 "authentication"，而页面只使用 "OAuth2" 或 "login" 等措辞，标准的关键词搜索引擎将无法命中。这迫使作者进行不自然的关键词堆砌，也让读者在找不到所需内容时感到沮丧。

## 为什么重要

现代开发者期望能够理解意图、同义词与上下文的自然语言界面。在服务端实现语义搜索通常需要搭建复杂的基础设施，例如向量数据库（如 Pinecone 或 pgvector）、托管模型以及构建 API —— 这会带来更高的维护负担、每月托管成本，以及安全与隐私方面的顾虑。

## 方法

使用 docmd 原生的 **语义搜索插件 (Semantic Search Plugin)**。它完全在客户端运行，使用高度优化的浏览器运行时。它在构建时借助本地 Hugging Face 模型管线生成结构化的向量块索引，然后结合 BM25 关键词频率与向量余弦相似度进行混合重排。数据不会被发送到任何第三方 API。

## 实现

### 1. 在配置中启用语义搜索

在您的 `docmd.config.json` 中添加 `search` 插件选项。将 `semantic` 设为 `true`，并启用 `showConfidence`，以便在搜索结果中直观地标识语义匹配：

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true,
      "showConfidence": true
    }
  }
}
```

### 2. 选择合适的 Embedding 模型

docmd 既支持轻量级的纯英语模型，也支持全面的多语言模型。您可以通过 `docmd-search --settings` 更新模型配置，或显式定义：

| 模型 ID | 维度 | 大小 | 支持语言 | 适用场景 |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | 仅英语 | 快速、高精度的英语文档 |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ 语种 | 极致的多语言质量 |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ 语种 | 多语言场景下的优秀平衡 |

### 3. 在 CI/CD 中预构建索引

为了避免浏览器在首次加载时的开销，可在构建或 CI/CD 流水线中通过 CLI 预先生成搜索块：

```bash
# 构建语义搜索索引
npx docmd-search --build

# 随后执行 docmd 构建
npx @docmd/core build
```

这会在 `.docmd-search/` 目录中生成经过高度优化的静态 Vecto-JSON 块。当用户执行搜索时，客户端会在后台按需渐进加载这些块，保持 UI 始终即时可交互。

## 取舍

### 初次资源体积
客户端向量嵌入要求浏览器在首次搜索时下载 WebAssembly 运行时以及预训练的 ONNX 模型文件。尽管这些资源会被浏览器 Cache Storage 持久缓存，但在较慢的网络环境下，首次搜索的延迟可能略高（约 1–2 秒）。

### 搜索质量 vs. 资源体积
选择 `LaBSE` 这类更大的模型，可获得出色的多语言质量，但下载量也会更大。对于一般的国际化文档站点，`paraphrase-multilingual-MiniLM-L12-v2` 模型是精度与网络体积之间的推荐平衡点。