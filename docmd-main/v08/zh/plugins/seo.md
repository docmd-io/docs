---
title: "SEO 插件"
description: "通过原生 meta 标签生成优化您的文档，以适应搜索引擎并控制 AI 爬虫的访问。"
---

`@docmd/plugin-seo` 插件为每个页面生成高质量元数据。它确保您的文档不仅可以被人类读者在搜索引擎上发现，还可以被 AI 模型和社交媒体平台正确解读。

## 配置

在您的 `docmd.config.json` 中配置全站 SEO 默认值。页面级设置始终优先于全局默认值。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | 没有 frontmatter 描述的页面的后备描述。 |
| `aiBots` | `boolean` | `true` | 允许（`true`）或阻止（`false`）AI 训练爬虫。当为 `false` 时，会阻止 GPTBot、ChatGPT-User、Google-Extended、CCBot 等 AI 爬虫。 |
| `openGraph` | `object` | `null` | 社交媒体的 Open Graph 设置（Facebook、LinkedIn）。 |
| `twitter` | `object` | `null` | Twitter (X) Card 设置，包括用户名和卡片类型。 |

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "seo": {
      "defaultDescription": "Comprehensive documentation for the docmd ecosystem.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## 功能

- **自动 `robots.txt`**：缺失时自动生成，包含 sitemap 引用和 AI 爬虫指令。
- **智能后备**：如果未设置描述，则提取正文的前 150 个字符。
- **AI 爬虫治理**：默认情况下，AI 爬虫可以索引内容。设置 `aiBots: false` 可阻止 AI 训练爬虫，同时仍允许传统搜索引擎。
- **规范 URL**：发出 `<link rel="canonical">` 以防止重复内容问题。
- **社交预览**：原生 Open Graph 和 Twitter Cards。
- **结构化数据**：LD+JSON 文章 Schema，用于丰富的搜索摘要。

## robots.txt 自动生成

如果输出目录中没有 `robots.txt` 文件，插件会在构建过程中自动生成。

**生成内容包括：**

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://your-domain.com/sitemap.xml
```

**阻止 AI 训练爬虫：**

当设置 `aiBots: false` 时，生成的 `robots.txt` 包含：

```txt
# Block AI training bots
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
# ... (additional AI crawlers)
```

### robots.txt 位置策略

插件智能地处理多个位置的 `robots.txt`：

**优先级顺序：**
1. **站点根目录**（`site/robots.txt`）—— 首先检查，最高优先级
2. **资源文件夹**（`site/assets/robots.txt`）—— 如果找到，则复制到站点根目录

**行为：**

- 如果 `robots.txt` 存在于**站点根目录**：保留，不采取任何操作
- 如果 `robots.txt` 存在于**资源文件夹**：自动复制到站点根目录（SEO 推荐位置）
- 如果未找到 `robots.txt`：根据 SEO 配置自动生成

**推荐实践：**

将您的自定义 `robots.txt` 放在文档源的 `assets/` 文件夹中。插件将在构建期间将其复制到站点根目录：

```
your-docs/
├── assets/
│   └── robots.txt    ← Place here
├── index.md
└── docmd.config.json
```

构建后，它出现在正确的位置：

```
site/
├── robots.txt        ← Copied here (SEO standard location)
├── assets/
│   └── robots.txt    ← Also preserved here
└── index.html
```

::: callout tip "为什么是站点根目录？"
搜索引擎期望 `robots.txt` 位于域根目录（`https://example.com/robots.txt`）。插件确保您的文件始终位于正确的位置，无论您提供自定义文件还是让其自动生成。
:::

## 页面级覆盖

使用 frontmatter 为单个页面微调设置：

```markdown
---
title: "Advanced Configuration"
noindex: true # Hide from all search engines
seo:
  keywords: ["docmd", "javascript", "ssg"]
  aiBots: true # Override global block for this page
  ldJson: true # Enable Article Schema
---
```

::: callout tip "搜索发现"
为获得最佳效果，请确保在配置的根目录中定义了 `url`。没有基础 URL，插件无法生成绝对规范链接或社交图片路径。
:::