# SiteLens 任务状态

## 2026-09-11 首页能力具象化

- [x] 增加 URL → 页面证据 → 免费报告 → 深度报告的首页能力流水线
- [x] 具体展示 HTML、文案、CTA、信任线索、链接、图片 alt 和安全信号读取范围
- [x] 具体展示免费三项发现与 `$29` 深度报告交付物
- [x] 增加单个公开页面、无私有数据、无全站爬取、无自动改站的边界说明
- [x] 通过类型检查、Next 构建、OpenNext 构建和本地浏览器 QA
- [x] 提交并发布到 Cloudflare，复核线上首页能力文案返回 200
- [x] 本地移动端 Chromium QA 通过

## 2026-09-11 安全审计能力接入

- [x] 在报告页增加公开安全信号模块和非渗透测试边界说明
- [x] 接入 HTTPS、CSP、HSTS、Frame Protection、nosniff、Referrer-Policy、混合内容、不安全表单和第三方脚本检查
- [x] 新增源码安全审计脚本和供应链审计脚本
- [x] 将源码审计、供应链审计和生产依赖 `npm audit` 接入 GitHub Actions
- [x] 本地安全审计和供应链审计通过
- [x] 类型检查、Next 构建、OpenNext 构建和浏览器 QA 通过
- [x] 发布 Cloudflare 并用非敏感示例 URL 验证线上分析接口和报告安全信号
- [ ] 提交后观察 GitHub Actions 首次安全门禁结果

## 2026-09-11 浏览器 QA Skill 集成

- [x] 新增真实 Chromium 黑盒 QA runner，覆盖 25 个公开路由
- [x] 检查页面结构、基础可访问性、图片 alt、同源 HTTP、请求失败、console/page 错误和横向溢出
- [x] 验证首页分析→报告、Teardown→Homepage Patterns 和移动端首页流程
- [x] 增加截图、JSON summary、依赖说明和 GitHub Actions workflow
- [x] 用 QA-only fixture/fallback 解决本地 D1 和外部 DNS 差异，不触碰生产分析数据
- [x] 修复 QA 发现的 GTM 图片 beacon CSP 拦截
- [x] 本地 QA 通过：`findingCount=0`
- [x] 发布 CSP 修复并线上验证首页、Website Review、Teardowns、Sitemap 和响应头
- [ ] 推送后观察 GitHub Actions 首次运行结果

## 2026-09-07 内部链接增量

- [x] 首页增加案例库与 Homepage Patterns 入口
- [x] Website Review 增加 3 组决策型入口，覆盖本轮 6 个高意图页面
- [x] 优化多链接卡片的垂直布局
- [x] 通过类型检查、生产构建、OpenNext 构建和 diff 检查
- [x] 发布到 Cloudflare，Worker 版本 `7bde15e6-f923-4446-b835-45fcae5def84`
- [x] 线上验证首页和 Website Review 新入口

## 2026-09-07 激进 GSC 增量第一批

- [x] 新增 6 个高意图证据型 SEO 页面
- [x] 新增 Slack、Webflow、HubSpot 3 个公开 Teardown
- [x] 扩展 Teardown 案例库为 8 个页面并补齐内部链接
- [x] 接入 Sitemap、`llms.txt` 和 `llms-full.txt`
- [x] 通过类型检查、生产构建、OpenNext 构建和 diff 检查
- [x] 发布到 Cloudflare，Worker 版本 `ddfa245e-fe77-476e-8aeb-2a5e7ef9c2de`
- [x] 线上验证新页面返回 200、Sitemap 含新增 URL
- [ ] 等待 GSC 抓取和数据回流，比较页面级展示、CTR、排名和分析完成

## 2026-09-07 GA4 / GSC 账号侧 P0

- [x] 在 SiteLens GA4 属性确认近期自定义事件已收到
- [x] 将 `analyze_completed` 标记为关键事件
- [x] 核对 GSC 11 个已收录页面和 3 个未收录页面的具体原因
- [x] 确认重定向项和 `pricing.md` 不属于当前 HTML 页面故障
- [ ] 等待新数据周期，比较 CTR、分析完成和真实付款事件

## 2026-09-07 GSC 增量 P0：优化已有曝光入口

- [x] 优化 `/ai-website-audit` Title、Description 和首屏说明
- [x] 增加 SEO checker 对比 FAQ 和 Stripe 完整案例入口
- [x] 通过类型检查、生产构建、OpenNext 构建和 diff 检查
- [x] 发布到 Cloudflare 并在线验证 Title、FAQ、案例链接和 Sitemap
- [ ] 等待 GSC 数据回流，比较展示、CTR、查询和分析开始率

## 2026-09-07 GSC 增量内容资产

- [x] 新增原创跨案例分析页 `/insights/homepage-patterns`
- [x] 接入 Sitemap、Teardown 内链、`llms.txt` 和 `llms-full.txt`
- [x] 添加来源、复核日期和定性分析边界
- [x] 通过类型检查、生产构建和 diff 检查
- [x] 发布到 Cloudflare 并在线验证新页面、Sitemap 和 `llms` 文件
- [ ] 等待新页面进入 GSC 数据后复核展示和查询

