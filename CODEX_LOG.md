# SiteLens 修改日志

## 2026-08-10

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
