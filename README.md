# SiteLens Phase 0

SiteLens Phase 0 是一个面向 Indie Hacker 和小型 SaaS 创始人的网站增长诊断原型。它只验证一件事：用户提交首页后，是否愿意为一份具体、可执行的深度报告付费。

## 本次实现

- URL + 产品一句话 + 目标用户提交
- 首页 HTML 抓取、跳转限制、超时限制、大小限制与基础 SSRF 防护
- 基于页面证据的免费三问题报告
- 可选 DeepSeek JSON 分析增强；没有 API Key 时使用确定性的证据规则
- Waffo Pancake `$29` 一次性 Deep Growth Report Checkout 创建与 webhook 验证骨架，交付承诺为 24 小时
- Cloudflare D1 持久化报告、升级请求与支付意向；本地 `next dev` 无 Cloudflare binding 时才使用内存 fallback
- 首页采用证据驱动的编辑型视觉系统，使用自托管 Geist 字体并支持暗色系统偏好
- 首页展示 SiteLens Growth Framework，提交时展示分析过程；报告提供问题影响、页面证据、修复建议和改写方向
- 提供公开 Teardown Library，当前有一个基于 Stripe 官方首页的定性案例，并标注来源、日期和分析边界
- 已接入 Google Analytics 4（衡量 ID：`G-YNQ8J06W7D`）和 Google Search Console；首页包含 GSC 验证标签，`robots.txt` 与 `sitemap.xml` 已发布
- API 具备 32 KB 请求体上限、D1 IP 限流和私网 SSRF 拦截；生产响应包含基础安全头
- 付款 webhook 会校验环境、报告、产品元数据、金额、币种和买家邮箱，并在付款确认后生成站内 Deep Report
- 提供 `/privacy` 和 `/terms` 页面；GA4/GSC 构建变量带生产回退，避免普通生产构建静默移除标签

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。`DEEPSEEK_API_KEY` 是可选的；没有它也可以完整走通免费报告流程。

付款配置需要在 Pancake 中创建一个 `$29` 一次性产品，然后把以下服务端变量配置到本地或 Cloudflare 部署环境：`WAFFO_ENVIRONMENT`、`WAFFO_MERCHANT_ID`、`WAFFO_PRIVATE_KEY`、`WAFFO_DEEP_GROWTH_REPORT_PRODUCT_ID`、`WAFFO_WEBHOOK_PUBLIC_KEY`。Webhook 地址为 `https://sitelens.win/api/webhooks/waffo`。

当前生产版本已发布到 Cloudflare Worker `sitelens`，并创建了 `sitelens.win/*` Route。域名通过 Cloudflare Proxied A 记录 `@ → 192.0.2.0` 接入；不要把域名直接指向 Pancake 商户后台。D1 数据库名为 `sitelens`，初始迁移位于 `migrations/0001_initial.sql`。

## 当前明确不做

- 不承诺真实转化率提升
- 不自动修改用户网站
- 不把 Pancake 商户后台地址伪装成客户付款页
- 不在 Phase 0 里加入竞品监控、GEO 或企业级审计

## 下一步验收

1. 用 5–10 个真实公开 SaaS 首页走通提交与报告。
2. 人工检查三条问题是否有页面证据、是否能指导一次具体改动。
3. 接入真实支付后，统计从免费报告到付款的转化，而不是只统计点击。
4. 在 GA4 开始接收数据后检查实时访问，在 Search Console 完成 sitemap 首次抓取后复核索引状态。
5. 在 Waffo 配置生产商户凭证、`$29` 商品 ID 和 webhook 公钥，再进行真实付款回归。
