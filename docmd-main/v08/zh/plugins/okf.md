---
title: "OKF Bundle 插件"
description: "从您的 docmd 站点生成 Open Knowledge Format（OKF）bundle，让 AI 智能体可以直接消费您的文档。"
---

`@docmd/plugin-okf` 插件会生成一个 **[Open Knowledge Format][okf-spec]**（OKF）bundle，供 AI 智能体消费。OKF 是一种供应商中立、对智能体和人类都友好的标准，用于表示现代 AI 系统所需的元数据、上下文和策划知识。bundle 位于您的站点旁边（例如 `site/okf/`），智能体可以直接指向它。

该插件在 0.8.8 中**默认启用**——无需任何配置。每次执行 `docmd build` 都会生成 bundle。

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## 什么是 OKF？

OKF 是 Google Cloud 在 2026 年 6 月发布的开放规范，它将 [LLM-wiki 模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)形式化为一种可移植、可互操作的格式。其动机：

::: callout info
随着基础模型持续改进，相关上下文的缺乏往往限制了它们的能力，尤其是在用于构建智能体系统时。虽然这些模型可以帮助您编写代码、汇总文档或分析数据集，但它们仍然需要正确的信息才能产生准确且可操作的结果——[Introducing the Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
:::

OKF 将组织知识表示为一个带有 YAML frontmatter 的 markdown 文件目录，外加一个类型化清单、一个交互式图形查看器，以及一个机器可读的 bundle 摘要。其设计背后的三条原则：

1. **最小主观性。** OKF 对每个概念只要求一件事：一个 `type` 字段。其他一切都由生产者决定——存在哪些类型、包含哪些其他字段、正文有哪些章节。
2. **生产者/消费者独立。** 人类手写的 bundle 可以被 AI 智能体消费。由元数据导出管道生成的 bundle 可以在可视化器中浏览。由一个 LLM 综合的 bundle 可以被另一个 LLM 查询。格式是契约；两端的工具可独立替换。
3. **格式，而非平台。** OKF 不绑定任何特定的云、数据库、模型提供商或智能体框架。

## 您将获得

```text
site/okf/
├── okf.yaml              ← 类型化清单（bundle 摘要）
├── index.md              ← Karpathy 风格的按类型分组的目录
├── graph/                ← 可选：仅在 `plugins.okf.graph: true` 时生成
│   ├── index.html        ← 交互式力导向图形查看器（在 /okf/graph/ 打开）
│   ├── graph.json        ← 图形数据（节点 + 边）
│   ├── graph.js          ← 查看器运行时（原生，无 CDN 依赖）
│   └── graph.css         ← 查看器样式（支持主题）
├── concepts/
│   └── <slug>.md         ← 每个页面一个 markdown 文件
└── _meta/
    ├── bundle.json       ← okf.yaml 的 JSON 镜像
    └── lint-report.txt   ← 生成过程中产生的警告
```

每个概念文件在 frontmatter 中携带 OKF 必需的 `type` 字段，以及原始 markdown 正文原样保留，因此智能体既能浏览清单，又能阅读完整的页面。

## 默认行为

OKF 在 0.8.8 中是一个**核心插件**。构建过程会自动加载它，并使用合理的默认值生成 bundle：

- 默认**仅包含默认语言**（bundle 仅包含默认语言的页面；默认语言的文件位于 bundle 根目录）。
- **类型推断** —— `/api/`、`/guides/`、`/reference/`、`/concepts/`、`/runbooks/`、`/datasets/`、`/metrics/`、`/tables/` 路径下的页面会被自动分类；其他所有页面都回退到 `concept`。
- 每个概念文件中包含**完整 markdown**（包含原始页面正文，而不仅仅是 frontmatter 存根）。

您无需向 `docmd.config.json` 添加任何内容即可获得 OKF bundle。插件以空选项运行，并使用所有默认值。

### 退出启用

支持三种退出方式：

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "enabled": false }
  }
}
```

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "capabilities": ["head"] }
  }
}
```

最后一种形式使用了插件信任模型——`okf` 插件声明 `capabilities: ['post-build']`；如果您的 `config.plugins.okf.capabilities` 数组不包含 `post-build`，插件会被加载，但其 `onPostBuild` 钩子不会运行。这与所有其他核心插件一致。

## 配置

所有键均为可选。列出的值为默认值：

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 OKF bundle 生成。 |
| `outputDir` | `string` | `'okf'` | bundle 目录，相对于站点输出。 |
| `bundleName` | `string` | slug 化的 `config.title` | 在 `okf.yaml` 和图形查看器标题中使用的名称。 |
| `defaultType` | `string` | `'concept'` | 分配给没有显式类型的页面的类型。 |
| `typeField` | `string` | `'type'` | OKF 类型的 frontmatter 字段名称。 |
| `warnOnMissingType` | `boolean` | `true` | 对回退到 `defaultType` 的页面发出 TUI 警告。 |
| `includeFullMarkdown` | `boolean` | `true` | 将原始 `.md` 正文复制到每个概念文件中。 |
| `graph` | `boolean` | `false` | 输出一个 `graph/` 子目录，包含 `index.html`、`graph.js`、`graph.css` 和 `graph.json`。0.8.8 起改为按需启用 —— OKF 规范本身并不要求可视化查看器，因此默认的干净 bundle 不会附带它。查看器在运行时从同一目录获取 `graph.json`，所以只要四个文件放在一起，通过 `file://` 打开 `site/okf/graph/index.html` 也可以正常工作。 |
| `generateGraphViewer` | `boolean` | — | **已弃用** 的 `graph` 别名。保留一个发布周期以便现有配置不会静默丢失查看器；构建时会打印弃用警告。请迁移到 `graph: true`。 |
| `localeStrategy` | `'default-only' \| 'folders' \| 'mixed' \| 'latest-only'` | `'default-only'` | 默认：仅默认语言，位于 bundle 根目录。设置为 `'folders'` 可将非默认语言嵌套在 `<locale>/` 下。 |
| `versionStrategy` | `'folders' \| 'mixed' \| 'latest-only'` | `'latest-only'` | 启用版本控制时，按版本 id 嵌套概念。 |
| `excludePatterns` | `string[]` | `[]` | 在 `frontmatter.noindex` / `frontmatter.okf === false` 之外要跳过的额外 glob 模式。 |

### 示例 — 自定义输出目录 + 自定义默认类型

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "doc",
      "warnOnMissingType": true
    }
  }
}
```

### 示例 — 多语言输出（opt-in）

```json "docmd.config.json"
{
  "plugins": {
    "okf": { "localeStrategy": "folders" }
  }
}
```

```text
site/okf/                    ← 默认语言（en）位于 bundle 根目录
├── okf.yaml
├── index.md
├── concepts/<slug>.md
└── _meta/, graph/, ...

site/okf/ja/                 ← 日语 —— 嵌套在 <locale>/ 下
├── okf.yaml
└── concepts/<slug>.md
```

默认语言的文件**始终**位于 bundle 根目录，这样现有的消费者不会受到影响。只有非默认语言才会获得 `<locale>/` 子目录。

## 按页面退出

页面可以通过两种方式退出 OKF bundle：

```markdown
---
noindex: true   # 同时也会从 sitemap、llms.txt 等中排除
---

---
okf: false       # 仅从 OKF bundle 中排除
---
```