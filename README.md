# Vergil710 Blog

这是基于 `YYsuni/2025-blog-public` 模板改造的个人博客，内容存放在仓库里，文章以 Markdown 编写。

## 本地预览

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:2025`。

## 编辑文章

文章在 `public/blogs/` 目录下，一篇文章一个文件夹：

```text
public/blogs/your-post-slug/
  config.json   # 标题、标签、日期、摘要、分类、封面
  index.md      # 正文 Markdown
```

新增文章时，复制任意一篇文章目录，改文件夹名、`config.json` 和 `index.md`。然后把文章加入 `public/blogs/index.json`，分类加入 `public/blogs/categories.json`。

## 编辑页面

- 关于页：`src/app/about/list.json`
- 项目页：`src/app/projects/list.json`
- 任务清单页：`src/app/tasks/page.tsx`
- 资源入口：`src/app/share/list.json`
- 首页站点标题、颜色、社交链接：`src/config/site-content.json`
- 首页卡片组件：`src/app/(home)/`

任务清单页现在支持在网页里新增、勾选、修改、删除待办项，并且可以给每条待办自由添加标签，标签会自动变成筛选按钮。网页里的改动默认保存在当前浏览器的 `localStorage`；如果要变成所有设备都能看到的公开版本，需要把稳定后的任务同步进 `src/app/tasks/page.tsx` 后重新发布。

## 当前内容结构

- 论文写作工厂：同步 `vergil710/Thesis`，主要记录六篇论文的正文链、评审修订、双语增强和实验复现路线图。
- AI 人设工作室：同步 `vergil710/AI_Research_Studio`，主要记录角色卡、规则、workflow、prompt 模板和 skills registry。
- 任务清单：在 `/tasks` 页面维护论文复现、AI 工作室整理和博客同步的下一步。
- ATO 项目：暂不放入当前博客主展示，它属于另一条项目线。

## 网页内编辑

模板自带网页内编辑按钮。要让它直接提交 GitHub，需要创建 GitHub App，把 App ID 配到 `NEXT_PUBLIC_GITHUB_APP_ID`，并在页面里导入 GitHub App 的 private key。没有配置时，仍然可以直接编辑仓库文件。

## 部署

提交到 `master` 后，GitHub Actions 会构建 Next.js 静态站点到 `docs/`，GitHub Pages 会发布到：

https://vergil710.github.io/vergil710/
