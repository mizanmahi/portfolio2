"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const storageKey = "portfolio-workbench-tour-seen-v1";
let seenThisVisit = false;
const scrollStepRatio = 0.4;

type Exit = { type: "manual"; top: number } | { type: "complete" } | { type: "anchor"; id: string };

/** A native sticky scroll sequence; wheel, touch, and keyboard scrolling stay native. */
export function useWorkbenchTour(count: number, onSelect: (index: number) => void) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [distance, setDistance] = useState(0);
  const pendingExit = useRef<Exit | null>(null);

  const finish = useCallback((exit?: Exit) => {
    seenThisVisit = true;
    try { window.localStorage.setItem(storageKey, "true"); } catch { /* Remember in memory when storage is unavailable. */ }
    pendingExit.current = exit ?? { type: "manual", top: contentRef.current?.getBoundingClientRect().top ?? 0 };
    setActive(false);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = seenThisVisit;
    try { seen ||= window.localStorage.getItem(storageKey) === "true"; } catch { /* Storage is optional. */ }
    if (seen || motion.matches) return;
    // Arm after hydration. A direct link below the workbench should go straight there.
    const frame = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const target = document.getElementById(window.location.hash.slice(1));
      if (!section || (target && section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING && !section.contains(target))) return;
      if (section.getBoundingClientRect().bottom < 0) return;
      setDistance(window.innerHeight * scrollStepRatio * count);
      setActive(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [count]);

  useLayoutEffect(() => {
    if (active || !pendingExit.current) return;
    const exit = pendingExit.current;
    pendingExit.current = null;
    const content = contentRef.current;
    if (!content) return;
    if (exit.type === "anchor") {
      document.getElementById(exit.id)?.scrollIntoView({ behavior: "instant" });
    } else if (exit.type === "complete") {
      // Remove the scroll runway without throwing the reader back up the page.
      const section = sectionRef.current!;
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().bottom - window.innerHeight, behavior: "instant" });
    } else {
      window.scrollBy({ top: content.getBoundingClientRect().top - exit.top, behavior: "instant" });
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      frame = 0;
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;
      const step = window.innerHeight * scrollStepRatio;
      const inset = parseFloat(getComputedStyle(content).top) || 0;
      const start = section.getBoundingClientRect().top + window.scrollY + parseFloat(getComputedStyle(section).paddingTop) - inset;
      const progress = (window.scrollY - start) / step;
      onSelect(Math.max(0, Math.min(count - 1, Math.floor(progress))));
      if (progress >= count) finish({ type: "complete" });
    }
    function measure() {
      const content = contentRef.current;
      if (content) content.style.setProperty("--workbench-height", `${content.offsetHeight}px`);
      schedule();
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function resize() { setDistance(window.innerHeight * scrollStepRatio * count); measure(); }
    function preferenceChange() { if (motion.matches) finish(); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") finish(); }
    function followAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      const section = sectionRef.current;
      if (!target || !section || id === "tech-tools") return;
      // Visiting About before reaching the tour should not consume the introduction.
      if (section.getBoundingClientRect().top > window.innerHeight && section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_PRECEDING) return;
      finish({ type: "anchor", id: id! });
    }
    const observer = new ResizeObserver(measure);
    if (contentRef.current) observer.observe(contentRef.current);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", escape);
    document.addEventListener("click", followAnchor);
    motion.addEventListener("change", preferenceChange);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", escape);
      document.removeEventListener("click", followAnchor);
      motion.removeEventListener("change", preferenceChange);
    };
  }, [active, count, finish, onSelect]);

  return { sectionRef, contentRef, active, distance, finish };
}
