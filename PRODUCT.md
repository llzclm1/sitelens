# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

主要用户是独立开发者、小型 SaaS 创始人和小企业主。他们已经有一个公开网站，但不确定访客为什么没有注册、咨询或购买；他们需要在增加流量或功能之前，找到最值得先改的一处。设计师和营销人员是次要用户，用 SiteLens 快速评估客户首页。

## Product Purpose

SiteLens 让用户提交一个公开网站 URL、产品简介和目标用户，生成一份基于页面证据的网站增长诊断。当前核心目标是让用户快速找到第一处值得修改的网站问题，而不是承诺或测量真实转化率提升。

## Positioning

SiteLens 不是单纯的网站评分器或 SEO 检查器。它用固定的 SiteLens Growth Framework（Positioning、Clarity、Trust、Conversion、Authority）把页面数据转成业务判断、证据解释、修改建议和示例改写，帮助用户决定下一步先改什么。

## Operating Context

用户从首页开始，提交公开 URL、产品一句话和目标用户；系统抓取首页 HTML、元数据、结构、文案、CTA 和信任信号，由确定性的规则生成报告并在原报告页交付。当前公共 Beta 完全免费，不要求账号、邮箱或付款；分析与报告查看事件由 GA4 与 Cloudflare D1 分别记录。

## Capabilities and Constraints

- 当前 Phase 0 支持公开首页分析和基于规则的证据报告；规则是唯一的分析路径，便于复核、控制成本并保持结果稳定。
- 生产运行在 Next.js、TypeScript、React、Cloudflare Workers/OpenNext 和 Cloudflare D1 上。
- 当前没有收费产品、Checkout、订阅、邮箱收集或支付解锁流程；历史支付表和配置仅作为保留数据，不参与运行路径。
- 不自动修改用户网站，不做完整 SEO SaaS、竞品监控、企业级审计或 GEO 产品。
- 只分析用户有权提交的公开页面；不探测私有系统，不提交或保存机密数据。
- 报告是定性分析，不估算转化率，不保证转化率、收入、排名或业务结果。
- 页面抓取失败时必须返回明确错误；规则分析只使用已抓取到的页面事实，不把未知信息伪装成结论。
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
5. 公共 Beta 先用完整免费报告建立信任；任何未来收费假设都必须另行验证，不属于当前产品承诺。
