---
title: "配置说明"
description: "docmd-search 的全局、项目和 CLI 配置选项。覆盖模型、分块大小、包含/排除模式以及输出目录。"
---

`docmd-search` 使用简单四级配置系统，设置从默认值依次解析并合并到命令行 Flag。

## 配置解析顺序

设置按优先级合并（数字越高，优先级越高，会覆盖较低优先级的设置）：

1. **默认设置**: 内置的系统默认值。
2. **全局配置** (`~/.docmd-search/config.json`): 在设置过程中选择的系统级全局设置。
3. **项目配置** (`_docmd-search/config.json`): 存储在项目文件夹中的代码库级设置。
4. **CLI 命令行选项**: 运行命令时传递的命令行 Flag。

## 默认配置模式 Schema

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "chunkSize": 256,
  "chunkOverlap": 32,
  "include": ["**/*.md", "**/*.txt", "**/*.html"],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/site/**",
    "**/.git/**",
    "**/_docmd-search/**",
    "**/.cache/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/coverage/**",
    "**/.svn/**",
    "**/.hg/**",
    "**/vendor/**"
  ],
  "outDir": "_docmd-search",
  "incremental": true,
  "topK": 10
}
```

## 可用选项

| 选项 | 类型 | 默认值 | 说明 |
| :----- | :--- | :------ | :---------- |
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | HuggingFace 向量嵌入模型 ID |
| `chunkSize` | `number` | `256` | 每个分块的最大 Token 数 |
| `chunkOverlap` | `number` | `32` | 相邻分块之间的 Token 重叠量 |
| `include` | `string[]` | `["**/*.md", "**/*.txt", "**/*.html"]` | 待索引文件的 Glob 匹配模式 |
| `exclude` | `string[]` | *(见上方默认列表)* | 排除的文件和文件夹 Glob 模式 |
| `outDir` | `string` | `_docmd-search` | 相对于项目根目录的目标生成文件夹 |
| `incremental` | `boolean` | `true` | 基于 `mtime` 和 `size` 跳过未修改文件的重新索引 |
| `topK` | `number` | `10` | 每次查询返回的最大结果数 |

## 全局配置文件

存储在 `~/.docmd-search/config.json`。在首次初始设置期间自动创建：

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "wizardCompleted": true
}
```

交互式编辑全局设置：

```bash
docmd-search --settings
```

::: callout tip "模型权重缓存"
已下载的 ONNX 模型文件缓存存储在 `~/.docmd-search/models/` 中。跨项目构建和重新安装时，模型文件保持可用。
:::

## 项目配置文件

在项目根目录下创建 `_docmd-search/config.json` 以设置特定于项目的选项：

```json
{
  "model": "Xenova/paraphrase-multilingual-MiniLM-L12-v2",
  "chunkSize": 512,
  "chunkOverlap": 64,
  "include": ["docs/**/*.md"],
  "exclude": ["docs/drafts/**", "docs/archive/**"]
}
```

::: callout info "部分合并"
你只需要指定想要修改的属性。未指定的属性继承自全局配置或系统默认值。
:::

## 命令行覆盖

使用 `--model` Flag 在单次运行中覆盖模型，而无需修改 JSON 配置文件：

```bash
docmd-search ./docs --model Xenova/paraphrase-multilingual-MiniLM-L12-v2
```

## 分块大小选择指南

选择分块大小取决于你的文档性质：

| 文档类型 | 推荐 `chunkSize` | 适用原因 |
| :------------ | :---------------------- | :----- |
| 短 API 参考指南 | `128` | 针对离散参数和函数名的高精度检索 |
| 通用文档指南 | `256` (默认) | 在词条精度和上下文完整度之间保持最佳平衡 |
| 长篇教程指南 | `512` | 在每个章节向量中保留更多上下文信息 |
| 技术手册 | `128-256` | 完美契合简短的章节标题与代码块 |

::: callout warning "重叠量考量"
`chunkOverlap` 在分块边界之间保留上下文。默认值（`32` 个 Token）可防止在章节分割时导致短语碎片化。
:::

## Glob 模式定义

包含和排除数组使用标准 Glob 语法：

```json
{
  "include": [
    "docs/**/*.md",
    "guides/**/*.md",
    "api/**/*.html"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/drafts/**",
    "**/*.draft.md",
    "docs/internal/**"
  ]
}
```

内置的系统排除项（`node_modules`, `.git`, `dist`, `_docmd-search`）将自动添加到你的自定义排除规则中。

## 模型选择参考表

模型运行在 **Int8 量化形式** (`q8`) 下，减少 ~75% 存储并加速矩阵运算：

| 模型 ID | 量化后体积 | 语言支持 | 速度 | 推荐目标场景 |
| :------- | :------------- | :-------- | :---- | :----------------- |
| `Xenova/all-MiniLM-L6-v2` *(默认)* | ~23 MB | 仅限英文 | 极快 | 单一英文文档站点 |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 50+ 种语言 | 适中 | 多语言 & i18n 国际化站点 |
| `Xenova/multilingual-e5-small` | ~118 MB | 100+ 种语言 | 适中 | 广谱多语言文档站点 |
| `Xenova/paraphrase-multilingual-mpnet-base-v2` | ~270 MB | 50+ 种语言 | 适中 | 高精度多语言检索站点 |

::: callout tip "HuggingFace ONNX 兼容性"
自定义模型必须包含与 Transformers.js 兼容的 ONNX 权重。请检查 HuggingFace 上的目标仓库是否包含带有模型图定义的 `onnx/` 文件夹。
:::

## docmd 框架集成

当在 [docmd](https://docmd.io) 文档站点中配置时，选项在 `docmd.config.js` 的 `plugins.search` 下声明：

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,                       // 启用 docmd-search 索引器
      model: 'Xenova/bge-small-en-v1.5',   // 可选的模型覆盖
      chunkSize: 512,                       // 每个分块的 Token 限制
      chunkOverlap: 64,                     // Token 重叠长度
    }
  }
};
```

### 预构建索引托管

将 docmd 指向预构建的静态搜索索引文件夹：

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,
      indexDir: '_docmd-search',  // 预构建索引目录
    }
  }
};
```

当 `indexDir` 指向包含有效 `manifest.json` 的文件夹时，`docmd` 跳过构建索引并直接托管预构建的文件。
