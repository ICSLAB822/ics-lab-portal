# 更新日志

本文件记录面向站点维护者和访问者的重要变化。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循语义化版本。

## Unreleased

### 修复

- 修正 ICPADS 2025 AURORA 论文详情链接的大小写，使其可在 Linux/GitHub Pages 的大小写敏感文件系统上解析。
- 站点验证器现在会在大小写不敏感的本地文件系统上识别路径大小写错误，避免同类问题仅在 CI 中暴露。
- 保留空的项目 collection 目录，并让端到端测试在 collection 尚无 Markdown 条目时按零条处理。
- 更新 GitHub Actions 基础、Node、Pages 与制品操作至 Node.js 24 版本，消除托管运行器的 Node.js 20 弃用警告。

## 1.0.0 - 2026-09-05

### 新增

- 建立 Jekyll 4.4 静态站点架构：collections、Liquid layouts/includes、YAML data、Kramdown 正文渲染和构建期搜索索引。
- 建立项目专属 `ics-homepage` Conda 环境和 Ruby/Node 锁定依赖。
- 新增首页、新闻、项目、论文、成员、相册、招聘、联系、详情页和 404 页的静态路由。
- 新增主题/语言切换、站内搜索、论文筛选与 BibTeX、成员简介、相册灯箱、FAQ、公告和返回顶部等原生 JavaScript 交互。
- 新增可展开的小/中宽度导航；1280px 起恢复横向导航，并支持键盘、Escape、滚动锁、焦点恢复和矮屏内部滚动。
- 新增内容、资源、HTML、链接、PDF、baseurl 和公告配置验证脚本。
- 新增 Playwright 回归、Markdown fixture、日期时区、响应式布局、跨浏览器核心流程和 axe WCAG 2.1 A/AA 无障碍测试。
- 新增 GitHub Actions CI、GitHub Pages 构建部署和 Dependabot 月度更新配置。

### 变更

- 将 `ics-lab-content` 的完整 Git 历史非 squash 合并进 `ics-lab-portal`，网站内容、附件、模板、测试和部署改由单仓库管理。
- 从 React/Vite 运行时 Markdown 加载全面迁移到 Jekyll 构建时生成，同时保持原有 UI 视觉风格与功能范围。
- 将 Tailwind 从 CDN/运行时依赖改为本地构建并签入压缩 CSS。
- 正文改由 Jekyll/Kramdown 单次语义化渲染，补齐标题、列表、表格、引用、代码、图片、长内容溢出和明暗主题样式。
- 所有内部 URL 和资源路径适配根目录、任意嵌套目录及 GitHub Pages `/ics-lab-portal` 前缀；保留旧 hash 地址兼容跳转。
- 首页 hero 改为 960/1920px 响应式 JPEG，非首屏轮播图按需加载，显著降低初始图片传输。
- 日期按 UTC 日历值格式化，避免不同时区把新闻日期显示成前一天。
- 搜索结果中的成员链接改为可聚焦的稳定锚点；动态搜索状态、筛选器、弹窗和操作控件补齐中英文及无障碍名称。

### 修复

- 修复 Markdown 标记被转义、重复渲染和移动端长代码/表格撑破页面的问题。
- 修复中等宽度和矮屏下导航链接超出视口、控件重叠、焦点丢失及背景滚动问题。
- 修复重复新闻、两条新闻的论文内容错配、虚假联系方式/占位链接和成员姓名拼写。
- 移除错误复制到客座教授名下的他人简介，并增加成员简介重复检测。
- 对确为会议版与期刊扩展版共用的两组论文摘要增加显式 `extendedFrom` 关系。
- 将未核实的历史新闻、项目、论文和重复资料移入不发布的 `content-review/`，项目页提供明确空状态，避免示例内容被误当作事实上线。
- 修复明暗主题下的次要文字、状态标签等 WCAG AA 对比度问题。

### 移除

- 移除 React、Vite、TypeScript 入口、运行时内容拉取、旧索引生成脚本和 `.nojekyll`。
- 移除对独立 `ics-lab-content` checkout 的构建依赖以及失效的 `#` 资源链接。

### 迁移与恢复

- 旧 portal 状态保留为 `pre-jekyll-portal` 标签。
- 内容仓库导入前状态保留为 `pre-merge-content` 标签。
- 内容历史导入提交为 `88d5abe`；详细验收见 `docs/refactor/status.md`。
