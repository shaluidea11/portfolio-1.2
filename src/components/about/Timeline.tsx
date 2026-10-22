// src/components/about/Timeline.tsx
// Compact timeline for experience, hackathons, achievements.

import { experience, education } from '../../data/experience';

export function Timeline() {
  // Sort by year descending
  const sorted = [...experience].sort((a, b) => b.year - a.year);

  return (
    <div>
      {/* Education */}
      <div style={{ marginBottom: 24 }}>
        <p
          className="font-display"
          style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 4px' }}
        >
          {education.degree}
        </p>
        <p style={{ margin: '0 0 4px', fontSize: 'var(--text-small)', color: 'var(--color-graphite-dark)' }}>
          {education.honours} · {education.university} · {education.period}
        </p>
        <p style={{ margin: '0 0 4px', fontSize: 'var(--text-small)', color: 'var(--color-graphite-dark)' }}>
          CGPA: {education.cgpa} · {education.location}
        </p>
        <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-graphite)' }}>
          XII: {education.school.classXII.score} ({education.school.classXII.year}) | X: {education.school.classX.score} ({education.school.classX.year}), {education.school.name}
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {sorted.map((item, i) => (
          <div key={`${item.title}-${i}`} className="timeline-item">
            <span className="timeline-item-label">
              {item.period} · {item.type}
            </span>
            <p
              className="font-display"
              style={{ fontWeight: 700, margin: '4px 0 2px', fontSize: '1rem' }}
            >
              {item.title}
            </p>
            <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-graphite-dark)' }}>
              {item.org}
              {item.type === 'achievement' && ` — ${item.description}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
