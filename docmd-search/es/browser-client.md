---
title: "Cliente del Navegador"
description: "docmd-search 浏览器客户端集成指南与 API 参考。"
---

`docmd-search` 包含一个轻量级、无依赖的浏览器客户端，用于解析批次数据并在客户端执行检索与重排序。

## 安装与导入

```typescript
import { DocmdSearchClient } from 'docmd-search/client';

const search = new DocmdSearchClient({
  indexPath: '/_docmd-search'
});

await search.init();
const results = await search.query('configuration options');
```

## 客户端初始化

```typescript
const search = new DocmdSearchClient({
  indexPath: '/_docmd-search',
  maxResults: 10,
  enableCosineReranking: true
});
```

## 查询 API

```typescript
const results = await search.query('how to install');
console.log(results);
```

返回的结果包含切片 ID、匹配文本、标题路径和综合评分：

```typescript
interface SearchResult {
  id: string;
  title: string;
  heading: string;
  path: string;
  snippet: string;
  score: number;
}
```

## 混合打分逻辑

客户端使用两阶段混合打分机制：

1. **BM25 词条匹配**: 快速筛选候选文本块。
2. **向量余弦重排序**: 计算候选文本块与查询向量的余弦相似度并融合计算最终得分。
