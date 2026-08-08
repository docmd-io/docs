---
title: "Threads 插件"
description: "为您的文档添加内联讨论线程 —— 直接存储在您的 Markdown 文件中。"
---

`@docmd/plugin-threads` 插件可在文档页面上实现协作式内联评论与文本标注。高亮与讨论线程使用自定义容器块（`::: threads`）原生存储在 Markdown 源码文件中。无需外部数据库。

原作者: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha 版本发布" icon:flask
该插件目前处于 Alpha 阶段。核心 API 与存储 Schema 已稳定，UI 组件正在积极迭代中。
:::

## 安装与设置

通过 CLI 安装插件：

```bash
npx @docmd/core add threads
```

在 `docmd.config.json` 中启用线程配置：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | 为 `true` 时，线程在专用面板中展示；为 `false` 时，线程以内联形式附着在文本高亮旁边。 |

### 全局配置示例

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true
    }
  }
}
```

## 工作流概览

1. **文本选择**: 在本地实时开发期间（`npx @docmd/core dev`）选择文本段落。
2. **评论弹出框**: 在弹出模态框中输入反馈。
3. **锚点注入**: 选中的文本段落会附带线程标识符进行高亮（`==高亮文本=={t-a1b2c3d4}`）。
4. **Markdown 持久化**: 线程结构作为 `::: threads` 块追加在 Markdown 文件的底部。
5. **Git 同步**: 讨论历史与文档编辑一同保存在版本控制中。

## 交互式预览

附带讨论的文本会接收到<span class="threads-preview-highlight">内联彩色高亮</span>。线程卡片在下方渲染：

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2天前</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1天前</div>
    <div class="threads-preview-body">Good idea - I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;12小时前</div>
    <div class="threads-preview-body">Perfect. A simple flowchart would be ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新建评论</div>
  </div>
</div>

额外的高亮会自动循环使用<span class="threads-preview-highlight-blue">不同的调色板</span>：

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;3天前</div>
    <div class="threads-preview-body">Should we mention backward compatibility here?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新建评论</div>
  </div>
</div>

已解决的讨论以置灰状态展示：

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5天前&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ 已解决</span></div>
    <div class="threads-preview-body">Fixed the typo in the config example.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ 新建评论</div>
  </div>
</div>

在底角会展示包含未解决线程计数的浮动讨论触发器 <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span>。

## Markdown 存储格式

线程使用容器块语法保存在文档源码文件中：

```markdown
# 引擎概览

核心架构特性包含带有附着线程的 ==高亮文本=={t-a1b2c3d4}。

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text requires additional technical detail.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated with extra specifications.

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

## 核心功能

* **文本选择**: 高亮任意文本以锚定新线程。
* **嵌套回复**: 嵌套对话线程。
* **Emoji 反应**: 为评论添加反应计数器。
* **解决状态**: 标记线程为已解决并带有作者归属。
* **作者身份**: 本地 Git 凭证自动解析头像与个人资料信息。

## RPC Actions API

Threads 插件暴露可由 `docmd.call()` 调用的 WebSocket RPC 端点：

| RPC 方法 | 技术描述 |
| :--- | :--- |
| `threads:get-threads` | 获取给定文件路径的所有解析后的线程。 |
| `threads:add-thread` | 锚定新线程与初始评论。 |
| `threads:add-comment` | 向现有线程追加回复。 |
| `threads:edit-comment` | 更新评论文本正文。 |
| `threads:delete-comment` | 移除一条评论条目。 |
| `threads:delete-thread` | 移除线程容器并清理正文高亮锚点。 |
| `threads:resolve-thread` | 切换线程解决状态。 |
| `threads:toggle-reaction` | 添加或移除 Emoji 反应。 |

## 作者个人资料存储

作者个人资料缓存在 `<docsRoot>/.threads/authors.json` 中：

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

::: callout tip "Git 原生版本控制" icon:git-commit
由于线程元数据完全储存在 `.md` 文件内部，评论天然遵循标准的 Git 分支、Pull Request 评审与提交历史工作流。
:::