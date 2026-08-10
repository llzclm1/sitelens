# SiteLens 修改日志

## 2026-08-10

- 接入 Qwen `qwen3.6-flash` 视觉增强：新增 Cloudflare Browser Run 截图 binding、首屏 JPEG Base64 转换和 Qwen OpenAI-compatible JSON refinement；未配置 binding 或调用失败时保持规则分析/DeepSeek fallback。
- 完成生产收尾验收：删除误用 API Key 作为名称的旧 Secret，确认 `QWEN_API_KEY` 有效；含图片页面返回 `mode=ai`；首页、robots.txt、sitemap.xml、GA4 和 GSC 标签在线正常。Waffo 生产凭证和商品仍待账户侧配置。

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
