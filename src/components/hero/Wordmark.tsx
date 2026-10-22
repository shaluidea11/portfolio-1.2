// src/components/hero/Wordmark.tsx
// Giant display wordmark — the page's loudest element, matching the reference's
// massive "Portfolio" type. Includes a small notch glyph on the last letter.

export function Wordmark() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <h1
        className="font-display"
        style={{
          fontSize: 'clamp(4rem, 10vw + 1rem, 9rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.82,
          margin: 0,
          color: 'var(--color-ink)',
          maxWidth: '100%',
          whiteSpace: 'normal',
          wordBreak: 'keep-all',
        }}
      >
        Portfoli
        <span style={{ position: 'relative', display: 'inline' }}>
          o
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0.02em',
              right: '-0.25em',
              width: '0.22em',
              height: '0.22em',
            }}
          >
            <path
              d="M1 1H15V15"
              stroke="var(--color-periwinkle)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </h1>
    </div>
  );
}
