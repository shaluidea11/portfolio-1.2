// src/components/about/SkillFilter.tsx
// Interactive skill filter: clicking a skill highlights related projects.

import { skillCategories } from '../../data/skills';
import { Chip } from '../ui/Chip';

interface SkillFilterProps {
  activeSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export function SkillFilter({ activeSkill, onSelectSkill }: SkillFilterProps) {
  return (
    <div>
      {skillCategories.map((category) => {
        if (category.skills.length === 0) {
          // Empty "Exploring" row with TODO
          return (
            <div key={category.label} style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-graphite)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '0 0 6px',
                }}
              >
                {category.label}
              </p>
              {!import.meta.env.PROD && (
                <span className="todo-marker">
                  TODO(shalu): Add skills you're currently exploring
                </span>
              )}
            </div>
          );
        }

        return (
          <div key={category.label} style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-graphite)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: '0 0 6px',
              }}
            >
              {category.label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {category.skills.map((skill) => (
                <Chip
                  key={skill.name}
                  label={skill.name}
                  interactive
                  active={activeSkill === skill.name}
                  onClick={() =>
                    onSelectSkill(activeSkill === skill.name ? null : skill.name)
                  }
                />
              ))}
            </div>
          </div>
        );
      })}

      {activeSkill && (
        <button
          type="button"
          onClick={() => onSelectSkill(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-graphite)',
            fontSize: 'var(--text-small)',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            marginTop: 8,
            padding: '4px 0',
          }}
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
