// "Volver a Atrás" on project/article layouts + scroll restore on history traversal.
//
// Capture-phase so ClientRouter sees defaultPrevented and skips navigate().
// In-app history (history.state.index from Astro transitions) → history.back().
// Deep entry with no in-app history → full load of href so the browser applies
// the section hash natively.
//
// Astro ClientRouter restores scroll in moveToLocation(), but a view-transition
// abort ("Viewport size changed") can skip that path; scrollend then overwrites
// history.state.scrollY with 0. We snapshot scroll on non-traverse leaves and
// re-apply it on astro:page-load after a traverse return.

type NavEvent = Event & { navigationType?: string };

const scrollKey = (path: string) => `gc:scroll:${path}`;

let lastNavType: string | null = null;

const saveScroll = (path: string, y: number, x = 0) => {
	try {
		sessionStorage.setItem(scrollKey(path), `${x}:${y}`);
	} catch {
		/* private mode / quota */
	}
};

const readSavedScroll = (path: string): { x: number; y: number } | null => {
	try {
		const raw = sessionStorage.getItem(scrollKey(path));
		if (!raw) return null;
		const [xs, ys] = raw.split(':');
		const x = Number(xs);
		const y = Number(ys);
		if (!Number.isFinite(x) || !Number.isFinite(y) || y <= 0) return null;
		return { x, y };
	} catch {
		return null;
	}
};

const applyScroll = (x: number, y: number) => {
	window.scrollTo({ left: x, top: y, behavior: 'instant' });
};

// Snapshot before leaving (push/replace only — not history back/forward).
document.addEventListener('astro:before-preparation', (e) => {
	const navType = (e as NavEvent).navigationType ?? null;
	lastNavType = navType;
	if (navType !== 'traverse') {
		saveScroll(location.pathname, window.scrollY, window.scrollX);
	}
});

// After ClientRouter swap: on traverse return, force-restore scroll.
document.addEventListener('astro:page-load', () => {
	const navType = lastNavType;
	lastNavType = null;

	if (navType !== 'traverse') return;

	const state = history.state as { scrollX?: number; scrollY?: number } | null;
	const saved = readSavedScroll(location.pathname);
	const y =
		typeof state?.scrollY === 'number' && state.scrollY > 0
			? state.scrollY
			: (saved?.y ?? 0);
	if (y <= 0) return;

	const x =
		typeof state?.scrollX === 'number' && state.scrollX > 0
			? state.scrollX
			: (saved?.x ?? 0);

	const restore = () => {
		applyScroll(x, y);
		// Keep history.state aligned so a late scrollend at 0 cannot clobber it.
		if (history.state && typeof history.state === 'object') {
			history.replaceState(
				{ ...(history.state as Record<string, unknown>), scrollX: x, scrollY: y },
				'',
			);
		}
	};

	restore();
	// Layout (GSAP refresh / fonts) can shift offsets after page-load.
	requestAnimationFrame(() => {
		restore();
		requestAnimationFrame(restore);
	});
});

document.addEventListener(
	'click',
	(e) => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

		const target = e.target as Element | null;
		const fromPath = (e.composedPath?.() ?? []).find(
			(n): n is HTMLAnchorElement => n instanceof HTMLAnchorElement && n.hasAttribute('data-back-link'),
		);
		const link = fromPath ?? (target?.closest?.('a[data-back-link]') as HTMLAnchorElement | null);
		if (!(link instanceof HTMLAnchorElement)) return;

		e.preventDefault();

		const state = history.state as { index?: number } | null;
		if (typeof state?.index === 'number' && state.index > 0) {
			history.back();
			return;
		}

		// Deep link into a project/article: full load so the browser applies the hash.
		saveScroll(location.pathname, window.scrollY, window.scrollX);
		location.assign(link.href);
	},
	true,
);
