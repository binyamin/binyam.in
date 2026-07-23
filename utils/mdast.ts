import { defineMdastPlugin } from 'satteri';

export default [
	defineMdastPlugin({
		name: 'custom:callouts',
		containerDirective(node, ctx) {
			const attr = node.attributes?.type;

			if (!attr) {
				ctx.report({
					node,
					message: 'Missing "type" for "callout"',
					severity: 'warning',
				});
			}

			const validTypes = ['info', 'warning', 'danger', 'success'];

			if (attr && validTypes.includes(attr) === false) {
				ctx.report({
					node,
					message: 'Invalid "type" for "callout" container directive',
					severity: 'error',
				});
			}

			ctx.setProperty(node, 'data', {
				...node.data,
				hName: 'div',
				hProperties: {
					class: ['callout'],
					'data-callout-type': attr || 'info',
				},
			});
		},
	}),
];
