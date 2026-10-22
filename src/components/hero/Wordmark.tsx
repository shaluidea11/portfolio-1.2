// src/components/hero/Wordmark.tsx
// Giant display wordmark — the page's loudest element, matching the reference's
// massive "Portfolio" type. Includes a small notch glyph on the last letter.

export function Wordmark() {
  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
      <h1 className="font-display wordmark-title">
        Portfoli
        <span style={{ position: 'relative', display: 'inline' }}>
          o
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="wordmark-notch"
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
