---
title: "Threads 插件"
description: "为您的文档添加内联讨论线程 —— 直接存储在您的 Markdown 文件中。"
---

**Threads 插件** 为您的文档带来协作式内联评论。选择文本、留下评论、开启讨论。所有线程都直接存储在您的 markdown 源文件中。无需数据库。

原作者：[@svallory](external:https://github.com/svallory)

::: callout info "Alpha 版本"
此插件处于 alpha 阶段。API 和存储格式已稳定。UI 仍在积极开发中。
:::

## 配置

Threads 插件是可选插件。通过 CLI 安装：

```bash
npx @docmd/core add threads
```

在您的 `docmd.config.json` 中启用它。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | 为 `true` 时，线程保持在页面底部分组。为 `false` 时，线程以内联方式出现在突出显示的文本旁边。 |

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true
    }
  }
}
```

## 工作原理

1. 在 `npx @docmd/core dev` 期间，在任何文档页面上**选择文本**。
2. 出现**评论弹出框**。编写评论并提交。
3. 所选文本会**突出显示**，带有线程标记。
4. 线程作为 `::: threads` 块存储在 markdown 文件底部。
5. **无需数据库**。您的 markdown 文件保持唯一的真实来源。

## 预览

以下是线程在实时页面上的外观。有讨论的文本会以 <span class="threads-preview-highlight">这样的方式突出显示</span>。线程卡片出现在下方。

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">Good idea - I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;12h ago</div>
    <div class="threads-preview-body">Perfect. A simple flowchart would be ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

这里是<span class="threads-preview-highlight-blue">带不同颜色的第二个高亮</span>。线程会自动循环使用调色板中的颜色。

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;3d ago</div>
    <div class="threads-preview-body">Should we mention backward compatibility here?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

已解决的线程显示为暗色：

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5d ago&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Resolved</span></div>
    <div class="threads-preview-body">Fixed the typo in the config example.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

一个浮动的**讨论按钮** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> 出现在右下角。它显示打开线程的数量。点击它可跳转到页面上的第一个线程。

## 存储格式

线程使用 docmd 的容器语法嵌入到您的 markdown 中：

```markdown
# My Documentation Page

Some content with ==highlighted text=={t-a1b2c3d4} that has a thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text needs clarification.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated it - does this work?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

`==text=={threadId}` 语法将文档正文中突出显示的文本链接到特定线程。

## 功能

| 功能 | 说明 |
| :--- | :--- |
| **文本选择** | 选择任何文本以开启新线程。 |
| **回复** | 每个线程内的嵌套回复链。 |
| **反应** | 单个评论上的表情反应。 |
| **编辑 / 删除** | 修改或删除您的评论。 |
| **解决** | 使用作者和时间戳将线程标记为已解决。 |
| **作者档案** | 基于 Git 的作者检测，支持 Gravatar。 |
| **高亮标记** | 显示线程锚定位置的可视化指示器。 |
| **浮动按钮** | 快速访问的浮动操作按钮，带打开的线程计数。 |
| **滚动保持** | 添加评论后页面保持在原位。 |

## Actions API

threads 插件通过 WebSocket RPC 系统暴露以下 actions。使用 `docmd.call()` 从浏览器插件调用它们：

| Action | 说明 |
| :--- | :--- |
| `threads:get-threads` | 解析并返回文件中的所有线程。 |
| `threads:add-thread` | 创建新线程及其第一条评论。 |
| `threads:add-comment` | 向现有线程添加评论。 |
| `threads:edit-comment` | 编辑现有评论的正文。 |
| `threads:delete-comment` | 从线程中删除评论。 |
| `threads:delete-thread` | 删除整个线程并清理高亮。 |
| `threads:resolve-thread` | 切换已解决/未解决状态。 |
| `threads:toggle-reaction` | 切换评论上的表情反应。 |
| `threads:get-authors` | 读取作者档案映射。 |
| `threads:upsert-author` | 创建或更新作者档案。 |

## 作者档案

作者信息存储在 `<docsRoot>/.threads/authors.json` 中：

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

在开发期间，插件会自动检测您的 Git 用户名和电子邮件以进行作者身份识别。

::: callout tip "版本控制友好"
由于线程存储在您的 markdown 文件中，它们会自动通过 Git 进行版本控制。在 PR 中审阅评论、跟踪讨论历史，并通过您现有的工作流进行协作。
:::
