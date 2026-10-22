// src/components/bento/ProjectTile.tsx
// Individual project tile for the work bento grid.

import type { Project, AccentColor } from '../../data/projects';
import { NotchGlyph } from '../ui/NotchGlyph';

const tileColorClass: Record<AccentColor, string> = {
  periwinkle: 'tile-periwinkle',
  mint: 'tile-mint',
  violet: 'tile-violet',
  butter: 'tile-butter',
  graphite: 'tile-graphite',
  ink: 'tile-ink',
};

const textColorForAccent: Record<AccentColor, string> = {
  periwinkle: 'var(--color-ink)',
  mint: 'var(--color-ink)',
  violet: 'var(--color-ink)',
  butter: 'var(--color-ink)',
  graphite: 'var(--color-white)',
  ink: 'var(--color-white)',
};

const bentoSizeClass: Record<string, string> = {
  '2x1': 'bento-2x1',
  '1x2': 'bento-1x2',
  '2x2': 'bento-2x2',
  '1x1': '',
};

interface ProjectTileProps {
  project: Project;
  onOpen: (slug: string) => void;
  dimmed?: boolean;
}

export function ProjectTile({ project, onOpen, dimmed }: ProjectTileProps) {
  const colorClass = tileColorClass[project.accentColor];
  const textColor = textColorForAccent[project.accentColor];
  const sizeClass = bentoSizeClass[project.bentoSize] ?? '';
  const isClickable = project.caseStudy !== null;

  const chipBg = project.accentColor === 'graphite' || project.accentColor === 'ink'
    ? 'rgba(255,255,255,0.15)'
    : 'rgba(13,13,15,0.08)';

  return (
    <div
      className={`tile ${colorClass} ${sizeClass} ${dimmed ? 'chip-dimmed' : ''}`}
      style={{
        color: textColor,
        cursor: isClickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 200,
      }}
      onClick={() => isClickable && onOpen(project.slug)}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen(project.slug);
        }
      }}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      aria-label={isClickable ? `View case study: ${project.title}` : undefined}
      id={`project-${project.slug}`}
    >
      {isClickable && <NotchGlyph color={textColor} />}

      <div>
        <h3
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: 'var(--text-display-md)',
            margin: '0 0 8px',
            lineHeight: 1.2,
            paddingRight: isClickable ? 32 : 0,
          }}
        >
          {project.title}
        </h3>
        <p style={{ margin: '0 0 12px', fontSize: 'var(--text-small)', maxWidth: '50ch' }}>
          {project.oneLiner}
        </p>
      </div>

      <div>
        {/* Stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="chip"
              style={{ background: chipBg, color: textColor, fontSize: '0.7rem' }}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span
              className="chip"
              style={{ background: chipBg, color: textColor, fontSize: '0.7rem' }}
            >
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Status badge */}
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              opacity: 0.7,
            }}
          >
            {project.status === 'in-progress' ? '● In progress' : ''}
            {project.status === 'live' ? '● Live' : ''}
            {project.status === 'complete' ? '● Complete' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
