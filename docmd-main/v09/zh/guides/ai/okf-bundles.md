---
title: "OKF 知识包 — 深度解析"
description: "如何为最佳 OKF 知识包组织 docmd 内容 —— 类型化概念、交叉链接以及打造 AI 智能体友好知识库的规范。"
---

`@docmd/plugin-okf` 插件可从您的 docmd 站点生成 [Open Knowledge Format][okf-spec] 知识包。本指南详细解释了知识包的结构、如何组织内容以供 AI 智能体获得最佳消费体验，以及 OKF 与 [`llms.txt`](../../plugins/llms.md) 扁平列表格式的区别。

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## 核心心智模型：Wiki，而非 Sitemap

传统的文档站点是一个树状结构 —— 包含章节和子章节，每页挂载在其中。用户自上而下浏览树结构以查找所需内容。

OKF 知识包是一个 **Wiki** —— 包含交叉链接的类型化概念文件的扁平目录。AI 智能体在图谱中横向导航，跟随链接从一个概念跳转到相邻概念。

这两者在磁盘上的结构看起来相同（目录中的 Markdown 文件），但导航模型完全不同。OKF 规范的 [三条设计原则][okf-principles] 值得完整引用：

> 1. **极简约束。** OKF 对每个概念仅要求一件事：`type` 字段。其他所有内容（存在哪些类型、包含哪些其他字段、主体包含哪些章节）均留给生产方决定。
> 2. **生产方/消费方独立。** 由人类手写的知识包可以被 AI 智能体消费。由元数据导出管道生成的知识包可以在可视化工具中浏览。由一个 LLM 合成的知识包可以被另一个 LLM 查询。格式即契约；两端的工具可独立替换。
> 3. **格式，而非平台。** OKF 不绑定到任何特定云、数据库、模型提供商或智能体框架。

[okf-principles]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## OKF 知识包的样子

```text
site/okf/
├── okf.yaml              ← 类型化清单
├── index.md              ← Karpathy 风格的目录
├── graph/                ← 可选: 仅在 plugins.okf.graph: true 时存在
│   ├── index.html        ← 交互式力导向图查看器
│   ├── graph.json        ← 图数据
│   ├── graph.js          ← 查看器运行时
│   └── graph.css         ← 查看器样式
├── concepts/
│   ├── weekly-active-users.md
│   ├── orders-table.md
│   └── api-authentication.md
└── _meta/
    ├── bundle.json
    └── lint-report.txt
```

每个 `concepts/<slug>.md` 文件在 frontmatter 中携带 `type` 字段以及页面的完整 Markdown 主体。`okf.yaml` 清单列出了每个概念及其类型、路径、语言、版本和标签 —— 这是 AI 智能体用来决定读取哪些概念的目录。

## `type` 中填什么

`type` 字段是唯一必填的 frontmatter 键。它告诉智能体该概念代表哪种知识。`@docmd/plugin-okf` 插件具有基于路径前缀的类型推导映射：

| URL 前缀 | 推导出的类型 |
| :--- | :--- |
| `/api/` | `api` |
| `/guides/` | `guide` |
| `/reference/` | `reference` |
| `/concepts/` | `concept` |
| `/runbooks/` | `runbook` |
| `/datasets/` | `dataset` |
| `/metrics/` | `metric` |
| `/tables/` | `table` |
| (其他任何内容) | `concept`（默认） |

你可以通过显式的 frontmatter 覆盖推导出的类型：

```markdown
---
type: api
title: "认证 API"
description: "用户 API 的 OAuth 2.0 + JWT 认证流程。"
---

# 认证 API
...
```

或使用嵌套的 `okf.type` 形式：

```markdown
---
okf:
  type: api
title: "认证 API"
---
```

智能体首先读取 `type` 字段。带有 `type: runbook` 的概念被视为一步步的操作指南（例如“如何从局部宕机中恢复”）；带有 `type: api` 的概念被视为 API 参考；带有 `type: dataset` 的概念被视为数据字典。

## 交叉链接构建图谱

OKF 是一个图，而不是树。概念之间的关系是从内部 Markdown 链接推断出来的。如果 `api-authentication.md` 链接到 `users-table.md`，OKF 知识包会在 `graph.json` 中记录该边，图谱查看器会在两个节点之间绘制一条线。

`okf-bundle`（即“概念图谱”）比树状结构更有用，因为它允许智能体找到作者未曾想到要放入同一子章节的相关概念。OKF 形式化的 LLM-wiki 模式显式假设智能体会跟随链接探索相邻知识。

