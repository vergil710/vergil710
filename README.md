# Vergil 的研究札记

这是一个基于 Hugo + Stack 主题的个人博客仓库，用于记录重载列车控制、ATO 节能准时速度曲线规划、智能控制、科研写作和个人知识管理。

线上地址：<https://vergil710.github.io/vergil710/>

## 当前内容

- `content/about.md`：个人简介与研究兴趣。
- `content/research.md`：研究方向说明。
- `content/post/`：博客文章。
- `content/archives.md`：归档页。
- `content/search.md`：搜索页。
- `config.yaml`：Hugo 站点配置。
- `public/`：Hugo 生成后的静态站点文件。

## 本地预览

需要先安装 Hugo extended，并初始化主题 submodule。当前主题版本建议使用 Hugo extended `0.102.3`。

```bash
git submodule update --init --recursive
```

```bash
hugo server -D
```

生成 GitHub Pages 静态文件：

```bash
hugo --cleanDestinationDir -d docs
```

## 后续需要补充的真实信息

- 真实姓名或希望展示的署名。
- 学校/单位/身份简介。
- 真实邮箱或其他联系方式。
- 个人头像文件，建议放到 `assets/img/avatar.png` 或主题要求的位置。
- 是否启用评论系统，例如 giscus。
- 是否继续使用 `vergil710.github.io` 作为正式站点地址。

## 维护原则

- 不再保留 Hugo 示例内容。
- 新文章放在 `content/post/`。
- 草稿文章设置 `draft: true`。
- 重要改动后重新运行 `hugo`，同步更新 `public/`。
