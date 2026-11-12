---
title: "Git 插件"
description: "从 Git 历史派生的仓库感知元数据、最近更新时间戳和自动编辑链接。"
---

`@docmd/plugin-git` 插件为您的文档网站添加仓库智能。它在编译期间直接查询本地 Git 历史，以展示页面修改时间戳、作者贡献以及自动化的“编辑此页面”链接。

## 配置选项

在 `docmd.config.json` 中配置仓库参数：

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | 公开仓库 URL（例如 `https://github.com/org/repo`）。编辑链接所必需。 |
| `branch` | `string` | `'main'` | 源码编辑链接的目标分支。 |
| `editLink` | `boolean` | `true` | 在页面页脚中显示“编辑此页面”按钮。 |
| `lastUpdated` | `boolean` | `true` | 在页面页脚中显示最近更新时间戳。 |
| `commitHistory` | `boolean` | `true` | 鼠标悬停时间戳时显示提交历史提示框。 |
| `maxCommits` | `number` | `5` | 悬停提示框中显示的最大提交数量。 |
| `dateFormat` | `string` | `'relative'` | 日期格式模式：`relative`（默认）、`iso` 或 `locale-aware`。 |

### 配置示例

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/docmd-io/docmd",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## 核心能力

* **最近更新时间戳**: 为每个文件自动计算并显示在页面页脚中。
* **提交历史提示框**: 鼠标悬停在时间戳上时渲染最近的 Commit Hash、提交信息和作者头像。
* **自动化编辑链接**: 生成直接指向 GitHub、GitLab 或 Bitbucket 的编辑 URL。
* **构建期缓存**: Git 查询在编译期间执行并自动在本地缓存结果，确保零运行时开销。

## 页面级控制

使用 [页面 Frontmatter](../content/frontmatter.md) 为特定文档禁用 Git 功能：

```yaml
---
title: "内部说明"
plugins:
  git: false
---
```

## CI/CD 流水线集成

Git 插件在站点编译期间执行本地 `git` CLI 命令。许多 CI/CD 执行器（例如 GitHub Actions 或 GitLab CI）执行浅克隆（`fetch-depth: 1`），这会导致提交历史被截断，使所有页面显示完全相同的时间戳日期。

请确保您的构建工作流拉取完整的 Git 历史：

::: tabs

== tab "GitHub Actions"

将 `fetch-depth: 0` 添加到您的 checkout 步骤：

```yaml ".github/workflows/docs.yml"
- name: Checkout Repository
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

将 `GIT_DEPTH` 环境变量设置为 `0`：

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify 默认拉取完整历史。如果使用自定义构建脚本，请确保在构建工作区中保留 `.git` 目录。

:::

::: callout warning "Git CLI 可用性" icon:alert-triangle
在您的编译容器或构建环境中，`.git` 目录和 `git` 二进制可执行文件必须可访问。
:::

## 本地化支持

Git 插件支持用于页脚字符串和时间戳格式的多语言翻译映射。可通过 [UI 本地化](../configuration/localisation/ui-strings.md) 配置提供自定义字符串。