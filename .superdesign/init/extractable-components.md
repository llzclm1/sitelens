# SiteLens 可提取组件目录

当前项目没有独立的跨页面布局组件，导航、页脚和表单均以内联 JSX 实现。

## Layout Components

暂无可提取的 NavBar、Header、Footer 或 AppShell。公共样式通过 `app/globals.css` 的 `.topbar`、`.wordmark`、`.nav-cta`、`.footer` 和 `.shell` 类名共享。

## Basic Components

暂无可提取的跨页面 Button、Card、Input、Badge 或 Tabs 原语。

## 页面专用组件

- `ReportClient`
  - Source：`components/ReportClient.tsx`
  - Category：page-specific
  - Description：报告页的客户端状态、Evidence Report、付款升级和深度报告展示。
  - 不建议在没有拆分交互状态前提下提取为通用组件。

