// src/components/ui/Button.tsx

import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  id?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  ariaLabel,
  id,
}: ButtonProps) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} id={id}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </button>
  );
}
