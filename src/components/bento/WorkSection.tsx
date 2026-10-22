// src/components/bento/WorkSection.tsx
// Work bento: 6 project tiles in asymmetric grid + stat tiles + maze canvas.

import { Suspense, lazy } from 'react';
import { projects, stats } from '../../data/projects';
import { ProjectTile } from './ProjectTile';
import { StatTile } from './StatTile';

const MazeCanvas = lazy(() => import('../maze/MazeCanvas').then(m => ({ default: m.MazeCanvas })));

interface WorkSectionProps {
  onOpenProject: (slug: string) => void;
  dimmedSlugs?: Set<string>;
}

export function WorkSection({ onOpenProject, dimmedSlugs }: WorkSectionProps) {
  return (
    <section id="work" aria-label="Work" style={{ marginBottom: 'var(--gap-section)' }}>
      <h2 className="section-heading">Work</h2>
      <div className="bento-grid">
        {projects.map((project) => (
          <ProjectTile
            key={project.slug}
            project={project}
            onOpen={onOpenProject}
            dimmed={dimmedSlugs ? dimmedSlugs.size > 0 && !dimmedSlugs.has(project.slug) : false}
          />
        ))}

        {/* Stat tiles — only verified data from stats array */}
        {stats.map((stat) => (
          <StatTile
            key={stat.label}
            label={stat.label}
            value={stat.value}
            accentColor="var(--color-white)"
          />
        ))}

        {/* Maze solver stretch tile — lazy loaded */}
        <div className="bento-2x1">
          <Suspense fallback={
            <div className="tile tile-white" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-graphite)' }}>
              Loading maze…
            </div>
          }>
            <MazeCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
