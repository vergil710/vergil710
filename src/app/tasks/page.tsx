'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Clipboard, Plus, RotateCcw, Trash2 } from 'lucide-react'

type TodoModule = '论文写作' | 'AI 人设' | '博客'
type TodoPriority = '高' | '中' | '低'
type TodoFilter = '全部' | TodoModule

interface TodoItem {
	id: string
	title: string
	module: TodoModule
	priority: TodoPriority
	done: boolean
	note?: string
}

const storageKey = 'vergil710-research-todos-v1'
const modules: TodoModule[] = ['论文写作', 'AI 人设', '博客']
const priorities: TodoPriority[] = ['高', '中', '低']
const filters: TodoFilter[] = ['全部', ...modules]

const defaultTodos: TodoItem[] = [
	{
		id: 'paper04-reproducible-loop',
		title: '补齐 paper04 的真实可复现实验闭环',
		module: '论文写作',
		priority: '高',
		done: false,
		note: 'simulation_code、configs、raw_results、figures_src、experiment_logs'
	},
	{
		id: 'paper05-paper06-experiments',
		title: '推进 paper05 与 paper06 的代码、配置、原始结果和绘图脚本',
		module: '论文写作',
		priority: '高',
		done: false
	},
	{
		id: 'submission-formatting',
		title: '整理参考文献、期刊模板、图源、表源和实验日志',
		module: '论文写作',
		priority: '中',
		done: false
	},
	{
		id: 'openclaw-rules',
		title: '把 OpenClaw 工作区规则正式接入 AI Research Studio',
		module: 'AI 人设',
		priority: '中',
		done: false
	},
	{
		id: 'thesis-prompts',
		title: '从 Thesis paper01 至 paper06 抽象可复用 prompt',
		module: 'AI 人设',
		priority: '中',
		done: false
	},
	{
		id: 'real-profile',
		title: '替换博客真实头像、邮箱和个人介绍细节',
		module: '博客',
		priority: '低',
		done: false
	},
	{
		id: 'sync-blog-after-github',
		title: 'GitHub 仓库更新后，同步调整 list.json、文章和任务页',
		module: '博客',
		priority: '中',
		done: false
	}
]

function createTodo(title: string, module: TodoModule, priority: TodoPriority): TodoItem {
	return {
		id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		title,
		module,
		priority,
		done: false
	}
}

