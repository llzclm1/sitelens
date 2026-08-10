# SiteLens 路由上下文

项目使用 Next.js App Router，没有独立 Router 配置文件。

| URL | 文件 | 布局/说明 |
|---|---|---|
| `/` | `app/page.tsx` | 根布局；营销首页、URL 分析表单、Growth Framework 和 Teardown 入口 |
| `/report/{id}` | `app/report/[id]/page.tsx` | 根布局；服务端读取报告后交给 `components/ReportClient.tsx` |
| `/teardowns` | `app/teardowns/page.tsx` | 根布局；公开 Teardown 列表 |
| `/teardowns/stripe` | `app/teardowns/stripe/page.tsx` | 根布局；Stripe 首页公开分析 |
| `/privacy` | `app/privacy/page.tsx` | 根布局；隐私说明 |
| `/terms` | `app/terms/page.tsx` | 根布局；服务条款 |
| `/robots.txt` | `app/robots.ts` | Next.js metadata route |
| `/api/analyze` | `app/api/analyze/route.ts` | URL 分析 API |
| `/api/reports/{id}` | `app/api/reports/[id]/route.ts` | 报告读取 API |
| `/api/upgrade` | `app/api/upgrade/route.ts` | Waffo Checkout Session API |
| `/api/payments/{id}` | `app/api/payments/[id]/route.ts` | 支付状态 API |
| `/api/webhooks/waffo` | `app/api/webhooks/waffo/route.ts` | Waffo Webhook 接收与验签 |

## 页面渲染概要

- 首页在客户端管理 URL、产品、受众、提交状态和分析过程展示。
- 报告页由服务端读取公开报告，客户端负责支付返回轮询、深度报告展示和升级表单。
- Teardown 页面为静态内容，使用与首页相同的内联导航和页脚样式。

