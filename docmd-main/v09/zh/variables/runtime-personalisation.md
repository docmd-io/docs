---
title: 客户端运行时与个性化
description: 使用 docmd-runtime.js 客户端 SDK 与 window.docmd 实现无刷新实时用户会话、交互式代码块及动态个性化。
---

# 客户端运行时与个性化

docmd 内置了轻量级无头（Headless）客户端运行时脚本 `docmd-runtime.js`，该脚本会自动注入到所有布局模板中（包括默认模板以及 `summer` 等自定义主题）。

运行时在全局暴露了 `window.docmd` 浏览器 API，允许您根据用户登录状态、选中的开发环境或表单输入实时更新变量，且无需重新加载页面。

## 声明动态变量

在 `docmd.config.json` 中声明哪些变量键属于动态响应式变量：

```json
{
  "variables": {
    "dynamic": [
      "user.name",
      "user.apiKey",
      "selectedProject",
      "activeRegion"
    ]
  }
}
```

当 docmd 构建页面时，任何标记为动态的变量（或以 `user.` 开头的变量）均会被包裹在响应式 DOM 标记中：

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## 浏览器 JavaScript API：`window.docmd`

客户端运行时提供了直观友好的 API：

### 设置变量：`docmd.var.set()`

在当前页面和所有代码块中实时更新变量：

```javascript
// 设置单个变量
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// 同时更新多个变量
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'cn-north-1'
});
```

DOM 中所有的 `<span data-docmd-var="...">` 元素以及代码块中的对应占位符会立即更新。

### 获取变量：`docmd.var.get()`

读取指定变量的当前有效值：

```javascript
const key = window.docmd.var.get('user.apiKey');
console.log('当前激活的 API 密钥:', key);
```

### 查看变量列表：`docmd.var.list()`

检查当前注册的所有运行时变量：

```javascript
const allVars = window.docmd.var.list();
console.table(allVars);
```

### 重新水合 DOM：`docmd.var.sync()`

如果您动态插入了 HTML 或通过单页客户端路由进行了页面跳转，可直接调用 `docmd.sync()` 重新挂载变量标记：

```javascript
window.docmd.var.sync();
```

## 交互式代码块示例

个性化最实用的场景之一是允许读者使用自己的 API 密钥快速测试接口：

```markdown
### 接口鉴权调用

在终端中执行以下命令：

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'YOUR_API_KEY' }}"
```
```

您可以在文档门户中嵌入一个简单的输入框：

```html
<input 
  type="text" 
  id="apiKeyInput" 
  placeholder="在此粘贴您的 API Key..."
  oninput="window.docmd.var.set('user.apiKey', this.value || 'YOUR_API_KEY')"
/>
```

当读者在输入框中键入密钥时，curl 命令代码块中的参数会实时联动改变！

## 监听变量变化

您可以监听运行时事件总线派发的变更通知：

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`变量 ${key} 已变更为:`, value);
});
```

## 跨窗口同步（iFrame 与门户系统）

若您的文档嵌入在主应用的 iframe 中，外层宿主系统可以通过 `postMessage` 批量同步变量：

```javascript
// 来自宿主应用窗口：
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

`docmd-runtime.js` 中的消息监听器将自动接收并完成整页变量的即时更新。

## 架构：为什么 `docmd-runtime.js` 具备普适性

`docmd-runtime.js` 在设计上严格剥离了布局样式、视觉主题和界面动画。它仅包含状态机、变量注册表、事件总线以及 DOM 注水逻辑。

因此，它可以安全地引入到任何自定义主题或第三方模板中，不会与页面既有脚本冲突，也不会引发不必要的性能抖动。
