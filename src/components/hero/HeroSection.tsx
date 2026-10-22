// src/components/hero/HeroSection.tsx
// Above-the-fold bento grid matching the reference design:
// Left tall identity card, top-right giant wordmark, media/workflow tile,
// small stat tiles, education tile, CTA row.

import { profile } from '../../data/profile';
import { IdentityCard } from './IdentityCard';
import { Wordmark } from './Wordmark';
import { WorkflowStrip } from './WorkflowStrip';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section aria-label="Introduction" style={{ marginBottom: 'var(--gap-section)' }}>
      {/* Hero bento — explicit grid matching reference */}
      <div className="hero-grid">
        {/* Identity card — tall left column */}
        <IdentityCard />

        {/* Wordmark tile — top right, wide */}
        <div
          className="tile tile-white wordmark-tile"
          style={{
            gridArea: 'wordmark',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(20px, 4vw, 36px)',
            overflow: 'hidden',
          }}
        >
          <Wordmark />
        </div>

        {/* Workflow / positioning tile */}
        <div
          className="tile tile-white"
          style={{
            gridArea: 'workflow',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
            padding: 'clamp(18px, 3vw, 28px)',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'var(--color-graphite-dark)',
              fontSize: 'var(--text-body)',
              maxWidth: '50ch',
              lineHeight: 1.5,
            }}
          >
            {profile.positioning}
          </p>
          <WorkflowStrip />
        </div>

        {/* Stat tile: hackathons — small, teal/mint */}
        <div
          className="tile tile-mint"
          style={{
            gridArea: 'stat1',
            color: 'var(--color-ink)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 16px',
          }}
        >
          <p
            className="font-display"
            style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, lineHeight: 1 }}
          >
            2
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
            National<br />Hackathons
          </p>
        </div>

        {/* Stat tile: internships — small, white */}
        <div
          className="tile tile-white"
          style={{
            gridArea: 'stat2',
            color: 'var(--color-ink)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 16px',
          }}
        >
          <p
            className="font-display"
            style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, lineHeight: 1 }}
          >
            2
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
            Internships
          </p>
        </div>

        {/* Location / relocation tile — graphite */}
        <div
          className="tile tile-ink"
          style={{
            gridArea: 'location',
            color: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 24px',
          }}
        >
          <p
            className="font-display"
            style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}
          >
            📍 Open to Bangalore
          </p>
          <p style={{ fontSize: 'var(--text-xs)', margin: '4px 0 0', opacity: 0.7 }}>
            {profile.location} · ready to relocate
          </p>
        </div>

        {/* Skills tile — dark */}
        <div
          className="tile"
          style={{
            gridArea: 'skills',
            background: 'var(--color-graphite)',
            color: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px 16px',
          }}
        >
          <p
            className="font-display"
            style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 4px', letterSpacing: '0.02em' }}
          >
            Python · TS · LLMs
          </p>
          <p style={{ fontSize: 'var(--text-xs)', margin: 0, opacity: 0.7 }}>
            AI tools that work
          </p>
        </div>

        {/* Education tile — butter/yellow, wider */}
        <div
          className="tile tile-butter"
          style={{
            gridArea: 'education',
            color: 'var(--color-ink)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 24px',
          }}
        >
          <p
            className="font-display"
            style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: 0, lineHeight: 1.1 }}
          >
            9.51
          </p>
          <p style={{ fontSize: 'var(--text-small)', margin: '4px 0 2px', fontWeight: 600 }}>
            CGPA · B.Tech CSE
          </p>
          <p style={{ fontSize: 'var(--text-xs)', margin: 0, opacity: 0.7 }}>
            SRM IST · Quantum Computing Honours
          </p>
          <p style={{ fontSize: 'var(--text-xs)', margin: '2px 0 0', opacity: 0.6 }}>
            XII: 92.8% | X: 91.2%
          </p>
        </div>

        {/* CTA tile */}
        <div
          className="tile tile-white"
          style={{
            gridArea: 'cta',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            padding: '20px 24px',
          }}
        >
          <Button
            href={profile.resumePath}
            variant="primary"
            ariaLabel="View resume (opens Google Drive)"
            id="cta-resume"
          >
            View resume ↗
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            ariaLabel="Jump to contact section"
            id="cta-contact"
          >
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
