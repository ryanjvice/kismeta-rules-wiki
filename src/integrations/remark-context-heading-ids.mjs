/**
 * Strip trailing `{#anchor-id}` from markdown heading text and promote it to
 * the heading's HTML `id` attribute via `hProperties`.
 *
 * This keeps the source files parseable by the sync scripts (which rely on the
 * `{#id}` suffix to locate section anchors) while preventing the literal text
 * from appearing in the rendered page or in Starlight's "On this page" TOC.
 *
 * Because `hProperties.id` is set here (in the remark/MDAST phase), Astro's
 * default `rehypeHeadingIds` plugin will see the id is already a string and
 * leave it alone — so deep links like `/play/setup/#i-set-the-table` continue
 * to work exactly as before.
 */
import { visit } from 'unist-util-visit';

const ANCHOR_SUFFIX_RE = /\s+\{#([^}]+)\}\s*$/;

export default function remarkContextHeadingIds() {
	return (tree) => {
		visit(tree, 'heading', (node) => {
			if (!node.children?.length) return;

			const last = node.children[node.children.length - 1];
			if (last.type !== 'text') return;

			const match = last.value.match(ANCHOR_SUFFIX_RE);
			if (!match) return;

			const id = match[1];

			// Strip the {#id} suffix from visible text.
			last.value = last.value.slice(0, match.index);

			// Propagate the id to the resulting <hN> element.
			node.data = node.data ?? {};
			node.data.hProperties = { ...node.data.hProperties, id };
		});
	};
}
