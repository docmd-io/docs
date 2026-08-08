---
title: "快速开始"
description: "安装 docmd-search，配置向量嵌入模型，并对文档目录进行索引。"
---

为你的文档设置离线语义搜索，无需第三方云服务或 API 密钥。

## 系统要求

::: callout info "前置条件"
- **Node.js 20.0.0+**
- ~50 MB 磁盘空间用于默认模型权重 (Int8 量化，~23 MB 初始下载)
- 支持 macOS, Linux 和 Windows
:::

## 安装

::: tabs
== tab "全局安装" icon:globe
```bash
npm install -g docmd-search
```

安装全局嵌入引擎依赖项：

```bash
npm install -g @huggingface/transformers onnxruntime-node
```
== tab "npx 执行" icon:zap
```bash
npx docmd-search ./docs
```

全局嵌入依赖项 (`@huggingface/transformers` 和 `onnxruntime-node`) 必须已安装在你的环境变量路径中。
== tab "项目依赖" icon:package
```bash
npm install -D docmd-search @huggingface/transformers onnxruntime-node
```

将执行脚本添加到 `package.json`：

```json
{
  "scripts": {
    "search:index": "docmd-search ./docs",
    "search:ui": "docmd-search ./docs --ui"
  }
}
```
:::

## 首次运行

对任何包含 Markdown 或 HTML 文件的目录运行 `docmd-search`：

```bash
docmd-search ./docs
```

### 初始配置提示

在首次运行时，会弹出交互式 CLI 提示，供你选择向量嵌入模型。

### 可用的向量嵌入模型

根据你文档中的语言选择适合的模型：

| 模型 | 维数 | 量化后体积 | 语言支持 | 推荐使用场景 |
| :---- | :--------- | :------------- | :-------- | :-------------- |
| **MiniLM L6 v2** (默认) | 384 | ~23 MB | 仅限英文 | 纯英文文档的高速检索 |
| Multilingual MiniLM L12 | 384 | ~118 MB | 50+ 种语言 | 多语言和 i18n 国际化站点 |
| Multilingual E5 Small | 384 | ~118 MB | 100+ 种语言 | 广谱语言覆盖场景 |
| Multilingual MPNet Base | 768 | ~270 MB | 50+ 种语言 | 高精度多语言检索场景 |

::: callout warning "多语言内容提示"
如果你的文档包含非英文文本（如中文、德文或西班牙文），请选择多语言模型。默认的纯英文模型在非英文文本上的搜索效果较差。
:::

### 模型存储与缓存

选定的模型在初始设置时会自动下载。模型保存在全局路径 `~/.docmd-search/models/`，并在所有本地项目中共享。所有模型均以 Int8 量化形式 (`q8`) 运行。

### 配置持久化

你的设置保存在 `~/.docmd-search/config.json` 中，因此无需重新配置。

::: callout tip "重新配置模型"
随时运行 `docmd-search --settings` 即可更改全局模型，或在命令行上传递 `--model <id>` 以在单次运行中覆盖模型。
:::

## 索引构建步骤

运行索引时，该工具会完成六个步骤：

1. **爬取 (Crawl)**: 发现目标文件 (`.md`, `.txt`, `.html`)，同时跳过排除规则中设置的模式。
2. **切分 (Chunk)**: 按标题将文档切割为章节 (默认：每个分块 256 个 Token，32 个 Token 重叠)。
3. **嵌入 (Embed)**: 使用选定的 ONNX 模型生成向量嵌入。
4. **量化 (Quantise)**: 将 Float32 向量转换为 Int8 值 (降低 75% 内存占用)。
5. **压缩 (Compress)**: 当分块数量巨大时应用三进制或积量化。
6. **保存 (Save)**: 将多批次索引 JSON 文件写入 `_docmd-search/`。

```
_docmd-search/
├── manifest.json         # 索引元数据、模式版本与文件时间戳
├── navigation.json       # 导航树结构
└── batches/
    ├── 000.json          # 第一批文本块元数据
    ├── 000.bin           # 第一批向量数据
    └── ...
```

::: callout info "渐进式批次加载"
一旦 `batches/000.json` 和 `batches/000.bin` 写入完成，搜索即可正常使用。后续批次会在后台异步加载。
:::

## 终端交互式搜索

索引构建完成后，终端交互式搜索界面将自动打开：

```
   ◆ 搜索: deploy kubernetes

   1. docs/deployment/kubernetes.md → Deploying to Kubernetes    0.94
   2. docs/deployment/docker.md → Container Orchestration        0.71
   3. docs/getting-started/production.md → Production Setup      0.63
```

按 `Ctrl+C` 退出终端搜索。

## Web 浏览器界面

启动由 docmd 托管的本地 Web 界面：

```bash
docmd-search ./docs --ui
```

这将启动带 Web 搜索 UI、导航树和主题支持的本地开发服务器。

## 增量重新索引

在后续运行中，索引器会针对 `manifest.json` 检查文件的修改时间 (`mtime`) 和文件大小。跳过未修改的文件：

```bash
docmd-search ./docs
```

## 相关文档

- [配置说明](configuration)  -  分块、Glob 排除项和路径选项
- [CLI 命令行参考](cli)  -  命令行选项与 Flag
- [程序化 API](api)  -  Node.js API 方法
