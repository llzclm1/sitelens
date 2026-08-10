# SiteLens 页面依赖树

## `/` 首页

入口：`app/page.tsx`

依赖：

- `app/page.tsx`
  - Next.js `next/navigation`：`useRouter`
  - `app/globals.css`（通过根布局加载）
  - 外部 Unsplash Hero 图片

页面包含：顶部导航、Hero、URL/产品/受众分析表单、分析过程、输入证据带、Growth Framework、方法论、公开 Teardown 入口、收束 CTA 和页脚。

## `/report/{id}` 报告页

入口：`app/report/[id]/page.tsx`

依赖：

- `app/report/[id]/page.tsx`
  - `next/navigation`：`notFound`
  - `@/components/ReportClient`
    - `next`：`FormEvent`
    - `next/link`
    - `next/navigation`：`useSearchParams`
  - `@/lib/store`
  - `app/globals.css`（通过根布局加载）

页面包含：支付状态带、付费深度报告、报告头、方向性评分、页面证据带、Growth Framework、三项问题、Evidence Layer、Deep Growth Report 升级卡和页脚。

## `/teardowns` 公开案例列表

入口：`app/teardowns/page.tsx`

依赖：

- `app/teardowns/page.tsx`
  - `next/link`
  - `app/globals.css`（通过根布局加载）

## `/teardowns/stripe` Stripe 公开案例

入口：`app/teardowns/stripe/page.tsx`

依赖：

- `app/teardowns/stripe/page.tsx`
  - `next/link`
  - `app/globals.css`（通过根布局加载）

## `/privacy` 隐私页

入口：`app/privacy/page.tsx`

依赖：

- `app/privacy/page.tsx`
  - `next/link`
  - `app/globals.css`（通过根布局加载）

## `/terms` 条款页

入口：`app/terms/page.tsx`

依赖：

- `app/terms/page.tsx`
  - `next/link`
  - `app/globals.css`（通过根布局加载）

## 设计目标建议

- 首页是主要转化目标，优先作为现有 UI 重设计/复现对象。
- 报告页是主要价值交付目标，优先作为第二个设计对象。
- Teardown 页面用于信任和 SEO，可从现有首页/报告页视觉系统延展。

