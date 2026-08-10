# SiteLens 长期发展规划 V1.0

这份路线图定义 SiteLens 从一次性网站诊断到 AI Website Growth Consultant 的长期方向。它用于指导产品决策，不等于一次性开发清单；每个阶段都必须先达到前一阶段的结果闸门，再进入下一阶段。

## 文档状态

| 项目 | 内容 |
|---|---|
| 产品名 | SiteLens |
| 长期定位 | AI Website Growth Consultant（AI 网站增长顾问） |
| 当前 MVP 研究名 | AI Website Critic |
| 当前阶段 | Phase 0：付费验证前 |
| 版本 | V1.0 |
| 日期 | 2026-08-10 |

## 给 Codex 的执行指令

你现在要把 SiteLens 当作一个长期产品方向来理解，但不能因为路线图包含 Phase 1–5 就提前实现全部功能。

执行原则：

1. 先读取本路线图，以及 `research/competitor-scan.md`、`research/prd-review.md`、`research/technical-decision.md` 和 `research/decision-memo.md`。
2. 当前只允许推进 Phase 0：验证用户是否愿意为网站增长分析付费。
3. 若用户没有明确说“开始开发 Phase 0”，不要写应用代码、搭页面、安装依赖或创建第三方账号。
4. Phase 1–5 只作为产品上下文，不作为当前 Sprint backlog。
5. 每次提出功能时，先写清楚它要改变的用户行为、业务指标和进入条件；无法说明结果的功能暂缓。
6. 所有 AI 建议都必须区分页面事实、模型推断和未知信息。
7. 不把 SiteLens 做成又一个 Website Score、SEO Checker 或大型营销平台。

Codex 在每次执行路线图任务前，先输出四项：

- 当前阶段和结果目标。
- 未通过的闸门。
- 本次最小验证动作。
- 本次明确不做的功能。

## 1. 产品定位

### 长期定位

> AI Website Growth Consultant

SiteLens 帮助创业者、小企业和独立开发者回答：

> 为什么我的网站没有带来客户？下一步应该怎么改？

### 不做的定位

SiteLens 不把自己包装成：

- AI Website Audit Tool
- SEO Checker
- Website Score Tool
- 一开始就覆盖所有营销渠道的 SaaS 平台

这些类别已有大量工具，单纯增加评分和检查项不能形成长期优势。

### 核心价值

SiteLens 不只返回检测结果，而是帮助用户做出下一步决定：

```text
Website Data
      ↓
AI Analysis
      ↓
Business Insight
      ↓
Action Recommendation
      ↓
Paid Report / Subscription
```

核心交付单位不是“发现了多少问题”，而是“用户知道先改什么，并愿意去改”。

## 2. North Star

### 北极星结果

让用户在一次分析后，能够选出并执行一项具体的网站改动，并认为这项改动比继续猜测更有价值。

### 长期产品模型

```text
看懂网站
   ↓
解释商业影响
   ↓
提出改法
   ↓
帮助改写/重构
   ↓
对比竞争和变化
   ↓
持续监控增长机会
```

### 长期用户结果

- 创业者能说清楚网站卖什么、卖给谁、下一步让访客做什么。
- 用户能看到最影响注册、预约或购买的页面问题。
- 用户能直接拿到新的 Hero、CTA 或首页结构草案。
- 用户能知道竞争网站新增了哪些可能影响转化的内容。
- 用户能逐渐把 SiteLens 当作网站增长顾问，而不是一次性检查器。

## 3. 阶段路线图总览

| 阶段 | 时间窗口 | 结果目标 | 主要输出 | 进入下一阶段的闸门 |
|---|---|---|---|---|
| Phase 0 | 0–30 天 | 证明用户愿意为具体的增长诊断付费 | Website Growth Report | 有真实付费、报告质量过关、主 ICP 清晰 |
| Phase 1 | 1–3 个月 | 让用户从“知道问题”走到“完成一次改动” | AI Homepage Consultant | 用户持续使用改写/蓝图，并认可改动价值 |
| Phase 2 | 3–6 个月 | 让用户知道自己相对竞争对手缺什么 | Competitive Gap Report | 用户愿意提供竞争网站并为差距分析付费 |
| Phase 3 | 6–12 个月 | 让一次性报告变成持续的变化监控 | Growth Monitor | 有重复使用、续费和告警行动证据 |
| Phase 4 | 12–24 个月 | 帮助用户理解 AI Search 中的可见性和可推荐性 | AI Search / GEO Optimization | 有可复核的数据和明确的优化闭环 |
| Phase 5 | 长期 | 成为创始人的 AI 增长团队 | AI Growth Team | 各 Agent 有稳定工作流、权限和商业价值 |

