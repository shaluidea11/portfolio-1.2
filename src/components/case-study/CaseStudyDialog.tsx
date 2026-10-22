// src/components/case-study/CaseStudyDialog.tsx
// Native <dialog> modal on desktop, accessible with focus trap and deep links.

import { projects } from '../../data/projects';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';

interface CaseStudyDialogProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

function isTodo(text: string): boolean {
  return text.startsWith('TODO(shalu)');
}

function TodoMarker({ text }: { text: string }) {
  if (import.meta.env.PROD) return null;
  return <span className="todo-marker">{text}</span>;
}

export function CaseStudyDialog({ slug, onClose, onNavigate }: CaseStudyDialogProps) {
  const project = projects.find((p) => p.slug === slug) ?? null;
  const isOpen = project !== null && project.caseStudy !== null;

  const dialogRef = useFocusTrap(isOpen, onClose);

  // Prev/next navigation
  const projectsWithStudy = projects.filter((p) => p.caseStudy !== null);
  const currentIndex = projectsWithStudy.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsWithStudy[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsWithStudy.length - 1 ? projectsWithStudy[currentIndex + 1] : null;

  if (!isOpen || !project || !project.caseStudy) return null;

  const cs = project.caseStudy;

  return (
    <dialog
      ref={dialogRef}
      open={isOpen}
      aria-label={`Case study: ${project.title}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        margin: 'auto',
      }}
    >
      {/* Backdrop click to close */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13, 13, 15, 0.5)',
          backdropFilter: 'blur(2px)',
          zIndex: -1,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div style={{ padding: '40px 32px', maxHeight: '85vh', overflowY: 'auto' }}>
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close case study"
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            background: 'var(--color-off-white)',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--color-ink)',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <div className="prose">
          {/* Title & status */}
          <h2 style={{ marginTop: 0 }}>{project.title}</h2>
          <p style={{ color: 'var(--color-graphite)', fontSize: 'var(--text-small)' }}>
            {project.oneLiner}
            {project.status === 'in-progress' && ' · In progress'}
            {project.status === 'live' && ' · Live'}
          </p>

          {/* Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, margin: '16px 0' }}>
            {project.stack.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>

          {/* The friction */}
          <h3>The friction</h3>
          {isTodo(cs.friction)
            ? <TodoMarker text={cs.friction} />
            : <p>{cs.friction}</p>
          }

          {/* Who it's for */}
          <h3>Who it's for</h3>
          <p>{cs.whoItsFor}</p>

          {/* What I built */}
          <h3>What I built</h3>
          <p>{cs.whatIBuilt}</p>

          {/* TODO(shalu): Add hero visual/diagram here */}
          {project.images.length === 0 && !import.meta.env.PROD && (
            <TodoMarker text="TODO(shalu): Add project screenshots/diagrams" />
          )}

          {/* How it works */}
          <h3>How it works</h3>
          <p>{cs.howItWorks}</p>

          {/* Flow diagram placeholder */}
          <div
            style={{
              background: 'var(--color-off-white)',
              borderRadius: 'var(--radius-tile)',
              padding: 24,
              textAlign: 'center',
              color: 'var(--color-graphite)',
              fontSize: 'var(--text-small)',
              margin: '16px 0',
            }}
          >
            {/* TODO(shalu): Replace with inline SVG flow diagram */}
            <TodoMarker text="TODO(shalu): Add architecture/flow diagram" />
          </div>

          {/* Decisions & trade-offs */}
          <h3>Decisions & trade-offs</h3>
          <ul>
            {cs.decisions.map((d, i) => (
              <li key={i}>
                {isTodo(d) ? <TodoMarker text={d} /> : d}
              </li>
            ))}
          </ul>

          {/* What I'd do next */}
          <h3>What I'd do next</h3>
          {isTodo(cs.whatNext)
            ? <TodoMarker text={cs.whatNext} />
            : <p>{cs.whatNext}</p>
          }

          {/* Designer lens */}
          <h3>Designer lens</h3>
          <p style={{ fontStyle: 'italic', borderLeft: '3px solid var(--color-periwinkle)', paddingLeft: 16 }}>
            {cs.designerLens}
          </p>

          {/* Links */}
          {project.links.length > 0 && (
            <>
              <h3>Links</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {project.links.map((link) => (
                  <Button
                    key={link.url}
                    href={link.url}
                    variant="secondary"
                    ariaLabel={`${link.label} for ${project.title}`}
                  >
                    {link.label} ↗
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Prev / Next navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid rgba(13,13,15,0.1)',
          }}
        >
          {prevProject ? (
            <button
              type="button"
              onClick={() => onNavigate(prevProject.slug)}
              className="btn btn-secondary"
              style={{ fontSize: 'var(--text-small)' }}
            >
              ← {prevProject.title}
            </button>
          ) : <div />}
          {nextProject ? (
            <button
              type="button"
              onClick={() => onNavigate(nextProject.slug)}
              className="btn btn-secondary"
              style={{ fontSize: 'var(--text-small)' }}
            >
              {nextProject.title} →
            </button>
          ) : <div />}
        </div>
      </div>
    </dialog>
  );
}
