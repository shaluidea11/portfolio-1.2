// src/components/hero/IdentityCard.tsx
// Tall periwinkle card matching reference: large circular portrait with ring,
// big italic "I'm," + bold name, email at bottom, rotating badge.

import { profile } from '../../data/profile';
import { RotatingBadge } from './RotatingBadge';
import { useState } from 'react';

export function IdentityCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="tile tile-periwinkle"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridArea: 'identity',
        minHeight: 480,
        color: 'var(--color-ink)',
        padding: '28px 28px 24px',
        position: 'relative',
      }}
    >
      {/* Top label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <span style={{ fontSize: '1.1rem' }} aria-hidden="true">✦</span>
        <span
          style={{
            fontSize: 'var(--text-small)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          About Me
        </span>
      </div>

      {/* Portrait with decorative ring */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 200,
          }}
        >
          {/* Decorative ring */}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.5)',
            }}
            aria-hidden="true"
          />
          {/* Pink/lavender glow behind portrait */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'rgba(200, 160, 240, 0.4)',
              filter: 'blur(2px)',
            }}
            aria-hidden="true"
          />
          {/* Portrait */}
          {!imgError ? (
            <img
              src={profile.portraitPath}
              alt={`Portrait of ${profile.name}`}
              width={200}
              height={200}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
                width: 200,
                height: 200,
                position: 'relative',
                zIndex: 1,
              }}
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'var(--color-off-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '5rem',
                color: 'var(--color-periwinkle)',
                position: 'relative',
                zIndex: 1,
              }}
              aria-label={`Monogram for ${profile.name}`}
            >
              S
            </div>
          )}
        </div>
      </div>

      {/* Name — big display type */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <p
          className="font-display"
          style={{
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            lineHeight: 1.1,
            margin: '0 0 -4px',
            opacity: 0.85,
          }}
        >
          I'm,
        </p>
        <p
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {profile.name}
        </p>
      </div>

      {/* Email + badge at bottom */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <a
          href={`mailto:${profile.email}`}
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: 0.8,
          }}
        >
          {profile.email}
          <span aria-hidden="true" style={{ fontSize: '0.9rem' }}>✉</span>
        </a>
        <RotatingBadge />
      </div>
    </div>
  );
}
