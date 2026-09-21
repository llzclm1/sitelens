# SiteLens 发布与社区分发素材包

这份素材包用于把 SiteLens 的公开案例和免费首页审查分发到不同社区。每个渠道使用不同的入口和文案，不把曝光、点击或目录收录冒充真实用户。

## 核心定位

**短句：** Find the first website change worth fixing.

**一句话：** SiteLens reviews a public homepage for positioning, clarity, trust, and conversion friction, then connects visible page evidence to one practical next move.

**产品边界：** It is a qualitative public-page review. It does not access private analytics, predict a conversion rate, run experiments, or promise a lift.

**主入口：** https://sitelens.win/?utm_source=launch_kit&utm_medium=referral&utm_campaign=site_lens_30_day

**免费入口：** https://sitelens.win/ai-website-audit?utm_source=launch_kit&utm_medium=referral&utm_campaign=site_lens_30_day

**案例入口：** https://sitelens.win/teardowns?utm_source=launch_kit&utm_medium=referral&utm_campaign=site_lens_30_day

## 渠道版本

### X / Twitter：公开案例短帖

```text
I read Stripe's homepage through one question:

What does a first-time visitor know they can do next?

Strong:
- clear category signal
- credible proof cues
- a visible path into the product

Watch-out:
The promise is broad, so smaller teams may still need a clearer starting point.

I built SiteLens to connect page evidence to the first change worth fixing.

Read the teardown: https://sitelens.win/teardowns/stripe?utm_source=x&utm_medium=social&utm_campaign=teardown_stripe
Try a free review: https://sitelens.win/ai-website-audit?utm_source=x&utm_medium=social&utm_campaign=teardown_stripe
```

### X / Twitter：产品说明帖

```text
Most website audits stop at a score.

SiteLens asks a more useful question:

What is the first page change worth fixing?

It reads a public homepage and shows:
- the visible evidence
- why it may slow a decision
- the first practical fix
- an example direction for the copy

Free review: https://sitelens.win/?utm_source=x&utm_medium=social&utm_campaign=product_intro
```

### LinkedIn：B2B/agency 版本

```text
Website reviews are most useful when they reduce the next decision.

SiteLens is a small, evidence-first review tool for founders, SaaS teams, and designers. Give it a public homepage, a one-line product description, and the target audience. It returns three page-specific findings across clarity, next step, and proof.

The important boundary: this is not a conversion forecast. It does not see private analytics or claim that a rewrite will increase revenue. It helps a team agree on what to change first.

I am looking for a few people who will try it on a real homepage and tell me where the review is too vague.

Try it here: https://sitelens.win/?utm_source=linkedin&utm_medium=social&utm_campaign=founder_feedback
```

### Indie Hackers：Build in Public 版本

```text
I am testing a simple hypothesis with SiteLens: founders may pay for a clear first website fix, but they do not need another generic SEO score.

The current flow is deliberately narrow:

1. Submit one public homepage.
2. Give the product and audience in one sentence.
3. Get three findings tied to page evidence.
4. Unlock a deeper homepage plan only if the free read is useful.

The product does not access private analytics, estimate conversion rate, or pretend a model can prove a lift.

The public teardown library is here: https://sitelens.win/teardowns?utm_source=indiehackers&utm_medium=community&utm_campaign=build_in_public

If you try it, the most useful feedback is: which finding would you actually fix, and which one feels generic?
```

### Reddit：反馈帖版本

```text
Feedback request: I built a public-page website review tool

I am testing a narrow product for founders and small teams. It reads one public homepage and returns three evidence-based findings about:

- whether the offer is clear
- whether the next step is visible
- whether the page gives visitors enough proof

It is intentionally not a full SEO crawler or a conversion-rate predictor. The report says what it saw, why it may matter, and what to try next.

I am looking for honest feedback on whether the findings are specific enough to act on.

Try it: https://sitelens.win/?utm_source=reddit&utm_medium=community&utm_campaign=feedback_request
```

### Product Hunt：提交草稿

**Name:** SiteLens

**Tagline:** Find the first website change worth fixing.

**Description:**

```text
SiteLens reviews a public homepage for positioning, clarity, trust, and conversion friction. It connects visible page evidence to a practical next move, so founders can decide what to fix before adding more traffic or features. Start with a free review and three page-specific findings. A one-time Deep Growth Report adds hero and CTA rewrite directions plus a three-week action plan. SiteLens does not access private analytics, predict conversion rates, or promise a lift.
```

**First comment:**

```text
I built SiteLens because website audits often produce a long list and leave the founder with the same question: what should I change first?

The product is intentionally narrow. It reads one public homepage, shows the evidence behind three findings, and keeps the line clear between a qualitative review and a measured experiment.

If you try it, please tell me which finding you would act on first and where the explanation is still too generic.
```

Product Hunt requires a personal account and recommends launching a live product that people can try immediately. Do not ask for upvotes or pay a third party to manufacture engagement. Prepare the listing as a draft first, then schedule only after the account, screenshots, demo and launch date are ready.

## UTM 规则

| 渠道 | `utm_source` | `utm_medium` | `utm_campaign` |
| --- | --- | --- | --- |
| X 案例 | `x` | `social` | `teardown_stripe` |
| LinkedIn 反馈 | `linkedin` | `social` | `founder_feedback` |
| Indie Hackers | `indiehackers` | `community` | `build_in_public` |
| Reddit 反馈 | `reddit` | `community` | `feedback_request` |
| Product Hunt | `producthunt` | `launch` | `site_lens_launch` |

所有链接都指向实际存在的页面；不要在外部文案中声称“提高了多少转化率”、拥有客户实验数据或已经有大量用户。

## 提交前检查

### 已具备

- 公开可访问的产品和免费分析入口
- `/pricing`、`/privacy`、`/terms`
- 8 个公开 Teardown 和方法论页面
- 首页、软件实体、FAQ/ItemList 等结构化数据
- GA4、GSC、Cloudflare 基础观测与 UTM 归因

### 仍需补齐

- 5–8 张用于第三方目录的产品截图
- 60–90 秒真实操作演示视频
- 3 个以上诚实的对比/替代页
- 真实用户反馈和可公开引用的早期案例
- 真实账号登录和平台级发布状态

因此当前可以先做社区反馈和内容分发准备，不把 Product Hunt、G2、Capterra、AI 目录的提交状态写成已完成。

## 每日执行配额

- 1 条有具体页面证据的公开内容
- 5 个真实、个性化的反馈邀请草稿
- 1 次产品流程回归
- 1 次 GA4 来源和 `analyze_completed` 检查
- 只放大已经产生真实分析完成的渠道

如果一个渠道只有曝光而没有 `analyze_started`，先修入口或文案，不继续堆曝光。
