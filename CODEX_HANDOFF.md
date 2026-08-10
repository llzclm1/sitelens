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
- GitHub 仓库已建立并推送：`https://github.com/llzclm1/sitelens`。
- 已加入 Cloudflare OpenNext/Workers 部署配置，生产版本已发布到 `https://sitelens.sxwdyrxyby.chatgpt.site`。
- 自定义域 `sitelens.win` 已在托管平台创建，但仍等待 Cloudflare DNS 验证；Cloudflare 当前连接器只有 DNS 读取权限，未能代写记录。
- 部署环境已写入非敏感变量：`WAFFO_ENVIRONMENT=test`、`WAFFO_RETURN_BASE_URL`、`NEXT_PUBLIC_SITE_URL`。
- Waffo 商户 ID、私钥、商品 ID、Webhook 公钥尚未配置，因此真实升级付款仍不可用。

## 已验证

- `next build` 通过。
- `npm run open:build` 通过，OpenNext Worker 产物生成成功。
- 首页响应 200。
- `localhost` 私网地址被抓取层拒绝。
- `https://example.com` 能生成免费报告，报告页与升级请求接口可用。
- `https://pancake.waffo.ai` 已确认是商户后台，不作为客户付款地址。

## 下一步

先完成生产闭环，再执行 SiteLens 路线图 Phase 0 的 5–10 个目标用户真实测试：

1. 报告是否具体、可信、可执行。
2. 用户是否愿意留下邮箱。
3. 在 Pancake 后台创建 `$29` 一次性产品、配置密钥并完成 sandbox 付款。
4. 用户是否愿意购买一次性 Deep Growth Report。
5. 先人工复核报告质量，再决定是否把截图/视觉分析列为 P0。
6. 接入持久化数据库后再扩大流量。

在出现真实购买、确认主 ICP 和确认视觉方案前，不开始完整产品开发。

## 外部配置待办

- 在 Pancake 创建 `$29` 一次性产品，取得 product ID。
- 将 Waffo 商户凭证和 webhook 公钥配置到生产环境变量。
- 将 `https://sitelens.win/api/webhooks/waffo` 配置为 Pancake webhook。
- 在 Cloudflare 创建托管平台返回的 2 条 A 记录和 2 条 TXT 验证记录，等待 `sitelens.win` active。
