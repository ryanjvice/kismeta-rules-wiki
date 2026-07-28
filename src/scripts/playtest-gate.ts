import { agyPlaytestConfig } from '../data/playtest';

const { storageKey, password } = agyPlaytestConfig;

function unlockGate(root: HTMLElement) {
	const lock = root.querySelector<HTMLElement>('[data-playtest-lock]');
	const content = root.querySelector<HTMLElement>('[data-playtest-content]');
	const error = root.querySelector<HTMLElement>('[data-playtest-error]');

	lock?.setAttribute('hidden', '');
	content?.removeAttribute('hidden');
	error?.setAttribute('hidden', '');

	try {
		sessionStorage.setItem(storageKey, 'true');
	} catch (_) {}
}

function showError(root: HTMLElement) {
	const error = root.querySelector<HTMLElement>('[data-playtest-error]');
	error?.removeAttribute('hidden');
}

export function initPlaytestGate() {
	const root = document.querySelector<HTMLElement>('[data-playtest-gate]');
	if (!root) return;

	try {
		if (sessionStorage.getItem(storageKey) === 'true') {
			unlockGate(root);
			return;
		}
	} catch (_) {}

	const form = root.querySelector<HTMLFormElement>('[data-playtest-form]');
	const input = root.querySelector<HTMLInputElement>('[data-playtest-password]');

	form?.addEventListener('submit', (event) => {
		event.preventDefault();
		if (input?.value === password) {
			unlockGate(root);
			return;
		}
		showError(root);
		input?.focus();
		input?.select();
	});
}
