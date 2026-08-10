# AI Website Critic 竞品扫描

本报告是 2026-08-10 的 quick scan，用于判断 AI Website Critic 是否有足够清晰的切入点。资料优先来自竞品官方首页、功能页和定价页；本次没有调用 DataForSEO，也没有把第三方流量估算写成事实。

## 结论先行

1. 这个需求已经有直接竞品，而且核心交互高度相似：输入 URL、生成分数、列出优先级问题、给出改写或行动计划，再用免费报告引导一次性付费或订阅。
2. “AI 分析 + 截图 + 分数 + 文案改写”不能单独作为差异化。Cruelx、Web Anatomy 和 Conversion Probe 已经公开展示了相近能力。
3. $19 一次性报告处于可测试区间，但明显高于 Conversion Probe beta 的 $7 和 Cruelx 的 $8.99。要证明价格，需要交付更可信的页面证据、业务上下文和可执行改写，而不是更长的分数清单。
4. 最适合 V1 的切入点不是同时服务三个用户群，而是先服务“有公开 SaaS/产品首页、正在寻找注册转化问题的 Indie Hacker/小型 SaaS 创业者”。设计师和代理商属于后续扩展。
5. 市场扫描支持“先做小规模付费验证”，不支持现在就进入完整 SaaS 开发。

## 比较表

