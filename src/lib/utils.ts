import type { MarkdownLayoutProps } from 'astro';

export type MaybeMarkdown<T extends Record<string, any>> =
	| MarkdownLayoutProps<T>
	| T;
