# SiteLens 修改日志

## 2026-08-11

- 根据 Teardowns 页底部截图定位到 `.teardown-disclaimer` 的 `margin: 0 0 32px` 覆盖了 `.shell` 的水平居中，导致免责声明背景和文字左贴页面；改为 `margin: 0 auto 32px`，使其与正文和页脚使用同一内容边界。
- 将 Teardowns 单一右侧卡片扩展为 4 张案例卡片：保留 Stripe 公开案例，新增 AI workspace、B2B service、Creator tool 三个明确标注的示例；不改变页面主结构，改用紧凑 2×2 网格、卡片元信息和移动端单列。
- 补全 GA4 漏斗埋点：在首页提交、分析成功、报告挂载、升级请求成功、Checkout 跳转、支付状态确认和深度报告加载处发送 7 个自定义事件；仅发送分析模式等必要上下文，不发送邮箱、完整 URL 或支付敏感信息。GA4 Admin 转化标记和 DebugView 回归仍待完成。
- 按 analytics skill 补充 `research/analytics-tracking-plan.md`，明确事件表、转化选择、DebugView 验证流程、无 PII 约束以及付款事件依赖用户回访的边界。
- 将分析追踪扩展到整站：新增 `SiteAnalytics` 根布局监听器，统一追踪 `.nav-cta`、`.text-link` 和报告页付款按钮的 `cta_clicked`，记录 CTA 类型、规范化目标路径和当前页面路径。

## 2026-08-10

- 初始化 Superdesign 设计上下文：补齐 `.superdesign/init/` 六份文件和 `.superdesign/design-system.md`，记录现有 SiteLens 的页面结构、路由、CSS token、组件语法与设计约束；随后创建首页复现稿并分支生成 Audit Workspace、Teardown Magazine 两种方向，未将设计稿直接实现为业务代码。
- 完成 AI SEO 审计与第一轮实施：线上首页当时已有可抓取的 SSR 文本、robots 和 sitemap，但没有 JSON-LD，`/llms.txt` 返回 404，sitemap 只有现有营销/Teardown/法律页。新增 Organization/WebSite、FAQPage、Product/Offer JSON-LD；新增 `/website-review`、`/pricing`、`public/llms.txt`、`public/pricing.md`；robots 禁止 `/api/` 抓取，sitemap 加入新内容。`npm run typecheck` 和 `npm run build` 通过；待发布后做线上验收和多平台查询基线。
- AI SEO 更新部署收尾：OpenNext 生产构建完成，Cloudflare Worker `sitelens` 发布成功；线上新增页面和机器可读文件返回 200，首页、Website Review 和 Pricing 页面 HTML 含 Organization/WebSite、FAQPage 或 Product/Offer JSON-LD。Search Console sitemap 重新提交和多平台 AI 可见性基线仍待完成。
- 根据 Pricing 页截图修复页脚横向溢出：为 flex 子项添加 `min-width: 0`、最大宽度和 `overflow-wrap`，在窄视口将页脚右侧内容左对齐；类型检查、Next 构建、OpenNext 构建通过，Worker 已重新发布，生产 CSS 已确认包含修复规则。
- 接入 Qwen `qwen3.6-flash` 视觉增强：新增 Cloudflare Browser Run 截图 binding、首屏 JPEG Base64 转换和 Qwen OpenAI-compatible JSON refinement；未配置 binding 或调用失败时保持规则分析/DeepSeek fallback。
- 完成生产收尾验收：删除误用 API Key 作为名称的旧 Secret，确认 `QWEN_API_KEY` 有效；含图片页面返回 `mode=ai`；首页、robots.txt、sitemap.xml、GA4 和 GSC 标签在线正常。Waffo 生产凭证和商品仍待账户侧配置。
- 发现 GA4 后台未收到数据，改用 Next.js `Script` 的 `afterInteractive` 初始化方式并重新发布；生产首页浏览器无前端错误。Pancake `/merchant/dashboard` 动态页面在内置浏览器连续超时，未盲目提交商品或付款操作。
- 在 Pancake 生产模式创建 `SiteLens Deep Growth Report` 一次性商品，价格 `$29 USD`，Product ID 为 `PROD_28rexkec6xEqGx2QMHEcJi`；将 Product ID 写入 `wrangler.jsonc`，未混用账号中已有的 `mingora-production` API 密钥。
- 创建 SiteLens 专用 Waffo 生产 API 密钥，并将 `WAFFO_MERCHANT_ID`、`WAFFO_PRIVATE_KEY`、`WAFFO_WEBHOOK_PUBLIC_KEY` 安全写入 Cloudflare Secrets；在 Pancake 新增 `https://sitelens.win/api/webhooks/waffo` 生产 Webhook，保留原有 `mingora.cc` Webhook。待完成支付回归。
- 按 product-design 流程完成阶段一洞察、阶段二功能/架构/流程设计和阶段三四维审查；修正方向性评分、目标必选、付费边界、Webhook 幂等、unknowns 和邮箱用途，并生成 `outputs/SiteLens-产品需求文档-V1.0.md`，待用户确认。

