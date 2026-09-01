# SiteLens GA4 漏斗追踪计划

这份文档定义 SiteLens 当前 Phase 0 用来判断“免费分析是否带来付费报告”的 GA4 事件、触发条件和后台配置。

## 当前配置

- 工具：GA4
- 衡量 ID：`G-YNQ8J06W7D`
- 实现：Next.js `gtag.js` + `lib/analytics.ts`
- 页面浏览：由 GA4 配置自动收集
- 增强型衡量：已开启
- 全站 CTA：由根布局监听 `.nav-cta`、`.text-link` 和报告付款按钮
- 自定义事件：统一附带当前 `page_path`，便于按页面定位漏斗断点
- 隐私边界：不发送邮箱、完整 URL、报告 ID、支付凭证或卡信息
- 服务端事实层：D1 `analytics_events` 记录分析、报告交付、邮箱意向、Checkout 和支付解锁，不保存邮箱或完整 URL

## 漏斗事件

| 事件 | 触发条件 | 参数 | 用途 | 转化建议 |
| --- | --- | --- | --- | --- |
| `analyze_started` | 首页分析表单提交 | `page_path` | 衡量提交意图 | 可选 |
| `analyze_cancelled` | 用户在分析等待过程中点击 `Stop waiting` | `page_path` | 区分用户主动停止与请求失败 | 不标记 |
| `analyze_completed` | `/api/analyze` 成功返回报告 | `analysis_mode`, `page_path` | 衡量免费报告完成 | 标记 |
| `analyze_failed` | `/api/analyze` 返回错误或网络失败 | `status_code`, `page_path` | 定位分析链路失败 | 不标记 |
| `report_viewed` | 报告组件首次挂载 | `analysis_mode`, `page_path` | 衡量报告交付 | 不必标记 |
| `email_submitted` | `/api/upgrade` 成功保存升级请求 | `page_path` | 衡量邮箱收集/付费意图 | 标记 |
| `checkout_started` | 收到 Checkout URL 并跳转前 | `value`, `currency`, `page_path` | 衡量进入付款流程 | 不必标记 |
| `checkout_failed` | `/api/upgrade` 返回错误或网络失败 | `status_code`, `page_path` | 定位 Checkout 创建失败 | 不标记 |
| `payment_confirmed` | 用户返回报告页，轮询确认已付款 | `value`, `currency`, `page_path` | 诊断付款确认链路 | 不建议与解锁重复计为转化 |
| `payment_failed` | 用户返回报告页，轮询确认付款失败 | `value`, `currency`, `page_path` | 区分付款失败与回访缺失 | 不标记 |
| `deep_report_unlocked` | 报告页收到深度报告 | `value`, `currency`, `page_path` | 衡量付费交付完成 | 标记为核心转化 |
| `cta_clicked` | 全站主要 CTA 或报告付款按钮被点击 | `cta_type`, `destination`, `page_path` | 比较首页、内容页和价格页的引导效率 | 不必标记 |

## GA4 Admin 配置

建议在 Admin → Data display → Events 中将以下事件标记为 Key event：

1. `analyze_completed`：免费产品激活。
2. `email_submitted`：潜在付费线索。
3. `deep_report_unlocked`：核心付费转化。

`payment_confirmed` 保留为诊断事件，避免同一笔订单同时把“付款确认”和“报告解锁”计算成两个核心转化。

## 验证流程

1. 打开 GA4 DebugView。
2. 访问首页并提交一个可访问的测试网站。
3. 确认依次出现 `analyze_started`、`analyze_completed`、`report_viewed`。
4. 在分析等待过程中点击 `Stop waiting`，确认出现 `analyze_cancelled`，且不会被记录为付款 CTA。
5. 在报告页提交邮箱，确认出现 `email_submitted` 和 `checkout_started`。
6. 用一个不可访问的网站或临时关闭 Checkout 配置，确认失败流程出现 `analyze_failed` 或 `checkout_failed`，并检查 `status_code`。
7. 仅在允许的支付环境中完成一次付款回归，确认 `payment_confirmed` 和 `deep_report_unlocked`；失败订单应出现 `payment_failed`。
8. 在 Realtime 报告确认事件用户数与 DebugView 一致。

## 解释边界

付款事件当前通过用户返回原报告页后的客户端轮询确认触发。如果付款成功但用户没有返回 SiteLens，GA4 不会收到这两个客户端事件；D1/Waffo 记录仍是支付事实来源。若后续需要无回访也能统计收入，应再接入 GA4 Measurement Protocol，并将服务端 webhook 作为事件来源。

当前 D1 服务端事实事件会记录 `payment_confirmed` 和 `deep_report_unlocked`，因此即使用户没有回到 SiteLens，产品侧仍可从 D1 统计已确认的订单与报告交付。GA4 仍保留客户端事件，用于用户路径和来源分析。

当前没有采集邮箱或完整 URL，因此不需要为漏斗事件创建自定义用户维度。UTM 参数由 GA4 自动识别，后续发布 X 或 SEO 链接时统一使用 `utm_source`、`utm_medium`、`utm_campaign`。
