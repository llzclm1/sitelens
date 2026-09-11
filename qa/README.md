# SiteLens 浏览器 QA

这套 QA 用真实 Chromium 黑盒检查公开页面和关键入口，不访问生产分析接口。首页提交流程只发送到本地生产服务；QA 模式使用固定公开页面 fixture，绕开测试环境的外部 DNS/网络差异，并通过本地 fallback store 验证真实报告页面跳转。

## 覆盖范围

- 25 个公开页面：HTTP 响应、`h1`、`main`、链接/按钮名称、表单标签、图片 `alt` 和横向溢出。
- 首页分析提交：填写 URL、产品和受众，点击 `Analyze a site`，验证跳转到报告路径。
- Teardown → Homepage Patterns 导航及 Slack、Webflow、HubSpot 三张卡片。
- 1440px 桌面和 390px 移动视口截图。
- 同源 HTTP 4xx/5xx、请求失败、`console.error` 和 `pageerror`。

## 本地运行

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r qa/requirements.txt
python -m playwright install chromium
npm run build
npm run start -- -p 3000
```

另开终端运行。由于本地 `next start` 没有 Cloudflare D1 迁移，若要验证分析→报告闭环，请用 QA fallback 启动：

```bash
SITELENS_QA=1 npm run start -- -p 3000
```

QA 模式只在本地/CI 生效：使用内存存储和固定 HTML fixture，不调用抓取、截图或 AI 供应商，不改变生产路径。

另开终端运行：

```bash
npm run qa:smoke
```

截图和 `summary.json` 写入 `output/playwright/`，该目录不会提交到 Git。GitHub Actions 会在每次 `main` push 和 Pull Request 中自动运行，并保留这些文件为构建 artifact。
