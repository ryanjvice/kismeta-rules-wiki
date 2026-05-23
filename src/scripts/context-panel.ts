export type ContextPanelLabels = {
	title: string;
	empty: string;
	openFull: string;
};

export type ContextSectionRecord = {
	title: string;
	html: string;
};

export type ContextSectionIndex = Record<string, Record<string, ContextSectionRecord>>;

export type ContextDetail = {
	path?: string;
	hash?: string;
	title?: string;
};

function getGameModes() {
	const quickplay =
		document.querySelector<HTMLInputElement>('.game-mode-toggle input[data-mode="quickplay"]')
			?.checked ?? true;
	const magnus =
		document.querySelector<HTMLInputElement>('.game-mode-toggle input[data-mode="magnus"]')
			?.checked ?? true;
	return { quickplay, magnus };
}

function applyGameModeCallouts(scope: ParentNode) {
	const { quickplay, magnus } = getGameModes();
	scope.querySelectorAll<HTMLElement>('.game-mode-callout').forEach((el) => {
		const modes = (el.dataset.modes || '').split(/\s+/).filter(Boolean);
		const show =
			(modes.includes('quickplay') && quickplay) || (modes.includes('magnus') && magnus);
		el.hidden = !show;
	});
}

function buildPageUrl(locale: string, pagePath: string, hash: string) {
	const prefix = locale === 'pt-br' ? '/pt-br' : '';
	const base = `${prefix}/${pagePath}/`.replace(/\/{2,}/g, '/');
	return hash ? `${base}#${hash}` : base;
}

function initContextPanel(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const sections = JSON.parse(root.dataset.sections || '{}') as ContextSectionIndex;
	const locale = root.dataset.locale || 'en';
	const labels = JSON.parse(root.dataset.labels || '{}') as ContextPanelLabels;

	const desktopTitle = root.querySelector<HTMLElement>('[data-context-title]')!;
	const desktopBody = root.querySelector<HTMLElement>('[data-context-body]')!;
	const desktopEmpty = root.querySelector<HTMLElement>('[data-context-empty]')!;
	const desktopLink = root.querySelector<HTMLAnchorElement>('[data-context-link]')!;

	const mobileSummary = root.querySelector<HTMLElement>('[data-context-mobile-label]')!;
	const mobileBody = root.querySelector<HTMLElement>('[data-context-mobile-body]')!;
	const mobileEmpty = root.querySelector<HTMLElement>('[data-context-mobile-empty]')!;
	const mobileLink = root.querySelector<HTMLAnchorElement>('[data-context-mobile-link]')!;

	let current: ContextDetail = { path: '', hash: '' };

	const render = () => {
		const path = current.path || '';
		const hash = current.hash || '';
		const section = path && hash ? sections[path]?.[hash] : undefined;

		const titleText = section?.title || labels.title;
		desktopTitle.textContent = titleText;
		mobileSummary.textContent = section?.title || labels.title;

		if (section?.html) {
			desktopBody.innerHTML = section.html;
			desktopBody.hidden = false;
			desktopEmpty.hidden = true;
			mobileBody.innerHTML = section.html;
			mobileBody.hidden = false;
			mobileEmpty.hidden = true;
			applyGameModeCallouts(desktopBody);
			applyGameModeCallouts(mobileBody);

			const href = buildPageUrl(locale, path, hash);
			desktopLink.href = href;
			desktopLink.textContent = labels.openFull;
			desktopLink.hidden = false;
			mobileLink.href = href;
			mobileLink.textContent = labels.openFull;
			mobileLink.hidden = false;
		} else {
			desktopBody.hidden = true;
			desktopBody.innerHTML = '';
			desktopEmpty.hidden = false;
			desktopLink.hidden = true;
			mobileBody.hidden = true;
			mobileBody.innerHTML = '';
			mobileEmpty.hidden = false;
			mobileLink.hidden = true;
		}
	};

	const onContext = (event: Event) => {
		const detail = (event as CustomEvent<ContextDetail>).detail ?? {};
		current = {
			path: detail.path ?? '',
			hash: detail.hash ?? '',
			title: detail.title,
		};
		render();
	};

	window.addEventListener('kismeta:context', onContext);
	window.addEventListener('kismeta-game-modes-changed', () => {
		if (!desktopBody.hidden) applyGameModeCallouts(desktopBody);
		if (!mobileBody.hidden) applyGameModeCallouts(mobileBody);
	});

	render();
}

export function initContextPanels() {
	document.querySelectorAll<HTMLElement>('.context-rules-panel').forEach(initContextPanel);
}

document.addEventListener('astro:page-load', initContextPanels);
initContextPanels();