交叉链接最佳实践：

- **向前链接** — 在引入一个概念时，链接到它所依赖的概念（例如 `[MCP 设置](./mcp-and-agent-skills.md)`）。
- **向后链接** — 在依赖此概念的概念页面中反向链接（例如 `[AI 助手](./ai-assistant.md)`）。
- **切勿过度链接** — 每个链接都应当增加有效信息。对每个词都加链接会稀释图谱权重并困扰智能体。

## 单页排除 (Opt-out)

某些页面对 AI 智能体无用 —— 法律条款声明、内部“关于团队”页面、营销文案。使用 `frontmatter.okf: false` 可将单个页面排除在 OKF 知识包之外：

```markdown
---
okf: false
---

# 内部路线图 (Q3 2026)
...
```

或使用 `noindex: true` 将页面排除在所有下游消费方（sitemap、搜索、llms.txt、OKF）之外。这两个标志有所区别：

- `okf: false` — 仅在 OKF 中排除；仍保留在搜索和 llms.txt 中
- `noindex: true` — 从所有下游消费方中排除

## OKF 与 `llms.txt` 的区别

[`llms.txt` 插件](../../plugins/llms.md) 生成扁平的页面列表：

```text
- [Page 1](https://example.com/page-1)
- [Page 2](https://example.com/page-2)
- [Page 3](https://example.com/page-3)
```

OKF 插件生成类型化的图谱：

```yaml
concepts:
  - id: api-authentication
    type: api
    title: "认证 API"
    path: /api/auth/
    file: concepts/api-authentication.md
    tags: [auth, security]
  - id: users-table
    type: table
    title: "用户表"
    path: /tables/users/
    file: concepts/users-table.md
    tags: [schema, data]
```

两者相互补充：

- **llms.txt** 用于 **扁平消费** —— “给我所有内容”。智能体读取该文件并将其完整文本置于上下文窗口中。
- **OKF** 用于 **类型化消费** —— “给我表 X 的 Schema”。智能体读取清单，挑选所需的概念，并选择性地加载它们。

对于少于 50 页的项目，仅靠 llms.txt 通常就足够了。对于 50 页以上的项目，OKF 是更高效的格式 —— 智能体无需加载每一页就能精准找到所需内容。

## 常见错误

### 1. 遗漏 `type` 字段

当每个概念都具有明确的 `type` 时，OKF 清单最有用。如果 80% 的页面都被推导为 `concept`，智能体将无法区分哪些是参考文档、哪些是教程、哪些是操作指南。为每一个具有明确分类的页面显式设置 `type: <name>`。

### 2. 页面没有交叉链接

如果页面是一个死胡同（没有链入或链出的内部链接），图谱查看器会将其显示为一个孤立节点。智能体孤立地阅读它，会丢失上下文。为您希望展示的每一页至少添加一个入站链接（从其他页面引用）。

### 3. 在 `description` 中使用内部术语

`description` 字段展示在清单和 `llms.txt` 摘要中。AI 智能体用它来判断某个概念是否相关。请使用智能体可以与用户查询相匹配的通俗英文或中文：“marketing 站点的周活跃用户，从事件流计算得出”，而不是“WAU (ms)”。

### 4. 为非 AI 智能体站点开启 OKF

如果您的文档站点没有 AI 智能体受众，OKF 不会带来额外收益。`@docmd/plugin-okf` 默认启用，因此可以显式禁用它：

```json
{
  "plugins": { "okf": false }
}
```

`llms.txt` 插件适用于“AI 可搜索的扁平文本”；OKF 则是“AI 智能体类型化知识图谱”的理想工具。

## 如何验证

在 `docmd build` 之后，在 `site/okf/` 检查生成的知识包：

```bash
# 清单文件（每个概念、类型、路径）
cat site/okf/okf.yaml | head -30

# 目录文件（按类型分组）
open site/okf/index.md

# 交互式图谱（力导向、感知主题）
open site/okf/graph.html

# 插件产生的警告
cat site/okf/_meta/lint-report.txt
```

检查报告是第一件需要查看的事情 —— 它列出了没有 `type` 字段的页面、带有失效内部链接的页面以及孤立概念（没有入站链接）。修复这些可以获得更干净的智能体体验。

- [AI 助手配置](./ai-assistant.md) — RAG 驱动的交互式助手配置。
- [MCP 与 Agent Skills](./mcp-and-agent-skills.md) — Model Context Protocol 设置与智能体工具。
