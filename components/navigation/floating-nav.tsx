import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion, type Variants } from "motion/react";
import styles from "@/components/navigation/floating-nav.module.css";

const navigationItems = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
];

export function FloatingNav({ variants }: { variants: Variants }) {
  return (
    <motion.nav
      aria-label="Primary navigation"
      className={styles.nav}
      variants={variants}
    >
      <ul className={styles.list}>
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a
              aria-current={item.href === "#top" ? "page" : undefined}
              className={styles.link}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <ThemeToggle className={styles.themeToggle} />
        </li>
      </ul>
    </motion.nav>
  );
}
