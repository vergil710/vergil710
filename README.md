# Vergil 的研究札记

这是一个基于 Hugo + Stack 主题的个人博客仓库，用于记录重载列车控制、ATO 节能准时速度曲线规划、智能控制、科研写作和个人知识管理。

线上地址：<https://vergil710.github.io/vergil710/>

## 当前内容

- `content/about.md`：个人简介与研究兴趣。
- `content/research.md`：研究方向说明。
- `content/projects.md`：长期项目说明。
- `content/post/`：博客文章。
- `content/archives.md`：归档页。
- `content/search.md`：搜索页。
- `config.yaml`：Hugo 站点配置。
- `docs/`：GitHub Pages 实际发布的静态文件。

## 如何编辑

### 新增文章

在 `content/post/` 下新建一个 Markdown 文件，例如：

```text
content/post/my-new-note.md
```

文件开头需要写 front matter：

```yaml
---
title: "文章标题"
description: "一句话摘要"
date: 2026-06-05T10:00:00+08:00
slug: "my-new-note"
categories:
    - 研究札记
tags:
    - ATO
    - 控制理论
draft: false
---
```

正文直接写 Markdown。

### 修改固定页面

- 关于页：编辑 `content/about.md`
- 研究方向：编辑 `content/research.md`
- 项目页：编辑 `content/projects.md`
- 首页说明：编辑 `content/_index.md`

### 修改菜单和站点信息

编辑 `config.yaml`。常见字段：

- `title`：站点标题
- `params.sidebar.subtitle`：左侧简介
- `menu.main`：左侧菜单
- `menu.social`：社交链接

### 自动同步

推送到 `master` 后，GitHub Actions 会自动运行 Hugo，并把生成结果写入 `docs/`。GitHub Pages 会从 `docs/` 发布到：

<https://vergil710.github.io/vergil710/>

通常 1-3 分钟后线上会刷新。

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
- 通常只需要改 `content/` 和 `config.yaml`，推送后由 GitHub Actions 自动更新 `docs/`。
