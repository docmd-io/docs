---
title: "评论线程插件 (Threads Plugin)"
description: "为你的文档添加行内讨论线程 —— 直接存储在你的 markdown 文件中。"
---

**Threads 插件** 为你的文档带来协作式的行内评论功能。选择页面上的任何文本，留下评论，开始讨论 —— 所有内容都直接存储在你的 markdown 源文件中，无需任何数据库。

原作者：[@svallory](external:https://github.com/svallory)

::: callout info "Alpha 版本"
此插件处于 alpha 阶段。API 和存储格式是稳定的，但 UI 仍处于活跃开发中。
:::

## 安装设置

```bash
docmd add threads
```

```javascript
plugins: {
  threads: {}
}
```

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | 当为 `true` 时，线程会分组在页面底部。当为 `false` (默认) 时，线程会定位在所选文本旁边的行内位置。 |

```javascript
// 将线程保留在页面底部而不是行内
plugins: {
  threads: {
    sidebar: true
  }
}
```

## 工作原理

1. 在 `docmd dev` 期间，在任何文档页面上 **选择文本**
2. 出现一个 **评论弹出层** —— 写下你的评论并提交
3. 所选文本会被 **高亮显示** 并带有线程标记
4. 线程以 `::: threads` 块的形式存储在 markdown 文件的底部
5. **无需数据库** —— 你的 markdown 文件就是事实来源

## 预览

这是实时页面上线程的样子。带有讨论的文本会被 <span class="threads-preview-highlight">像这样高亮显示</span>，线程卡片会显示在下方。

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">这一部分可以使用图表来解释架构。你觉得呢？</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">好主意 —— 我会添加一个 Mermaid 流程图。这里可以使用 <code>sequenceDiagram</code> 吗？</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;12h ago</div>
    <div class="threads-preview-body">太棒了。一个简单的流程图会很理想。</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新评论</div>
  </div>
</div>

这是 <span class="threads-preview-highlight-blue">第二种不同颜色的高亮</span> —— 线程会自动循环使用一系列颜色。

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;3d ago</div>
    <div class="threads-preview-body">我们应该在这里提到向后兼容性吗？</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新评论</div>
  </div>
</div>

已解决的线程显示为变暗：

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5d ago&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ 已解决</span></div>
    <div class="threads-preview-body">修复了配置示例中的拼写错误。</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新评论</div>
  </div>
</div>

页面右下角会出现一个悬浮的 **讨论按钮** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span>，显示未解决线程的数量。点击它可跳转到页面上的第一个线程。

## 存储格式

线程使用 docmd 的容器语法嵌入在你的 markdown 中：

```markdown
# 我的文档页面

一些内容带有 ==高亮文本=={t-a1b2c3d4}，该文本关联了一个线程。

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      这段文本需要澄清。
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      更新了 —— 这样可以吗？

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

`==文本=={threadId}` 语法将文档正文中的高亮文本链接到特定的线程。

## 特性

| 特性 | 描述 |
| :--- | :--- |
| **文本选择** | 选择任何文本来启动新线程 |
| **回复** | 每个线程内嵌套的回复链 |
| **回应** | 对单个评论的表情回应 |
| **编辑 / 删除** | 修改或移除你的评论 |
| **解决** | 将线程标记为已解决，带有作者和时间戳 |
| **作者资料** | 基于 Git 的作者检测，支持 Gravatar |
| **高亮标记** | 页面上的视觉指示器，显示线程锚定的位置 |
| **悬浮按钮** | 带有未解决线程计数的快速访问 FAB |
| **滚动保留** | 添加评论后页面保持在原处 |

## Actions API

Threads 插件通过 WebSocket RPC 系统公开以下操作。这些操作可以从浏览器插件中使用 `docmd.call()` 调用：

| 操作 | 描述 |
| :--- | :--- |
| `threads:get-threads` | 解析并返回文件中的所有线程 |
| `threads:add-thread` | 创建一个带首条评论的新线程 |
| `threads:add-comment` | 向现有线程添加评论 |
| `threads:edit-comment` | 编辑现有评论的正文 |
| `threads:delete-comment` | 从线程中移除评论 |
| `threads:delete-thread` | 移除整个线程并清理高亮 |
| `threads:resolve-thread` | 切换已解决/未解决状态 |
| `threads:toggle-reaction` | 切换评论上的表情回应 |
| `threads:get-authors` | 读取作者资料映射表 |
| `threads:upsert-author` | 创建或更新作者资料 |

## 作者资料

作者信息存储在 `<docsRoot>/.threads/authors.json` 中：

```json
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

在开发过程中，插件会自动检测你的 git 用户名和电子邮件以进行作者识别。

::: callout tip "版本控制友好"
由于线程存储在你的 markdown 文件中，它们会自动随 git 进行版本控制。可以在 PR 中审阅评论，跟踪讨论历史，并通过你现有的工作流进行协作。
:::
