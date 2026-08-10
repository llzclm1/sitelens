# SiteLens 组件上下文

## 组件库判断

- 框架：Next.js 15 App Router + React 19 + TypeScript
- UI 组件库：无，当前使用页面内 JSX 和原生 HTML 控件
- 样式：`app/globals.css` 中的自定义 CSS 变量和类名
- 共享 UI 原语目录：不存在

## 现有组件

`components/ReportClient.tsx` 是报告页专用组件，不是跨页面共享原语；完整源码已在 `pages.md` 的 `/report/{id}` 依赖树中标记，设计报告页时应直接传入该文件作为上下文。

当前没有可独立提取的 Button、Card、Input、Dialog、Tabs 或 Navigation 组件。首页和 Teardown 页面将导航、表单、卡片和页脚以内联 JSX 实现。

