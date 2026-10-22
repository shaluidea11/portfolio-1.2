// src/components/bento/WorkSection.tsx
// Work bento: 6 project tiles in asymmetric grid + stat tiles.

import { projects, stats } from '../../data/projects';
import { ProjectTile } from './ProjectTile';
import { StatTile } from './StatTile';

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
      </div>
    </section>
  );
}
