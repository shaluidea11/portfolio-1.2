// src/components/layout/Footer.tsx

export function Footer() {
  return (
    <footer
      style={{
        padding: '32px 24px',
        textAlign: 'center',
        color: 'var(--color-graphite)',
        fontSize: 'var(--text-small)',
      }}
    >
      <p style={{ margin: 0 }}>
        Built by Shalu · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
