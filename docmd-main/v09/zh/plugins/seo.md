---
title: "SEO 插件"
description: "通过原生 meta 标签生成优化您的文档，以适应搜索引擎并控制 AI 爬虫的访问。"
---

`@docmd/plugin-seo` 插件为您全站的每个页面生成语义化 HTML 元数据与社交媒体预览标签。它确保您的文档可被搜索引擎检索、在社交平台上得到正确呈现，并符合 AI 爬虫策略。

## 配置选项

在 `docmd.config.json` 中配置全站 SEO 默认值。页面级 Frontmatter 设置会覆盖全局默认值。

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | 缺乏显式 Frontmatter 描述的页面的后备描述。 |
| `titleSeparator` | `string` | `"-"` | `<title>` 与社交分享卡片中页面标题与站点标题之间的分隔符。单空格会自动填充（`" - "`）。亦可在 `layout.titleSeparator` 中配置。 |
| `titleAppend` | `boolean` | `true` | 是否将站点标题附加在页面标题后。设为 `false` 则仅输出页面标题。亦可在 `layout.titleAppend` 中配置。 |
| `breadcrumbs` | `boolean` | `true` | 在所有非根页面自动注入 Schema.org `BreadcrumbList` JSON-LD 结构化数据。 |
| `organization` | `object` | `null` | 站点主页上注入的 Schema.org `Organization` 结构化数据（name, url, logo, sameAs）。 |
| `webSite` | `object \| boolean` | `true` | 站点主页上注入的带有 Sitelinks `SearchAction` 的 Schema.org `WebSite` 结构化数据。 |
| `aiBots` | `boolean` | `true` | 允许 (`true`) 或阻止 (`false`) AI 训练抓取爬虫 (GPTBot, ChatGPT-User, Google-Extended, CCBot)。 |
| `openGraph` | `object` | `null` | Open Graph 社交媒体元数据 (Facebook, LinkedIn)。 |
| `twitter` | `object` | `null` | Twitter (X) Card 设置，包括用户名和卡片类型。 |

### 全局 SEO 配置示例

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  },
  "plugins": {
    "seo": {
      "defaultDescription": "docmd 平台的完整技术文档。",
      "breadcrumbs": true,
      "organization": {
        "name": "docmd",
        "url": "https://docmd.io",
        "logo": "https://docmd.io/assets/images/docmd-logo.png",
        "sameAs": [
          "https://github.com/docmd-io/docmd",
          "https://x.com/docmd_io"
        ]
      },
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## 核心能力

* **自动化 `robots.txt`**: 在输出根目录生成标准 `robots.txt`，包含 Sitemap 位置与 AI 机器人规则。
* **智能摘要提取**: 若未定义页面描述，则自动提取正文的前 150 个字符。
* **AI 机器人治理**: 设置 `aiBots: false` 可阻止 AI 训练抓取程序，同时仍允许搜索引擎爬虫索引。
* **规范 URL 发射**: 注入 `<link rel="canonical">` 元素以防止重复索引问题。在 Frontmatter 中设置 `canonicalUrl: false` 可抑制标签。
* **社交预览卡片**: 生成具有统一页面标题和分隔符的 Open Graph 与 Twitter Card 标签。
* **结构化数据 (JSON-LD)**: 注入 `BreadcrumbList`、`Organization` 与 `WebSite`（Sitelinks 搜索框）Schema，并支持 Frontmatter 自定义 `ldJson` 数据载荷。

## `robots.txt` 解析顺序

SEO 插件按自顶向下的优先级顺序评估 `robots.txt`：

1. **站点根目录** (`site/robots.txt`) - 首先检查；若存在，则保留现有内容。
2. **源码资源文件夹** (`assets/robots.txt`) - 若存在于源码资源目录中，会自动复制到站点输出根目录 (`site/robots.txt`)。
3. **自动生成默认值** - 若未找到自定义文件，`docmd` 会根据插件配置动态生成 `robots.txt`。

推荐的文件组织结构：

```text
my-docs/
├── assets/
│   └── robots.txt  # 在此编写自定义规则
├── index.md
└── docmd.config.json
```

## 页面级 SEO 覆盖

使用 [页面 Frontmatter](../content/frontmatter.md) 为特定文档覆盖全站 SEO 默认设置：

```yaml
---
title: "高级引擎架构"
noindex: true # 从搜索引擎索引中隐藏页面
seo:
  keywords: ["docmd", "architecture", "engine"]
  aiBots: true # 允许 AI 抓取程序索引此页面
  ldJson: true # 注入文章 Schema
---
```

::: callout tip "基础 URL 配置" icon:link
在 `docmd.config.json` 中定义 `url` 属性（例如 `https://docs.docmd.io`），以启用有效的绝对规范链接与社交预览图片 URL。
:::