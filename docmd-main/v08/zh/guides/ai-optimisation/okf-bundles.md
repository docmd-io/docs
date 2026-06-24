---
title: "OKF Bundles —— 深度剖析"
description: "如何组织您的 docmd 内容以获得最佳的 OKF bundle —— 类型化概念、交叉链接，以及让知识库对 AI 智能体友好的纪律。"
---

[`@docmd/plugin-okf`](../../plugins/okf.md) 会从您的 docmd 站点生成一个 [Open Knowledge Format][okf-spec] bundle。本指南解释了 bundle 长什么样、如何组织您的内容以实现最佳的 AI 智能体消费，以及 OKF 与 [`llms.txt`](../../plugins/llms.md) 平面列表格式有何不同。

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## 心智模型：维基，而非站点地图

传统的文档站点是一棵树——章节和小节，每个小节下挂着页面。用户自顶向下浏览树以找到所需内容。

OKF bundle 是一个**维基**——一组带有类型的概念文件，文件之间通过交叉链接相连。AI 智能体在图中水平导航，从一个概念沿着链接跳到它的相邻概念。

这两种结构在磁盘上看起来相同（目录中的 markdown 文件），但导航模型不同。OKF 规范的[三条设计原则][okf-principles]值得完整引用：

> 1. **最小主观性。** OKF 对每个概念只要求一件事：一个 `type` 字段。其他一切都由生产者决定——存在哪些类型、包含哪些其他字段、正文有哪些章节。
> 2. **生产者/消费者独立。** 人类手写的 bundle 可以被 AI 智能体消费。由元数据导出管道生成的 bundle 可以在可视化器中浏览。由一个 LLM 综合的 bundle 可以被另一个 LLM 查询。格式是契约；两端的工具可独立替换。
> 3. **格式，而非平台。** OKF 不绑定任何特定的云、数据库、模型提供商或智能体框架。

[okf-principles]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## OKF bundle 长什么样

```text
site/okf/
├── okf.yaml              ← 类型化清单
├── index.md              ← Karpathy 风格的目录
├── graph.html            ← 交互式力导向图形查看器
├── graph.json            ← 图形数据
├── graph.js              ← 查看器运行时
├── graph.css             ← 查看器样式
├── concepts/
│   ├── weekly-active-users.md
│   ├── orders-table.md
│   └── api-authentication.md
└── _meta/
    ├── bundle.json
    └── lint-report.txt
```

每个 `concepts/<slug>.md` 文件在 frontmatter 中携带 `type` 字段，以及页面的完整 markdown 正文。`okf.yaml` 清单列出每个概念及其类型、路径、语言、版本和标签——这是 AI 智能体用来决定读取哪些概念的目录。

## `type` 中应该填什么

`type` 字段是唯一必需的 frontmatter 键。它告诉智能体这个概念代表什么类型的知识。`@docmd/plugin-okf` 插件有一个基于路径前缀的类型推断映射：

| URL 前缀 | 推断的类型 |
| :--- | :--- |
| `/api/` | `api` |
| `/guides/` | `guide` |
| `/reference/` | `reference` |
| `/concepts/` | `concept` |
| `/runbooks/` | `runbook` |
| `/datasets/` | `dataset` |
| `/metrics/` | `metric` |
| `/tables/` | `table` |
| （其他任何） | `concept`（默认） |

您可以通过显式的 frontmatter 覆盖推断的类型：

```markdown
---
type: api
title: "Authentication API"
description: "OAuth 2.0 + JWT auth flow for the user API."
---

# Authentication API
...
```

或者使用嵌套的 `okf.type` 形式：

```markdown
---
okf:
  type: api
title: "Authentication API"
---
```

智能体首先读取 `type` 字段。`type: runbook` 的概念被视为一步步的操作手册（例如"如何从部分故障中恢复"）；`type: api` 的概念被视为 API 参考；`type: dataset` 的概念被视为数据字典。

## 交叉链接构成图

OKF 是一个图，而非一棵树。概念之间的关系是从内部 markdown 链接推断出来的。如果 `api-authentication.md` 链接到 `users-table.md`，OKF bundle 会在 `graph.json` 中记录这条边，图形查看器会在两个节点之间画一条线。

`okf-bundle`（读作"概念图"）比树更有用，因为它让智能体能够找到作者没考虑到放在子章节中的相关概念。OKF 形式化的 LLM-wiki 模式明确假设智能体会沿着链接去发现相邻的知识。

交叉链接的最佳实践：

