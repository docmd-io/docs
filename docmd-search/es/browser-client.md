---
title: "Cliente del Navegador"
description: "将语义搜索集成到任何 Web 页面中。体积小于 3KB gzipped，无需模型权重，纯算术打分。"
---

Cliente del Navegador是一个轻量级搜索运行时（<3KB gzipped），用于加载预构建的静态搜索索引文件，并使用关键字匹配和整数向量余弦相似度进行打分，无需 Web Worker、WASM 或神经网络模型权重。

## 软件包安装与导入

::: tabs
== tab "npm 软件包" icon:package
```bash
npm install docmd-search
```

```javascript
import { load, search, isReady } from 'docmd-search/client';
```
== tab "CDN Bundle" icon:globe
```html
<script src="https://unpkg.com/docmd-search/dist/client/index.js"></script>
<script>
  const { load, search, isReady } = window.DocmdSearch;
</script>
```
:::

## 基本使用示例

```javascript
import { load, search } from 'docmd-search/client';

// 从预构建的 _docmd-search 目录初始化索引
await load('/assets/_docmd-search');

// 执行搜索查询
const results = search('deploy kubernetes', 10);

for (const result of results) {
  console.log(`${result.chunk.file} → ${result.chunk.heading} (${result.score.toFixed(2)})`);
}
```

## 客户端 API 参考

### load(basePath, onBatchLoaded?)

从 `basePath` 获取索引文件。读取 `manifest.json`，加载 `batches/000.json` 以便搜索立即就绪，并在后台异步流式传输剩余的索引批次。

```typescript
function load(
  basePath: string,
  onBatchLoaded?: (loaded: number, total: number) => void
): Promise<void>
```

**参数：**

| 参数 | 类型 | 说明 |
| :-------- | :--- | :---------- |
| `basePath` | `string` | 包含 `manifest.json` 和批次文件的相对或绝对 URL 路径 |
| `onBatchLoaded` | `function` | 每次批次加载完成时触发的回调函数 |

**批次流式加载回调示例：**

```javascript
await load('/_docmd-search', (loaded, total) => {
  const percent = Math.round((loaded / total) * 100);
  console.log(`索引加载进度: ${percent}% (${loaded}/${total} 批次)`);
});
```

::: callout info "异步批次就绪性"
只要 `batches/000.json` 加载完成，搜索即可正常工作。`onBatchLoaded` 回调允许你在后台批次流式传输时更新 UI 中的加载指示器。
:::

### search(query, topK?)

使用混合打分对已加载的索引批次评估查询。

```typescript
function search(query: string, topK?: number): SearchResult[]
```

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
| :-------- | :--- | :------ | :---------- |
| `query` | `string` |  -  | 搜索查询字符串 |
| `topK` | `number` | `10` | 返回的最大结果数 |

**返回值：** `SearchResult[]`

```typescript
interface SearchResult {
  score: number;       // 归一化的相关性得分 (0.0 到 1.0)
  chunk: {
    file: string;      // 相对源文档文件路径
    heading?: string;  // 标题章节上下文
    text: string;      // 文本块片段
    range: [number, number]; // 原始源文件中的字节偏移范围
  };
}
```

::: callout warning "请先调用 load()"
在 `load()` 完成之前运行 `search()` 会抛出错误。在搜索前使用 `isReady()` 检查索引是否已加载。
:::

### isReady()

如果至少已加载一个批次且搜索就绪，则返回 `true`。

```typescript
function isReady(): boolean
```

### getProgress()

返回当前批次加载进度。

```typescript
function getProgress(): { loaded: number; total: number }
```

### getChunkCount()

返回已加载到内存中的文档文本块总数。

```typescript
function getChunkCount(): number
```

## HTML UI 集成示例

一个完整的独立搜索栏集成示例：

```html
<input type="text" id="search-input" placeholder="Cargando índice de búsqueda..." disabled />
<div id="search-results"></div>

<script type="module">
  import { load, search, isReady } from 'docmd-search/client';

  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');

  // 加载静态搜索索引
  await load('/assets/_docmd-search', (loaded, total) => {
    input.placeholder = `正在加载索引... ${Math.round((loaded / total) * 100)}%`;
  });

  input.placeholder = 'Buscar en la documentación...';
  input.disabled = false;
  input.focus();

  // 防抖输入搜索
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!isReady()) return;
      const results = search(input.value, 8);
      resultsEl.innerHTML = results
        .map(r => `
          <a href="/${r.chunk.file.replace('.md', '/')}">
            <strong>${r.chunk.heading || r.chunk.file}</strong>
            <p>${r.chunk.text.slice(0, 120)}...</p>
          </a>
        `)
        .join('');
    }, 150);
  });
</script>
```

## 混合打分系统

查询排序通过两阶段混合算法计算候选得分：

### 阶段 1：BM25 词条匹配

文档文本中的词条匹配按词条饱和度衰减打分：

$$	ext{keywordScore} = \sum rac{	ext{count}(t)}{	ext{count}(t) + 1.5}$$

### 阶段 2：向量余弦重排序

最高关键字匹配向量作为候选参考。计算候选向量与查询向量的余弦相似度，并将分数归一化到 $[0, 1]$：

$$	ext{normalisedKw} = rac{	ext{keywordScore}}{	ext{keywordScore} + 1}$$

$$	ext{finalScore} = (	ext{normalisedKw} 	imes 0.6) + (	ext{cosineSimilarity} 	imes 0.4)$$

## 索引版本兼容性

当缺少 `manifest.json` 时，客户端会自动检测旧版的单文件搜索索引模式 (`search-index.json`)，保持与旧版 docmd 的完全向下兼容。
