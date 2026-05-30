---
title: "SEO 插件"
description: "通过原生的元标签生成功能，为搜索引擎优化你的文档，并控制 AI 爬虫的访问权限。"
---

`@docmd/plugin-seo` 插件负责为每个页面生成高质量的元数据。它确保你的文档不仅能被搜索引擎上的人类读者发现，而且能被 AI 模型和社交媒体平台正确解读。

## 配置

在 `docmd.config.json` 中配置全站的 SEO 默认设置。页面级设置始终优先于全局默认设置。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | 没有 frontmatter 描述的页面的回退描述。 |
| `aiBots` | `boolean` | `true` | 允许（`true`）或阻止（`false`）AI 训练爬虫。设为 `false` 时，会阻止 GPTBot、ChatGPT-User、Google-Extended、CCBot 等 AI 爬虫。 |
| `openGraph` | `object` | `null` | 用于社交媒体（Facebook、LinkedIn）的 Open Graph 设置。 |
| `twitter` | `object` | `null` | Twitter (X) Card 设置，包括用户名和卡片类型。 |

### 示例

```json
{
  "plugins": {
    "seo": {
      "defaultDescription": "docmd 生态系统的全面文档。",
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

- **自动生成 robots.txt**：如果不存在 `robots.txt`，则自动生成，包含站点地图引用和 AI 爬虫指令。
- **智能描述降级**：如果未提供描述，自动提取正文前 150 个字符作为 `<meta name="description">`。
- **AI 爬虫管理**：默认允许 AI 爬虫索引内容。设置 `aiBots: false` 可阻止 AI 训练爬虫，同时不影响传统搜索引擎。
- **规范化 URL 解析**：自动生成 `<link rel="canonical">` 标签，防止重复内容问题。
- **丰富的社交预览**：原生支持 Open Graph 和 Twitter Cards，确保链接分享时显示专业的预览效果。
- **结构化数据**：支持 LD+JSON Article Schema，有助于在搜索结果中显示富摘要。

## robots.txt 自动生成

如果输出目录中不存在 `robots.txt`，插件会在构建过程中自动生成该文件。

**生成内容示例：**

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://your-domain.com/sitemap.xml
```

**阻止 AI 训练爬虫：**

当设置 `aiBots: false` 时，生成的 `robots.txt` 会包含：

```txt
# Block AI training bots
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
# ...（其他 AI 爬虫）
```

### robots.txt 位置策略

插件会智能处理多个位置的 `robots.txt`：

**优先级顺序：**
1. **站点根目录**（`site/robots.txt`）— 优先检查，优先级最高
2. **Assets 文件夹**（`site/assets/robots.txt`）— 若存在则复制到站点根目录

**处理逻辑：**

- 若 `robots.txt` 已存在于**站点根目录**：保留原文件，不做任何修改
- 若 `robots.txt` 存在于 **assets 文件夹**：自动复制到站点根目录（推荐的 SEO 放置位置）
- 若**找不到** `robots.txt`：根据 SEO 配置自动生成

**推荐做法：**

将自定义 `robots.txt` 放在文档源的 `assets/` 文件夹中，插件会在构建时自动将其复制到站点根目录：

```
your-docs/
├── assets/
│   └── robots.txt    ← 放在这里
├── index.md
└── docmd.config.json
```

构建后，文件会出现在正确位置：

```
site/
├── robots.txt        ← 复制到此处（SEO 标准位置）
├── assets/
│   └── robots.txt    ← 原文件也保留
└── index.html
```

::: callout tip "为什么要放在站点根目录？"
搜索引擎期望 `robots.txt` 位于域名根目录（`https://example.com/robots.txt`）。无论你提供自定义文件还是让插件自动生成，插件都能确保文件始终处于正确位置。
:::

## 页面级覆盖

使用 frontmatter 为单个页面微调 SEO 设置：

```markdown
---
title: "高级配置"
noindex: true # 从所有搜索引擎中隐藏此页面
seo:
  keywords: ["docmd", "javascript", "ssg"]
  aiBots: true # 覆盖全局阻止设置，允许 AI 访问此页面
  ldJson: true # 启用 Article Schema
---
```

::: callout tip "搜索发现"
为获得最佳效果，请确保在配置根目录中定义了 `url`。没有基准 URL，插件将无法生成绝对规范链接或社交图片路径。
:::