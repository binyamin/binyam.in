import type { MarkdownLayoutProps } from 'astro';

export type MaybeMarkdown<T extends Record<string, any>> =
	| MarkdownLayoutProps<T>
	| T;

export function dateEst(
	datetime: Date,
	format: 'short' | 'long' = 'long',
	time = true,
) {
	const estFormat = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/New_York',
		dateStyle: format,
		...(time ? { timeStyle: 'long' } : null),
	});

	const dt = estFormat.format(new Date(datetime));

	return dt.replace(/:\d{2}([\s\w]+)$/, '$1'); // remove seconds
}

/**
 * Remove html tags from a string
 */

export function striptags(html: string): string {
	return html.replaceAll(/<\/?[^>]+\/?>/g, '');
}

type StringLike = string | { toString(): string };

export function groupBy<
	T extends Record<string, StringLike>,
	K extends keyof T | (string & {}),
>(
	data: T[],
	key: K | ((item: T) => K | null),
): Record<
	T[K] extends string ? Extract<T[K], string>
		: K extends string ? K
		: never,
	T[]
> {
	return data.reduce((prev, curr) => {
		if (typeof key === 'function') {
			const k = key(curr);

			if (k) {
				prev[k] ??= [];
				prev[k].push(curr);
			}
		} else {
			const k = curr[key].toString();
			prev[k] ??= [];
			prev[k].push(curr);
		}

		return prev;
	}, {} as Record<any, T[]>);
}
