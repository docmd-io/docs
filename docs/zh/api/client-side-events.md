---
title: "客户端事件"
description: "接入 docmd SPA 生命周期，添加交互式功能。"
---

`docmd` 使用轻量级单页应用（SPA）路由器，提供即时页面切换。由于浏览器在导航时不执行完整刷新，依赖 `DOMContentLoaded` 的脚本将不会重新执行。

为此，`docmd` 分发自定义生命周期事件，你可以在 `customJs` 文件中监听这些事件。

## `docmd:page-mounted`

每当新页面成功获取并注入到 DOM 时，此事件就会被分发。

### 用法

在 `document` 对象上添加监听器，以重新初始化第三方库或触发自定义动画。

```javascript
document.addEventListener('docmd:page-mounted', (event) => {
  const { url } = event.detail;
  console.log(`已导航至：${url}`);

  // 重新初始化组件
  // 示例：Prism.highlightAll();
});
```

### 事件详情（`event.detail`）

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `url` | `String` | 刚刚挂载的页面的绝对 URL。 |

## 最佳实践

1.  **幂等性**：确保你的初始化逻辑可以在同一页面上安全多次调用，或在下次导航前妥善清理。
2.  **全局作用域**：通过 `customJs` 添加的脚本在全局作用域中执行。使用 IIFE（立即调用函数表达式）避免污染 `window` 对象。
3.  **清理**：如果脚本添加了全局事件监听器（如 `window.onresize`），考虑追踪当前路径，以便用户离开时将其移除。
