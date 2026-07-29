import { wikiSlug } from '../data/wiki-base';
import { applyGameModeCallouts } from './game-modes';
import type {
	ContextDetail,
	ContextPanelLabels,
	ContextSectionIndex,
} from './context-panel';
import type { PlaytestDetailPayload } from './playtest-detail';

function buildPageUrl(_locale: string, pagePath: string, hash: string) {
	const base = `/${wikiSlug(pagePath)}/`.replace(/\/{2,}/g, '/');
	return hash ? `${base}#${hash}` : base;
}

type DetailState =
	| { kind: 'context'; path: string; hash: string; title?: string }
	| { kind: 'direct'; title: string; html: string; openFullUrl?: string }
	| { kind: 'empty' };

function initPlaytestDetailPanel(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const sections = JSON.parse(root.dataset.sections || '{}') as ContextSectionIndex;
	const locale = root.dataset.locale || 'en';
	const labels = JSON.parse(root.dataset.labels || '{}') as ContextPanelLabels;

	const modal = root.querySelector<HTMLElement>('[data-playtest-detail-modal]')!;
	const modalClose = root.querySelector<HTMLButtonElement>('[data-playtest-detail-close]')!;
	const modalBackdrop = root.querySelector<HTMLElement>('[data-playtest-detail-backdrop]')!;
	const modalTitle = root.querySelector<HTMLElement>('[data-playtest-detail-title]')!;
	const body = root.querySelector<HTMLElement>('[data-playtest-detail-body]')!;
	const empty = root.querySelector<HTMLElement>('[data-playtest-detail-empty]')!;
	const link = root.querySelector<HTMLAnchorElement>('[data-playtest-detail-link]')!;

	document.querySelectorAll('[data-playtest-detail-modal]').forEach((existing) => {
		if (existing !== modal) existing.remove();
	});
	if (modal.parentElement !== document.body) {
		document.body.appendChild(modal);
	}

	let current: DetailState = { kind: 'empty' };
	let lastTrigger: HTMLElement | null = null;

	const openModal = () => {
		modal.hidden = false;
		document.body.style.overflow = 'hidden';
		modalClose.focus();
	};

	const closeModal = () => {
		modal.hidden = true;
		document.body.style.overflow = '';
		if (lastTrigger?.isConnected) {
			lastTrigger.focus();
		}
	};

	const render = () => {
		if (current.kind === 'direct') {
			modalTitle.textContent = current.title;
			body.innerHTML = current.html;
			body.hidden = false;
			empty.hidden = true;
			applyGameModeCallouts(body);

			if (current.openFullUrl) {
				link.href = current.openFullUrl;
				link.textContent = labels.openFull;
				link.hidden = false;
			} else {
				link.hidden = true;
			}
			return;
		}

		if (current.kind === 'context') {
			const section = sections[current.path]?.[current.hash];
			modalTitle.textContent = section?.title || current.title || labels.title;

			if (section?.html) {
				body.innerHTML = section.html;
				body.hidden = false;
				empty.hidden = true;
				applyGameModeCallouts(body);

				link.href = buildPageUrl(locale, current.path, current.hash);
				link.textContent = labels.openFull;
				link.hidden = false;
				return;
			}
		}

		modalTitle.textContent = labels.title;
		body.hidden = true;
		body.innerHTML = '';
		empty.hidden = false;
		link.hidden = true;
	};

	const onContext = (event: Event) => {
		const detail = (event as CustomEvent<ContextDetail>).detail ?? {};
		if (!detail.path || !detail.hash) return;

		if (event.target instanceof HTMLElement && event.target.closest('[data-playtest-rule]')) {
			lastTrigger = event.target.closest<HTMLElement>('[data-playtest-rule]');
		}

		current = {
			kind: 'context',
			path: detail.path,
			hash: detail.hash,
			title: detail.title,
		};
		render();
		openModal();
	};

	const onPlaytestDetail = (event: Event) => {
		const detail = (event as CustomEvent<PlaytestDetailPayload>).detail ?? {};
		if (!detail.title || !detail.html) return;

		if (
			event.target instanceof HTMLElement &&
			(event.target.closest('[data-playtest-glossary-term]') ||
				event.target.closest('[data-playtest-card]'))
		) {
			lastTrigger =
				event.target.closest<HTMLElement>('[data-playtest-glossary-term]') ??
				event.target.closest<HTMLElement>('[data-playtest-card]');
		}

		current = {
			kind: 'direct',
			title: detail.title,
			html: detail.html,
			openFullUrl: detail.openFullUrl,
		};
		render();
		openModal();
	};

	modalClose.addEventListener('click', closeModal);
	modalBackdrop.addEventListener('click', closeModal);

	modal.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal();
			return;
		}
		if (e.key === 'Tab' && !modal.hidden) {
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

	document.addEventListener(
		'astro:before-swap',
		() => {
			if (!modal.hidden) {
				modal.hidden = true;
				document.body.style.overflow = '';
			}
		},
		{ once: false }
	);

	window.addEventListener('kismeta:context', onContext);
	window.addEventListener('kismeta:playtest-detail', onPlaytestDetail);
	window.addEventListener('kismeta-game-modes-changed', () => {
		if (!body.hidden) applyGameModeCallouts(body);
	});
}

export function initPlaytestDetailPanels() {
	document
		.querySelectorAll<HTMLElement>('[data-playtest-detail-panel]')
		.forEach(initPlaytestDetailPanel);
}

document.addEventListener('astro:page-load', initPlaytestDetailPanels);
initPlaytestDetailPanels();
