# Codex 交接说明

本项目当前处于 SiteLens Phase 0 可运行原型阶段。SiteLens 是长期产品名，AI Website Critic 是此前 MVP 研究名；长期路线图在 `SITELENS-LONG-TERM-ROADMAP.md`。

## 当前状态

- 已整理主文档：`PRD-ai-website-critic.md`
- 已完成竞品 quick scan：`research/competitor-scan.md`
- 已完成 PRD 评审：`research/prd-review.md`
- 已完成技术方案确认：`research/technical-decision.md`
- 已完成决策备忘录：`research/decision-memo.md`
- 已整理长期路线图：`SITELENS-LONG-TERM-ROADMAP.md`
- 已按 product-design 流程完成用户/JTBD、功能收敛、架构、流程和设计审查，并生成最终 PRD：`outputs/SiteLens-产品需求文档-V1.0.md`；当前待产品负责人通读确认。
- 已实现 Phase 0 原型：`app/`、`components/`、`lib/`
- 已加入运行说明：`README.md`
- 结论：先做小规模付费验证，不立即进入完整 SaaS 开发。
- 当前原型已能完成：URL 提交 → 首页抓取 → 免费三问题报告 → 深度报告请求。
- 首页已完成一轮视觉重设计：证据驱动的编辑型版式、单一 chartreuse 强调色、不对称真实图片 Hero、Geist 自托管字体和暗色系统。
- 首页和 metadata 已完成一轮文案自然化：减少口号式短句与模板化表达，改为更直接的用户语言，未新增事实或承诺。
- 已加入最小信任闭环：SiteLens Growth Framework、提交时的分析过程、报告 Evidence Layer，以及公开 Stripe Teardown 案例。
- 信任体系文案已完成 humanizer 处理：改掉短句堆叠、抽象口号和过度营销表达，保留事实、数字、来源和功能结构。
- 生产环境已接入 Cloudflare D1，持久化报告、升级请求和支付意向；本地 `next dev` 无 Cloudflare binding 时才使用内存 fallback。
- 已加入 Waffo Pancake Checkout Session 与 webhook 验证路由，但仍需在 Pancake 后台创建产品并配置密钥。
- Qwen `qwen3.6-flash` 已接入为视觉增强；线上有 `QWEN_API_KEY` 时，Cloudflare Browser Run 截取首屏并以 Base64 图片发送给 Qwen，失败时自动退回规则分析或 DeepSeek。
- 已删除 Cloudflare 中误用 API Key 作为名称的旧 Secret，只保留正确的 `QWEN_API_KEY`；生产含图片页面已验证返回 `mode=ai`。
- GitHub 仓库已建立并推送：`https://github.com/llzclm1/sitelens`。
- 已加入 Cloudflare OpenNext/Workers 部署配置，Worker 名称为 `sitelens`，并已发布 `sitelens.win/*` Route。
- `sitelens.win` 已通过 Cloudflare Proxied A 记录 `@ → 192.0.2.0` 接入 Worker Route，首页和 API 已验证返回正常。
- 之前的 OpenAI Sites 预览部署不再承担生产域名，旧的自定义域绑定已移除。
- 部署环境已写入非敏感变量：`WAFFO_ENVIRONMENT=prod`、`WAFFO_RETURN_BASE_URL`、`NEXT_PUBLIC_SITE_URL`、Qwen 视觉模型配置。
- 已创建 SiteLens GA4 媒体资源和网站数据流，衡量 ID 为 `G-YNQ8J06W7D`，增强型衡量已开启；线上首页已输出 GA4 代码。
- 已创建并验证 Google Search Console URL 前缀资源 `https://sitelens.win/`；`robots.txt` 和 `sitemap.xml` 已上线，sitemap 已提交。
- 已为分析、升级和 webhook 增加请求体上限；分析和升级按 Cloudflare IP 使用 D1 计数限流，并补充保守的私网、保留地址和 IPv6 SSRF 拦截。
- 已加入安全响应头、隐私页和条款页；报告 ID 改为完整 UUID，避免短 ID 碰撞和枚举风险。
- 已加入 `deep_reports` 交付表：签名、环境、金额、币种、产品元数据和报告归属校验通过后，付款 webhook 会生成可在原报告页解锁的深度报告。
- Waffo 部署环境已切换为 `prod`；Pancake 已创建销售中的 `$29` 一次性商品，Product ID 为 `PROD_28rexkec6xEqGx2QMHEcJi`，并已写入 Worker 非敏感变量。生产商户 ID、私钥、Webhook 公钥已写入 Cloudflare Secrets，Pancake 已新增 `https://sitelens.win/api/webhooks/waffo` 生产 Webhook，未覆盖原有 Mingora Webhook；仍需完成支付回归。