## 2026-09-07 GSC 查询驱动的 SEO 增量

- [x] 读取 GSC 近 28 天查询和页面数据
- [x] 优化 `/ai-website-audit` 的查询匹配、首屏说明和正文内链
- [x] 优化 `/website-review` 的页面标题和 WebPage 名称
- [x] 通过类型检查、生产构建和 diff 检查
- [x] 发布到 Cloudflare 并验证两个目标页面的线上文案和内链
- [ ] 等待新数据周期，比较优化后的 CTR、展示和平均排名

## 2026-09-07 文案 humanizer 收口

- [x] 清理公开 Teardown、报告 CTA 和案例库文案中的模板化与宣传式表达
- [x] 保留来源、日期、证据边界、价格和事件参数
- [x] 通过类型检查、生产构建和 diff 检查
- [x] 发布到 Cloudflare 并复核线上 Teardown 页面文案，Worker 版本 `ca77997e-b828-4f2e-bb6c-72be31a9789e`

## 2026-09-07 SEO / GEO 优化

- [x] 扩展根布局 Organization、WebPage、SoftwareApplication 和 Offer JSON-LD
- [x] 补齐 Open Graph locale 与 Twitter 摘要卡
- [x] 显式允许主要搜索与 AI 抓取器访问公开页面，继续禁止 `/api/`
- [x] 刷新公开 Sitemap 的 `lastModified`
- [x] 为 Website Review 和 Stripe Teardown 增加 Breadcrumb/Article 结构化数据
- [x] 扩展 `llms.txt` 并新增 `llms-full.txt`
- [x] 新增 Linear、Notion、Vercel、Figma 四个真实公开 Teardown 页面并建立内部链接
- [x] 在 Google Search Console 重新提交 `https://sitelens.win/sitemap.xml`
- [x] 重新构建并发布本轮 SEO/GEO 更新到 Cloudflare；Worker 版本 `b64d462d-f7ff-4d41-bcee-4c810e874ae4`
- [ ] 等待 GSC 抓取/索引刷新并记录实际状态
- [ ] 用 10–20 个目标查询记录 Google AI、ChatGPT、Perplexity、Gemini 的引用基线

## 当前阶段

Phase 0 可运行原型：验证“免费三问题报告 → $29 深度报告请求”是否成立。

## 2026-09-01 本轮状态

- [x] 将 Sitemap 切换为标准 Next.js `app/sitemap.ts` 路由并仅保留公开 HTML 页面
- [x] GA4 自定义事件统一附带 `page_path`，并增强发送器容错
- [x] 本地生产构建验证 Sitemap XML、robots.txt 和 GA4 标识输出
- [ ] 在 GSC 重新提交新的 Sitemap 并等待 Google 重新读取
- [ ] 在 GA4 DebugView 验证自定义漏斗事件并标记关键事件
- [ ] 完成一次真实生产付款回归

## 已完成

