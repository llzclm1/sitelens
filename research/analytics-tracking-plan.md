# SiteLens GA4 漏斗追踪计划

这份文档定义 SiteLens 当前 Phase 0 用来判断“免费规则分析是否带来真实激活、分享和复访”的 GA4 事件、触发条件和后台配置。

> 当前决策（2026-09-22）：收费、邮箱、Checkout、支付确认和深度报告解锁已从产品运行路径移除。文档中旧的支付事件仅保留作历史记录，不应再配置、触发或作为当前转化目标。

## 当前配置

- 工具：GA4
- 衡量 ID：`G-YNQ8J06W7D`
- 实现：Next.js `gtag.js` + `lib/analytics.ts`
- 页面浏览：由 GA4 配置自动收集
- 增强型衡量：已开启
- 全站 CTA：由根布局监听 `.nav-cta`、`.text-link` 和分析/分享入口
- 自定义事件：统一附带当前 `page_path`，便于按页面定位漏斗断点
- 客户端上下文：自定义事件附带经过白名单过滤的 UTM、首个落地路径、搜索来源类别和 acquisition channel；不保存完整来源 URL
- 隐私边界：不发送邮箱、完整 URL、报告 ID、支付凭证或卡信息
- 服务端事实层：D1 `analytics_events` 记录分析和报告查看，不保存邮箱或完整 URL
- 质量信号边界：`qualified_session` 只是“页面可见 + 有交互 + 约 15 秒”的方向性信号，不代表已确认的人类用户

## 漏斗事件

| 事件 | 触发条件 | 参数 | 用途 | 转化建议 |
| --- | --- | --- | --- | --- |
| `analyze_started` | 首页分析表单提交 | `page_path` | 衡量提交意图 | 可选 |
| `analysis_form_started` | 用户首次聚焦分析表单字段 | `field_name`, `page_path` | 衡量表单开始率与提交前流失 | 不标记 |
| `analyze_cancelled` | 用户在分析等待过程中点击 `Stop waiting` | `page_path` | 区分用户主动停止与请求失败 | 不标记 |
| `analyze_completed` | `/api/analyze` 成功返回报告 | `analysis_mode`, `page_path` | 衡量免费报告完成 | 标记 |
| `analyze_failed` | `/api/analyze` 返回错误或网络失败 | `status_code`, `page_path` | 定位分析链路失败 | 不标记 |
| `report_viewed` | 报告组件首次挂载 | `analysis_mode`, `page_path` | 衡量报告交付 | 不必标记 |
| `cta_clicked` | 全站主要 CTA 或报告付款按钮被点击 | `cta_type`, `destination`, `page_path` | 比较首页、内容页和价格页的引导效率 | 不必标记 |
| `qualified_session` | 页面可见且发生交互后持续约 15 秒 | `engagement_seconds`, `interaction_count`, `page_path` | 作为 Cloudflare 请求之外的方向性质量信号 | 不标记 |
| `organic_landing_view` | 从搜索来源或 `utm_medium=organic` 首次进入会话 | `search_engine`, `page_path` | 衡量搜索落地，而不是把请求量当搜索用户 | 不标记 |

## GA4 Admin 配置

建议在 Admin → Data display → Events 中将以下事件标记为 Key event：

1. `analyze_completed`：产品激活。
2. `report_shared`：自然分享信号（如需要）。

## 验证流程

1. 打开 GA4 DebugView。
2. 访问首页并提交一个可访问的测试网站。
3. 确认依次出现 `analyze_started`、`analyze_completed`、`report_viewed`。
4. 在分析等待过程中点击 `Stop waiting`，确认出现 `analyze_cancelled`，且不会被记录为付款 CTA。
5. 在报告页复制或原生分享，确认出现 `report_shared`，且不发送邮箱、完整 URL 或支付参数。
6. 用一个不可访问的网站验证 `analyze_failed` 和 `status_code`。
7. 在 Realtime 报告确认事件用户数与 DebugView 一致。
8. 使用带 `?debug_mode=1` 的测试链接时，在 DebugView 验证事件参数；测试事件不得写入业务转化结论。

## 解释边界

当前没有付款事件。历史订单表和旧支付记录不参与当前产品分析；若未来重新启用商业化，需单独设计新的事件契约和验收流程。

当前没有采集邮箱或完整 URL，因此不需要为漏斗事件创建自定义用户维度。UTM 参数由 GA4 自动识别，后续发布 X 或 SEO 链接时统一使用 `utm_source`、`utm_medium`、`utm_campaign`。

## 本轮质量与搜索实验

- `analysis_form_started` 用来区分“进入页面但没有开始填写”和“填写后没有提交”。
- `qualified_session` 只在可见页面发生交互并持续约 15 秒后发送，帮助将 Cloudflare 的请求/独立访客数据与可观察的页面参与信号对照；它不是机器人识别，也不是唯一用户证明。
- `organic_landing_view` 用于识别搜索或明确标记为 organic 的落地。当前只新增一个广泛意图页面 `/why-websites-dont-convert` 作为搜索需求实验，不批量生成同义页面。
- 查询实验的成功标准是：出现非品牌查询、产生自然搜索落地、并至少有一部分落地访问进入 `analysis_form_started` 或 `analyze_started`，而不是只看收录数量。
