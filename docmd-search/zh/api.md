---
title: "程序化 API"
description: "在脚本、CI 流水线和自定义工具中使用 docmd-search。包含示例的完整 Node.js API 参考。"
---

将 `docmd-search` 作为库导入，以构建自定义索引管道、与 CI/CD 构建工作流集成或创建搜索应用程序。

```bash
npm install docmd-search
```

## 核心管道方法

### indexDirectory

以程序化方式索引文档目录。返回一个 Promise，解析为包含分块和向量数组的 `SearchIndex` 对象。

```typescript
import { indexDirectory } from 'docmd-search';

const index = await indexDirectory(
  {
    rootDir: './docs',
    outDir: '_docmd-search',
    model: 'Xenova/all-MiniLM-L6-v2',
    include: ['**/*.md'],
    exclude: ['**/drafts/**'],
    chunkSize: 256,
    chunkOverlap: 32,
  },
  (progress) => {
    console.log(`${progress.phase}: ${progress.current}/${progress.total}`);
  }
);

console.log(`Indexed ${index.chunks.length} chunks`);
```

**选项模式：**

| 参数 | 类型 | 说明 |
| :-------- | :--- | :---------- |
| `rootDir` | `string` | 要索引的目录路径 |
| `outDir` | `string` | 索引文件的目标文件夹 (默认: `_docmd-search`) |
| `model` | `string` | HuggingFace 向量嵌入模型 ID |
| `include` | `string[]` | 包含的文件类型的 Glob 模式 |
| `exclude` | `string[]` | 排除的目录的 Glob 模式 |
| `chunkSize` | `number` | 每个分块的最大 Token 数 |
| `chunkOverlap` | `number` | 相邻分块之间的 Token 重叠量 |
| `config` | `SearchConfig` | 完整配置对象 (覆盖单独选项) |

**进度回调阶段：**

| 阶段标识符 | 说明 |
| :--------------- | :---------- |
| `crawling` | 发现匹配 Glob 模式的文件 |
| `chunking` | 将文件切分为受 Token 限制的分块 |
| `downloading-model` | 下载 ONNX 模型权重 (仅首次运行) |
| `embedding` | 使用 ONNX Runtime 生成向量嵌入 |
| `saving` | 将 JSON 索引批次文件写入磁盘 |
| `complete` | 索引完成 |

## 索引存储与 I/O

### 读取索引文件

```typescript
import { loadAllBatches, loadBatch, loadManifest, hasSearchableIndex } from 'docmd-search';

// 检查是否存在有效索引
if (hasSearchableIndex('_docmd-search')) {
  // 将完整索引加载到内存中
  const index = await loadAllBatches('_docmd-search');

  // 或单独读取 Manifest 和特定批次
  const manifest = await loadManifest('_docmd-search');
  const batch0 = await loadBatch('_docmd-search', 0);
}
```

### 手动索引构建

```typescript
import { createSearchIndex, saveBatch, saveManifest, createEmptyManifest } from 'docmd-search';

// 创建内存中的索引对象
const index = createSearchIndex(chunks, vectors, {
  model: 'Xenova/all-MiniLM-L6-v2',
  dimensions: 384,
});

// 手动保存批次和 Manifest
const manifest = createEmptyManifest('Xenova/all-MiniLM-L6-v2', 384);
await saveBatch('_docmd-search', 0, chunks, vectors, 384);
await saveManifest('_docmd-search', manifest);
```

### 向量量化与压缩

```typescript
import { compressVectors, decompressVectors, getCompressionType } from 'docmd-search';

// 根据分块数量选择压缩方案
const type = getCompressionType(chunkCount);
// 返回: 'none' | 'ternary' | 'pq'

// 压缩原始向量数组
const compressed = compressVectors(vectors, type);

// 解压缩存储的向量
const restored = decompressVectors(compressed, dimensions, type);
```

## 配置解析

### 解析配置层级

```typescript
import { resolveConfig, loadGlobalConfig, loadProjectConfig } from 'docmd-search';

// 完整层级合并: 默认值 → 全局配置 → 项目配置 → CLI 覆盖
const config = await resolveConfig('./my-project', {
  chunkSize: 512,
});

// 或加载单个配置层
const globalConfig = await loadGlobalConfig();
const projectConfig = await loadProjectConfig('./my-project');
```

### 模型检查 API

```typescript
import { AVAILABLE_MODELS, getModelProfile, getDefaultModel } from 'docmd-search';

// 列出预配置的模型 Profile
for (const model of AVAILABLE_MODELS) {
  console.log(`${model.name} (${model.dimensions}d, ${model.size})`);
}

// 获取特定模型 ID 的元数据
const profile = getModelProfile('Xenova/bge-small-en-v1.5');

// 获取默认系统模型 Profile
const defaultModel = getDefaultModel();
```

## 模型初始化与嵌入

### 初始化模型管理器

```typescript
import { createModelManager, checkPeerDeps, formatMissingDepsMessage } from 'docmd-search';

// 检查所需的 Peer 依赖
const missing = checkPeerDeps();
if (missing) {
  console.error(formatMissingDepsMessage(missing.missing));
  process.exit(1);
}

// 初始化 ONNX 模型管理器
const modelManager = await createModelManager(
  'Xenova/all-MiniLM-L6-v2',
  (progress) => {
    console.log(`Model status: ${progress.status} ${progress.progress}%`);
  }
);

// 为文本字符串生成向量嵌入
const vectors = await modelManager.embed(['Text string 1', 'Text string 2']);
```

::: callout warning "Peer 依赖说明"
ONNX 模型管理器需要 `@huggingface/transformers` 和 `onnxruntime-node`。索引加载和查询工具无需原生嵌入依赖即可独立工作。
:::

## 导出的类型

所有 TypeScript 类型定义直接从 `docmd-search` 导出：

```typescript
import type {
  SearchIndex,
  SearchResult,
  Chunk,
  VectorEntry,
  IndexOptions,
  SearchConfig,
  ModelProfile,
  GlobalConfig,
  IndexManifest,
  BatchMeta,
  NavNode,
  CompressionType,
  FileRecord,
  IndexDirectoryOptions,
  IndexProgress,
  IndexPhase,
  ModelManager,
  ModelProgress,
} from 'docmd-search';
```