时间窗口是规划范围，不是承诺日期。

## 4. Phase 0：MVP 付费验证

### 结果目标

验证用户是否愿意为“解释网站为什么没有产生客户，并告诉我具体怎么改”的报告付费。

### 目标用户

第一优先级：

- 正在运营 SaaS 或数字产品的 Indie Hacker。
- 有公开产品首页、希望获得注册或预约 Demo 的小型团队创始人。

第二优先级：

- 有客户网站评估需求的设计师/营销人员。

第二优先级不能在第一阶段扩大产品范围；只观察他们是否自然出现，不为代理商提前做白标系统。

### 用户输入

- Website URL。
- 可选：产品是什么、目标用户是谁、主要 CTA 是什么。

### 分析证据

- 首页 HTML。
- 页面截图。
- 页面结构和可见文本。
- Hero、标题、产品描述。
- CTA 和链接。
- Meta、Heading、Schema、图片 alt 等基础 SEO 信息。

### 报告内容

#### 1. Positioning Analysis

- 网站卖什么。
- 面向谁。
- 用户能否在约 5 秒内理解。
- 页面是否把价值说成用户结果，而不是内部功能。

#### 2. Conversion Analysis

- CTA 是否明确。
- 用户是否知道下一步。
- 页面结构是否支持决策。
- 主要转化路径是否出现断点。

#### 3. Trust Analysis

- 客户案例。
- 数据证明。
- 客户 Logo、评价、保障、团队信息等信任元素。
- 信任元素是否与用户当前决策风险相关。

#### 4. Copy Analysis

- Hero 文案。
- 产品描述。
- 利益表达。
- 信息是否具体、易懂、可信。

#### 5. Action Plan

- 最重要的三项改动。
- 每项改动为什么影响转化。
- 建议的页面动作。
- 示例改写。
- 优先级和置信度。

### 收费设计

#### 免费

- 基础 Website Score，或在评分未校准前显示健康概览。
- 3 个核心问题。
- 少量 quick wins。

#### 付费

- 产品名：Deep Growth Report。
- 当前价格假设：$29 一次。
- 内容：完整分析、首页优化方案、文案重写、页面结构建议。

这里的 $29 是待验证价格，不是已确认的市场价格。此前研究建议先测试 $9–$19；本路线图将 $29 作为新的价格假设，必须通过真实付款或分价格点实验确认。

### Phase 0 指标

必须记录：

- URL 提交率。
- 分析完成率。
- 报告查看率。
- 邮箱提交率。
- 付费启动率和付费完成率。
- 报告打开率。
- 报告质量评分。
- 用户实际执行的改动数量。

建议的第一道决策门槛：用 15–20 个合格目标用户做小规模实验，争取至少 3 个真实付费，并让报告质量达到约 4/5。这个门槛是实验规则，不是行业基准，实验前可以调整，但不能只看访问量。

### Phase 0 明确不做

- 自动修改网站。
- 订阅。
- 竞争监控。
- 完整 SEO SaaS。
- 代理商工作台。
- 五个 SEO 页面同时上线。
- 多 Agent 系统。

## 5. Phase 1：AI Homepage Consultant

### 结果目标

让用户从“知道页面有什么问题”走到“拿到一版可以继续修改的首页方案”。

### AI Rewrite

用户原文：

```text
The future of intelligent workflow
```

AI 输出应更接近具体用户结果，例如：

```text
Automate invoice processing and save 10 hours every week.
```

改写必须说明：

- 使用了哪些页面事实。
- 面向哪类用户。
- 改写解决了什么问题。
- 哪些部分仍需要用户确认。

### Homepage Blueprint

生成可执行的首页结构：

```text
Hero
  ↓
Problem
  ↓
Solution
  ↓
Proof
  ↓
CTA
```

蓝图不只是列模块，还要解释每个模块承担的决策任务，以及应该放什么证据。

### 成功指标

- 用户对改写“可直接使用”的评分。
- 用户接受或采纳改写的比例。
- 用户生成第二版首页的比例。
- 从报告到第一次改动的时间。
- 用户再次分析同一网站的比例。

### 进入条件

- Phase 0 已出现真实付费。
- 免费报告的问题能稳定被人工评为具体而非泛泛。
- 用户明确需要“怎么写、怎么排结构”，而不只是想看分数。

