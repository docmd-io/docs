---
title: "客户端事件"
description: "接入 docmd SPA 生命周期，为文档添加交互特性。"
---

docmd 使用轻量级的单页应用（SPA）路由来提供即时页面切换。由于浏览器在导航时不会完整刷新，依赖 `DOMContentLoaded` 的脚本不会被重新执行。

为此，docmd 会派发自定义的生命周期事件，您可以在 `customJs` 文件中监听它们。

## `docmd:page-mounted`

每当一个新页面被成功获取并注入到 DOM 后，就会派发该事件。

### 用法

为 `document` 对象添加一个监听器，以便重新初始化第三方库或触发自定义动画。

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const { url } = event.detail;
  console.log(`已导航至：${url}`);
});
```

### 事件详情 (`event.detail`)

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `url` | `String` | 刚刚挂载的页面的绝对 URL。 |

## 最佳实践

1.  **幂等性**：请确保您的初始化逻辑可在同一页面上被安全地多次调用，或在下次导航前清理干净。
2.  **全局作用域**：通过 `customJs` 加入的脚本运行在全局作用域。请使用 IIFE（Immediately Invoked Function Expression）来避免污染 `window` 对象。
3.  **清理**：如果您的脚本会添加全局事件监听（例如 `window.onresize`），建议追踪当前路径，在用户导航离开时将其移除。