# Jekyll 单仓库重构验收记录

更新日期：2026-09-05；发布候选分支：`refactor/jekyll-monorepo`；版本：1.0.0。

## 结论

本地迁移与生产发布前验收已完成。`ics-lab-portal` 现在同时管理 Jekyll 模板、内容、资源、测试和 GitHub Pages 工作流，不再依赖 `ics-lab-content` checkout、React/Vite 或运行时 Markdown 拉取。界面视觉风格保留，响应式导航、Markdown 正文、双语与无障碍行为完成专项修复。

正式线上状态以 GitHub `main` 分支最新一次 **Deploy to GitHub Pages** 工作流和其 `github-pages` environment URL 为准；本记录不以本地结果替代远程发布结果。

## 阶段验收

| 阶段 | 状态 | 验收结果 |
| --- | --- | --- |
| 0. 基线与隔离环境 | 通过 | 创建 `ics-homepage` Conda 环境；使用 Ruby 3.3、Jekyll 4.4、Node 24；旧站标签为 `pre-jekyll-portal`。 |
| 1. 内容仓库合并 | 通过 | 通过非 squash 提交 `88d5abe` 导入完整内容历史；原内容仓库状态保留为 `pre-merge-content`。 |
| 2. Jekyll 底层迁移 | 通过 | collections、Liquid templates/data、Kramdown、静态路由、搜索索引和旧 hash 路由完成；删除 React/Vite 运行链路。 |
| 3. 页面与交互迁移 | 通过 | 首页及八类页面、三类详情页、搜索、筛选、BibTeX、简介、相册、FAQ、公告、主题与语言切换完成。 |
| 4. 响应式与无障碍 | 通过 | 1280px 以下使用可展开导航；修复矮屏滚动、焦点恢复、对比度和 ARIA；axe WCAG 2.1 A/AA 无违规。 |
| 5. 内容治理 | 通过 | 发布 3 新闻、87 论文、14 成员、3 相册；未核实项目不发布；重复/错配/占位资料移入 `content-review` 或删除。 |
| 6. 性能与兼容 | 通过 | hero 生成 960/1920px 响应式版本并按需加载；日期时区稳定；核心流程通过 Chromium、Firefox、WebKit。 |
| 7. 工程与发布 | 通过 | 内容/输出/baseurl/浏览器/公告/审计门禁、CI、Pages workflow、Dependabot、README 和 CHANGELOG 完成。 |

## 最终本地证据

在专属 Conda 环境执行：

```sh
JEKYLL_ENV=production npm run check
CROSS_BROWSER=1 npx playwright test tests/compatibility.spec.cjs
npm run audit:production
```

结果：

- Jekyll 生成 100 个 HTML，其中 90 个详情页。
- 内容集合：3 新闻、0 个已核实项目、87 论文、14 成员、3 相册。
- 搜索索引 104 条；验证 189 条内部链接和 98 个旧路由映射。
- 三种 baseurl（空、`/preview/nested`、`/ics-lab-portal`）全部通过。
- Chromium 完整 Playwright 套件 38/38 通过。
- Chromium、Firefox、WebKit 核心兼容套件 3/3 通过。
- 公告三主题 × 两视口及日期边界、关闭/召回、焦点和滚动锁通过。
- 生产 npm 依赖审计为 0 vulnerabilities；项目运行时无 npm 依赖。

## 内容复核说明

- 重复新闻和无法核实的历史新闻/项目不进入发布集合。
- INFOCOM 2026 与 ICPADS 2025 新闻已与对应论文记录重新匹配。
- 两组会议/期刊论文 PDF 的摘要经源文件核对确实相同，期刊记录通过 `extendedFrom` 显式声明扩展关系，验证器只在这种情况下允许重复摘要。
- 清除成员数据中误复制的简介；经东华大学教师主页核实后，仅在对应教师记录保留内容。验证器现会拒绝重复非空简介和首尾空白字段。
- `_data/announcement.yml` 默认禁用，不保留虚构标题、联系人、日期或操作链接。

## 视觉与行为边界

- 原站和新站曾按 11 条路径 × 2 视口 × 2 主题 × 2 语言采集 88 组对照；本地截图位于被 Git 忽略的 `_artifacts/visual-parity/`。
- 页面宽度回归在 320、390、767、768、820、1024、1279、1280、1281、1440px 上逐项测量可见控件边界，而非只检查文档 `scrollWidth`。
- Markdown fixture 覆盖三类详情布局、390/768/1440px、明暗主题、嵌套列表、引用、链接、图片、代码和表格；fixture 不进入发布集合。
- 自动化无障碍检查不能替代完整人工审计，但已覆盖八类路由及中文、深色、展开导航状态。

## 恢复策略

公共历史只通过 `git revert` 回滚，不强推。旧 React portal 可在单独 worktree 中检出 `pre-jekyll-portal`；导入前内容可从 `pre-merge-content` 查阅。`content-review/` 是编辑复核区且被 Jekyll 排除，不能把其中资料批量移回发布集合而不逐条核实。
