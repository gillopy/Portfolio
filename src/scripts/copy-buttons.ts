const initCopyButtons = () => {
	document.querySelectorAll('.project-content .astro-code:not([data-copy-setup])').forEach((pre) => {
		pre.setAttribute('data-copy-setup', 'true');
		const group = document.createElement('div');
		group.className = 'code-group';
		pre.parentNode?.insertBefore(group, pre);
		group.appendChild(pre);
		const button = document.createElement('button');
		button.className = 'copy-btn';
		button.type = 'button';
		button.setAttribute('aria-label', 'Copiar código');
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>`;
		button.addEventListener('click', async () => {
			const code = pre.querySelector('code')?.textContent ?? '';
			try {
				await navigator.clipboard.writeText(code);
				const original = button.innerHTML;
				button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
				button.classList.add('copy-success');
				setTimeout(() => { button.innerHTML = original; button.classList.remove('copy-success'); }, 2000);
			} catch {}
		});
		group.appendChild(button);
	});
};

// Module self-init: mirrors the previous Layout wiring (init() ran this on first
// load and on astro:page-load; the data-copy-setup guard keeps re-runs idempotent).
initCopyButtons();
document.addEventListener('astro:page-load', initCopyButtons);
