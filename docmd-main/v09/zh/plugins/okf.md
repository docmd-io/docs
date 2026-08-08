---
title: "OKF Bundle 插件"
description: "从您的 docmd 站点生成 Open Knowledge Format（OKF）bundle，让 AI 智能体可以直接消费您的文档。"
---

`@docmd/plugin-okf` 插件在静态编译期间生成一个 **[Open Knowledge Format][okf-spec]** (OKF) 知识包。OKF 是一种开放、供应商中立的规范，用于为 AI 智能体与 LLM 工具链结构化文档元数据、概念图谱与领域上下文。

该插件 **默认启用**。在每次站点编译过程中，OKF 知识包都会被输出至 `site/okf/` 目录。

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## 架构概览

OKF 将知识架构规范化为一个包含 YAML 清单、Markdown 概念文件和可视化力导向图谱资源的便携式目录结构。

### 设计原则

1. **最小化结构约束**: 每个概念条目仅要求包含一个 `type` 字段。
2. **生产者/消费者独立性**: 人类编写的 Markdown 文件编译为标准 Schema，可由任意 LLM 框架进行查询。
3. **供应商中立**: 独立于具体的云服务商、模型托管商或向量数据库引擎。

## 生成的产物目录

编译将生成以下目录树：

```text
site/okf/
├── okf.yaml              ← 清单摘要文件
├── index.md              ← 按类型分组的概念目录
├── graph/                ← 交互式图谱资源（仅当 graph: true 时生成）
│   ├── index.html        ← 力导向图谱可视化器
│   ├── graph.json        ← 图形节点与边数据
│   ├── graph.js          ← 独立图形运行时
│   └── graph.css         ← 主题感知的样式文件
├── concepts/
│   └── <slug>.md         ← 独立概念 Markdown 文件
└── _meta/
    ├── bundle.json       ← okf.yaml 的 JSON 镜像
    └── lint-report.txt   ← 构建 Linting 报告
```

## 默认构建行为

OKF 插件会在编译期间自动加载：

* **默认语言作用域**: 在包根目录下输出主语言的概念文件。
* **自动类型推断**: 自动将 `/api/`、`/guides/`、`/reference/`、`/concepts/`、`/runbooks/`、`/datasets/`、`/metrics/` 和 `/tables/` 路径下的文件归类为对应的类型化概念。
* **逐字 Markdown 复制**: 将页面内容与 Frontmatter 复制到概念文件中。

### 选择退出

在 `docmd.config.json` 中禁用 OKF 知识包生成：

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

或者设置 `enabled: false`：

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "enabled": false
    }
  }
}
```

## 配置选项

在 `docmd.config.json` 中配置 OKF 知识包参数：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 OKF 知识包编译。 |
| `outputDir` | `string` | `'okf'` | 相对于站点根目录的目标输出目录。 |
| `bundleName` | `string` | `config.title` | 在 `okf.yaml` 和图谱标头中使用的知识包标识符。 |
| `defaultType` | `string` | `'concept'` | 未标记页面的回退概念类型。 |
| `typeField` | `string` | `'type'` | 用于类型分类的 Frontmatter 键名。 |
| `warnOnMissingType` | `boolean` | `true` | 对使用 `defaultType` 的页面输出 CLI 警告。 |
| `includeFullMarkdown` | `boolean` | `true` | 将完整 Markdown 正文复制到概念文件中。 |
| `graph` | `boolean` | `false` | 在 `graph/` 下生成交互式力导向图谱可视化器。 |
| `localeStrategy` | `'default-only' \| 'folders'` | `'default-only'` | 多语言知识包编译策略。 |

### 全局配置示例

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "concept",
      "graph": true
    }
  }
}
```

### 多语言文件夹策略

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "localeStrategy": "folders"
    }
  }
}
```

输出目录结构：

```text
site/okf/                    ← 默认语言（根目录）
├── okf.yaml
├── index.md
└── concepts/

site/okf/de/                 ← 德语（嵌套）
├── okf.yaml
└── concepts/
```

## 从 OKF 中排除页面

使用 Frontmatter 标记排除特定页面：

```yaml
---
title: "内部运维说明"
okf: false # 仅从 OKF 知识包中排除该页面
---
```

若要在 Sitemap、搜索、LLM 文件和 OKF 中全局排除页面，请设置 `noindex: true`。

## 概念类型解析

插件使用自顶向下的优先级确定概念类型：

1. `frontmatter.okf.type` — 嵌套显式声明。
2. `frontmatter.type` — 顶层显式声明。
3. `frontmatter.okfType` — 旧版别名。
4. **路径前缀推断**: 针对 `/guides/`、`/api/`、`/reference/`、`/concepts/` 等路径自动映射。
5. `defaultType` 回退 (`'concept'`)。

::: callout tip "知识图谱可视化" icon:git-fork
在 OKF 插件配置中启用 `graph: true`，以生成可交互的力导向图谱可视化页面 (`site/okf/graph/index.html`)，映射交叉引用和概念关联。
:::