---
title: "Git 插件"
description: "从 Git 历史派生的仓库感知元数据、最近更新时间戳和自动编辑链接。"
---

`@docmd/plugin-git` 插件为您的文档添加仓库智能。它在构建时直接从 Git 历史中提取数据。它会显示页面的最后修改时间、贡献者，并提供一个可选的"编辑此页面"链接。

## 配置

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | 仓库 URL（例如 `https://github.com/org/repo`）。编辑链接所必需。 |
| `branch` | `string` | `'main'` | 编辑链接的分支名称。 |
| `editLink` | `boolean` | `true` | 设置 `repo` 后显示"编辑此页面"链接。 |
| `lastUpdated` | `boolean` | `true` | 显示最近更新时间戳。 |
| `commitHistory` | `boolean` | `true` | 悬停时显示提交历史工具提示。 |
| `maxCommits` | `number` | `5` | 工具提示中显示的最大提交数（如果 `commitHistory` 为 true）。 |
| `dateFormat` | `string` | `'relative'` | 时间戳格式：`relative`（默认）、`iso` 或 `locale-aware`。 |

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/org/repo",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## 功能

- **最近更新时间戳**：显示在页脚中。
- **提交历史工具提示**：悬停时间戳可查看该页面的最近提交。
- **编辑链接**：可选地链接到 GitHub、GitLab 或 Bitbucket 上的源文件编辑。
- **构建时缓存**：Git 历史只查询一次并缓存，因此不影响站点性能。

## 行为

配置完成后，插件会自动工作。时间戳和编辑链接会出现在页脚中。

### 页脚示例

::: callout info "渲染结果"
本页的页脚由 Git 插件渲染。滚动到底部查看效果。将鼠标悬停在**最近更新**日期上可查看提交历史。
:::

## 按页面控制

通过 frontmatter 禁用特定页面的 Git 功能：

```markdown
---
title: "内部备注"
plugins:
  git: false
---
```

## CI/CD 集成

Git 插件使用本地 Git 命令在构建时读取您的仓库历史。许多 CI/CD 提供商默认使用"浅克隆"（仅获取最后一次提交）。这会导致插件在所有页面上只显示最近的更改。

为了确保准确的时间戳和历史记录，请配置您的 CI 环境以执行完整获取。

::: tabs

== tab "GitHub Actions"

将 `fetch-depth: 0` 添加到您的 checkout 步骤：

```yaml ".github/workflows/docs.yml"
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

将 `GIT_DEPTH` 变量设置为 `0`：

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify 默认获取完整历史。如果遇到问题，请确保您的构建命令可以访问 `.git` 目录。

:::

::: callout warning "Git 数据要求"
构建环境中必须存在 `.git` 目录。如果在 Docker 容器或受限的 CI 环境中构建，请确保保留 Git 历史并安装了 `git` 二进制文件。
:::

## 本地化

该插件包含多种常用语言（英语、德语、中文、韩语等）的内置翻译。完整的内置语言列表维护在[源代码仓库](external:https://github.com/docmd-io/docmd/tree/main/packages/plugins/git/i18n)中。自定义字符串可以通过 [UI 本地化](../configuration/localisation/ui-strings.md) 系统提供。