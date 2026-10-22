// src/components/layout/SideRail.tsx
// Vertical rotated nav labels, sticky on desktop. Hidden on mobile (replaced by MobileTabBar).

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function SideRail() {
  return (
    <nav className="side-rail hidden md:flex" aria-label="Main navigation">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="side-rail-label"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
