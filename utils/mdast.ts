import { defineMdastPlugin } from 'satteri';

export default [
	defineMdastPlugin({
		name: 'custom:figure',
		containerDirective(node, ctx) {
			if (node.name === 'figure') {
				ctx.setProperty(node, 'data', {
					...node.data,
					hName: 'figure',
				});
			} else if (node.name === 'caption') {
				ctx.setProperty(node, 'data', {
					...node.data,
					hName: 'figcaption',
				});
			}
		},
	}),
];
