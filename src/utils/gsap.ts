import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const refresh = () => ScrollTrigger.refresh();
export const killAll = () => ScrollTrigger.getAll().forEach((t) => t.kill());

export { gsap, ScrollTrigger };
