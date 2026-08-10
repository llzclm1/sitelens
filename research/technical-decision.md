# AI Website Critic 技术方案确认

本方案针对开发前 V1 评审，结论是“技术上可做，但不要把 Playwright、长任务和视觉 AI 塞进一个同步 API 请求”。推荐先用一个 TypeScript 技术栈完成文本证据版，再根据付费验证决定是否加入多模态模型。

## 推荐方案

| 层 | 推荐 | 原因 |
|---|---|---|
| Web 应用 | Next.js App Router + TypeScript + Tailwind CSS | 前端、页面路由和薄 API 层在一个项目内，适合快速验证 |
| API | Next.js Route Handlers | 官方支持在 `app` 目录中定义 GET/POST 等请求处理器；不需要额外 FastAPI 服务 |
| 抓取任务 | 独立 Node.js Worker + Playwright Chromium | Playwright 与 TypeScript 同栈，浏览器运行时、超时和资源限制更容易隔离 |
| 任务状态 | Supabase Postgres 的 `analysis_jobs` 表 | 先用数据库队列和租约即可，不先引入 Redis 或复杂工作流 |
| 报告/截图 | Supabase Storage 私有 Bucket + Postgres 报告 JSON | 报告结构可查询，截图/PDF 不塞进数据库；通过签名 URL 分享 |
| AI 文本分析 | DeepSeek V4 Flash 为免费扫描，V4 Pro 为付费深度报告候选 | 官方提供 JSON Output；价格低，适合先做文本证据分析 |
| AI 视觉分析 | 暂不锁定；若视觉判断是 P0，另接多模态提供商 | DeepSeek V4 当前为纯文本模型，截图捕获不等于截图理解 |
| 状态更新 | 前端轮询 `GET /api/analysis/:id` | 比 WebSocket 简单，足够支持 60–120 秒级的分析流程 |
| 部署 | Web 应用可部署在 Vercel；Worker 使用支持 Chromium 的 Node 容器 | 把浏览器依赖和长任务从请求层隔离，降低部署耦合 |

## 为什么不选 Next.js + FastAPI

### Next.js Route Handlers 方案

**优点**：

- 一个仓库、一套 TypeScript 类型和更少的部署配置。
- Route Handlers 原生使用 Web `Request`/`Response`，足够承载 URL 校验、创建任务、查询报告和支付回调。
- Playwright 本身有 Node.js/TypeScript 生态，不需要为浏览器抓取引入 Python 层。

**限制**：

- 不应让 Route Handler 同步等待浏览器、多个页面请求和 LLM 全部完成。
- 如果部署到函数平台，要受函数最大时长、内存、Bundle 大小、请求体等限制。

### Next.js + FastAPI 方案

**适合的情况**：已有 Python 抓取/数据科学团队、需要大量 Python 专用库，或后续要把分析模型放在 Python 服务中。

**当前不适合的原因**：

- V1 没有 Python 专用能力，增加两个服务、两套依赖、两套部署和跨语言类型同步。
- 不能解决浏览器抓取的核心问题；Playwright 仍需要合适的运行环境和任务隔离。

**结论**：V1 先不用 FastAPI。保留未来将 Worker 拆成 Python 服务的可能，但不为它提前搭建边界。

## 建议的分析流程

1. **校验 URL**：只允许 `http`/`https`；标准化主机名；拒绝用户凭据、非标准危险协议和不必要端口。
2. **创建任务**：写入 `analysis_jobs`，状态为 `queued`，返回分析 ID，不在请求内执行完整抓取。
3. **领取任务**：Worker 以租约方式领取任务；同一任务只能有一个有效 Worker。
4. **访问页面**：Playwright 使用隔离 BrowserContext，不携带用户 Cookie、Authorization 或本机代理信息。
5. **采集证据**：保存标题、Meta、Heading、可见文本、链接摘要、图片 alt、Schema、CTA 候选、桌面截图和必要的移动截图。
6. **限制资源**：初始建议设置 5 次以内跳转、固定总超时、响应体大小上限、单页分析和 Chromium 进程上限；具体数值通过压测确认。
7. **生成结构化结果**：先让模型返回 JSON，再由服务端校验分数范围、枚举值和必填字段；不要直接渲染模型原文。
8. **生成报告**：把观察事实、推断、问题、影响、建议和改写分别保存，网页端按优先级渲染。
9. **完成任务**：更新 `analysis_jobs` 为 `completed` 或 `failed`，记录错误阶段、模型版本、Prompt 版本和耗时。

## 最小数据模型

| 表/对象 | 关键字段 | 保存策略 |
|---|---|---|
| `analysis_jobs` | id、url、normalized_host、status、stage、started_at、finished_at、error_code | 长期保留任务状态和错误摘要 |
| `source_snapshots` | job_id、title、meta、headings、schema、cta_candidates、content_hash | 保存结构化证据；原始 HTML 默认短期保留或不持久化 |
| `reports` | job_id、tier、score、pillars、issues、rewrites、model、prompt_version | 报告 JSON 为主，便于重渲染和评估 |
| `artifacts` | job_id、kind、storage_path、expires_at | 截图/PDF 存 Storage，使用签名 URL |
| `leads` | email、job_id、consent_at | 只在用户主动保存/接收报告时收集 |
| `payments` | provider、external_id、status、job_id、amount | 只存支付验证所需字段，不存卡数据 |

