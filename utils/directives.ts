import 'remark-directive';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

export default function() {
	return (tree: Root, file: VFile) => {
		visit(
			tree,
			['containerDirective', 'leafDirective', 'textDirective'] as const,
			function(node) {
				node.data ??= {};
				node.attributes ??= {};

				if (node.type === 'containerDirective') {
					if (node.name === 'callout') {
						// Callout syntax
						node.attributes.type ||= 'info';

						const validTypes = ['info', 'warning', 'danger', 'success'];

						if (
							validTypes.includes(node.attributes.type) === false
						) {
							file.fail('Invalid "type" for "callout" container directive');
						}

						node.data.hName = 'div';
						node.data.hProperties = {
							class: ['callout'],
							'data-callout-type': node.attributes.type,
						};
					}
				}
			},
		);
	};
}
