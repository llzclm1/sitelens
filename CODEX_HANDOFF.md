# Codex 交接说明

本项目当前处于 SiteLens Phase 0 可运行原型阶段。SiteLens 是长期产品名，AI Website Critic 是此前 MVP 研究名；长期路线图在 `SITELENS-LONG-TERM-ROADMAP.md`。

## 当前状态

- 已整理主文档：`PRD-ai-website-critic.md`
- 已完成竞品 quick scan：`research/competitor-scan.md`
- 已完成 PRD 评审：`research/prd-review.md`
- 已完成技术方案确认：`research/technical-decision.md`
- 已完成决策备忘录：`research/decision-memo.md`
- 已整理长期路线图：`SITELENS-LONG-TERM-ROADMAP.md`
- 已实现 Phase 0 原型：`app/`、`components/`、`lib/`
- 已加入运行说明：`README.md`
- 结论：先做小规模付费验证，不立即进入完整 SaaS 开发。
- 当前原型已能完成：URL 提交 → 首页抓取 → 免费三问题报告 → 深度报告请求。
- 当前使用运行期内存存储；付款状态在进程重启后会丢失，生产上线前必须换成持久化数据库。
- 已加入 Waffo Pancake Checkout Session 与 webhook 验证路由，但仍需在 Pancake 后台创建产品并配置密钥。
- DeepSeek 是可选增强；无 `DEEPSEEK_API_KEY` 时使用证据规则生成初稿。
- 当前没有 GitHub 远程仓库。
- Cloudflare `sitelens.win` 区域已激活，但当前没有 DNS 记录，也没有 SiteLens Pages 项目；未执行指向未知目标的 DNS 写入。

## 已验证

- `tsc --noEmit` 通过。
- `next build` 通过。
- 首页响应 200。
- `localhost` 私网地址被抓取层拒绝。
- `https://example.com` 能生成免费报告，报告页与升级请求接口可用。
- `https://pancake.waffo.ai` 已确认是商户后台，不作为客户付款地址。

## 下一步

执行 SiteLens 路线图 Phase 0 的 5–10 个目标用户真实测试，重点确认：

1. 报告是否具体、可信、可执行。
2. 用户是否愿意留下邮箱。
3. 在 Pancake 后台创建 `$29` 一次性产品并完成 sandbox 付款。
4. 用户是否愿意购买一次性 Deep Growth Report。
5. 先人工复核报告质量，再决定是否把截图/视觉分析列为 P0。
6. 接入持久化数据库后再扩大流量。

在出现真实购买、确认主 ICP 和确认视觉方案前，不开始完整产品开发。

## 外部配置待办

- 在 Pancake 创建 `$29` 一次性产品，取得 product ID。
- 将 Waffo 商户凭证和 webhook 公钥配置到 Cloudflare 部署环境。
- 将 `https://sitelens.win/api/webhooks/waffo` 配置为 Pancake webhook。
- 先决定 Cloudflare Workers/OpenNext 或其他托管目标，再创建 DNS 记录。
