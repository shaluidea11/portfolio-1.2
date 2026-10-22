// src/components/ui/NotchGlyph.tsx
// Small corner bracket notch (┐) in tile top-right — matches reference design.

interface NotchGlyphProps {
  color?: string;
  size?: number;
}

export function NotchGlyph({ color = 'currentColor', size = 16 }: NotchGlyphProps) {
  return (
    <svg
      className="notch-glyph"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1H15V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
