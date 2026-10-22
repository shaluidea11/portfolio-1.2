// src/data/experience.ts
// Single source of truth for experience, education, and achievements.
// INTEGRITY: No fabricated positions, dates, or awards.

export interface ExperienceItem {
  readonly type: 'internship' | 'role' | 'hackathon' | 'achievement' | 'certification';
  readonly title: string;
  readonly org: string;
  readonly period: string;
  readonly description: string;
  /** Year for timeline sorting */
  readonly year: number;
  /** Source comment for integrity */
  readonly source: string;
}

export const experience: readonly ExperienceItem[] = [
  {
    type: 'internship',
    title: 'React UI/UX Development Intern',
    org: 'PrepHire',
    period: 'Jan–Mar 2026',
    description: 'Built React interfaces and UI/UX workflows.',
    year: 2026,
    source: 'Shalu resume / PrepHire internship letter',
  },
  {
    type: 'internship',
    title: 'Java Full Stack Development Intern',
    org: 'AICTE EduSkills',
    period: 'Jul–Sep 2025',
    description: 'Full-stack Java development through AICTE virtual internship.',
    year: 2025,
    source: 'Shalu resume / AICTE EduSkills certificate',
  },
  {
    type: 'role',
    title: 'Event Management Head',
    org: 'ACM Club, SRM IST',
    period: 'Ongoing',
    description: 'Organise workshops and events for the ACM student chapter.',
    year: 2025,
    source: 'Shalu resume / ACM club role',
  },
  {
    type: 'hackathon',
    title: 'HackBricks 2025',
    org: 'MIT Bengaluru × Databricks',
    period: '2025',
    description: 'Participated and pitched to judges.',
    year: 2025,
    source: 'Shalu resume / HackBricks participation',
  },
  {
    type: 'hackathon',
    title: 'ITERYX \'26',
    org: '24-hour national hackathon, Chennai',
    period: '2026',
    description: 'Participated and pitched to judges.',
    year: 2026,
    source: 'Shalu resume / ITERYX participation',
  },
  {
    type: 'achievement',
    title: 'ACM India Quantum Summer School',
    org: 'National Quantum Mission',
    period: 'June 2025',
    description: 'Selected 1 of 60 nationally.',
    year: 2025,
    // source: verified selection count from ACM India announcement
    source: 'Shalu resume / ACM India Quantum Summer School selection',
  },
  {
    type: 'certification',
    title: 'Foundations of VR',
    org: 'NPTEL (IIT Madras)',
    period: '2025',
    description: 'NPTEL certification in VR foundations.',
    year: 2025,
    source: 'Shalu resume / NPTEL certificate',
  },
  {
    type: 'certification',
    title: 'AI Engineering Professional',
    org: 'IBM',
    period: '2025',
    description: 'IBM professional certification in AI engineering.',
    year: 2025,
    source: 'Shalu resume / IBM credential',
  },
  {
    type: 'certification',
    title: 'Full Stack Developer Professional',
    org: 'IBM',
    period: '2025',
    description: 'IBM professional certification in full-stack development.',
    year: 2025,
    source: 'Shalu resume / IBM credential',
  },
] as const;

export const education = {
  degree: 'B.Tech in Computer Science Engineering',
  honours: 'Honours in Quantum Computing',
  university: 'SRM Institute of Science and Technology',
  universityShort: 'SRM IST',
  location: 'Chennai',
  period: 'Jul 2023 – May 2027',
  graduation: 'May 2027',
  cgpa: '9.51',
  school: {
    name: 'Hansraj Public School',
    classXII: { score: '92.8%', year: 2021 },
    classX: { score: '91.2%', year: 2019 },
  },
  source: 'Shalu resume / SRM IST enrollment / school records',
} as const;