- 从文档评审进入 Phase 0 开发。
- 实现 URL 抓取、证据规则分析、免费报告、报告页与深度报告请求。
- 增加可选 DeepSeek JSON 增强；未配置密钥时保持确定性规则模式。
- 完成 `tsc --noEmit`、`next build` 与本地 API 冒烟测试。
- 明确当前尚未配置生产支付凭证、持久化数据库、Playwright 截图与自动改站。
- 确认 `pancake.waffo.ai` 是商户后台；按 Waffo SDK 的 Checkout Session + webhook 模式接入 SiteLens。
- 检查 Cloudflare：`sitelens.win` 区域已激活，但没有 DNS 记录或 SiteLens Pages 项目。
- 创建 GitHub 仓库 `llzclm1/sitelens` 并推送 `main`。
- 加入 `@opennextjs/cloudflare`、Wrangler 与 Worker 配置，升级 Next.js 到 `15.5.21`，本地 OpenNext 构建通过。
- 通过 Wrangler 将 OpenNext Worker `sitelens` 发布到 Cloudflare，并创建 `sitelens.win/*` Route。
- Cloudflare 访问返回 1034；原因是 Route 需要已有的 Proxied DNS 记录，而当前 token 没有 `zone:edit`。
- 移除旧的 OpenAI Sites 自定义域绑定，生产部署目标改为 Cloudflare Worker。
- 创建 Cloudflare D1 数据库 `sitelens`，加入 `migrations/0001_initial.sql`，并绑定为 Worker 的 `DB`。
- 将报告、升级请求和支付意向从运行期内存迁移到 D1；使用 `getCloudflareContext({ async: true })` 访问线上 binding。
- 重新发布 Worker，验证 `/api/analyze` 返回 201、`/api/reports/{id}` 跨请求返回 200，升级接口能读取 D1 报告并把未配置 Waffo 的失败状态写入 D1。
- 完成首页视觉重设计：移除 Hero 假报告卡，改为不对称图片 Hero、编辑型版式、chartreuse 单强调色和完整暗色 token。
- 添加自托管 `@fontsource-variable/geist` 与 `@fontsource-variable/geist-mono`，修复 Google Fonts 外网构建依赖。
- 用 Playwright 验收桌面、390px 手机、暗色模式和无横向溢出；新版 Worker `e2dee813-3381-499e-96ac-e042d2b304e9` 已发布，线上首页返回 200，已有报告 API 返回 200。
- 按 humanizer 规则调整首页与 metadata 文案：去掉口号式短句、抽象营销表达和模板化否定句，改为直接说明页面分析如何帮助用户；未新增事实、数字或功能承诺。
- 文案更新通过 `npm run typecheck` 与 `NEXT_PUBLIC_SITE_URL=https://sitelens.win npm run open:build`，并发布 Worker 版本 `a44682f5-d610-4f46-9f3d-13583f877c7c`；线上首页返回 200，新文案已验证生效。
- 落地最小信任闭环：加入五步 SiteLens Growth Framework、提交时的透明分析步骤、报告中的 Evidence Layer（为什么重要、页面证据、怎么改、改写方向），并公开一个基于 Stripe 官方首页的定性 Teardown；没有编造转化率、Benchmark 或人工复核承诺。
- 更新通过类型检查和 OpenNext 生产构建；Cloudflare Worker 版本 `6f8cde0f-a937-49ac-8228-8e835c419745` 已发布，首页、`/teardowns`、`/teardowns/stripe/` 和已有报告接口均返回 200。
- 按 humanizer 规则清理首页、报告页和 Teardown 的可见文案：减少口号式短句、抽象表达、尾部否定和规则化三段式句型；保留原有事实、数字、日期、来源链接和产品边界。
- 文案更新通过 `npm run typecheck` 和 OpenNext 生产构建；Cloudflare Worker 版本 `28a137fc-0b30-4628-97ba-6f5b37ce489b` 已发布，首页、Stripe Teardown 和已有报告接口均返回 200。
- 创建 SiteLens GA4 媒体资源和网站数据流，衡量 ID 为 `G-YNQ8J06W7D`；首页加入 GA4 代码，增强型衡量在 GA4 中保持开启。
- 创建并完成 `https://sitelens.win/` 的 Google Search Console HTML 标记验证；发布 `robots.txt` 和静态 `sitemap.xml`，并在 Search Console 提交 sitemap。
- 修复 OpenNext 生产首页未输出 GA4/GSC 标签及 sitemap 404 的问题：改用 layout 原生 head 标签和 `public/sitemap.xml`；类型检查、OpenNext 构建通过，Cloudflare Worker 版本 `6a2d9d81-4d68-4819-bcd9-e3245e621041` 已发布。
- 对抗式检查发现公开分析接口缺少限流、付款环境仍为 test、付款后没有深度报告交付、构建变量可能回退以及缺少安全头；本轮逐项修复。
- 新增 `0002_hardening.sql`，远程 D1 已创建 `rate_limit_counters` 和 `deep_reports`；分析/升级请求增加 32 KB body 上限和 D1 IP 限流。
- 加强 URL 私网/保留网段/IPv6 检查；新增 HSTS、CSP、X-Frame-Options、nosniff、Referrer-Policy 和 Permissions-Policy。
- Waffo 配置切换为 `prod`；webhook 增加环境、订单元数据、报告归属、USD $29、买家邮箱校验，并在已付款后生成站内 Deep Report。真实商户凭证仍待用户配置。
- 新增 `/privacy`、`/terms`，报告 ID 改为完整 UUID；线上发布并验证安全头、sitemap、GA4/GSC 标签和隐私页。