## 6. Phase 2：Competitor Intelligence

### 结果目标

让用户知道自己与竞争网站相比缺少什么，并能把差距转成一组优先改动。

### 输入

- 自己的网站。
- 一个或多个竞争网站。
- 可选：目标市场、主要产品、目标 CTA。

### Competitive Gap Report

分析：

- 定位差距。
- 文案差距。
- 信任差距。
- 内容差距。
- Pricing、Case Study、Comparison Page 等证据缺口。

报告示例：

```text
Competitor has:
- 8 customer proofs
- 3 comparison pages
- clear pricing

You are missing:
- Case studies
- Pricing transparency
- Comparison content
```

### 成功指标

- 用户成功提交竞争网站的比例。
- 用户是否能从报告中选出一个差距并开始改动。
- 竞争差距报告的付费率。
- 报告后 30 天内的复查率。

### 收费假设

- 当前候选区间：$49–$99/月。
- 这是 Phase 2 的价格假设，不在 Phase 0 提前实现。

### 进入条件

- Homepage Consultant 已有稳定使用。
- 有可复用的页面比较 rubric。
- 竞争网站分析不会退化成无来源的模型猜测。
- 用户愿意为“差距 → 行动”而不是“更多竞品数据”付费。

## 7. Phase 3：Growth Monitor

### 结果目标

把一次性诊断变成持续服务，让用户在竞争和网站变化发生时及时知道。

### 监控对象

- 自己的网站变化。
- 竞争网站变化。
- 基础 SEO 变化。
- AI Search 表现变化。

### 通知示例

```text
Your competitor updated their homepage.

They added:
- customer logos
- pricing comparison

Potential conversion impact:
- stronger trust above the fold
- lower pricing uncertainty
```

通知必须区分：

- 检测到的变化。
- 对业务的推断。
- 需要人工确认的结论。

### 成功指标

- 用户完成首次监控设置的比例。
- 月度活跃监控站点。
- 告警打开率。
- 告警后产生的页面改动或复查。
- 付费留存和取消原因。

### 收费假设

- 当前候选：$29/月和 $99/月。
- 需要与 Phase 2 的 $49–$99/月候选重新整合，不能让用户面对互相重叠的计划。

### 进入条件

- 用户已经产生重复分析需求。
- 变化检测的误报率可以接受。
- 用户愿意为及时性和历史记录付费。

## 8. Phase 4：AI Search / GEO Optimization

### 结果目标

从“Google SEO 是否健康”扩展到“AI 系统是否能理解、引用和推荐这个品牌”。

### 目标系统

- ChatGPT。
- Claude。
- Gemini。
- Perplexity。

### 分析问题

- 页面是否容易被模型理解。
- 结构化内容是否足够。
- 是否有明确的实体、产品、价格和受众信息。
- 是否有足够的权威和第三方证明。
- 当用户提出目标问题时，品牌是否出现、如何被描述、为什么没有出现。

### 输出示例

```text
When users ask:
Best CRM for small business

AI recommends:
Competitor A
Competitor B
Not you.

Possible reasons:
- weak structured content
- insufficient authority signals
```

“AI 不推荐你”必须基于可复核的查询、时间、模型和结果记录，不能把一次模型回答当成稳定的市场事实。

### 成功指标

- 目标问题集合的覆盖率。
- 品牌出现率和推荐位置变化。
- AI 对品牌描述的准确率。
- 用户根据建议完成结构化内容或权威信号改动后的变化。

### 进入条件

- Growth Monitor 已经有稳定的数据保存和变化比较。
- 有明确的查询集合和重复测量方法。
- 用户能区分 SEO 建议、GEO 推断和模型随机波动。

## 9. Phase 5：AI Growth Team

### 长期结果目标

让创始人用一个 SiteLens 工作台管理网站增长判断，而不是分别使用多个孤立工具。

```text
Founder
   ↓
SiteLens AI Growth Team
   ↓
Website
SEO
Content
Conversion
Competition
```

### Agent 方向

#### Website Agent

- 网站理解。
- 首页和页面结构优化。
- 页面变化解释。

#### SEO Agent

- 技术和内容机会。
- 页面结构化建议。
- 搜索表现变化解释。

#### Competitor Agent

- 竞争变化监控。
- 定位和信任差距。
- 竞争页面证据整理。

#### Copy Agent

- Hero、CTA、产品描述重写。
- 不同受众版本。
- 语气和证据一致性检查。

#### Analytics Agent

- 把网站变更与转化数据联系起来。
- 解释哪些改动可能带来影响。
- 明确区分相关性和因果性。

