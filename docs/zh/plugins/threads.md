---
title: "Threads 插件"
description: "向文档添加内联讨论线程——直接存储在 Markdown 文件中。"
---

**Threads 插件**为你的文档带来协作式内联评论。选中页面上的任意文字，留下评论，开始讨论——所有内容直接存储在 Markdown 源文件中，无需任何数据库。

原作者：[@svallory](https://github.com/svallory)

::: callout info "测试版本"
此插件处于 Alpha 阶段。API 和存储格式已稳定，但 UI 仍在积极开发中。
:::

## 配置

```bash
docmd add threads
```

```javascript
plugins: {
  threads: {}
}
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | 为 `true` 时，线程聚合在页面底部。为 `false`（默认）时，线程内联定位在高亮文本旁边。 |

```javascript
// 将线程保持在页面底部而非内联
plugins: {
  threads: {
    sidebar: true
  }
}
```

## 工作原理

1. 在 `docmd dev` 中，**选中任意文本**
2. 出现**评论弹窗**——写下评论并提交
3. 选中文本被**高亮**并显示线程标记
4. 线程以 `::: threads` 块的形式存储在 Markdown 文件底部
5. **无需数据库**——Markdown 文件即真相来源

## 预览

有讨论的文本会被高亮，线程卡片显示在下方。

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">Good idea — I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
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

已解决的线程以淡化样式显示：

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

右下角会出现浮动的**讨论按钮** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span>，显示未解决线程数量。

## 存储格式

线程使用 docmd 的容器语法嵌入到 Markdown 中：

```markdown
# My Documentation Page

Some content with ==highlighted text=={t-a1b2c3d4} that has a thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text needs clarification.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated it — does this work?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

`==text=={threadId}` 语法将文档正文中的高亮文本链接到特定线程。

## 功能

| 功能 | 说明 |
| :--- | :--- |
| **文本选择** | 选中任意文本以开启新线程 |
| **回复** | 每个线程内的嵌套回复链 |
| **表情反应** | 对单条评论的 emoji 反应 |
| **编辑/删除** | 修改或删除你的评论 |
| **解决** | 将线程标记为已解决并记录作者和时间戳 |
| **作者档案** | 基于 Git 的作者检测，支持 Gravatar |
| **高亮标记** | 显示线程锚点位置的页面视觉标记 |
| **浮动按钮** | 带未解决线程数量的快速访问 FAB |
| **滚动保持** | 添加评论后页面保持当前位置 |

## Actions API

Threads 插件通过 WebSocket RPC 系统暴露以下 action，可通过 `docmd.call()` 在浏览器插件中调用：

| Action | 说明 |
| :--- | :--- |
| `threads:get-threads` | 解析并返回文件中的所有线程 |
| `threads:add-thread` | 创建新线程及其第一条评论 |
| `threads:add-comment` | 向现有线程添加评论 |
| `threads:edit-comment` | 编辑现有评论内容 |
| `threads:delete-comment` | 从线程中删除评论 |
| `threads:delete-thread` | 删除整个线程并清理高亮标记 |
| `threads:resolve-thread` | 切换已解决/未解决状态 |
| `threads:toggle-reaction` | 切换评论上的 emoji 反应 |
| `threads:get-authors` | 读取作者档案映射 |
| `threads:upsert-author` | 创建或更新作者档案 |

## 作者档案

作者信息存储在 `<docsRoot>/.threads/authors.json` 中：

```json
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

开发期间，插件会自动检测你的 git 用户名和邮箱用于作者识别。

::: callout tip "版本控制友好"
由于线程存储在你的 Markdown 文件中，它们会随 git 自动进行版本控制。在 PR 中审查评论、追踪讨论历史，并通过现有工作流协作。
:::
