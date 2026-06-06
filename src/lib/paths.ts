import { BASE_PATH } from '@/consts'

export function withBasePath(path: string | undefined) {
	if (!path) return path
	if (/^(https?:|data:|blob:)/.test(path)) return path
	if (!path.startsWith('/')) return path
	return `${BASE_PATH}${path}`
}
