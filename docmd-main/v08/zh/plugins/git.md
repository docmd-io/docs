---
title: "Git 插件"
description: "显示直接从 Git 仓库获取的最后更新时间戳和提交历史。"
---

**Git 插件**为您的文档页面添加仓库感知的元数据。它显示每个页面的最后修改时间、贡献者信息，并提供可选的"编辑此页"链接 - 所有这些都直接从您的 Git 历史记录中获取，无需配置。

::: callout info "核心插件"
Git 插件已包含在 `@docmd/core` 中，默认启用。它会自动检测您的项目是否在 Git 仓库中，如果不在则会自动禁用。基本功能无需安装或配置。
:::

## 功能

### 最后更新时间戳

每个页面自动显示其最后修改时间，显示在页面底部的编辑链接旁边。时间戳来自最近修改该源文件的 Git 提交。

<!-- SCREENSHOT: 页面底部显示左侧"最后更新：3天前"和右侧"编辑此页" -->

时间戳对于最近的更改使用相对格式（"2小时前"、"3天前"），对于较旧的内容则切换到绝对日期（"2026年3月15日"）。

### 提交历史工具提示

将鼠标悬停在"最后更新"文本上，可以显示该页面最近提交的工具提示。每个条目显示提交消息、作者（附带 Gravatar 头像）和相对时间戳。

<!-- SCREENSHOT: 提交历史工具提示，显示4-5个最近的提交，包含作者头像和消息 -->

这提供了关于最近更改的快速上下文，无需离开页面 - 对于了解更新内容和更新者非常有用。

### 编辑链接

配置仓库 URL 后，插件会显示"编辑此页"链接，直接在您的 Git 提供商的网页编辑器中打开源文件。

```javascript
plugins: {
  git: {
    repo: 'https://github.com/your-org/your-docs',
    branch: 'main'
  }
}
```

插件自动检测 GitHub、GitLab 和 Bitbucket URL，并为每个提供商构建正确的编辑链接格式。

## 配置

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | 仓库 URL（例如 `https://github.com/org/repo`）。编辑链接必需。 |
| `branch` | `string` | `'main'` | 编辑链接的分支名称。 |
| `editLink` | `boolean` | `true` | 设置 `repo` 时显示"编辑此页"链接。 |
| `lastUpdated` | `boolean` | `true` | 显示最后更新时间戳。 |
| `commitHistory` | `boolean` | `true` | 悬停时显示提交历史工具提示。 |
| `maxCommits` | `number` | `6` | 工具提示中显示的最大提交数（仅在 `commitHistory` 为 `true` 时适用）。 |
| `dateFormat` | `string` | `'relative'` | 时间戳格式：`relative`（相对）、`iso`（ISO 格式）或 `locale-aware`（本地化格式）。 |

### 完整示例

```json
{
  "plugins": {
    "git": {
      "repo": "https://github.com/docmd-io/docs",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## 页面级控制

使用 frontmatter 为特定页面禁用 Git 插件：

```markdown
---
title: "内部笔记"
plugins:
  git: false
---

此页面不会显示最后更新时间或编辑链接。
```

## 工作原理

插件在构建时使用标准 Git 命令读取 Git 历史。对于每个 markdown 文件：

1. 运行 `git log` 获取提交历史
2. 提取时间戳、作者和提交消息
3. 将数据注入页面上下文
4. 客户端 JavaScript 渲染 UI 组件

::: callout tip "性能"
Git 数据在构建过程中被缓存。每个文件的历史只查询一次，无论页面被渲染多少次（例如跨多个语言环境）。
:::

## 要求

- 文档源必须位于 Git 仓库内
- 构建环境中必须可用 Git
- 文件在其历史中必须至少有一个提交

没有 Git 历史的页面（尚未提交的新文件）不会显示时间戳或提交历史。

## 从 editLink 迁移

如果您之前使用 `editLink` 配置选项，Git 插件提供相同的功能并附加额外特性：

**之前（editLink 配置）：**
```javascript
export default defineConfig({
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/org/repo/edit/main/docs',
    text: '编辑此页'
  }
});
```

**之后（Git 插件）：**
```javascript
export default defineConfig({
  plugins: {
    git: {
      repo: 'https://github.com/org/repo',
      branch: 'main'
    }
  }
});
```

Git 插件自动从仓库和分支构建编辑 URL，因此您不再需要手动指定完整的编辑路径。

::: callout warning "弃用通知"
独立的 `editLink` 配置选项已弃用，将在未来版本中移除。请迁移到 Git 插件以获取编辑链接功能。
:::

## 本地化

插件包含所有 UI 字符串的翻译。支持的语言：

- 英语 (en)
- 德语 (de)
- 中文 (zh)

自定义翻译可以通过标准 [UI 字符串](../configuration/localisation/ui-strings.md)系统提供。
