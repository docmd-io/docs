---
title: "LLM 上下文插件"
description: "通过自动生成 llms.txt、llms-full.txt 和 llms.json 来优化您的文档以供 AI 消费。"
---

`@docmd/plugin-llms` 插件实现了 `llms.txt` 标准，在构建编译过程中生成机器可读的上下文文件。AI 工具、IDE 扩展（如 Cursor 与 Copilot）以及自主智能体可摄取这些生成的文件，为您的站点构建高精度的上下文模型。

该插件 **默认启用**。请在 `docmd.config.json` 中设置 [`url`](../configuration/overview.md) 属性，以确保发射绝对 URL。

## 生成的产物

在站点编译期间，构建输出根目录会生成三个文件：

* `llms.txt` — 包含页面标题、描述与规范 URL 的结构化概述。
* `llms-full.txt` — 完整的文档上下文，每个条目下方均附有原始 Markdown 正文。
* `llms.json` — 包含类型化元数据（标题、URL、描述、优先级）的机器可读 JSON 清单。

自动发现 `<link>` 标签会自动注入至页面的 `<head>` 标头中。

## 配置选项

在 `docmd.config.json` 中配置 LLM 上下文参数：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 LLM 上下文文件生成。 |
| `fullContext` | `boolean` | `true` | 生成包含完整 Markdown 正文的 `llms-full.txt`。 |
| `maxTokenLimit` | `number` | `null` | 可选，限制上下文包输出的总字符数/Token 数。 |
| `i18n` | `boolean` | `false` | 除了默认语言集外，写入按语言划分的文件 (`llms.<locale>.txt`)。 |

### 全局配置示例

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "llms": {
      "fullContext": true,
      "i18n": false
    }
  }
}
```

## 默认语言行为

默认情况下，插件会为 **默认语言** 生成无后缀的文件（`llms.txt`、`llms-full.txt`、`llms.json`）。这保持了与预期标准根文件名的 AI 工具的兼容性。

对于单语言站点，会生成一组根文件。对于多语言站点，默认语言的内容会在无后缀的根路径中提供。

## 多语言上下文包

要为次要语言生成专门的上下文文件，请设置 `i18n: true`：

```json "docmd.config.json"
{
  "plugins": {
    "llms": {
      "i18n": true
    }
  }
}
```

启用后，构建输出包含：

```text
site/llms.txt          ← 默认语言（无后缀）
site/llms-full.txt     ← 默认语言（无后缀）
site/llms.json         ← 默认语言（无后缀）
site/llms.de.txt       ← 德语（带后缀）
site/llms-full.de.txt  ← 德语（带后缀）
site/llms.zh.txt       ← 中文（带后缀）
site/llms-full.zh.txt  ← 中文（带后缀）
```

默认语言保留无后缀路径，从而使外部集成能够无缝继续运行。

## 安全与过滤防御

在输出知识包之前，所有由用户控制的字符串（标题与描述）都会经过严格的安全净化过滤：

* **链接完整性**: 页面标题中的 Markdown 控制字符（`` ` ``、`[`、`]`、换行符）均被转义，以防止损坏 `[title]\(target-path\)` 语法。
* **CSV/表格注入防御**: 以 `=`、`+`、`-` 或 `@` 开头的字符串会自动补前缀单引号 (`'`)，以消除单元格公式执行风险。

## 排除内容页面

要从 AI 上下文文件中排除内部笔记、草稿页面或安全敏感文档，请在 [页面 Frontmatter](../content/frontmatter.md) 中设置 `llms: false`：

```yaml
---
title: "内部发布检查清单"
llms: false # 从 llms.txt 与 llms-full.txt 中排除该页面
---
```

被排除的页面仍会在标准 HTML 输出和本地站点搜索中保持可见。

::: callout tip "结构化知识图谱" icon:cpu
对于深度结构化的 AI 上下文图谱包（包含类型化概念图谱与节点可视化），请将此插件与 [OKF Bundle 插件](./okf.md) 配合使用。
:::