- **向前链接** —— 在介绍一个概念时，链接到它所依赖的概念。"要使用它，请参阅 [users table](../tables/users.md)"。
- **向后链接** —— 在依赖此概念的那个概念中，链接回来。"由 [API auth](../api/auth.md) 使用"。
- **不要过度链接** —— 每个链接都应增加信息。给每个词都加链接会稀释图，迷惑智能体。

## 按页面退出

有些页面对于 AI 智能体没有用处——法律样板、关于团队的内部页面、营销文案。使用 `frontmatter.okf: false` 从 OKF bundle 中排除单个页面：

```markdown
---
okf: false
---

# Internal Roadmap (Q3 2026)
...
```

或者使用 `noindex: true` 从所有下游消费者中排除（sitemap、搜索、llms.txt、OKF）。这两个标志不同：

- `okf: false` —— 仅从 OKF 中排除；仍包含在搜索和 llms.txt 中
- `noindex: true` —— 从所有下游消费者中排除

## OKF 与 `llms.txt` 的区别

[`llms.txt` 插件](../../plugins/llms.md) 生成一个扁平的页面列表：

```text
- [Page 1](https://example.com/page-1)
- [Page 2](https://example.com/page-2)
- [Page 3](https://example.com/page-3)
```

OKF 插件生成一个类型化的图：

```yaml
concepts:
  - id: api-authentication
    type: api
    title: "Authentication API"
    path: /api/auth/
    file: concepts/api-authentication.md
    tags: [auth, security]
  - id: users-table
    type: table
    title: "Users table"
    path: /tables/users/
    file: concepts/users-table.md
    tags: [schema, data]
```

两者互为补充：

- **llms.txt** 用于**平面消费**——"把所有内容给我"。智能体读取文件，将完整文本放入其上下文窗口。
- **OKF** 用于**类型化消费**——"给我表 X 的 schema"。智能体读取清单，挑选所需的概念，选择性加载。

对于少于 50 页的项目，单用 llms.txt 通常就足够了。对于 50+ 页的项目，OKF 是更高效的格式——智能体不必为了找到所需的那一个页面而加载所有页面。

## 常见错误

### 1. 跳过 `type` 字段

当每个概念都有独特的 `type` 时，OKF 清单最为有用。如果您 80% 的页面被推断为 `concept`，智能体就无法分辨哪些是参考文档、哪些是教程、哪些是操作手册。为每个有明确类别的页面显式设置 `type: <name>`。

### 2. 没有交叉链接的页面

如果一个页面是死胡同（没有来自或去往它的内部链接），图形查看器会将其显示为孤立节点。智能体将孤立地读取它，丢失上下文。为您希望浮出水面的每个页面至少添加一个入站链接（从另一个页面引用）。

### 3. 在 `description` 中使用内部行话

`description` 字段显示在清单和 llms.txt 摘要中。AI 智能体使用它来判断某个概念是否相关。请使用智能体可以匹配用户查询的通俗语言："每周活跃用户数，来自 events 流计算"，而不是 "WAU (ms)"。

### 4. 为非 AI 智能体站点使用 OKF

如果您的文档站点没有 AI 智能体受众，OKF 没有任何价值。`@docmd/plugin-okf` 默认启用，所以请显式禁用它：

```json
{
  "plugins": { "okf": false }
}
```

`llms.txt` 插件是"AI 可搜索的扁平文本"的正确工具；OKF 是"AI 智能体类型化知识图"的正确工具。

## 如何验证

执行 `docmd build` 后，检查 `site/okf/` 下的 bundle：

```bash
# 清单（每个概念、类型、路径）
cat site/okf/okf.yaml | head -30

# 目录（按类型分组的 Karpathy 风格）
open site/okf/index.md

# 交互式图形（力导向，支持主题）
open site/okf/graph.html

# 插件产生的警告
cat site/okf/_meta/lint-report.txt
```

lint 报告是要检查的第一件事——它列出了没有 `type` 字段的页面、有失效内部链接的页面，以及孤立的概念（没有入站链接）。修复这些可带来更顺畅的智能体体验。

## 另请参阅

- [OKF Bundle 插件文档](../../plugins/okf.md) —— 插件参考：每个配置选项、按页面退出标志、类型解析优先级。
- [Open Knowledge Format —— Google Cloud 博客文章](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) —— 规范公告及设计原理。
- [LLM 上下文插件](../../plugins/llms.md) —— 互补的平面列表格式。LLMS 是"把所有内容给我"，OKF 是"给我表 X 的 schema"。
- [构建 AI 就绪文档](../generating-ai-ready-docs.md) —— 关于 AI 智能体消费的更广泛指南。
- [为 LLM 构建结构](../structure-for-llms.md) —— 如何为机器消费组织内容。