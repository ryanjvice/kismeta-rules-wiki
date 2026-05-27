import { applyGameModeCallouts } from './game-modes';

export type ContextPanelLabels = {
	title: string;
	empty: string;
	openFull: string;
	close: string;
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

function buildPageUrl(_locale: string, pagePath: string, hash: string) {
	const base = `/${pagePath}/`.replace(/\/{2,}/g, '/');
	return hash ? `${base}#${hash}` : base;
}

function initContextPanel(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const sections = JSON.parse(root.dataset.sections || '{}') as ContextSectionIndex;
	const locale = root.dataset.locale || 'en';
	const labels = JSON.parse(root.dataset.labels || '{}') as ContextPanelLabels;

	// Desktop refs
	const desktopTitle = root.querySelector<HTMLElement>('[data-context-title]')!;
	const desktopBody = root.querySelector<HTMLElement>('[data-context-body]')!;
	const desktopEmpty = root.querySelector<HTMLElement>('[data-context-empty]')!;
	const desktopLink = root.querySelector<HTMLAnchorElement>('[data-context-link]')!;

	// Mobile trigger ref
	const trigger = root.querySelector<HTMLButtonElement>('[data-context-trigger]');

	// Mobile modal refs
	const modal = root.querySelector<HTMLElement>('[data-context-modal]');
	const modalClose = root.querySelector<HTMLButtonElement>('[data-context-modal-close]');
	const modalBackdrop = root.querySelector<HTMLElement>('[data-context-modal-backdrop]');
	const modalTitle = root.querySelector<HTMLElement>('[data-context-mobile-label]');
	const mobileBody = root.querySelector<HTMLElement>('[data-context-mobile-body]')!;
	const mobileEmpty = root.querySelector<HTMLElement>('[data-context-mobile-empty]')!;
	const mobileLink = root.querySelector<HTMLAnchorElement>('[data-context-mobile-link]')!;

	let current: ContextDetail = { path: '', hash: '' };

	const openModal = () => {
		if (!modal || !trigger) return;
		modal.hidden = false;
		trigger.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';
		// Move focus to the close button so keyboard users can immediately dismiss
		modalClose?.focus();
	};

	const closeModal = () => {
		if (!modal || !trigger) return;
		modal.hidden = true;
		trigger.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
		trigger.focus();
	};

	const render = () => {
		const path = current.path || '';
		const hash = current.hash || '';
		const section = path && hash ? sections[path]?.[hash] : undefined;

		const titleText = section?.title || labels.title;
		desktopTitle.textContent = titleText;
		if (modalTitle) modalTitle.textContent = titleText;

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

	// Wire modal interactions
	if (trigger) trigger.addEventListener('click', openModal);
	if (modalClose) modalClose.addEventListener('click', closeModal);
	if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

	// Escape key closes the modal; also trap Tab focus inside the sheet
	if (modal) {
		modal.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
				return;
			}
			if (e.key === 'Tab' && modal && !modal.hidden) {
				const focusable = Array.from(
					modal.querySelectorAll<HTMLElement>(
						'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
					)
				).filter((el) => !el.hidden && el.offsetParent !== null);
				if (focusable.length === 0) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		});
	}

	// Restore body scroll if the page navigates away while modal is open
	document.addEventListener('astro:before-swap', () => {
		if (modal && !modal.hidden) {
			document.body.style.overflow = '';
		}
	}, { once: false });

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
