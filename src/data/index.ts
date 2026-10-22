// src/data/index.ts
// Re-export all data modules for convenient imports

export { profile } from './profile';
export type { Profile } from './profile';

export { skillCategories, allSkillNames, getProjectSlugsForSkill } from './skills';
export type { Skill, SkillCategory } from './skills';

export { experience, education } from './experience';
export type { ExperienceItem } from './experience';

export { projects, caseStudyProjects, stats } from './projects';
export type { Project, CaseStudySection, ProjectLink, BentoSize, ProjectStatus, AccentColor } from './projects';
