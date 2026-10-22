// src/components/about/AboutSection.tsx
// About section: short bio, skill filter, timeline.

import { profile } from '../../data/profile';
import { SkillFilter } from './SkillFilter';
import { Timeline } from './Timeline';

interface AboutSectionProps {
  activeSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export function AboutSection({ activeSkill, onSelectSkill }: AboutSectionProps) {
  return (
    <section id="about" aria-label="About" style={{ marginBottom: 'var(--gap-section)' }}>
      <h2 className="section-heading">About</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--gap-section)',
        }}
      >
        {/* Bio + skills */}
        <div
          className="tile tile-white"
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          <div className="max-prose">
            <p style={{ marginTop: 0 }}>
              I'm {profile.name}, a final-year B.Tech CS student at SRM IST with an Honours in Quantum Computing, graduating May 2027.
              I build tools that take messy, manual workflows and turn them into something that actually works — with AI where it helps, not where it's fashionable.
            </p>
            <p>
              I've interned on React UI/UX and Java full-stack projects, pitched at two national hackathons, and was selected 1 of 60 nationally for the ACM India Quantum Summer School.
              I lead event management for our ACM chapter.
            </p>
            <p style={{ marginBottom: 0 }}>
              I'm looking for a role where I can spot real friction in a team's workflow, build the smallest tool that fixes it, and document it so anyone can use it.
            </p>
          </div>

          <div>
            <h3
              className="font-display"
              style={{ fontWeight: 700, fontSize: '1.25rem', margin: '0 0 16px' }}
            >
              Skills
            </h3>
            <SkillFilter activeSkill={activeSkill} onSelectSkill={onSelectSkill} />
          </div>
        </div>

        {/* Timeline */}
        <div className="tile tile-white">
          <h3
            className="font-display"
            style={{ fontWeight: 700, fontSize: '1.25rem', margin: '0 0 16px' }}
          >
            Timeline
          </h3>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
