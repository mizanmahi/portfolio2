"use client";

import { ArrowUp01Icon, ArrowUpRight01Icon, Facebook01Icon, Github01Icon, Linkedin01Icon, Mail01Icon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import styles from "./site-footer.module.css";

const email = "mizanmahi24@gmail.com";
const socialLinks = [
  { label: "GitHub", href: "https://github.com/mizanmahi", icon: Github01Icon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mizan-mahi/", icon: Linkedin01Icon },
  { label: "Facebook", href: "https://www.facebook.com/mizanmahi24/", icon: Facebook01Icon },
  { label: "YouTube", href: "https://www.youtube.com/@devdive24", icon: YoutubeIcon },
];

export function SiteFooter({ year }: { year: number }) {
  const footerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const lightY = useTransform(scrollYProgress, [0, 1], [64, 0]);

  return (
    <footer id="contact" ref={footerRef} className={styles.footer} aria-labelledby="contact-title">
      <div className={styles.atmosphere} aria-hidden="true">
        <motion.div className={styles.lightField} style={{ y: reduced ? 0 : lightY }} />
        <div className={styles.horizon} />
      </div>
      <div className={styles.content}>
        <div className={styles.invitation}>
          <p className={styles.availability}><span aria-hidden="true" />Available for new opportunities</p>
          <h2 id="contact-title" className={styles.title}>Let&apos;s build something<br /><span>special together.</span></h2>
          <a href={`mailto:${email}`} className={styles.email}>
            <HugeiconsIcon icon={Mail01Icon} size={24} aria-hidden="true" />
            <span>{email}</span>
            <span className={styles.emailArrow} aria-hidden="true"><HugeiconsIcon icon={ArrowUpRight01Icon} size={24} /></span>
          </a>
          <ul className={styles.socials} aria-label="Social profiles">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={icon} size={24} aria-hidden="true" />
                <span>{label}</span>
              </a></li>
            ))}
          </ul>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© {year} Mizanur Rahman. All rights reserved.</p>
          <a href="#top" className={styles.backToTop}><span>Back to top</span><HugeiconsIcon icon={ArrowUp01Icon} size={20} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
