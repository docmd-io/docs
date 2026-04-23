---
title: "生成 AI 就绪的数据 (llms.txt 及其他)"
description: "通过 llms.txt 标准就绪。"
---

## 问题
客户端渲染（SPA）和组件化阻止 AI 获取全局文本资产。

## 为什么重要
全文字典提取是确保 Copilot 之类工具可以顺畅编写业务逻辑的必将基建。

## 方法
依靠默认激活的标准化支持 `@docmd/plugin-llms` 生成所需物料。

## 实施
在配置文件指定 `fullContext: true` 产出巨大的聚合文件，而局部的隐藏测试页面通过 yaml 封堵 `llms: false`。

## 权衡
针对大型全站的拼接输出文件会高达 10MB 的文本流量。
