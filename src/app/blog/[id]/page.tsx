import blogIndex from '@/../public/blogs/index.json'
import ClientPage from './client-page'

export function generateStaticParams() {
	return blogIndex.map(item => ({
		id: item.slug
	}))
}

export default function Page() {
	return <ClientPage />
}
