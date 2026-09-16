import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { setHeaderBgRepaint } from './theme';
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let ctx: gsap.Context | null = null;

const initGSAP = () => {
	if (ctx) { ctx.revert(); ctx = null; }
	ScrollTrigger.getAll().forEach(t => t.kill());
	// Stale repaint hooks must never outlive the tween that registered them
	// (page swap, or a reduced-motion re-init that returns before the tween).
	setHeaderBgRepaint(null);

	if (prefersReduced()) {
		// fallback: show everything
		document.querySelectorAll<HTMLElement>('.gsap-reveal, .hero-char, .gsap-line-inner').forEach(el => {
			el.style.opacity = '1';
			el.style.transform = 'none';
		});
		// keep legacy scroll-reveal visible
		document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
		return;
	}

	ctx = gsap.context(() => {
		// -- progress bar (native scrub) --
		const pbar = document.getElementById('scroll-progress-bar');
		if (pbar) {
			gsap.to(pbar, {
				scaleX: 1,
				ease: "none",
				scrollTrigger: {
					trigger: document.body,
					start: "top top",
					end: "bottom bottom",
					scrub: 0.3,
				}
			});
		}

		// -- scroll-to-top with GSAP autoAlpha --
		const topBtn = document.getElementById('scroll-to-top');
		if (topBtn) {
			gsap.set(topBtn, { autoAlpha: 0, y: 8 });
			ScrollTrigger.create({
				start: 400,
				end: 99999,
				onUpdate: (self) => {
					const show = self.scroll() > 400;
					gsap.to(topBtn, { autoAlpha: show ? 1 : 0, y: show ? 0 : 8, duration: 0.35, ease: "power2.out", overwrite: true });
					topBtn.classList.toggle('invisible', !show);
				}
			});
		}

	// -- header shrink
	const header = document.querySelector('.site-header');
	if (header) {
		// Cached live CSSStyleDeclaration: resolves --header-solid/--header-soft
		// at tick time, so the tween follows the active theme (P-4).
		const cs = getComputedStyle(document.documentElement);
		// Latest scroll progress seen by onUpdate. A theme swap between scrolls
		// never fires scroll, so gsap wouldn't repaint the inline
		// backgroundColor; syncThemeChrome calls repaintHeaderBg() instead.
		let lastP = 0;
		const bgFor = (p: number) =>
			// Hero state (p === 0): --header-hero-bg — transparent in dark (the
			// old literal), canvas in light so the glow film doesn't seam under
			// the pill (fix B). p > 0 keeps soft/solid per theme (P-4);
			// hysteresis and the is-scrolled threshold are unchanged.
			p === 0
				? cs.getPropertyValue('--header-hero-bg').trim() || 'rgba(0,0,0,0)'
				: p > 0.5
					? cs.getPropertyValue('--header-solid').trim()
					: cs.getPropertyValue('--header-soft').trim();
		setHeaderBgRepaint(() => {
			gsap.to(header, { backgroundColor: bgFor(lastP), duration: 0.3, overwrite: true });
		});
		ScrollTrigger.create({
			start: "top top",
			end: 120,
			onUpdate: (self) => {
				lastP = Math.min(self.scroll() / 120, 1);
				gsap.to(header, { backgroundColor: bgFor(lastP), backdropFilter: "blur(16px)", duration: 0.3, overwrite: true });
				header.classList.toggle('is-scrolled', lastP > 0.2);
			}
		});
	}

		// -- generic batch reveals
		ScrollTrigger.batch(".gsap-reveal", {
			onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
			start: "top 88%",
			once: true
		});
		gsap.set(".gsap-reveal", { opacity: 0, y: 28 });

		// -- hero
		const heroChars = document.querySelectorAll('.hero-char');
		if (heroChars.length) {
			gsap.fromTo(heroChars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.025, ease: "power4.out", delay: 0.15 });
		}
		const heroKicker = document.querySelector('.hero-kicker');
		if (heroKicker) gsap.from(heroKicker, { opacity: 0, y: 10, duration: 0.6, ease: "power2.out", delay: 0.05 });
		const heroSummary = document.querySelector('.hero-summary');
		if (heroSummary) gsap.from(heroSummary, { opacity: 0, y: 18, duration: 0.7, delay: 0.45, ease: "power2.out" });
		const heroStats = document.querySelectorAll('.hero-stat');
		if (heroStats.length) gsap.from(heroStats, { opacity: 0, y: 16, duration: 0.6, stagger: 0.08, delay: 0.6, ease: "power2.out" });
		const heroBtns = document.querySelector('.hero-btns');
		if (heroBtns) gsap.from(heroBtns, { opacity: 0, y: 12, duration: 0.6, delay: 0.75, ease: "power2.out" });
		const heroVisual = document.querySelector('.hero-visual');
		if (heroVisual) {
			gsap.from(heroVisual, { opacity: 0, scale: 0.96, y: 18, duration: 0.9, delay: 0.35, ease: "power3.out" });
			gsap.to(heroVisual, {
				y: -18,
				ease: "none",
				scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: 0.8 }
			});
		}
		const scrollHint = document.querySelector('.scroll-indicator');
		if (scrollHint) {
			gsap.to(scrollHint, { opacity: 0, y: -6, scrollTrigger: { trigger: "#inicio", start: "top top", end: "20% top", scrub: 0.5 } });
		}

		// -- about
		const aboutImg = document.querySelector('.about-image-inner');
		if (aboutImg) {
			gsap.from(aboutImg, {
				scale: 0.92, opacity: 0, duration: 0.9, ease: "power3.out",
				scrollTrigger: { trigger: ".about-image", start: "top 80%", once: true }
			});
		}
		const aboutLines = document.querySelectorAll('.about-text p, .about-details .detail');
		if (aboutLines.length) {
			gsap.from(aboutLines, {
				y: 22, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
				scrollTrigger: { trigger: ".about-text", start: "top 78%", once: true }
			});
		}

		// -- projects: stagger cards + image parallax scrub
		const cards = document.querySelectorAll('.project-card');
		if (cards.length) {
			gsap.set(cards, { opacity: 0, y: 36 });
			ScrollTrigger.batch(cards, {
				onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", overwrite: true }),
				start: "top 85%",
				once: true
			});
			cards.forEach((card) => {
				const img = card.querySelector('img');
				if (img) {
					gsap.fromTo(img, { scale: 1.08 }, {
						scale: 1,
						ease: "none",
						scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.9 }
					});
				}
				// subtle lift on scroll (parallax)
				gsap.to(card, {
					y: -6,
					ease: "none",
					scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.1 }
				});
			});
		}

		// -- skills
		const tools = document.querySelectorAll('.tool-item');
		if (tools.length) {
			gsap.set(tools, { opacity: 0, y: 14, scale: 0.97 });
			ScrollTrigger.batch(tools, {
				onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" }),
				start: "top 90%",
				once: true
			});
		}

		// -- contact
		const contactInfo = document.querySelector('.contact-info');
		const contactForm = document.querySelector('.contact-form');
		if (contactInfo) gsap.from(contactInfo, { x: -28, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".contact-container", start: "top 80%", once: true } });
		if (contactForm) gsap.from(contactForm, { x: 28, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".contact-container", start: "top 80%", once: true } });

		// -- section eyebrows / underlines
		document.querySelectorAll<HTMLElement>('.section-title-underline').forEach(el => {
			gsap.from(el, {
				opacity: 0, y: 12, duration: 0.6, ease: "power2.out",
				scrollTrigger: { trigger: el, start: "top 92%", once: true }
			});
		});

		ScrollTrigger.refresh();
	});
};

const init = () => {
	initGSAP();
};

document.addEventListener('astro:page-load', init);
// cleanup before Astro swap
document.addEventListener('astro:before-preparation', () => {
	if (ctx) { ctx.revert(); ctx = null; }
	ScrollTrigger.getAll().forEach(t => t.kill());
});
document.addEventListener('click', (e) => {
	const t = e.target as Element | null;
	if (t && t.closest('#scroll-to-top')) window.scrollTo({ top: 0, behavior: 'smooth' });
});

init();
