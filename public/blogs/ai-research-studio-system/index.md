# AI 人设工作室：从角色到 workflow

AI Research Studio 是个人 AI 学术写作和研究 workflow 配置库。它不是论文正文仓库，而是用来约束 AI 如何参与科研写作、评审模拟、双语增强、GitHub 同步和实验复现。

## 启动顺序

一次任务开始前，优先读取 AGENTS.md、PERSONA_WRITING.md、SKILLS_REGISTRY.md，再进入 rules、workflows 和 prompts。这样可以减少临时聊天带来的漂移，让不同 AI 工具共享同一套边界。

## 角色体系

当前已经包含论文总导演、论文写作工厂、控制理论讨论班、哲学讨论班等角色。论文总导演负责选题、目标期刊、创新点、结构、进度和版本迭代，但不直接生成未审核最终稿，不伪造文献，也不夸大方法贡献。

## Skills 与 workflow

技能注册表里包括论文工作流、双语论文工作流、评审修订工作流、GitHub 同步工作流、实验复现工作流、安全 Git 规则和模拟结果边界规则。

## 下一步

后续需要把 OpenClaw 工作区规则接入这个仓库，并从 Thesis 的 paper01 至 paper06 中抽象出可复用 prompt 和实验复现模板。
