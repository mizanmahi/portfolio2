import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion, type Variants } from "motion/react";

const navigationItems = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
];

export function FloatingNav({ variants }: { variants: Variants }) {
  return (
    <motion.nav
      aria-label="Primary navigation"
      className="floating-nav"
      variants={variants}
    >
      <ul className="floating-nav-list">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a
              aria-current={item.href === "#top" ? "page" : undefined}
              className="floating-nav-link"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </motion.nav>
  );
}
