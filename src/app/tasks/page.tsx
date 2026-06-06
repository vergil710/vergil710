import Link from 'next/link'
import { AlertTriangle, ArrowUpRight, CheckCircle2, CircleDot, GitBranch, ListChecks } from 'lucide-react'

const moduleTasks = [
	{
		title: '论文写作 / Thesis',
		repo: 'vergil710/Thesis',
		href: 'https://github.com/vergil710/Thesis',
		status: '当前重点',
		summary: '六篇重载列车安全容错控制论文已完成当前阶段正文链，下一步从文本生成转向真实仿真复现、图表源文件和投稿级格式整理。',
		done: ['paper01 至 paper06 已形成当前阶段最终稿链路', '完成内审、联合评审、修订建议、双语增强与 GitHub 同步', '已建立 PAPER_STATUS_SUMMARY、NEXT_STEPS 与实验复现路线图'],
		next: ['优先补齐 paper04 的可复现实验闭环', '继续推进 paper05 与 paper06 的代码、配置、原始结果和绘图脚本', '整理参考文献、期刊模板、图源、表源和实验日志']
	},
	{
		title: 'AI 人设 / AI Research Studio',
		repo: 'vergil710/AI_Research_Studio',
		href: 'https://github.com/vergil710/AI_Research_Studio',
		status: '工作流底座',
		summary: '这个仓库保存 AI 辅助科研的角色卡、规则、workflow、prompt 模板和技能注册表，用来约束 OpenClaw、Claude、Codex 等工具的协作方式。',
		done: ['建立 AGENTS、PERSONA_WRITING、SKILLS_REGISTRY 等启动文件', '沉淀论文总导演、写作工厂、哲学讨论班等角色体系', '明确 GitHub 同步、代表性仿真和真实复现实验的边界'],
		next: ['把 OpenClaw 工作区规则正式接入 AI Research Studio', '从 Thesis paper01 至 paper06 抽象可复用 prompt', '补充实验复现模板和技能注册表说明']
	},
	{
		title: '博客与任务清单',
		repo: 'vergil710/vergil710',
		href: 'https://github.com/vergil710/vergil710',
		status: '已同步',
		summary: '博客改成研究模块入口，保留文章索引，并新增任务清单页。ATO 项目暂不进入当前主展示，因为它属于另一条项目线。',
		done: ['切换到 2025 Next 博客模板', '同步 Thesis 和 AI Research Studio 两个核心仓库摘要', '新增任务清单模块并调整导航结构'],
		next: ['替换真实头像、邮箱和个人介绍细节', '按需要继续写论文复现日志和 AI 工作流文章', '后续更新 GitHub 仓库后，同步调整 list.json、文章和任务页']
	}
]

const guardrails = ['不把代表性仿真写成真实可复现实验', '不伪造文献、实验数据或外部验证', '不把 scaffold、模板或计划描述成已完成实验', '同步 GitHub 前先确认仓库范围，ATO 暂时排除在当前博客模块外']

export default function TasksPage() {
	return (
		<main className='min-h-screen px-6 pt-28 pb-16'>
			<section className='mx-auto w-full max-w-[1180px]'>
				<div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='text-brand mb-2 text-sm font-semibold'>Research Task Board</p>
						<h1 className='text-primary text-4xl leading-tight font-semibold max-sm:text-3xl'>任务清单</h1>
						<p className='text-secondary mt-3 max-w-3xl text-sm leading-7'>
							当前博客主要同步论文写作、AI 人设和任务推进三个模块。这里保留的是下一步真正要推进的事项，避免研究内容散在仓库和聊天记录里。
						</p>
					</div>
					<div className='flex items-center gap-2 rounded-lg border bg-white/70 px-4 py-3 text-sm backdrop-blur'>
						<ListChecks className='text-brand h-5 w-5' />
						<span className='text-secondary'>更新时间：2026-06-06</span>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-5 max-lg:grid-cols-1'>
					{moduleTasks.map(module => (
						<article key={module.title} className='card flex min-h-[420px] flex-col gap-5 rounded-lg'>
							<div className='flex items-start justify-between gap-3'>
								<div>
									<span className='bg-brand/10 text-brand rounded-lg px-2.5 py-1 text-xs font-semibold'>{module.status}</span>
									<h2 className='text-primary mt-4 text-xl leading-snug font-semibold'>{module.title}</h2>
									<p className='text-secondary mt-2 text-sm'>{module.repo}</p>
								</div>
								<Link
									href={module.href}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={`${module.title} GitHub`}
									className='hover:bg-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white/60 transition-colors'>
									<ArrowUpRight className='h-4 w-4' />
								</Link>
							</div>

							<p className='text-secondary text-sm leading-7'>{module.summary}</p>

							<div className='space-y-3'>
								<h3 className='text-primary text-sm font-semibold'>已完成</h3>
								{module.done.map(item => (
									<div key={item} className='flex gap-2 text-sm leading-6'>
										<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
										<span className='text-secondary'>{item}</span>
									</div>
								))}
							</div>

							<div className='space-y-3'>
								<h3 className='text-primary text-sm font-semibold'>下一步</h3>
								{module.next.map(item => (
									<div key={item} className='flex gap-2 text-sm leading-6'>
										<CircleDot className='text-brand mt-0.5 h-4 w-4 shrink-0' />
										<span className='text-secondary'>{item}</span>
									</div>
								))}
							</div>
						</article>
					))}
				</div>

				<section className='mt-6 grid grid-cols-[1.2fr_0.8fr] gap-5 max-lg:grid-cols-1'>
					<div className='card rounded-lg'>
						<div className='mb-4 flex items-center gap-3'>
							<GitBranch className='text-brand h-5 w-5' />
							<h2 className='text-primary text-xl font-semibold'>同步规则</h2>
						</div>
						<p className='text-secondary text-sm leading-7'>
							GitHub 仓库更新后，博客不会自动读取私有仓库内容。需要把仓库里的新状态同步到博客数据文件、文章 Markdown 或这个任务页，再重新构建并发布到 GitHub Pages。
						</p>
						<div className='mt-5 grid grid-cols-3 gap-3 text-sm max-md:grid-cols-1'>
							<Link href='/projects' className='hover:bg-bg rounded-lg border bg-white/60 px-4 py-3 transition-colors'>
								研究模块
							</Link>
							<Link href='/blog' className='hover:bg-bg rounded-lg border bg-white/60 px-4 py-3 transition-colors'>
								文章索引
							</Link>
							<Link href='/share' className='hover:bg-bg rounded-lg border bg-white/60 px-4 py-3 transition-colors'>
								资源入口
							</Link>
						</div>
					</div>

					<div className='card rounded-lg'>
						<div className='mb-4 flex items-center gap-3'>
							<AlertTriangle className='h-5 w-5 text-amber-500' />
							<h2 className='text-primary text-xl font-semibold'>研究边界</h2>
						</div>
						<div className='space-y-3'>
							{guardrails.map(item => (
								<div key={item} className='flex gap-2 text-sm leading-6'>
									<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-amber-500' />
									<span className='text-secondary'>{item}</span>
								</div>
							))}
						</div>
					</div>
				</section>
			</section>
		</main>
	)
}
