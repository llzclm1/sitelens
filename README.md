# SiteLens Phase 0

SiteLens Phase 0 是一个面向 Indie Hacker 和小型 SaaS 创始人的网站增长诊断原型。它只验证一件事：用户提交首页后，是否愿意为一份具体、可执行、人工复核的深度报告付费。

## 本次实现

- URL + 产品一句话 + 目标用户提交
- 首页 HTML 抓取、跳转限制、超时限制、大小限制与基础 SSRF 防护
- 基于页面证据的免费三问题报告
- 可选 DeepSeek JSON 分析增强；没有 API Key 时使用确定性的证据规则
- Waffo Pancake `$29` 一次性 Deep Growth Report Checkout 创建与 webhook 验证骨架，交付承诺为 24 小时
- 运行期内存存储，方便本地验证；真实付款确认依赖 Waffo webhook，生产环境仍应换成持久化数据库

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。`DEEPSEEK_API_KEY` 是可选的；没有它也可以完整走通免费报告流程。

付款配置需要在 Pancake 中创建一个 `$29` 一次性产品，然后把以下服务端变量配置到本地或 Cloudflare 部署环境：`WAFFO_ENVIRONMENT`、`WAFFO_MERCHANT_ID`、`WAFFO_PRIVATE_KEY`、`WAFFO_DEEP_GROWTH_REPORT_PRODUCT_ID`、`WAFFO_WEBHOOK_PUBLIC_KEY`。Webhook 地址为 `https://sitelens.win/api/webhooks/waffo`。

当前 Cloudflare 区域 `sitelens.win` 已激活，但还没有 DNS 记录或 SiteLens 部署项目。需要先确定部署目标，再写入 DNS；不要把域名直接指向 Pancake 商户后台。

## 当前明确不做

- 不承诺真实转化率提升
- 不自动修改用户网站
- 不把 Pancake 商户后台地址伪装成客户付款页
- 不在 Phase 0 里加入竞品监控、GEO 或企业级审计

## 下一步验收

1. 用 5–10 个真实公开 SaaS 首页走通提交与报告。
2. 人工检查三条问题是否有页面证据、是否能指导一次具体改动。
3. 接入真实支付后，统计从免费报告到付款的转化，而不是只统计点击。