## AI 方案确认

### DeepSeek 可以做什么

DeepSeek 官方文档当前列出 V4 Flash 和 V4 Pro，并支持 JSON Output；V4 Flash 与 V4 Pro 的价格分别为：输入 cache miss $0.14/$0.435 每百万 token，输出 $0.28/$0.87 每百万 token。价格会变化，实际成本必须按 token 用量和截图/其他模型成本重新计算。

来源：[DeepSeek 模型与价格](https://api-docs.deepseek.com/quick_start/pricing/)、[JSON Output](https://api-docs.deepseek.com/guides/json_mode/)。

### DeepSeek 当前不能直接满足什么

DeepSeek 官方的 Copilot 接入说明写明 DeepSeek V4 为纯文本模型，图片由另一个已安装的视觉模型代理描述后再交给 DeepSeek。因此本项目不能把 Playwright 截图直接传给 DeepSeek 并把结果称为视觉分析。

来源：[DeepSeek Vision Support 说明](https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot/)。

### 处理建议

- **文本版 V1**：使用截图做用户可见证据和人工评估，但模型主要分析结构化 HTML/文本/Meta 数据。
- **视觉版 P1**：单独评估具备图像输入的模型。OpenAI 官方文档说明其最新模型支持文本和图片输入；Anthropic 官方文档也明确支持 vision，但两者的价格、保留策略和输出稳定性需单独验证。

来源：[OpenAI 模型能力](https://developers.openai.com/api/docs/models)、[OpenAI 图片输入示例](https://platform.openai.com/docs/quickstart/make-your-first-api-request)、[Anthropic Vision](https://docs.anthropic.com/en/docs/welcome)。

### 结构化输出要求

报告模型输出必须包含：

- `score` 与评分依据。
- `pillars` 与每个维度的证据。
- `issues[]`：问题、页面证据、转化影响、建议、改写、优先级、置信度。
- `unknowns[]`：页面无法判断的内容。

DeepSeek JSON Output 文档同时提醒可能出现空内容或截断，所以服务端必须做 JSON 解析、schema 校验、重试和失败降级。

## 部署与长任务

Next.js Route Handlers 可以承载 API，但抓取和 LLM 分析应通过 Worker 异步执行。Vercel 当前文档列出 Node.js Function 的内存、Bundle、请求体和最大时长限制；即使长任务时长已经提高，也不代表把 Chromium 直接绑在同步用户请求里是合理的架构。

来源：[Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)、[Vercel Function Limits](https://vercel.com/docs/functions/limitations)、[Vercel 长任务说明](https://vercel.com/changelog/vercel-functions-can-now-run-up-to-30-minutes)。

Playwright 官方文档说明它需要安装对应浏览器二进制，并支持截图、全页截图和移动设备模拟；这正是把它放入独立 Node Worker 而不是轻量 API 层的理由。

来源：[Playwright 安装](https://playwright.dev/docs/intro)、[Playwright 截图](https://playwright.dev/docs/screenshots)。

## 数据库与存储选择

### 为什么 V1 推荐 Supabase

- 产品要保存分析任务、报告、邮箱和未来支付状态，托管 Postgres 比本地 SQLite 更适合多人访问和部署。
- Supabase 每个项目提供完整 Postgres，并提供 RLS、备份和 Storage；截图/PDF 适合放在私有 Bucket。
- 若只是本地 prompt 实验，SQLite 仍然是最简单选择，但不作为公开 beta 的默认存储。

来源：[Supabase Database](https://supabase.com/docs/guides/database/overview)、[Supabase Storage](https://supabase.com/docs/guides/storage)。

### 不先使用的组件

- Redis：任务量小的时候，数据库队列表加租约够用。
- 向量数据库：V1 没有可验证的 benchmark 数据，不需要提前做 RAG。
- Supabase Edge Functions：官方建议 Edge Functions 适合短生命周期任务，重型长任务应移动到 background workers；它不应承担 Chromium 抓取主流程。

来源：[Supabase Edge Functions](https://supabase.com/docs/guides/functions)。

## 安全边界

这是 URL 抓取产品的 P0，不是上线后再补的优化：

- 解析 URL 后进行 DNS 解析，阻止 loopback、私有网段、link-local、云元数据地址和重绑定绕过。
- 限制协议、端口、重定向次数、响应大小、资源数量和单任务时长。
- 不发送用户 Cookie、Authorization、内部代理头或服务器环境变量。
- 将抓取到的页面文本视为不可信数据，明确隔离网页中的 prompt injection，不让网页内容改变系统指令或触发工具调用。
- 对公共接口限流、去重和 CAPTCHA/挑战机制做预算保护。
- 原始 HTML 和截图按最短需要保存，并提供删除策略。

SSRF 防护依据：[OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)。

## 技术闸门

开始开发前必须确认：

1. 视觉分析是 P0 还是 P1。
2. 是否接受文本证据版先上线。
3. Worker 的实际部署平台能否运行 Chromium。
4. 原始 HTML、截图和报告分别保存多久。
5. DeepSeek 与视觉模型的单次成本上限。
6. 报告 JSON schema 和评分 rubric。
