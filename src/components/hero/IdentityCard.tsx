// src/components/hero/IdentityCard.tsx
// Tall periwinkle card matching reference: large circular portrait with ring,
// big italic "I'm," + bold name, email at bottom, rotating badge.

import { profile } from '../../data/profile';
import { RotatingBadge } from './RotatingBadge';
import { useState } from 'react';

import portraitImg from '../../assets/shalu.png';

export function IdentityCard() {
  const [imgSrc, setImgSrc] = useState<string>(portraitImg);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    // Multi-tier fallback if bundled asset fails:
    const publicUrl = `${import.meta.env.BASE_URL}shalu.png`;
    if (imgSrc !== publicUrl) {
      setImgSrc(publicUrl);
    } else if (imgSrc !== '/shalu.png') {
      setImgSrc('/shalu.png');
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      className="tile tile-periwinkle identity-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridArea: 'identity',
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
        <div className="portrait-container">
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
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              background: 'rgba(200, 160, 240, 0.4)',
              filter: 'blur(2px)',
            }}
            aria-hidden="true"
          />
          {/* Portrait */}
          {!imgError ? (
            <img
              src={imgSrc}
              alt={`Portrait of ${profile.name}`}
              className="portrait-img"
              onError={handleImageError}
              loading="eager"
            />
          ) : (
            <div
              className="portrait-fallback"
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
          className="font-display identity-name"
          style={{
            fontWeight: 800,
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
          className="identity-email"
          style={{
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
