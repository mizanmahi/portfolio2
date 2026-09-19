const navigationItems = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function FloatingNav() {
  return (
    <nav className="floating-nav" aria-label="Primary navigation">
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
      </ul>
    </nav>
  );
}
