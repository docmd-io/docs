---
title: 内置变量参考
description: docmd 在构建和运行时自动提供的所有零配置内置变量完整参考。
---

# 内置变量参考

docmd 在每次构建时都会自动注册一套功能丰富的内置变量。这些变量无需任何前置配置，即可直接在 Markdown 正文、模板横幅、页脚版权信息及 Meta 标签中使用。

## 系统与构建变量

| 变量名 | 别名 | 示例值 | 说明 |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | 当前执行构建的 docmd 编译器版本。 |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | 文档构建时的 4 位公历年份。 |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | 构建发生的 ISO 日期（YYYY-MM-DD）。 |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | 完整的 ISO 8601 UTC 时间戳。 |

### 示例：页脚中的动态版权年份

在您的 `docmd.config.json` 中使用 `{{ docmd.buildYear }}`，确保每次部署时版权年份始终保持最新：

```json
{
  "footer": {
    "copyright": "版权所有 © {{ docmd.buildYear }} Acme Technologies, Inc. 保留所有权利。"
  }
}
```

## Git 与代码仓库元数据

当在 Git 仓库中构建时，docmd 会读取版本控制元数据：

| 变量名 | 别名 | 示例值 | 说明 |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `GIT_COMMIT` | `7a9b1c2` | 当前 Git Commit 的 7 位短 SHA 值。 |
| `docmd.gitBranch` | `GIT_BRANCH` | `main` | 当前激活的 Git 分支名称。 |

### 示例：在正文中展示 Commit 与构建信息

```markdown
> 本文档生成自 Git 分支 `{{ docmd.gitBranch }}` 上的提交 `{{ docmd.gitCommit }}`，构建于 {{ docmd.buildDate }}。
```

## 站点与页面上下文变量

docmd 提供反映当前项目及正在渲染页面的上下文变量：

| 变量名 | 示例值 | 说明 |
| :--- | :--- | :--- |
| `site.title` | `Docmd 官方文档` | 在 `docmd.config.json` 中配置的站点标题。 |
| `site.base` | `/docs/` | 配置的基础 URL 路径。 |
| `page.title` | `快速入门` | 当前页面的标题（取自 Frontmatter 或 `# 一级标题`）。 |
| `page.slug` | `getting-started/installation` | 当前页面的相对 URL 路径或 Slug。 |

### 示例：动态欢迎标题

```markdown
# 欢迎访问 {{ site.title }}

您当前正在阅读 **{{ page.title }}** (`{{ page.slug }}`)。
```