## 已验证

- `next build` 通过。
- `npm run open:build` 通过，OpenNext Worker 产物生成成功。
- 首页响应 200。
- `localhost` 私网地址被抓取层拒绝。
- `https://example.com` 能生成免费报告，报告页与升级请求接口可用。
- `https://pancake.waffo.ai` 已确认是商户后台，不作为客户付款地址。
- 已验证分析写入 D1、跨请求读取报告，以及升级失败状态写入 D1。
- 已用 Playwright 验收桌面首屏、390px 手机视口、暗色模式、无横向溢出和浏览器错误。
- 文案更新后已重新完成类型检查、OpenNext 生产构建，并验证线上首页返回 200 且新文案已生效。
- 信任体系更新后已验证首页、`/teardowns`、`/teardowns/stripe/` 和已有报告接口返回 200；公开报告现包含问题影响、页面证据、修复建议和改写方向。
- 文案更新后已重新完成类型检查、OpenNext 生产构建，并验证线上首页、Stripe Teardown 和已有报告接口返回 200。
- GA4/GSC 接入后已完成类型检查、OpenNext 生产构建和 Cloudflare 发布；线上首页含 GA4 衡量代码及 GSC 验证标签，`robots.txt` 与 `sitemap.xml` 返回 200。
- 对抗式修复后已完成远程 D1 `0002_hardening.sql` 迁移、类型检查、OpenNext 生产构建和 Cloudflare 发布；线上响应包含 HSTS、CSP、X-Frame-Options、nosniff 等安全头。

## 下一步

先完成生产闭环，再执行 SiteLens 路线图 Phase 0 的 5–10 个目标用户真实测试：

1. 报告是否具体、可信、可执行。
2. 用户是否愿意留下邮箱。
3. 已创建 SiteLens 专用生产 API 密钥并配置商户凭证、Webhook 公钥和生产 Webhook；下一步完成付款回归。
4. 用户是否愿意购买一次性 Deep Growth Report。
5. 先人工复核 Qwen 的截图分析质量、延迟和成本，再决定是否切换付费报告到 `qwen3.7-plus`。
6. 接入真实支付后再扩大流量。
7. 为公开 Teardown 增加受控截图和页面快照存档，再扩展更多真实案例。
8. 等待 Search Console 完成 sitemap 首次抓取，并在 GA4 数据流开始接收数据后检查实时报告。
9. 在 Waffo 创建并配置生产 `$29` 商品、商户凭证和 webhook 公钥后，完成一次真实支付回归；当前代码只完成订单校验和站内深度报告交付。

在出现真实购买、确认主 ICP 和确认视觉方案前，不开始完整产品开发。

## 外部配置待办

- 已在 Pancake 生产模式创建 `$29` 一次性产品：`PROD_28rexkec6xEqGx2QMHEcJi`。
- 已将 Waffo 商户 ID、私钥和 webhook 公钥写入 Cloudflare Secrets。
- 已将 `https://sitelens.win/api/webhooks/waffo` 新增为 Pancake 生产 webhook，原有 `mingora.cc` webhook 保持不变。
- 已在 Cloudflare 创建 `@ → 192.0.2.0` 的 Proxied A 记录，Route 已生效。
- 在 Cloudflare Browser Run 页面确认截图额度和浏览器用量；当前只取 1440×1200 首屏，不保存截图到 D1。
- 生产首页、`robots.txt`、`sitemap.xml`、GA4 衡量 ID 和 GSC 验证标签已重新在线验证；Search Console/GA4 后台数据仍需等待平台处理。
- GA4 初始化已改用 Next.js `Script` 的 `afterInteractive` 策略并重新发布；生产首页无前端错误，GA4 后台仍需等待真实事件显示。
- Pancake 商户后台已在内置浏览器稳定打开并完成生产商品、SiteLens 专用 API 密钥和生产 webhook 配置；Cloudflare Secret 名称已核对，未读取或输出密钥内容。
