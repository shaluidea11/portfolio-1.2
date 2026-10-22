// src/components/layout/MobileTabBar.tsx
// Bottom tab bar for mobile. Visible below md breakpoint.

interface TabItem {
  label: string;
  href: string;
  icon: string;
}

const tabItems: TabItem[] = [
  { label: 'Work', href: '#work', icon: '◆' },
  { label: 'Process', href: '#process', icon: '→' },
  { label: 'About', href: '#about', icon: '●' },
  { label: 'Contact', href: '#contact', icon: '✉' },
];

export function MobileTabBar() {
  return (
    <nav className="mobile-tab-bar" aria-label="Main navigation">
      {tabItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="mobile-tab-item"
        >
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
