// src/data/skills.ts
// Single source of truth for skills.
// INTEGRITY: Only skills Shalu actually uses. No Figma, Blender, Rhino,
// Midjourney, Stable Diffusion, ComfyUI, or rendering engines.
// Each skill is tagged with project slugs that use it.

export interface Skill {
  readonly name: string;
  readonly projectSlugs: readonly string[];
}

export interface SkillCategory {
  readonly label: string;
  readonly skills: readonly Skill[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', projectSlugs: ['customer360', 'care-emr', 'veriagent', 'human-digital-twin', 'neurogrowth-ai'] },
      { name: 'TypeScript', projectSlugs: ['customer360', 'care-emr', 'human-digital-twin', 'neurogrowth-ai'] },
      { name: 'JavaScript', projectSlugs: ['customer360', 'care-emr'] },
      { name: 'C++', projectSlugs: ['maze-solver'] },
      { name: 'SQL', projectSlugs: ['customer360', 'human-digital-twin'] },
    ],
  },
  {
    label: 'Agentic AI & LLMs',
    skills: [
      { name: 'LangChain', projectSlugs: ['neurogrowth-ai'] },
      { name: 'LangGraph.js', projectSlugs: ['customer360'] },
      { name: 'RAG pipelines', projectSlugs: ['neurogrowth-ai'] },
      { name: 'Prompt engineering', projectSlugs: ['customer360', 'neurogrowth-ai'] },
      { name: 'Gemini APIs', projectSlugs: ['customer360'] },
      { name: 'Ollama inference', projectSlugs: ['care-emr'] },
    ],
  },
  {
    label: 'Full-stack',
    skills: [
      { name: 'React', projectSlugs: ['customer360', 'care-emr'] },
      { name: 'Next.js', projectSlugs: ['customer360', 'human-digital-twin'] },
      { name: 'FastAPI', projectSlugs: ['care-emr', 'human-digital-twin', 'neurogrowth-ai'] },
      { name: 'Django DRF', projectSlugs: ['care-emr'] },
      { name: 'Node.js', projectSlugs: ['customer360'] },
      { name: 'NestJS', projectSlugs: ['customer360'] },
      { name: 'REST APIs', projectSlugs: ['customer360', 'care-emr', 'human-digital-twin', 'neurogrowth-ai'] },
      { name: 'Tailwind CSS', projectSlugs: ['care-emr'] },
    ],
  },
  {
    label: 'Data / ML',
    skills: [
      { name: 'PyTorch', projectSlugs: ['neurogrowth-ai'] },
      { name: 'scikit-learn', projectSlugs: ['human-digital-twin'] },
      { name: 'Pandas', projectSlugs: ['human-digital-twin', 'neurogrowth-ai'] },
      { name: 'NumPy', projectSlugs: ['human-digital-twin', 'neurogrowth-ai'] },
    ],
  },
  {
    label: 'Infra',
    skills: [
      { name: 'Docker', projectSlugs: ['customer360', 'care-emr', 'neurogrowth-ai'] },
      { name: 'PostgreSQL', projectSlugs: ['customer360', 'human-digital-twin'] },
      { name: 'Redis', projectSlugs: ['customer360'] },
      { name: 'Git', projectSlugs: ['customer360', 'care-emr', 'veriagent', 'maze-solver', 'human-digital-twin', 'neurogrowth-ai'] },
      { name: 'CI/CD', projectSlugs: ['customer360'] },
      { name: 'GCP', projectSlugs: ['neurogrowth-ai'] },
    ],
  },
  {
    label: 'AI coding tools',
    skills: [
      { name: 'Cursor', projectSlugs: [] },
      { name: 'GitHub Copilot', projectSlugs: [] },
    ],
  },
  {
    label: 'Exploring',
    skills: [
      // TODO(shalu): Add any tools/skills you're currently exploring
    ],
  },
] as const;

// Flat list of all skill names for validation
export const allSkillNames: readonly string[] = skillCategories.flatMap(
  (cat) => cat.skills.map((s) => s.name)
);

// Get all project slugs that use a given skill
export function getProjectSlugsForSkill(skillName: string): readonly string[] {
  for (const cat of skillCategories) {
    for (const skill of cat.skills) {
      if (skill.name === skillName) return skill.projectSlugs;
    }
  }
  return [];
}
