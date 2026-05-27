/**
 * Measures the fixed header height and writes it to --kismeta-nav-offset so that
 * main-frame padding, sidebar overlay, and mobile TOC all stay in sync with the real
 * stacked header height regardless of viewport width.
 */

function updateNavOffset() {
	const wrap = document.querySelector<HTMLElement>('.kismeta-header-wrap');
	if (!wrap) return;

	const header = wrap.closest<HTMLElement>('.page > .header') ?? wrap;
	document.documentElement.style.setProperty(
		'--kismeta-nav-offset',
		`${header.getBoundingClientRect().height}px`
	);
}

function initNavOffset() {
	updateNavOffset();

	const wrap = document.querySelector<HTMLElement>('.kismeta-header-wrap');
	if (!wrap) return;

	// Re-measure whenever the fixed header resizes (viewport change, content reflow, etc.)
	const ro = new ResizeObserver(updateNavOffset);
	const header = wrap.closest<HTMLElement>('.page > .header');
	if (header) ro.observe(header);
	ro.observe(wrap);
}

document.addEventListener('astro:page-load', initNavOffset);
initNavOffset();