- [x] 首页与 URL / 产品 / 目标用户提交
- [x] HTML 抓取、超时、大小、跳转与基础 SSRF 防护
- [x] 基于页面证据的三问题免费报告
- [x] 可选 DeepSeek 增强接口
- [x] 报告页与深度报告请求入口
- [x] Waffo Pancake Checkout Session 与 webhook 路由骨架
- [x] 类型检查、生产构建、API 冒烟测试
- [x] GitHub 仓库创建与 `main` 推送
- [x] Cloudflare OpenNext Worker `sitelens` 发布
- [x] 创建 `sitelens.win/*` Worker Route
- [x] Cloudflare DNS Proxied A 记录接入并验证首页/API
- [x] 创建 Cloudflare D1 `sitelens` 数据库并完成初始迁移
- [x] 报告、升级请求与支付意向改为 D1 持久化
- [x] 验证分析写入、跨请求报告读取和升级失败状态持久化
- [x] 首页视觉重设计并发布到 Cloudflare
- [x] 首页营销文案自然化并发布到 Cloudflare
- [x] 加入 SiteLens Growth Framework 五步方法论
- [x] 报告公开 Evidence Layer：影响、证据、修复和改写方向
- [x] 加入分析过程展示和公开 Stripe Teardown 案例
- [x] 按 humanizer 规则清理信任体系可见文案
- [x] 自托管 Geist / Geist Mono 字体，避免生产构建依赖 Google Fonts
- [x] 创建 GA4 SiteLens 媒体资源与网站数据流
- [x] 在首页接入 GA4 衡量代码
- [x] 创建并验证 Google Search Console URL 前缀资源
- [x] 发布 `robots.txt` 与 `sitemap.xml` 并提交 sitemap
- [x] 为公开 API 增加请求体上限和 D1 IP 限流
- [x] 加强 SSRF 的私网、保留地址和 IPv6 拦截
- [x] 增加安全响应头、隐私页和条款页
- [x] 将报告 ID 改为完整 UUID
- [x] 增加签名订单校验和站内深度报告交付表
- [x] 接入 Qwen 视觉模型和 Cloudflare Browser Run 首屏截图
- [x] 清理错误 Qwen Secret 并验证生产含图片页面返回 AI 报告
- [x] 复核生产首页、robots.txt、sitemap.xml、GA4 和 GSC 标签
- [x] 修复 GA4 初始化脚本并重新发布
- [x] 完成 SiteLens product-design 流程并生成 `outputs/SiteLens-产品需求文档-V1.0.md`
- [x] 初始化 Superdesign 上下文与 SiteLens 设计系统
- [x] 完成 AI SEO 基础：Schema、`/website-review`、`/pricing`、`llms.txt`、`pricing.md` 和 sitemap 更新
- [x] 修复 Pricing 页页脚窄视口横向溢出并重新发布
- [x] 修复 Teardowns 页免责声明覆盖 `.shell` 居中规则的问题并重新发布
- [x] 增加 4 张 Teardown 案例卡片并压缩为案例库网格布局
- [x] 补全 GA4 漏斗事件埋点并统一事件命名
- [x] 编写 GA4 Tracking Plan 和 DebugView 验证步骤
- [x] 增加整站主要 CTA 点击追踪
- [x] 修复分析/Checkout 失败状态码、失败事件和支付价值参数
- [x] 修复公开页面 canonical、sitemap 末尾斜杠和 favicon 404
- [x] 修复 GA4 初始化竞态，将 gtag 前置到 hydration 前并在未加载完成时先写入 dataLayer
- [x] 增加 D1 服务端漏斗事实层，记录分析、报告、邮箱、Checkout 和支付交付事件
- [x] 修复 Teardown 示例 CTA 指向不存在的 `#audit-form` 锚点
- [x] 修复 `llms.txt` 中的末尾斜杠链接并刷新 sitemap `lastmod`
- [x] 增加可用的站内 404 页面，给真实访问者提供下一步路径
- [x] 修复 GA4 未加载完成时的事件队列，并保留无 PII 的漏斗参数
- [x] 增加 AI Website Audit、Landing Page Review、SaaS Website Analysis 和 Website Conversion Check 入口
- [x] 将新增 SEO 入口加入内部链接和 sitemap
- [x] 按 Impeccable init 记录 SiteLens 产品真相到 `PRODUCT.md`
- [x] 按 Impeccable critique 完成首页双评审并写入 `.impeccable/critique/`
- [x] 按 Impeccable audit 完成首页无障碍、性能、响应式、主题和实现完整性审计
- [x] 按 Impeccable 推荐完成首页对比度、证据卡、付费边界、框架映射、移动导航、触控尺寸和分析等待控制优化
- [x] 发布 Impeccable 首页修复并完成 1280px 桌面、390px 手机和 Teardown 四卡片线上验收

## 下一步

- [ ] 用 5–10 个真实 Indie Hacker / 小 SaaS 首页进行人工质量复核
- [x] 在 Pancake 创建 `$29` 一次性产品并取得 Product ID `PROD_28rexkec6xEqGx2QMHEcJi`
- [x] 创建 SiteLens 专用生产 API 密钥并配置商户/签名密钥
- [x] 将 `https://sitelens.win/api/webhooks/waffo` 配置到 Pancake
- [x] 将 Waffo 生产变量写入 Cloudflare Secrets
- [ ] 根据真实反馈决定付费报告是否升级到 `qwen3.7-plus`
- [ ] 为公开 Teardown 增加受控截图和页面快照存档
- [ ] 在证据充分后再实现行业 Benchmark，不展示无来源的平均值
- [ ] 等待 Search Console 完成更新后 sitemap 抓取并复核状态
- [ ] 等待 GA4 开始接收数据后检查实时报告
- [x] 在 Waffo 配置生产凭证、商品和 webhook 公钥
- [ ] 完成一次真实生产付款回归并确认深度报告可解锁
- [ ] 在 Search Console/GA4 后台确认平台侧抓取和实时事件
- [ ] 在 GA4 Admin 将关键漏斗事件标记为转化并用 DebugView 验证
- [x] 查询近 30 天 D1 服务端失败分布：当前 1 次 `analyze_failed` 为 400，未发现 504 超时；继续积累真实流量后再判断是否需要优化抓取时限
- [x] 发布 AI SEO 更新到 Cloudflare
- [x] 在 Search Console 重新提交 sitemap，并等待新页面抓取
- [ ] 用 10–20 个目标查询记录 Google AI、ChatGPT、Perplexity、Gemini 的品牌/页面引用基线
- [x] 执行 `research/analytics-funnel.sql` 并建立首个 30 天服务端漏斗基线：1 次分析开始、1 次完成、1 次报告查看、1 次 400 失败，暂无 Checkout/付款事件
- [ ] 根据真实查询结果补充一个有独立证据的主题内容集群，不批量生成薄页面
- [x] 确定 Superdesign 首个目标页面为首页并生成现有页面复现稿
- [x] 从复现稿分支生成 Audit Workspace 和 Teardown Magazine 设计变体
- [ ] 用户批准最终视觉方向后，再将设计稿实现为业务代码
