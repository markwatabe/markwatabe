import { getCollection } from 'astro:content';

export async function getAllPosts() {
	const published = (await getCollection('blog')).map((p) => ({
		...p,
		draft: false,
		href: `/blog/${p.id}/`,
	}));
	const drafts = (await getCollection('drafts')).map((p) => ({
		...p,
		draft: true,
		href: `/drafts/${p.id}/`,
	}));
	return [...published, ...drafts].sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}