export default function TasksPage() {
	const [todos, setTodos] = useState<TodoItem[]>(defaultTodos)
	const [filter, setFilter] = useState<TodoFilter>('全部')
	const [title, setTitle] = useState('')
	const [module, setModule] = useState<TodoModule>('论文写作')
	const [priority, setPriority] = useState<TodoPriority>('中')
	const [copied, setCopied] = useState(false)
	const [hydrated, setHydrated] = useState(false)

	useEffect(() => {
		const saved = window.localStorage.getItem(storageKey)
		if (saved) {
			try {
				const parsed = JSON.parse(saved)
				if (Array.isArray(parsed)) setTodos(parsed)
			} catch {
				setTodos(defaultTodos)
			}
		}
		setHydrated(true)
	}, [])

	useEffect(() => {
		if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(todos))
	}, [todos, hydrated])

	const visibleTodos = useMemo(() => {
		return todos.filter(todo => filter === '全部' || todo.module === filter)
	}, [todos, filter])

	const stats = useMemo(() => {
		const done = todos.filter(todo => todo.done).length
		return {
			done,
			total: todos.length,
			ratio: todos.length ? Math.round((done / todos.length) * 100) : 0
		}
	}, [todos])

	const addTodo = () => {
		const trimmed = title.trim()
		if (!trimmed) return
		setTodos(prev => [createTodo(trimmed, module, priority), ...prev])
		setTitle('')
	}

	const updateTodo = (id: string, patch: Partial<TodoItem>) => {
		setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, ...patch } : todo)))
	}

	const removeTodo = (id: string) => {
		setTodos(prev => prev.filter(todo => todo.id !== id))
	}

	const resetTodos = () => {
		if (confirm('恢复默认任务清单？')) setTodos(defaultTodos)
	}

	const copyTodos = async () => {
		await navigator.clipboard.writeText(JSON.stringify(todos, null, 2))
		setCopied(true)
		window.setTimeout(() => setCopied(false), 1400)
	}

	return (
		<main className='min-h-screen px-6 pt-28 pb-16'>
			<section className='mx-auto w-full max-w-[1120px]'>
				<div className='mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='text-brand mb-2 text-sm font-semibold'>Research Todo List</p>
						<h1 className='text-primary text-4xl leading-tight font-semibold max-sm:text-3xl'>待办清单</h1>
						<p className='text-secondary mt-3 max-w-3xl text-sm leading-7'>论文写作、AI 人设和博客同步的任务集中放在这里。当前改动会保存在这个浏览器。</p>
					</div>
					<div className='rounded-lg border bg-white/70 px-4 py-3 backdrop-blur'>
						<div className='text-primary text-2xl font-semibold'>{stats.ratio}%</div>
						<div className='text-secondary text-xs'>
							{stats.done} / {stats.total} 已完成
						</div>
					</div>
				</div>

				<div className='mb-6 h-2 overflow-hidden rounded-full bg-white/70'>
					<div className='bg-brand h-full rounded-full transition-all' style={{ width: `${stats.ratio}%` }} />
				</div>

				<section className='card mb-6 rounded-lg'>
					<div className='grid grid-cols-[1fr_132px_96px_44px] gap-3 max-md:grid-cols-1'>
						<input
							value={title}
							onChange={event => setTitle(event.target.value)}
							onKeyDown={event => {
								if (event.key === 'Enter') addTodo()
							}}
							placeholder='新增一个待办事项'
							className='rounded-lg border bg-white/75 px-4 py-3 text-sm outline-none transition-colors focus:border-brand'
						/>
						<select value={module} onChange={event => setModule(event.target.value as TodoModule)} className='rounded-lg border bg-white/75 px-3 py-3 text-sm outline-none focus:border-brand'>
							{modules.map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<select value={priority} onChange={event => setPriority(event.target.value as TodoPriority)} className='rounded-lg border bg-white/75 px-3 py-3 text-sm outline-none focus:border-brand'>
							{priorities.map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<button onClick={addTodo} aria-label='新增待办' className='brand-btn flex h-12 items-center justify-center rounded-lg px-0'>
							<Plus className='h-5 w-5' />
						</button>
					</div>
				</section>

				<div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
					<div className='flex flex-wrap gap-2'>
						{filters.map(item => (
							<button
								key={item}
								onClick={() => setFilter(item)}
								className={`rounded-lg border px-4 py-2 text-sm transition-colors ${filter === item ? 'bg-brand text-white' : 'bg-white/70 text-secondary hover:bg-white'}`}>
								{item}
							</button>
						))}
					</div>
					<div className='flex gap-2'>
						<button onClick={copyTodos} className='hover:bg-bg flex h-10 items-center gap-2 rounded-lg border bg-white/70 px-3 text-sm transition-colors'>
							{copied ? <Check className='h-4 w-4 text-emerald-500' /> : <Clipboard className='h-4 w-4' />}
							<span>{copied ? '已复制' : '导出'}</span>
						</button>
						<button onClick={resetTodos} className='hover:bg-bg flex h-10 items-center gap-2 rounded-lg border bg-white/70 px-3 text-sm transition-colors'>
							<RotateCcw className='h-4 w-4' />
							<span>重置</span>
						</button>
					</div>
				</div>

				<div className='space-y-3'>
					{visibleTodos.map(todo => (
						<article key={todo.id} className='card grid grid-cols-[34px_1fr_124px_90px_40px] items-center gap-3 rounded-lg max-md:grid-cols-[34px_1fr_40px]'>
							<button
								onClick={() => updateTodo(todo.id, { done: !todo.done })}
								aria-label={todo.done ? '标记未完成' : '标记完成'}
								className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${todo.done ? 'bg-brand border-brand text-white' : 'bg-white/70'}`}>
								{todo.done && <Check className='h-4 w-4' />}
							</button>

							<div className='space-y-2'>
								<input
									value={todo.title}
									onChange={event => updateTodo(todo.id, { title: event.target.value })}
									className={`w-full rounded-lg bg-transparent px-1 py-1 text-sm leading-6 outline-none focus:bg-white/70 ${todo.done ? 'text-secondary line-through' : 'text-primary'}`}
								/>
								{todo.note && <p className='text-secondary px-1 text-xs leading-5'>{todo.note}</p>}
							</div>

							<select
								value={todo.module}
								onChange={event => updateTodo(todo.id, { module: event.target.value as TodoModule })}
								className='rounded-lg border bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand max-md:hidden'>
								{modules.map(item => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>

							<select
								value={todo.priority}
								onChange={event => updateTodo(todo.id, { priority: event.target.value as TodoPriority })}
								className='rounded-lg border bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand max-md:hidden'>
								{priorities.map(item => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>

							<button onClick={() => removeTodo(todo.id)} aria-label='删除待办' className='hover:bg-bg flex h-9 w-9 items-center justify-center rounded-lg border bg-white/70 transition-colors'>
								<Trash2 className='h-4 w-4' />
							</button>
						</article>
					))}
				</div>

				{visibleTodos.length === 0 && <div className='card text-secondary rounded-lg text-center text-sm'>这个分类下还没有待办。</div>}

				<section className='mt-6 grid grid-cols-[1.2fr_0.8fr] gap-5 max-lg:grid-cols-1'>
					<div className='card rounded-lg'>
						<h2 className='text-primary mb-3 text-lg font-semibold'>同步边界</h2>
						<p className='text-secondary text-sm leading-7'>
							这里的交互编辑先保存在浏览器本地。需要公开到 GitHub Pages 时，再把稳定后的任务同步进仓库文件并发布。
						</p>
					</div>
					<div className='card rounded-lg'>
						<h2 className='text-primary mb-3 text-lg font-semibold'>研究边界</h2>
						<div className='text-secondary space-y-2 text-sm leading-6'>
							<p>不把代表性仿真写成真实可复现实验。</p>
							<p>不伪造文献、实验数据或外部验证。</p>
							<p>ATO 暂时排除在当前博客模块外。</p>
						</div>
					</div>
				</section>
			</section>
		</main>
	)
}
