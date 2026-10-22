// src/components/contact/ContactSection.tsx
// Contact CTA band with copy-email button, social links, resume download. No form, no backend.

import { useState } from 'react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" aria-label="Contact" style={{ marginBottom: 'var(--gap-section)' }}>
      <div className="tile tile-ink" style={{ color: 'var(--color-white)', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px)' }}>
        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: 'var(--text-display-lg)',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}
        >
          Let's talk
        </h2>
        <p style={{ margin: '0 0 24px', maxWidth: '50ch', color: 'rgba(255,255,255,0.7)' }}>
          I'm looking for a 6-month internship starting early 2027. If you're building tools for design teams or need someone who ships working software, I'd love to chat.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Copy email button */}
          <button
            type="button"
            onClick={copyEmail}
            className={`btn ${copied ? 'copy-btn-copied' : 'btn-primary'}`}
            style={{
              background: copied ? 'var(--color-mint)' : 'var(--color-white)',
              color: 'var(--color-ink)',
            }}
            aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
            id="copy-email-btn"
          >
            {copied ? '✓ Copied!' : `${profile.email}`}
          </button>

          {/* LinkedIn */}
          <Button
            href={profile.links.linkedin}
            variant="secondary"
            ariaLabel="LinkedIn profile"
            id="link-linkedin"
          >
            <span style={{ color: 'var(--color-white)' }}>LinkedIn ↗</span>
          </Button>

          {/* GitHub */}
          <Button
            href={profile.links.github}
            variant="secondary"
            ariaLabel="GitHub profile"
            id="link-github"
          >
            <span style={{ color: 'var(--color-white)' }}>GitHub ↗</span>
          </Button>

          {/* Resume */}
          <Button
            href={profile.resumePath}
            variant="secondary"
            ariaLabel="Download resume PDF"
            id="download-resume"
          >
            <span style={{ color: 'var(--color-white)' }}>Resume (PDF) ↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
