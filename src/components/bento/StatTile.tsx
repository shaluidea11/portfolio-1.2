// src/components/bento/StatTile.tsx
// Small stat tile for the work bento grid. Only renders verified data.

interface StatTileProps {
  label: string;
  value: string;
  accentColor?: string;
}

export function StatTile({ label, value, accentColor = 'var(--color-white)' }: StatTileProps) {
  return (
    <div
      className="tile"
      style={{
        backgroundColor: accentColor,
        color: 'var(--color-ink)',
      }}
    >
      <p
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: 'var(--text-display-md)',
          margin: '0 0 4px',
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-graphite-dark)' }}>
        {label}
      </p>
    </div>
  );
}
