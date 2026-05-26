const STORAGE_KEY = 'kismeta-sidebar-collapsed';
const DATA_ATTR = 'kismetaSidebarCollapsed';

function isDesktop() {
	return window.matchMedia('(min-width: 50rem)').matches;
}

function applyState(collapsed: boolean) {
	if (collapsed && isDesktop()) {
		document.documentElement.dataset[DATA_ATTR] = 'true';
	} else {
		delete document.documentElement.dataset[DATA_ATTR];
	}
}

function syncButton(btn: HTMLButtonElement, collapsed: boolean) {
	const labelCollapse = btn.dataset.labelCollapse ?? 'Collapse sidebar';
	const labelExpand = btn.dataset.labelExpand ?? 'Expand sidebar';
	btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
	btn.setAttribute('aria-label', collapsed ? labelExpand : labelCollapse);
}

function initSidebarCollapse() {
	const btn = document.querySelector<HTMLButtonElement>('[data-kismeta-sidebar-toggle]');
	if (!btn) return;

	const stored = localStorage.getItem(STORAGE_KEY) === 'true';
	applyState(stored);
	syncButton(btn, stored);

	btn.addEventListener('click', () => {
		const isCollapsed = document.documentElement.dataset[DATA_ATTR] === 'true';
		const next = !isCollapsed;
		applyState(next);
		syncButton(btn, next);
		localStorage.setItem(STORAGE_KEY, String(next));
	});
}

// Re-evaluate when viewport crosses the desktop breakpoint — on mobile
// the collapsed attribute should never be present so the hamburger stays intact.
window.addEventListener(
	'resize',
	() => {
		const stored = localStorage.getItem(STORAGE_KEY) === 'true';
		applyState(stored);
	},
	{ passive: true }
);

document.addEventListener('astro:page-load', initSidebarCollapse);
initSidebarCollapse();
