# ICS LAB Website

东华大学 ICS LAB 官方网站源码。项目已从 React/Vite 与独立内容仓库重构为一个由
[Jekyll](https://jekyllrb.com/) 驱动的单仓库：页面模板、Markdown 内容、双语配置、图片、论文附件、测试和 GitHub Pages 发布流程全部由本仓库统一管理。

- 线上地址：<https://icslab822.github.io/ics-lab-portal/>
- 源码仓库：<https://github.com/ICSLAB822/ics-lab-portal>
- 当前版本：1.0.0
- 默认分支：`main`

## 技术架构

Jekyll 在构建时把 Liquid 模板、YAML 数据和 Markdown 集合生成纯静态 HTML；Tailwind CSS 编译为本地静态文件；浏览器端仅使用原生 JavaScript 完成语言/主题切换、响应式导航、搜索、筛选、弹窗、相册和公告交互。网站不依赖运行时 CMS、数据库或第二个内容仓库。

主要版本由锁文件固定：Ruby 3.3、Jekyll 4.4、Node.js 24、Tailwind CSS 3.4、Playwright 1.58。GitHub Actions 使用同一 Ruby/Node 主版本构建。

## 快速开始

### 1. 使用项目专属 Conda 环境（推荐）

```sh
conda env create -f environment.yml
# 环境已存在时使用：conda env update -f environment.yml --prune
conda activate ics-homepage
bundle install
npm ci --ignore-scripts
npx playwright install chromium
```

`environment.yml` 只使用 conda-forge 的跨平台包，可在 macOS 和 Linux 上创建环境。Windows 建议在 WSL2 中运行。若不使用 Conda，请自行准备 Ruby 3.3、Bundler、Node.js 24 及本机编译工具，再执行后三条命令。

### 2. 本地预览

```sh
npm run dev
```

打开 <http://127.0.0.1:4000/ics-lab-portal/>。Jekyll 会监听内容和模板变化；修改 Tailwind 类名后需重新生成 CSS，可在另一终端运行：

```sh
npm run watch:css
```

如果不想激活环境，可以把命令写成：

```sh
conda run -n ics-homepage npm run dev
```

### 3. 发布前完整检查

```sh
JEKYLL_ENV=production npm run check
npm run audit:production
```

`npm run check` 会依次执行 CSS/Jekyll 构建、内容和链接验证、三种 `baseurl` 构建、Chromium 浏览器回归、WCAG 2.1 A/AA 无障碍检查，以及公告生命周期测试。第一次运行浏览器测试前需安装 Chromium。需要复核 Firefox 和 WebKit 时执行：

```sh
npx playwright install firefox webkit
CROSS_BROWSER=1 npm test
```

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 编译 CSS 并启动 Jekyll 开发服务器 |
| `npm run watch:css` | 监听 Tailwind 源文件并更新已签入的 CSS |
| `JEKYLL_ENV=production npm run build` | 生成生产站点到 `_site/` |
| `npm run validate` | 检查内容字段、资源、HTML、内部链接和 PDF 签名 |
| `npm run test:baseurls` | 在根路径、嵌套路径和 Pages 路径下分别构建验证 |
| `npm test` | 运行页面、交互、响应式、Markdown 和无障碍回归 |
| `npm run test:announcement` | 自启动隔离预览，验证三种公告主题与日期边界 |
| `npm run test:smoke` | 对一个已启动的本地站点做快速冒烟检查 |
| `npm run check` | 执行发布前的完整本地检查链路 |
| `npm run audit:production` | 审计生产 npm 依赖；本项目运行时无 npm 依赖 |

生成的 `assets/css/tailwind.css` 需要签入 Git，因此 Pages 构建和纯 Ruby 构建都能使用一致样式。`_site/`、Playwright 报告和视觉截图是本地产物，不应提交。

## 目录结构

```text
.
├── _config.yml                 # Jekyll、集合、URL 与排除规则
├── _data/                      # 实验室、招聘、公告、UI 配置
├── _includes/                  # 导航、页脚、搜索、弹窗等可复用片段
├── _layouts/                   # 默认页和三类详情页模板
├── _plugins/                   # 构建期排序/兼容处理
├── content/
│   ├── _news/                  # 新闻 Markdown
│   ├── _projects/              # 已核实项目 Markdown
│   ├── _publications/          # 论文 Markdown
│   ├── _people/                # 成员 YAML front matter
│   └── _gallery/               # 相册 YAML front matter
├── content-review/             # 未核实、重复或仅供追溯的资料，不发布
├── assets/files/               # 图片、PDF、幻灯片、海报等静态资源
├── assets/js/app.js            # 原生浏览器交互
├── styles/                     # Tailwind 入口与样式源文件
├── scripts/                    # 构建校验、fixture、冒烟与迁移工具
├── tests/                      # Playwright 回归与 axe 无障碍测试
├── docs/refactor/              # 重构依据和验收记录
└── .github/workflows/          # CI 与 GitHub Pages 发布
```

`search-index.json` 和 `legacy-routes.json` 是含 Liquid 的构建输入，不要把它们当成普通 JSON 直接解析；Jekyll 会生成最终文件。旧 React hash 地址仍会按映射跳转到新路由。

## 内容维护

所有内容文件必须是 UTF-8，YAML front matter 用 `---` 包围。文件名会进入永久链接，发布后不要随意改名；若必须改名，应同时更新内部链接和 `legacy-routes.json`，再运行完整检查。

### 新闻

在 `content/_news/YYYY-MM-DD-short-slug.md` 新建文件：

```yaml
---
title: Paper Accepted at Example Conference
date: 2026-09-05
tag: Conference
imageUrl: example.webp
summary: A short summary shown on the news list and in search.
---

正文使用 Markdown。
```

`date` 必须是完整的 `YYYY-MM-DD` 日历日期；前端按固定 UTC 日历值格式化，切换时区不会显示成前一天。图片放入 `assets/files/news/`，`imageUrl` 只写文件名。

### 论文

在 `content/_publications/slug.md` 新建文件：

```yaml
---
title: "Paper title"
authors: [First Author, Second Author]
venue: IEEE Example 2026
year: 2026
location: Shanghai, China       # 可选
track: Conference               # 仅 Conference 或 Journal
topic: Mobile Sensing           # 用于筛选
tags: [Mobile Sensing, Security]
award: Best Paper Award         # 可选
imageUrl: example.png           # 可选
pdfUrl: example.pdf             # 可选
slidesUrl: example-slides.pdf   # 可选
posterUrl: example-poster.pdf   # 可选
codeUrl: https://github.com/... # 可选，必须是真实链接
demoUrl: https://...            # 可选，必须是真实链接
extendedFrom: conference-slug   # 期刊扩展版重复摘要时必须声明
imageCaption: "Fig. 1: ..."     # 可选
---

这里填写摘要正文。
```

论文图片/PDF/幻灯片/海报均放在 `assets/files/publications/`。同一摘要出现于会议版和期刊扩展版时，后者必须通过 `extendedFrom` 指向已存在的会议论文 slug；否则内容验证会阻止发布。不要用 `#`、`example.com` 或虚构链接占位，未知资源请直接省略字段。

更细的批量导入规则见 [论文内容维护指南](agent-skills/publication-import.md)。

### 成员

成员位于 `content/_people/`，正文通常为空，字段示例：

```yaml
---
id: unique-id
name_en: First Last
name_zh: 中文姓名
role_en: PhD Students
role_zh: 博士生
institution: Donghua University
institution_zh: 东华大学
imageUrl: member.jpg
email: name@example.edu
website: https://...
researchInterests_en: [Security, Mobile Sensing]
researchInterests_zh: [安全, 移动感知]
period_en: 2026 - Present
period_zh: 2026 - 至今
order: 2026
bio_en: ""                     # 可选；有内容时才显示简介按钮
bio_zh: ""
---
```

头像放在 `assets/files/people/`。成员搜索结果使用稳定锚点 `/members/#member-<slug>`。不要复制其他成员简介作为占位；验证器会拦截重复的非空简介。

### 项目

已核实项目放在 `content/_projects/`，至少包含 `title`、`agency`、`duration`、`status`（`Ongoing`/`Completed`）、`type` 和正文。当前未核实的历史项目保存在 `content-review/unverified/projects/`，因此线上项目页会显示资料整理中的空状态。只有负责人确认真实性后才应移入发布集合。

### 相册

相册位于 `content/_gallery/`，需提供 `id`、中英文标题、`coverUrl`、`order` 和 `items` 列表。每个条目包含唯一 `id`、`imageUrl`、`caption_en` 和 `caption_zh`。所有图片放入 `assets/files/gallery/`。

### 实验室信息、招聘与公告

- `_data/lab.yml`：名称、首页介绍、联系方式、社交链接和响应式 hero 图片。
- `_data/join_us.yml`：毕业去向、岗位、要求、FAQ 和申请方式。
- `_data/announcement.yml`：全屏公告。草稿保持 `enabled: false`；启用时必须提供 `startDate`、`endDate`、`title`、`actionText` 和真实 `actionUrl`。起止日期按 UTC 日历日闭区间计算。

首页 hero 每张图使用 `small`（约 960px）和 `large`（约 1920px）两个版本，以及 `alt_en`/`alt_zh`。首图立即加载，其余图片按轮播需要懒加载；不要重新放回多兆字节原图。

### Markdown 规则

新闻、项目和论文正文由 Jekyll/Kramdown 原生渲染。页面标题已经是 `h1`，正文从 `##` 开始。段落之间留空行；列表、表格、引用、围栏代码、图片和链接均受 `.content-body` 样式约束，长代码/表格在正文内滚动。

内部地址必须经过 `relative_url`，例如：

```markdown
[查看新闻]({{ '/news/' | relative_url }})
```

Liquid 和原始 HTML 会在构建时执行/输出，因此只接受经过审阅的仓库内容，不要直接粘贴不可信用户输入。修改 Markdown 处理或详情模板后，至少运行 `npx playwright test tests/markdown.spec.cjs`。

## 内容发布流程

1. 从最新 `main` 创建分支；添加/修改 Markdown、YAML 和资源。
2. 若改了 HTML 中的 Tailwind 类，运行 `npm run build:css` 并提交生成的 CSS。
3. 本地运行 `JEKYLL_ENV=production npm run check` 和 `npm run audit:production`。
4. 检查 `git diff`，在 [CHANGELOG.md](CHANGELOG.md) 的 `Unreleased` 记录面向用户的变化。
5. 提交并推送分支，等待 `Validate Jekyll site` 工作流通过后合并到 `main`。
6. `main` 会触发 `Deploy to GitHub Pages`；必须等 build 与 deploy 两个 job 均成功。
7. 打开线上首页，并抽查新闻/论文详情、搜索、移动导航、中文和深色模式。

CI 对非 `main` push 和 pull request 做 Chromium 全量检查；Pages 工作流在 `main` 上额外使用 Chromium、Firefox、WebKit 复核核心响应式流程，再上传 `_site/`。

## GitHub Pages 首次配置

仓库管理员只需配置一次：

1. GitHub 仓库进入 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **GitHub Actions**。
3. **Settings → Actions → General** 允许仓库运行 Actions。
4. 确认工作流权限可写 Pages；仓库中的 workflow 已声明 `pages: write` 和 `id-token: write`。
5. 推送 `main` 或在 Actions 中手动运行 **Deploy to GitHub Pages**。

项目站点必须保留 `_config.yml` 中的：

```yaml
url: https://icslab822.github.io
baseurl: /ics-lab-portal
repository: ICSLAB822/ics-lab-portal
```

更换仓库名、组织名或自定义域名时必须同步更新这些值、`package.json` 的 `homepage`、README 链接以及相关 Pages 设置，并运行 `npm run test:baseurls`。不要提交 `.nojekyll`：当前工作流上传的是已经完成构建的 `_site/`。

## 发布失败与回滚

- **Bundle/Jekyll 找不到依赖**：确认正在 `ics-homepage` 环境，运行 `bundle install`，不要使用 macOS 系统 Ruby。
- **页面没有新样式**：运行 `npm run build:css`，确认 `assets/css/tailwind.css` 已提交。
- **资源线上 404**：检查文件名大小写、标点和目录；GitHub Pages 文件系统区分大小写。
- **子路径链接错误**：不要硬编码 `/assets/...`，使用 include 或 `relative_url`，并运行 `npm run test:baseurls`。
- **Playwright 缺浏览器**：运行 `npx playwright install chromium`；Linux CI 使用 `--with-deps` 安装系统依赖。
- **Pages 显示 404**：确认 Source 是 GitHub Actions、deploy job 成功、访问地址含 `/ics-lab-portal/`，并查看 Actions 的 `github-pages` environment URL。

若线上版本需要立即回滚，优先使用 `git revert <bad-commit>` 创建可追溯的反向提交并推送 `main`，不要强推或重写公共历史。旧 React 版本保存在 `pre-jekyll-portal` 标签；原内容仓库导入前状态保存在 `pre-merge-content`。它们用于审计/恢复，不再参与当前构建。

## 质量与安全边界

- 内容验证会检查必填字段、日期、状态、重复正文/成员简介、占位链接、路径穿越、资源存在、公告配置和论文扩展关系。
- 输出验证会检查生成页面数量、内部资源和链接、成员锚点、搜索索引与 PDF 文件签名。
- Playwright 覆盖八类页面、响应式导航、搜索、主题/语言、日期时区、Markdown、公告和 axe WCAG 2.1 A/AA；核心流程可在三种浏览器引擎运行。
- 外部网站是否长期可用不由本仓库保证；新增外链前仍需人工核实。
- 仓库包含公开论文 PDF 和成员联系方式，提交前应确认发布授权，不要加入密钥、个人隐私或未公开材料。

## 单仓库迁移说明

原 `ics-lab-content` 的完整 Git 历史已通过非 squash 合并导入（导入提交 `88d5abe`）。`ics-lab-portal` 现为唯一权威仓库；旧 sibling 仓库仅作为备份，不是构建输入。未核实、冲突和重复资料统一保存在 `content-review/` 且被 Jekyll 排除。详细过程和验收证据见 [重构验收记录](docs/refactor/status.md) 与 [内容合并记录](docs/refactor/content-merge.md)。

## 许可

图标许可见 [LICENSE-icons.txt](LICENSE-icons.txt)。仓库其余代码和内容目前未声明通用开源许可证；复制、再发布或商用前请联系 ICS LAB 维护者确认授权。
