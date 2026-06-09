/**
 * Measures the fixed header height and writes it to --kismeta-nav-offset so that
 * main-frame padding, sidebar overlay, and mobile TOC all stay in sync with the real
 * stacked header height regardless of viewport width.
 */

function logHeaderLayoutDebug() {
	const wrap = document.querySelector<HTMLElement>('.kismeta-header-wrap');
	if (!wrap) return;

	const siteTitle = wrap.querySelector<HTMLElement>('.site-title');
	const titleSpan = siteTitle?.querySelector<HTMLElement>('span:not(.sr-only)');
	const titleWrapper = wrap.querySelector<HTMLElement>('.title-wrapper');
	const searchBtn = wrap.querySelector<HTMLElement>('site-search button[data-open-modal]');
	const headerRow = wrap.querySelector<HTMLElement>('.header');

	if (!siteTitle || !titleSpan || !titleWrapper || !headerRow) return;

	const siteTitleStyle = getComputedStyle(siteTitle);
	const titleWrapperStyle = getComputedStyle(titleWrapper);
	const spanStyle = getComputedStyle(titleSpan);
	const titleSpanRect = titleSpan.getBoundingClientRect();
	const searchRect = searchBtn?.getBoundingClientRect();
	const isMobile = window.matchMedia('(max-width: 50rem)').matches;

	// #region agent log
	fetch('http://127.0.0.1:7483/ingest/382e3d08-77a0-4016-bf03-5e63c2b6e1d4', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4f4b96' },
		body: JSON.stringify({
			sessionId: '4f4b96',
			runId: 'post-fix',
			hypothesisId: 'A-D',
			location: 'nav-offset.ts:logHeaderLayoutDebug',
			message: 'Header title layout measurements',
			data: {
				viewportWidth: window.innerWidth,
				isMobile,
				siteTitleFlexDirection: siteTitleStyle.flexDirection,
				siteTitleWhiteSpace: siteTitleStyle.whiteSpace,
				titleWrapperOverflow: titleWrapperStyle.overflow,
				spanOverflow: spanStyle.overflow,
				titleWrapperWidth: Math.round(titleWrapper.clientWidth),
				siteTitleScrollWidth: siteTitle.scrollWidth,
				titleSpanScrollWidth: titleSpan.scrollWidth,
				titleSpanClientWidth: titleSpan.clientWidth,
				titleTruncated: titleSpan.scrollWidth > titleSpan.clientWidth,
				searchOverlapsTitle:
					searchRect != null &&
					searchRect.left < titleSpanRect.right &&
					searchRect.top < titleSpanRect.bottom &&
					searchRect.bottom > titleSpanRect.top,
				headerRowHeight: Math.round(headerRow.getBoundingClientRect().height),
			},
			timestamp: Date.now(),
		}),
	}).catch(() => {});
	// #endregion
}

function updateNavOffset() {
	const wrap = document.querySelector<HTMLElement>('.kismeta-header-wrap');
	if (!wrap) return;

	const header = wrap.closest<HTMLElement>('.page > .header') ?? wrap;
	document.documentElement.style.setProperty(
		'--kismeta-nav-offset',
		`${header.getBoundingClientRect().height}px`
	);
	logHeaderLayoutDebug();
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
