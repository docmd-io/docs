---
title: "工作原理"
description: "架构深度解析：引擎适配器、文件发现、标题感知切分、ONNX 向量嵌入、向量压缩、多批次索引以及混合浏览器搜索。"
---

`docmd-search` 分为两个独立阶段运行：在 Node.js 上运行的**构建时**管道，以及在浏览器中运行的轻量级**搜索时**客户端。

## 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                 构建阶段 (Node.js)                       │
│                                                         │
│   爬取 → 切分 → 嵌入 (ONNX) → 量化 → 压缩                │
│              │                      │                   │
│              └──────────────────────┘                   │
│                        │                                │
│               引擎适配器 (Rust → JS → 内置)               │
│                        │                                │
│                        ▼                                │
│                _docmd-search/                           │
│                ├── manifest.json                        │
│                ├── navigation.json                      │
│                └── batches/ (000.json + 000.bin)        │
└─────────────────────────────────────────────────────────┘
                         │
                      部署 / 托管
                         │
┌─────────────────────────────────────────────────────────┐
│               搜索阶段 (浏览器, <3KB)                    │
│                                                         │
│  加载 manifest → 加载 batches/000.json → 搜索就绪        │
│                → 在后台流式加载其余批次                 │
│                → BM25 词条打分 + 余弦相似度打分          │
│                → 排序后的搜索结果                       │
└─────────────────────────────────────────────────────────┘
```

## 引擎适配器集成

`docmd-search` 使用**引擎适配器** (`src/engine.ts`) 将 CPU 密集型任务（如文本切分和向量量化）分配给最快可用的引擎：

| 优先级 | 引擎 | 选择条件 |
| :------- | :----- | :------------------ |
| 1 | **Rust 引擎** | 系统 `node_modules` 中已安装 `@docmd/engine-rust` 二进制包 |
| 2 | **JS 引擎** | 存在 `@docmd/engine-js` 模块（在 docmd 环境内） |
| 3 | **内置降级实现** | 原生 TypeScript/JavaScript 内置降级引擎 |

::: callout info "独立运行"
`docmd-search` 不需要 `docmd` 或原生二进制引擎。当独立运行（`npx docmd-search ./docs`）时，内置的降级引擎会自动处理所有切分和向量计算任务。
:::

### 委托的引擎功能

| 操作 | 目的 |
| :-------- | :------ |
| `search:chunk` | 按标题结构将文档切分为具有重叠窗口的文本块 |
| `search:quantize` | 将 Float32 向量量化为 Int8 数组 |
| `search:cosine` | 批量向量点积与相似度打分 |

ONNX Runtime 模型执行使用 `onnxruntime-node` 在 Node.js 内部运行。原生引擎提供程序处理文本分割和后处理任务。

## 构建时管道细节

### 1. 文件发现 (Crawl)

爬虫扫描目标目录中匹配 `include` 模式的文件，同时遵守 `exclude` 规则。默认文件扩展名：`.md`, `.txt`, `.html`。

在增量构建期间，爬虫会针对 `manifest.json` 中存储的记录检查文件修改时间 (`mtime`) 和文件大小。未修改的文件会被跳过。

### 2. 标题感知切分

文档沿着 Markdown 标题标记（`#`, `##`, `###`）被分割成不同的章节：

- 标题标记章节边界。
- 分块大小遵循配置的 `chunkSize` (默认：256 个 Token)。
- 相邻文本块共享 `chunkOverlap` 个 Token (默认：32 个 Token)，以在章节分割时保持上下文完整性。
- 文本块记录相对文件路径、标题上下文和字节偏移量范围。

### 3. ONNX 向量嵌入

文本块传入 ONNX Runtime 模型以生成稠密向量表示：

::: callout info "本地 ONNX Runtime"
ONNX Runtime 在本地处理模型，不需要云端 API 或 CUDA 环境。模型只需下载一次，保存在 `~/.docmd-search/models/` 中。
:::

模型在 **Int8 量化形式** (`q8`) 下运行。量化模型占用的磁盘空间比 32 位浮点模型少 ~75%，且对检索质量的影响极小。

ONNX 执行环境根据物理 CPU 核心数配置线程，以最大化 SIMD 吞吐量。

### 4. 向量量化

原始嵌入向量（384 维 × 4 字节 = 每个文本块 1,536 字节）被量化为有符号 8 位整数 (`Int8`)，将内存使用量降低至每个文本块 384 字节。

### 5. 多批次索引存储

索引文件按批次写入 `_docmd-search/` 目录下：

```
_docmd-search/
├── manifest.json         # 索引模式版本、模型 ID、文件时间戳
├── navigation.json       # 结构化导航树
└── batches/
    ├── 000.json          # 第一批文本块元数据
    ├── 000.bin           # 第一批量化向量数据
    └── ...
```

## 搜索时客户端运行时

浏览器客户端 Bundle 体积在 **3KB gzipped** 以下，且不包含任何神经网络模型权重。

### 异步加载策略

1. **Manifest 获取**: 加载 `manifest.json` 以检查批次数量和向量维度。
2. **初始批次加载**: 加载 `batches/000.json` 和 `batches/000.bin`，使搜索可以立即开始使用。
3. **后台流式传输**: 在浏览器空闲周期 (`requestIdleCallback`) 内异步获取剩余的批次。

### 混合打分策略

查询使用两阶段混合排序策略进行打分：

#### 阶段 1：BM25 词条匹配

查询被切分为词条，候选文本块使用词频饱和度进行打分：

$$	ext{keywordScore} = \sum rac{	ext{count}(t)}{	ext{count}(t) + 1.5}$$

#### 阶段 2：向量余弦重排序

候选文本块针对最高匹配项的向量进行余弦相似度重排序。得分归一化到 $[0, 1]$：

$$	ext{normalisedKw} = rac{	ext{keywordScore}}{	ext{keywordScore} + 1}$$

$$	ext{finalScore} = (	ext{normalisedKw} 	imes 0.6) + (	ext{cosineSimilarity} 	imes 0.4)$$

## 索引文件格式 Schema

### manifest.json Schema

```json
{
  "version": 3,
  "model": "Xenova/all-MiniLM-L6-v2",
  "dimensions": 384,
  "status": "complete",
  "totalChunks": 1247,
  "batchCount": 3,
  "files": {
    "docs/index.md": { "mtime": 1714500000, "size": 2048 },
    "docs/guide.md": { "mtime": 1714500100, "size": 4096 }
  }
}
```

### batch-NNN.json Schema

```json
{
  "batchId": 0,
  "dimensions": 384,
  "compression": "none",
  "vectorCount": 500,
  "chunks": [
    {
      "file": "docs/index.md",
      "heading": "Getting Started",
      "text": "Run docmd-search...",
      "range": [0, 256]
    }
  ],
  "vectors": "..."
}
```
