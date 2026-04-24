import { createStorage, prefixStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import { groupBy } from './utils';

const url = new URL('https://webmention.io/api/mentions.json');
url.searchParams.set('domain', 'binyam.in');
url.searchParams.set('token', '5fABdaCA4Cgxw1r6RhF4rw');
url.searchParams.set('per-page', '100');

type WmJson = {
	source: string;
	verified: boolean;
	verified_date: Date;
	id: number;
	private: boolean;
	data: {
		/** this is optional in the response JSON, but we filter out items with missing `data.author` tags */
		author: {
			name: string;
			url: string | null;
			photo: string | null;
		};
		url: string;
		name: string | null;
		/** `null` for repost & like, `string` for reply */
		content: string | null;
		published: Date | null;
		published_ts: number | null;
		/** only present if `activity.type` is `"rsvp"` */
		rsvp?: 'yes' | 'no' | 'maybe';
		swarm_coins?: number;
	};
	activity: {
		type:
			| 'rsvp'
			| 'link' // mention-of
			| 'bookmark'
			| 'repost'
			| 'reply'
			| 'like';
	};
	rels?: {
		canonical: string;
	};
	target: string;
};

const store = createStorage({
	driver: fsDriver({
		base: './.cache',
	}),
});

function normalizeUrl(url: URL) {
	return url.pathname.replace(/\/?$/, '');
}

const pages = prefixStorage<WmJson[]>(store, 'wm:pages');

async function storeMentions(): Promise<void> {
	const data: { links: WmJson[] } = await fetch(url).then(r => r.json());
	store.set('wm:source', data.links.filter(v => v.data.author));

	// Group by page
	const res = groupBy(data.links, (d) => {
		return normalizeUrl(new URL(d.target));
	});

	const entries = Object.entries(res);
	for (const [key, value] of entries) {
		pages.set(key, value);
	}
}

export async function getMentions(path: URL): Promise<
	Record<'likes' | 'comments', WmJson[]>
> {
	if (!(await store.has('wm:source'))) await storeMentions();
	const data = await pages.getItem(normalizeUrl(path));

	if (!data) {
		return {
			comments: [],
			likes: [],
		};
	}

	const grouped = groupBy(data, (d) => {
		const t = d.activity.type;

		if (t === 'link' || t === 'reply') {
			return 'comments';
		}

		if (t === 'like') return 'likes';

		return null;
	});

	grouped.comments ??= [];
	grouped.likes ??= [];

	return grouped;
}
