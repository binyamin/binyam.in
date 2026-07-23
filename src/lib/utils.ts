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
