---
title: "评论线程插件"
description: "为你的文档添加行内讨论线程——直接存储在你的 markdown 文件中。"
---

**Threads 插件**为你的文档带来协作式的行内评论功能。选择页面上的任何文本，留下评论，开始讨论——所有内容都直接存储在你的 markdown 源文件中，无需任何数据库。

原作者：[@svallory](external:https://github.com/svallory)

::: callout info "Alpha 版本"
此插件处于 alpha 阶段。API 和存储格式是稳定的，但 UI 仍处于活跃开发中。
:::

## 安装设置

```bash
npx @docmd/core add threads
```

在 `docmd.config.json` 中启用：

```json
{
  "plugins": {
    "threads": {}
  }
}
```

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | 当为 `true` 时，线程会分组在页面底部。当为 `false`（默认）时，线程会定位在所选文本旁边的行内位置。 |

```json
{
  "plugins": {
    "threads": {
      "sidebar": true
    }
  }
}
```

## 工作原理

1. 在 `npx @docmd/core dev` 期间，在任何文档页面上**选择文本**
2. 出现一个**评论弹出层**——写下你的评论并提交
3. 所选文本会被**高亮显示**并带有线程标记
4. 线程以 `::: threads` 块的形式存储在 markdown 文件的底部
5. **无需数据库**——你的 markdown 文件就是事实来源

## 技术实现

*   **无数据库**：所有评论都作为 YAML frontmatter 存储在源 `.md` 文件中
*   **Git 友好**：线程是纯文本，可以进行版本控制、合并和审查
*   **零配置**：开箱即用，无需外部服务或 API 密钥
*   **隐私优先**：所有数据保留在你的仓库中

::: callout tip "协作工作流"
Threads 插件非常适合技术写作团队。审阅者可以直接在文档中留下反馈，作者可以在提交前解决评论——所有内容都在同一个 Git 工作流中。
:::
