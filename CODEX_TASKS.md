# SiteLens 任务状态

## 当前阶段

Phase 0 可运行原型：验证“免费三问题报告 → $29 深度报告请求”是否成立。

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

## 下一步

- [ ] 用 5–10 个真实 Indie Hacker / 小 SaaS 首页进行人工质量复核
- [ ] 在 Pancake 创建 `$29` 一次性产品并配置商户/签名密钥
- [ ] 将 `https://sitelens.win/api/webhooks/waffo` 配置到 Pancake
- [ ] 将 Waffo 生产变量写入部署环境并重新发布
- [ ] 根据真实反馈决定付费报告是否升级到 `qwen3.7-plus`
- [ ] 为公开 Teardown 增加受控截图和页面快照存档
- [ ] 在证据充分后再实现行业 Benchmark，不展示无来源的平均值
- [ ] 等待 Search Console 完成 sitemap 首次抓取并复核状态
- [ ] 等待 GA4 开始接收数据后检查实时报告
- [ ] 在 Waffo 配置生产凭证、商品和 webhook 公钥
- [ ] 完成一次真实生产付款回归并确认深度报告可解锁
- [ ] 在 Search Console/GA4 后台确认平台侧抓取和实时事件