### 长期闸门

不要因为 Agent 名称听起来完整就提前拆成多个 Agent。只有当每个工作流有稳定输入、输出、权限、评估标准和商业价值时，才拆分为独立 Agent。

## 10. 统一技术路线

### 当前技术基础

- Frontend：Next.js、TypeScript、Tailwind CSS。
- API：Next.js Route Handlers。
- 抓取：独立 Node.js Worker + Playwright。
- 数据库：公开 beta 推荐 Supabase Postgres；本地实验可用 SQLite。
- 文件：对象存储保存截图和 PDF，报告结构保存为 JSON。
- AI：先用 DeepSeek 做文本证据分析；视觉分析需要单独接入多模态模型。

### 长期技术原则

- 先建立统一的 `WebsiteEvidence`、`BusinessInsight`、`ActionRecommendation` 和 `Report` 数据结构。
- 每个阶段复用同一套页面证据和报告版本，不为每个功能另建一套抓取逻辑。
- 抓取任务与用户请求解耦，避免长时间 Playwright/LLM 操作阻塞 API。
- 把网页内容视为不可信输入，防止 prompt injection 和 SSRF。
- 保存模型版本、Prompt 版本、页面快照时间和分析耗时。
- 没有真实复查需求前，不做复杂队列、向量库或多 Agent 编排。

### 能力依赖

```text
Phase 0
  → 统一证据和报告 schema
Phase 1
  → 文案重写和首页结构输出
Phase 2
  → 多网站比较和来源管理
Phase 3
  → 快照、差异检测和通知
Phase 4
  → 查询集合、AI Search 测量和历史对比
Phase 5
  → 权限、任务编排、评估和团队协作
```

## 11. 商业模式路线

### 候选价格阶梯

| 产品层 | 候选价格 | 适用阶段 | 价值假设 |
|---|---:|---|---|
| Free | $0 | Phase 0 | 获客，展示基础诊断 |
| Deep Growth Report | $29 一次性 | Phase 0 | 用户为一次完整决策买单 |
| Pro | $29/月 | Phase 1/3 候选 | 个人创业者持续获得改写、蓝图和复查 |
| Growth | $99/月 | Phase 2/3 候选 | 小团队获得竞品情报和持续监控 |
| Agency | $299/月 | Phase 3 以后 | 多客户、白标报告和团队交付 |

### 必须先解决的价格歧义

- Phase 0 的 $29 一次性报告与此前研究建议的 $9–$19 测试区间不同，应明确这是新假设。
- Phase 2 的 $49–$99/月与 Phase 3 的 $29/$99/月存在重叠，必须在真实使用场景出现后重新包装。
- Pro 不能只把一次性报告改成订阅；订阅必须提供持续价值，例如改写迭代、复查、变化检测或竞争提醒。
- Agency 计划不能在没有多客户需求前提前开发。

## 12. 长期差异化

### 不应作为核心差异

- 有 Website Score。
- 能抓取 HTML。
- 能生成截图。
- 能调用 AI。
- 能检查基础 SEO。

### 应持续强化的差异

```text
Problem
   ↓
Why it matters
   ↓
How to fix
   ↓
Example rewrite
   ↓
What to do next
```

长期竞争力来自：

- 页面事实和商业判断之间的连接。
- 对目标用户和 CTA 的上下文理解。
- 可以直接执行的行动建议。
- 改动前后的证据和结果记录。
- 随时间形成的用户网站、竞争和增长变化数据。

## 13. 总体成功标准

### 近期

- 有用户提交真实网站。
- 有用户愿意留下邮箱。
- 有用户愿意支付一次性 Deep Growth Report。
- 报告被认为具体、可信、可执行。

### 中期

- 用户使用 AI Rewrite 或 Homepage Blueprint 完成真实改动。
- 用户重复分析同一网站。
- 用户愿意提供竞争网站并付费获得差距分析。

### 长期

- 用户持续使用 Growth Monitor。
- 监控告警带来实际页面或内容动作。
- AI Search/GEO 建议可以被重复测量和验证。
- SiteLens 的多个增长工作流可以在统一数据基础上协同工作。

## 14. 最终原则

SiteLens 的长期方向可以很大，但第一阶段必须很小：

> 先帮用户发现网站为什么没有产生客户，并告诉他具体如何改。

在 Phase 0 证明这件事有人愿意付费之前，不开发大型营销平台，不实现完整 Agent Team，也不把路线图中的远期功能当成当前承诺。
