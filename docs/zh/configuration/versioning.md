---
title: "版本管理"
description: "启用多版本文档管理，支持无缝切换、路径保留和独立构建目录。"
---

`docmd` 内置了原生版本管理引擎，可同时管理和提供多个版本的项目文档（如 `v1.x`、`v2.x`）。引擎自动处理 URL 路由、侧边栏更新和版本切换逻辑。

## 目录组织

启用版本管理前，需将文档组织到各版本的源文件夹中。常见做法是将最新版本保存在 `docs/`，旧版本存放在以 `docs-` 为前缀的目录中。

```text
my-project/
├── docs/           # 最新版本（主版本）
├── docs-v1/        # 旧版本
├── docmd.config.js
```

## 配置

在 `versions` 对象中定义所有版本：

```javascript
export default defineConfig({
  versions: {
    current: 'v2',           // 构建到根目录（/）的版本 ID
    position: 'sidebar-top', // 切换器位置：'sidebar-top' 或 'sidebar-bottom'
    all: [
      { id: 'v2', dir: 'docs',    label: 'v2.x（最新）' },
      { id: 'v1', dir: 'docs-v1', label: 'v1.x' }
    ]
  }
});
```

## 核心特性

### 1. 根目录 SEO（「当前」版本）
`current` 指定的版本将直接生成到输出根目录（如 `mysite.com/`），确保搜索流量始终落在最新文档上。

### 2. 独立子目录
非当前版本将自动构建到以其 `id` 命名的子文件夹中：
*   `v2（当前）` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. 粘性切换（路径保留）

`docmd` 在用户切换版本时会保留相对路径。例如用户正在阅读 `mysite.com/getting-started`，切换到 **v1** 后将自动跳转到 `mysite.com/v1/getting-started`（如果该页面存在），而不是回到首页。

### 4. 资源隔离
每个版本继承全局 `assets/` 目录，但 `docmd` 在构建过程中会对其进行隔离，防止样式泄露或版本冲突。

### 5. 版本级导航

每个版本都可以维护自身独立的导航结构。由于导航也与特定语言相关，`docmd` 会按以下优先级（从高到低）解析每个版本的导航：

1. **版本级 `navigation.json`：** （例如 `docs-v1/navigation.json` 或 `docs-v1/zh/navigation.json`）
2. **语言级 `navigation.json`：** （例如 `docs/zh/navigation.json`）
3. **全局配置：** `docmd.config.js` 中的 `config.navigation`

**智能死链接过滤：** 即使回退到共享的语言级或全局导航，`docmd` 也会自动过滤掉指向旧版本源文件夹中不存在的文件的侧边栏条目。确保用户切换到旧版本时不会遇到任何包含 404 文件的破损链接。

## 最佳实践

1. **语义化 ID**：使用简洁、URL 友好的 ID，如 `v1`、`v2` 或 `beta`。
2. **导航结构保持一致**：各版本之间保持一致的文件夹结构，以最大化「粘性切换」的效果。
3. **统一配置文件**：无需为每个版本单独准备配置文件，`docmd` 在一次构建过程中处理所有版本。