| 产品 | 类型 | 核心输入/速度 | 主要分析与报告 | 公开价格与付费触发 | 对 AI Website Critic 的启示 |
|---|---|---|---|---|---|
| [Web Anatomy](https://www.webanatomy.ai/landing-page-analyzer) | 直接竞品 / CRO + 基准库 | URL；页面写明约 2 分钟；桌面/移动截图 | 约 60–63 个标准（不同官方页面口径）、分数、标注截图、优先级修复、可粘贴改写、同类页面基准 | 免费 1 次分析额度；Pro €9/月、€19/月；定制 UX 竞品分析 €149 一次 | “有证据的基准比较”比泛泛 AI 建议更有付费理由 |
| [Cruelx](https://www.cruelx.com/pricing) | 直接竞品 / 综合网站审计 | URL；免费报告每天 1 次；桌面/移动视觉检查 | SEO、技术、营销与品牌、设计、买方心理五大支柱；优先级计划、改写、PDF | 免费；Full Report $8.99 一次；Starter $25/月；Agency $75/月；Agency Pro $149/月 | 已验证免费→一次性报告→订阅→代理商的完整阶梯，不能照搬其定位 |
| [Conversion Probe](https://conversionprobe.com/) | 直接竞品 / Landing Page CRO | URL；约 1 分钟看到结果 | 转化分数、最大问题、快速修复；Pro 覆盖所有问题、具体修复、标题/副标题/CTA 改写和行动计划 | 免费、无注册；Pro beta $7 一次，公开说明正式价 $29 一次 | “先给最大问题，再卖完整报告”是很清楚的付费路径 |
| [Landing Analyze](https://landinganalyze.com/) | 直接竞品 / 免费 Landing Page 分析 | URL，可选目标受众；页面称低于 1 分钟，FAQ 另称 30 分钟内 | Messaging、Readability、Structure、Actionability、Design、Credibility 六类评分和建议 | 免费、无注册；每天最多 3 次、每个域名 1 次 | 免费工具的低门槛很高；需要用页面证据和更好的改写建立差异 |
| [HubSpot Website Grader](https://website.grader.com/) | 相邻竞品 / Website Grader | URL；官方定位为几秒出分数 | 性能、移动、SEO、安全，100 分制；偏技术基线 | 免费；官方没有在当前工具页展示一次性深度报告价格 | 证明“URL → 分数 → 改进建议”教育市场有效，但没有覆盖文案和转化心理 |
| [Semrush SEO Checker](https://www.semrush.com/siteaudit/) | 相邻竞品 / SEO 审计 | URL/域名 | Meta、Heading、关键词、反向链接、速度、移动、Core Web Vitals 等；可升级全站审计 | 免费快速检查；完整 SEO + AI Search 套餐公开价格从 $117.33/月（年付）起 | 这是重量级 SEO 方案，不是 V1 的价格或功能对标；应避免把自己做成轻量 Semrush |

## 逐个观察

### 1. Web Anatomy

Web Anatomy 不只卖一个扫描器，还把真实公司页面拆成可检索、可比较的 section benchmark。其官方页面分别出现约 60–63 项标准、3,500–4,000 个 sections 和 400–650 家公司的口径，因此这些数字只能作为产品方公开宣传，不能当作已审计的市场指标。页面同时展示截图、0–100 分数、严重度、paste-ready rewrites、免费额度、€9/€19 月费和 €149 一次性 UX 竞品分析。

**强项**：基准数据、视觉证据、行业/页面 section 维度和与 AI agent 的结合。

**可利用空白**：它更像“设计和页面基准库 + 分析器”，AI Website Critic 可以更聚焦“解释为什么这个页面不转化”，把报告写成创业者能直接执行的改版清单。

**来源**：[Landing Page Analyzer](https://www.webanatomy.ai/landing-page-analyzer)、[官网与定价说明](https://www.webanatomy.ai/)、[UX 竞品分析示例](https://www.webanatomy.ai/best-landing-pages/sections/pricing)。

### 2. Cruelx

Cruelx 是最接近当前项目书的产品。它公开销售免费报告、$8.99 Full Report、$25/月 Starter 和代理商计划。Full Report 包含五大支柱、买方心理、桌面/移动检查、48 小时/7 天/30 天行动计划、文案改写和 45+ 页 PDF。

**强项**：产品阶梯成熟，付费价值表达非常具体，已经把一次性购买和持续复查分开。

**可利用空白**：如果 AI Website Critic 仍然只说“综合 SEO、UX、文案”，会显得像低价复制品。必须选择更窄的人群或更独特的证据格式，例如专注 SaaS 首页的注册转化路径。

**来源**：[产品首页](https://www.cruelx.com/)、[定价页](https://www.cruelx.com/pricing)、[FAQ](https://www.cruelx.com/faq)。

### 3. Conversion Probe

Conversion Probe 把免费报告压缩成“转化分数、最大问题和少量快速修复”，并将 Pro 定义为“一次性深度报告”，明确写出 beta $7、正式价 $29。它还说明分析的是公开页面，不保存页面内容，只保存审计结果。

**强项**：价值主张单一，免费结果到付费结果的边界清楚，适合低成本验证。

**可利用空白**：AI Website Critic 可以把“页面问题”与“为什么伤害注册/购买”解释得更细，并增加基础 SEO 证据，但不能把所有功能都放进免费层。

**来源**：[官网与报告说明](https://conversionprobe.com/)。

### 4. Landing Analyze

Landing Analyze 提供免费、无注册的六类 Landing Page 分析，类别覆盖文案、可读性、结构、行动性、设计和可信度。页面同时承认它无法访问视频、弹窗和其他交互元素，这是一个值得保留的能力边界。

**强项**：低门槛，分析框架容易理解，也允许用户填写目标受众。

**可利用空白**：报告速度和信息完整度存在公开页面口径不一致（首页称低于 1 分钟，FAQ 称 30 分钟内），说明“速度承诺”必须用实际 p50/p95 数据而不是营销文案决定。

**来源**：[Landing Page Analyzer](https://landinganalyze.com/)。

### 5. HubSpot Website Grader

HubSpot 的 Website Grader 是成熟的免费教育型工具。HubSpot 官方说明它按性能、移动、SEO 和安全四个方向给 100 分，并提供清晰的改进建议。

**强项**：品牌信任、技术评分标准清晰、使用门槛低。

**可利用空白**：它的核心不是“为什么访客不转化”，而是网站健康基线。因此 AI Website Critic 应该把 SEO 作为证据层，而不是把技术分数当成产品中心。

**来源**：[Website Grader](https://website.grader.com/)、[HubSpot 官方测试说明](https://www.hubspot.com/tests)。

### 6. Semrush SEO Checker

Semrush 的免费 SEO Checker 会给整体 SEO 分数、优先级待办和详细报告，覆盖 Meta、Heading、关键词、反向链接、页面速度、移动和 Core Web Vitals；完整 Site Audit 则是全站、持续、可追踪的 SaaS 产品。

**强项**：技术 SEO 数据深度、全站能力、长期监控和团队工作流。

**可利用空白**：它对目标用户来说可能过重，且不以首页定位、文案和买方心理为核心。AI Website Critic 不应在 V1 追求全站爬取和关键词平台化。

**来源**：[免费 SEO Checker](https://www.semrush.com/siteaudit/)、[Semrush 定价页](https://www.semrush.com/pricing/seo-ai-search/)。

## 战略判断

### 需要放弃的差异化说法

- “我们也能输入 URL 自动分析。”
- “我们有 0–100 分数。”
- “我们支持截图和 AI。”
- “我们给出 CTA、SEO 和文案建议。”

这些能力在扫描到的直接竞品中已经是常见表达。

### 可以继续验证的差异化方向

- **SaaS 首页专用**：围绕注册/预约 Demo 的转化路径设计评分和建议。
- **证据优先**：每个问题都标出页面元素、原文、影响和改写，不只给抽象结论。
- **少而精的优先级**：免费层只给最重要的问题，付费层给完整行动计划。
- **上下文输入**：先让用户补充产品、目标用户和主要 CTA，再分析“对谁不清楚”。
- **可交付给开发者**：把建议写成可复制的文案、页面结构和改动任务，而不是长篇营销文章。

### 价格判断

$19 一次性报告可以测试，但不是自然成立的价格。它高于已公开的 $7 beta 和 $8.99 Full Report，低于 €149 的定制 UX 竞品分析。建议先测试两个价格点或先以 $9–$19 的单次报告验证购买意愿；不要先做 $19/月订阅。

## 研究限制

- 本次是 quick scan，没有核验各产品的真实报告准确率、实际运行耗时或用户留存。
- 未使用 DataForSEO，因此没有比较自然流量、反向链接或关键词数据。
- 竞品价格和功能是 2026-08-10 的公开页面快照，后续可能变化。
