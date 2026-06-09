# Vergil710 Blog

这是 `vergil710/vergil710` 的个人博客仓库，基于 `YYsuni/2025-blog-public` 模板改造，用于展示论文写作、AI 人设、实验复现、图片记录和长期任务清单。

线上地址：

https://vergil710.github.io/vergil710/

## 当前模块

- 首页：卡片式入口，包含头像、图片卡片、日历、随机推荐、最新文章和点赞按钮。
- 文章：Markdown 内容，主要记录论文写作、AI Research Studio、实验复现和研究方法。
- 项目：展示当前研究项目和代码项目。
- 任务清单：可在浏览器里新增、勾选、修改、删除待办，并支持自定义标签筛选。
- 图片墙：展示个人图片记录，图片路径已适配 GitHub Pages 的 `/vergil710` 子路径。
- Live2D：展示本地 Live2D 模型，模型入口、贴图和 moc 文件从仓库静态资源加载。

## 重要目录

```text
src/app/                  # Next.js App Router 页面
src/app/(home)/           # 首页卡片、首页设置和布局逻辑
src/app/blog/             # 博客列表和文章详情页
src/app/tasks/page.tsx    # 任务清单页面
src/app/pictures/         # 图片墙页面和图片上传逻辑
src/app/live2d/           # Live2D 展示页面
src/config/site-content.json
                          # 站点标题、主题色、首页图片、社交链接等配置
public/blogs/             # Markdown 文章内容
public/images/            # 头像、首页图片、图片墙、分享图标等静态图片
public/live2d/            # Live2D 模型文件
docs/                     # GitHub Pages 发布目录，由构建产物生成
CHANGELOG.md              # 版本变更记录
```

## 编辑文章

文章存放在 `public/blogs/`，一篇文章一个文件夹：

```text
public/blogs/your-post-slug/
  config.json   # 标题、标签、日期、摘要、分类、封面
  index.md      # 正文 Markdown
```

新增文章时，复制已有文章目录并修改文件夹名、`config.json` 和 `index.md`。然后把文章加入 `public/blogs/index.json`，必要时更新 `public/blogs/categories.json`。

## 编辑页面内容

- 关于页：`src/app/about/list.json`
- 项目页：`src/app/projects/list.json`
- 资源分享：`src/app/share/list.json`
- 图片墙：`src/app/pictures/list.json`
- 首页标题、颜色、社交链接和首页图片：`src/config/site-content.json`
- 首页卡片布局：`src/config/card-styles.json`
- 任务清单默认数据：`src/app/tasks/page.tsx`

任务清单页面的网页内编辑默认保存在当前浏览器的 `localStorage`。如果需要变成所有设备都能看到的公开版本，需要把稳定后的任务同步进 `src/app/tasks/page.tsx` 后重新发布。

## 维护规则

每次做重要修改时，都要同步更新 `CHANGELOG.md`。变更记录遵循 Keep a Changelog 风格：

- 最新版本放在最上面。
- 未发布内容写在 `[Unreleased]` 下。
- 已发布版本使用 `## [版本号] - YYYY-MM-DD`。
- 常用分类包括 `Added`、`Changed`、`Fixed`、`Removed`。
- 只记录对使用、内容、部署、结构或维护有影响的变更，避免记录临时调试信息。

## 本地开发

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://localhost:2025
```

## 构建发布

GitHub Pages 需要 `/vergil710` base path：

```bash
rm -rf docs out
NEXT_PUBLIC_BASE_PATH=/vergil710 npm run build
cp -R out docs
touch docs/.nojekyll
git add -A
git commit -m "your change"
git push origin master
```

提交到 `master` 后，GitHub Pages 会发布 `docs/` 目录。

## 网页内编辑

模板自带网页内编辑能力。要让网页直接提交 GitHub，需要配置 GitHub App，并把 App ID 配到 `NEXT_PUBLIC_GITHUB_APP_ID`，在页面里导入 GitHub App 的 private key。未配置时，建议直接编辑仓库文件后重新构建发布。
