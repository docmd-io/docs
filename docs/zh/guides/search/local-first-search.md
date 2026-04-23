---
title: "以本地优先构建您的检索缓存与搜索引擎"
description: "面向本地引擎优化的全操作指南。"
---

## Problem
本地浏览器跑 WASM 时具有很严重的缓存和硬件运行内存（RAM）天花板限制封顶限制。

## Warum es wichtig ist
突破 2GB 容量不仅耗电骤增也更容易被移动设备的后台回收。

## Ansatz
缩减进入索引用地的庞大载体文字本体前置过滤拦截。不再让全文字节直接进腹内。

## Implementation
借助 docmd 处理过程将 HTML, Callout 完全剔骨，同时甚至可以通过 `excludeSelectors` 关闭巨大重复的代码块 json 对象避免污染检索树。

## Trade-offs
你无法针对嵌套特别深的某个生僻环境参数完成对目标文件的直接跳入寻迹行为匹配映射了。
