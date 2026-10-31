---
title: 内置变量参考手册
description: docmd 在构建和运行时自动提供的全部零配置内置系统变量完整列表。
---

# 内置变量参考手册

docmd 在每次构建过程中都会自动注册一系列系统级内置变量。这些变量无需任何前置配置，即可直接应用于 Markdown 内容、顶部横幅、页脚版权声明以及 Meta 标签中。

## 系统与构建变量

| 变量名称 | 别名 | 示例值 | 说明 |
| :--- | :--- | :--- | :--- |
| `docmd.version` | `DOCMD_VERSION` | `0.9.9` | 当前运行编译的 docmd 核心引擎版本号。 |
| `docmd.buildYear` | `BUILD_YEAR` | `2026` | 文档编译时生成的 4 位公历年份。 |
| `docmd.buildDate` | `BUILD_DATE` | `2026-10-31` | ISO 日历日期 (YYYY-MM-DD)。 |
| `docmd.buildTime` | `BUILD_TIME` | `2026-10-31T10:50:00Z` | 完整的 ISO 8601 UTC 时间戳。 |

::: callout info "本次构建实时计算的系统变量" icon:sparkles
以下数值由编译器直接输出：
- **引擎版本号：** `v{{ docmd.version }}`
- **公历年份：** `{{ docmd.buildYear }}`
- **构建时间戳：** `{{ docmd.buildTime }}`
:::

### 页脚动态版权年份配置

在 `docmd.config.json` 中配置 `\{{ docmd.buildYear }}`，使得每次部署时版权年份自动保持最新：

```json
{
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} Acme Technologies, Inc. 保留所有权利。"
  }
}
```

## Git 仓库元数据

当项目位于 Git 版本控制仓库中时，docmd 会自动读取版本信息：

| 变量名称 | 别名 | 示例值 | 说明 |
| :--- | :--- | :--- | :--- |
| `docmd.gitCommit` | `git.commit`, `GIT_COMMIT` | `7a9b1c2` | 当前 Git Commit 的 7 位短哈希。 |
| `docmd.gitBranch` | `git.branch`, `GIT_BRANCH` | `main` | 当前检出的 Git 活动分支名称。 |

### 在 Markdown 中展示提交信息

```markdown
> 本篇文档由 Git 提交 `\{{ docmd.gitCommit }}`（分支 `\{{ docmd.gitBranch }}`）于 \{{ docmd.buildDate }} 编译生成。
```

::: callout info "Git 实时元数据" icon:git-branch
本页面由 Git 提交 `{{ docmd.gitCommit || 'HEAD' }}`（分支 `{{ docmd.gitBranch || 'main' }}`）于 {{ docmd.buildDate }} 生成。
:::

## 站点与页面上下文变量

docmd 提供反映全局配置及当前正在渲染文档的上下文变量：

| 变量名称 | 示例值 | 说明 |
| :--- | :--- | :--- |
| `site.title` | `docmd docs` | 在 `docmd.config.json` 中配置的全局站点标题。 |
| `site.base` | `/` | 配置的基准 URL 路径。 |
| `page.title` | `内置变量参考手册` | 当前页面的标题（提取自 Frontmatter 或首个 H1）。 |
| `page.slug` | `variables/built-in-variables` | 当前页面的相对 URL 路径或 Slug（不带扩展名）。 |
| `page.path` | `variables/built-in-variables.md` | 当前 Markdown 源码文件的相对路径。 |

### 动态页面标题上下文

```markdown
# 欢迎查阅 \{{ site.title }}

您当前正在阅读 **\{{ page.title }}** (`\{{ page.slug }}`)。
```

::: card "当前页面上下文卡片" icon:file-text
- **页面标题：** {{ page.title }}
- **页面 Slug：** `{{ page.slug }}`
- **源码文件：** `{{ page.path }}`
- **站点标题：** {{ site.title }}
- **站点基准：** `{{ site.base || '/' }}`
:::

::: callout tip "配置项中全局插值支持" icon:lightbulb
所有内置变量均可在 `layout.banners.top.content` 与 `footer.copyright` 等配置字段中直接使用，构建时会自动解析完成。
:::
