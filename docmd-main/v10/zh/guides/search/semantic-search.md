---
title: "语义搜索集成"
description: "在 docmd 中配置并部署使用本地向量嵌入的客户端混合语义搜索。"
---

传统的全文搜索依赖于精确的关键词匹配。如果用户搜索“身份验证”，但页面仅使用“OAuth2”或“登录”等词汇，标准关键词搜索引擎将无法查找到它。

docmd 提供了由 `@docmd/plugin-search` 支持的客户端 **混合语义搜索**。它在浏览器内运行本地 Hugging Face ONNX 模型管道，将 BM25 关键词频率与向量余弦相似度相结合，无需调用第三方 API 即可实现自然语言理解。

## 配置

在 `docmd.config.json` 中启用语义搜索：

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

## 嵌入模型配置档

| 模型 ID | 维度 | 大小 | 支持语言 | 主要使用场景 |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | 仅限英文 | 高精度的英文文档。 |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ 种语言 | 全面的多语言支持。 |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ 种语言 | 推荐用于国际化站点的平衡选项。 |

## 在 CI/CD 中预构建向量

在构建步骤中预先生成向量索引分块，以加速浏览器端执行：

```bash
# 构建语义搜索向量分块
npx docmd-search --build

# 编译静态站点
npx @docmd/core build
```

这会将静态 Vecto-JSON 分块输出至 `.docmd-search/`。

::: callout tip "缓存向量分块" icon:zap
将 `.docmd-search/` 提交至版本控制或在 CI/CD 工作流中进行缓存。`docmd-search` 会执行增量重新索引，使后续构建在 300ms 内完成。
:::
