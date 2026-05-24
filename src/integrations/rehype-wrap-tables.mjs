/**
 * Wrap every `<table>` in `<div class="doc-table">` so markdown tables can
 * be styled as self-contained panels with their own scroll container.
 *
 * Idempotent: tables already inside `.doc-table` are skipped.
 */
import { visit } from 'unist-util-visit';

function hasDocTableClass(node) {
	if (!node || node.type !== 'element' || node.tagName !== 'div') return false;
	const className = node.properties?.className;
	if (!className) return false;
	const list = Array.isArray(className) ? className : String(className).split(/\s+/);
	return list.includes('doc-table');
}

export default function rehypeWrapTables() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'table') return;
			if (!parent || typeof index !== 'number') return;
			if (hasDocTableClass(parent)) return;

			const wrapper = {
				type: 'element',
				tagName: 'div',
				properties: { className: ['doc-table'] },
				children: [node],
			};
			parent.children[index] = wrapper;
		});
	};
}
