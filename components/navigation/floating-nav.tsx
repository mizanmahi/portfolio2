"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import styles from "@/components/navigation/floating-nav.module.css";

const navigationItems = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "tech-tools", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function FloatingNav({ variants }: { variants: Variants }) {
  const [activeId, setActiveId] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    let frame = 0;
    const sections = navigationItems.map(({ id }) => document.getElementById(id));

    function updateActiveSection() {
      frame = 0;
      // Select the last section to cross the upper third of the viewport.
      const readingLine = Math.min(window.innerHeight / 3, 240);
      let current = navigationItems[0].id;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine) current = navigationItems[index].id;
      });
      if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        current = navigationItems[navigationItems.length - 1].id;
      }
      setActiveId(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => { if (section) observer.observe(section); });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 72rem)");
    function closeOnDesktop() { if (desktop.matches) setMenuOpen(false); }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  const activeIndex = navigationItems.findIndex(({ id }) => id === activeId);
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 34 };

  return (
    <motion.nav ref={navRef} aria-label="Primary navigation" className={styles.nav} variants={variants} layoutRoot>
      <a href="#top" className={styles.signature} aria-label="Mizanur Rahman — home" onClick={() => setMenuOpen(false)}>
        <span>m<span className={styles.signatureSlash}>/</span>r</span>
      </a>
      <button ref={menuButtonRef} type="button" className={styles.menuButton} aria-expanded={menuOpen} aria-controls="portfolio-navigation-links" onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? "Close" : "Menu"}</span>
        <span className={styles.menuGlyph} aria-hidden="true"><span /><span /></span>
      </button>
      <ul id="portfolio-navigation-links" className={styles.list} data-open={menuOpen}>
        {navigationItems.map((item, index) => (
          <li key={item.id}>
            <a
              aria-current={item.id === activeId ? "location" : undefined}
              className={styles.link}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileIndex} aria-hidden="true">0{index + 1}</span>
              <span className={styles.labelWindow}>
                <span className={styles.labelRoll}><span>{item.label}</span><span aria-hidden="true">{item.label}</span></span>
              </span>
              <span className={styles.mobileArrow} aria-hidden="true">↗</span>
              {activeId === item.id && <motion.span aria-hidden="true" className={styles.activeIndicator} layoutId="portfolio-nav-active" transition={transition} />}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.utilities}>
        <div className={styles.sectionCounter} aria-hidden="true">
          <span className={styles.counterWindow}><motion.span key={activeId} initial={reduced ? false : { y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 0.25 }}>0{activeIndex + 1}</motion.span></span>
          <span className={styles.counterDivider}>/</span><span>{String(navigationItems.length).padStart(2, "0")}</span>
        </div>
        <ThemeToggle className={styles.themeToggle} />
      </div>
    </motion.nav>
  );
}
