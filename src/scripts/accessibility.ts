/**
 * Accessibility settings menu runtime logic.
 *
 * Manages:
 *  - Disclosure panel open/close (with Escape + click-outside)
 *  - Theme selection (dark / light / auto), synced with Starlight's
 *    starlight-theme localStorage key and data-theme on <html>
 *    Default when unset: dark (not OS preference). Explicit "auto"
 *    still follows prefers-color-scheme.
 *  - Font-size selection (default / lg / xl), applied via
 *    data-kismeta-font-size on <html>
 *  - aria-pressed state on all option buttons
 *
 * Safe across Astro view transitions — bound once per element instance
 * via dataset.bound guard; re-registers on astro:page-load.
 */

type Theme = 'auto' | 'dark' | 'light';
type FontSize = 'default' | 'lg' | 'xl';

const STORAGE_THEME = 'starlight-theme';
const STORAGE_FONT = 'kismeta-font-size';

// ── Helpers ────────────────────────────────────────────────────────────────

function parseTheme(value: unknown): Theme {
	return value === 'dark' || value === 'light' ? value : 'auto';
}

function parseFontSize(value: unknown): FontSize {
	return value === 'lg' || value === 'xl' ? value : 'default';
}

function loadTheme(): Theme {
	try {
		const raw = localStorage.getItem(STORAGE_THEME);
		// null = never chosen → site default is dark (not OS preference)
		if (raw === null) return 'dark';
		return parseTheme(raw);
	} catch {
		return 'dark';
	}
}

function loadFontSize(): FontSize {
	try {
		return parseFontSize(localStorage.getItem(STORAGE_FONT));
	} catch {
		return 'default';
	}
}

function resolveTheme(theme: Theme): 'dark' | 'light' {
	return theme === 'light' ? 'light' :
		theme === 'dark' ? 'dark' :
		matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// ── Apply preference to DOM + storage ─────────────────────────────────────

export function applyTheme(theme: Theme): void {
	try {
		// Mirror Starlight's own storage convention: 'auto' → '' (empty string)
		localStorage.setItem(STORAGE_THEME, theme === 'auto' ? '' : theme);
	} catch { /* ignore */ }

	document.documentElement.dataset.theme = resolveTheme(theme);

	// Keep any remaining Starlight ThemeSelect pickers in sync (no-op when
	// the component is replaced by AccessibilityMenu, but safe to call).
	const provider = (window as { StarlightThemeProvider?: { updatePickers(t: string): void } })
		.StarlightThemeProvider;
	provider?.updatePickers(theme);
}

export function applyFontSize(size: FontSize): void {
	try {
		localStorage.setItem(STORAGE_FONT, size);
	} catch { /* ignore */ }

	if (size === 'default') {
		delete document.documentElement.dataset.kismetaFontSize;
	} else {
		document.documentElement.dataset.kismetaFontSize = size;
	}
}

// ── aria-pressed sync ──────────────────────────────────────────────────────

function syncThemeButtons(theme: Theme): void {
	document.querySelectorAll<HTMLElement>('[data-a11y-theme]').forEach((btn) => {
		btn.setAttribute('aria-pressed', String(btn.dataset.a11yTheme === theme));
	});
}

function syncFontSizeButtons(size: FontSize): void {
	document.querySelectorAll<HTMLElement>('[data-a11y-fontsize]').forEach((btn) => {
		btn.setAttribute('aria-pressed', String(btn.dataset.a11yFontsize === size));
	});
}

// ── Panel initialiser ─────────────────────────────────────────────────────

function initA11yMenu(): void {
	const menu = document.querySelector<HTMLElement>('.a11y-menu');
	if (!menu || menu.dataset.bound === 'true') return;
	menu.dataset.bound = 'true';

	const trigger = menu.querySelector<HTMLButtonElement>('[data-a11y-trigger]')!;
	const panel = menu.querySelector<HTMLElement>('[data-a11y-panel]')!;

	// Sync button states to stored preferences on init
	const theme = loadTheme();
	syncThemeButtons(theme);
	syncFontSizeButtons(loadFontSize());
	// Persist the site default so first-time visitors keep dark across sessions
	// instead of falling through to OS preference on later navigations.
	if (theme === 'dark') {
		try {
			if (localStorage.getItem(STORAGE_THEME) === null) {
				localStorage.setItem(STORAGE_THEME, 'dark');
			}
		} catch { /* ignore */ }
	}

	const openPanel = (): void => {
		panel.hidden = false;
		trigger.setAttribute('aria-expanded', 'true');
		// Move focus to first interactive button so keyboard users can act immediately
		panel.querySelector<HTMLElement>('button')?.focus();
	};

	const closePanel = (): void => {
		panel.hidden = true;
		trigger.setAttribute('aria-expanded', 'false');
		trigger.focus();
	};

	trigger.addEventListener('click', () => {
		panel.hidden ? openPanel() : closePanel();
	});

	// Escape closes the panel from anywhere inside it
	panel.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.stopPropagation();
			closePanel();
		}
	});

	// Click-outside dismisses the panel
	document.addEventListener('click', (e: MouseEvent) => {
		if (!menu.contains(e.target as Node) && !panel.hidden) {
			closePanel();
		}
	});

	// ── Theme buttons ───────────────────────────────────────────────────────
	menu.querySelectorAll<HTMLButtonElement>('[data-a11y-theme]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const theme = parseTheme(btn.dataset.a11yTheme);
			applyTheme(theme);
			syncThemeButtons(theme);
		});
	});

	// ── Font-size buttons ───────────────────────────────────────────────────
	menu.querySelectorAll<HTMLButtonElement>('[data-a11y-fontsize]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const size = parseFontSize(btn.dataset.a11yFontsize);
			applyFontSize(size);
			syncFontSizeButtons(size);
		});
	});

	// Re-resolve the auto theme if the OS colour scheme changes while the page
	// is open (matches what Starlight's own ThemeSelect does).
	matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
		if (loadTheme() === 'auto') applyTheme('auto');
	});
}

// ── Bootstrap ──────────────────────────────────────────────────────────────

// Astro view-transitions: the <html> element (and its data attributes) persists
// across navigations, so stored preferences remain applied.  Re-bind event
// listeners for the new page's .a11y-menu element.
document.addEventListener('astro:page-load', initA11yMenu);
initA11yMenu();
