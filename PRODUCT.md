# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

主要用户是独立开发者、小型 SaaS 创始人和小企业主。他们已经有一个公开网站，但不确定访客为什么没有注册、咨询或购买；他们需要在增加流量或功能之前，找到最值得先改的一处。设计师和营销人员是次要用户，用 SiteLens 快速评估客户首页。

## Product Purpose

SiteLens 让用户提交一个公开网站 URL、产品简介和目标用户，生成一份基于页面证据的网站增长诊断。产品的核心目标是验证用户是否愿意为具体、可执行的 Deep Growth Report 付费，而不是承诺或测量真实转化率提升。

## Positioning

SiteLens 不是单纯的网站评分器或 SEO 检查器。它用固定的 SiteLens Growth Framework（Positioning、Clarity、Trust、Conversion、Authority）把页面数据转成业务判断、证据解释、修改建议和示例改写，帮助用户决定下一步先改什么。

## Operating Context

用户从首页开始，提交公开 URL、产品一句话和目标用户；系统抓取首页 HTML、元数据、结构、文案、CTA、信任信号及可用截图，先返回免费三问题报告，再引导用户购买一次性 Deep Growth Report。报告在原报告页交付；分析、报告查看和商业漏斗事件由 GA4 与 Cloudflare D1 分别记录。

## Capabilities and Constraints

- 当前 Phase 0 支持公开首页分析、基于规则的证据报告和可选 Qwen/DeepSeek 增强。
- 生产运行在 Next.js、TypeScript、React、Cloudflare Workers/OpenNext 和 Cloudflare D1 上。
- 当前付费产品是 $29 一次性的 Deep Growth Report，由 Waffo Pancake 处理支付，付款确认后通过 webhook 解锁站内深度报告。
- 不自动修改用户网站，不做完整 SEO SaaS、竞品监控、企业级审计或 GEO 产品。
- 只分析用户有权提交的公开页面；不探测私有系统，不提交或保存机密数据。
- 报告是定性分析，不估算转化率，不保证转化率、收入、排名或业务结果。
- 视觉增强失败时必须保留规则分析路径；Qwen 视觉能力和外部抓取可能受页面阻断、延迟和成本影响。
- 未来功能方向包括首页改写、竞品差距、持续监控和 AI 搜索可见性，但不是当前 Phase 0 的交付范围。

## Brand Commitments

- 名称固定为 SiteLens，长期定位为 AI Website Growth Consultant。
- 对外强调分析方法、页面证据和下一步行动，不把 AI 本身当作价值承诺。
- 文案应直接、克制、专业，避免“10x 转化”等无法证明的承诺。
- 报告必须把 Problem、Why it matters、Evidence、How to fix 和 Example rewrite 连接起来。

## Evidence on Hand

- 项目已有公开 Stripe 首页定性 Teardown，包含来源、日期、分析边界和页面证据。
- 项目已有公开 Teardown Library、Growth Framework、分析过程展示和报告 Evidence Layer。
- 当前没有私有客户分析、实验结果、真实转化提升数据或可公开使用的客户评价；未来工作不得编造这些证据。
- 项目已有 GA4、GSC、Cloudflare 和 D1 的生产验证记录；平台后台数据和抓取结果必须以实时复核为准。

## Product Principles

1. 先回答“为什么”，再给“怎么改”。
2. 每条建议都必须能追溯到提交页面上的证据。
3. 优先帮助用户做一个高价值改动，而不是堆更多检查项。
4. 诚实区分定性判断、平台数据和实验结果。
5. 免费报告负责建立信任，付费报告负责提供更完整的行动方案。

