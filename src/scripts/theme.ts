// ---------- Theme runtime (markup in ThemeToggle.astro; state on html[data-theme]) ----------
// Set by the GSAP header ScrollTrigger (Layout script below) so a theme swap
// without scrolling can repaint the GSAP-owned inline header background.
// Stays null in reduced-motion (header bg is CSS-var owned there) and on
// pages without a header — both guarded by the optional call.
let repaintHeaderBg: (() => void) | null = null;

export function setHeaderBgRepaint(hook: (() => void) | null): void {
	repaintHeaderBg = hook;
}

const syncThemeChrome = () => {
	const light = document.documentElement.dataset.theme === 'light';
	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) meta.setAttribute('content', light ? '#fbfbfb' : '#090909');
	document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
		btn.setAttribute('aria-label', light ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'),
	);
	// Covers both the toggle click and page-load/after-swap applyTheme():
	// the tween only re-ticks on scroll progress, so re-resolve theme vars now.
	repaintHeaderBg?.();
};

const applyTheme = () => {
	let stored: string | null = null;
	try { stored = localStorage.getItem('theme'); } catch {}
	document.documentElement.dataset.theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
	syncThemeChrome();
};

// Delegated single document listener: survives ClientRouter swaps without rebinding.
document.addEventListener('click', (e) => {
	const target = e.target as Element | null;
	if (!target?.closest('[data-theme-toggle]')) return;
	const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
	document.documentElement.dataset.theme = next;
	try { localStorage.setItem('theme', next); } catch {}
	syncThemeChrome();
});

// Re-apply on load/swap: view-transition swap may drop <html> attributes.
document.addEventListener('astro:page-load', applyTheme);
document.addEventListener('astro:after-swap', applyTheme);

applyTheme();
