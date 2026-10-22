// src/data/profile.ts
// Single source of truth for personal information.
// INTEGRITY: No fabricated details. Every field comes from Shalu's own information.

export const profile = {
  name: 'Shalu',
  // Never display as "Shalu Singh" — first name only per directive
  location: 'Chennai, Tamil Nadu',
  relocationNote: 'Open to relocation (Bangalore welcome)',
  positioning: "I turn messy workflows into simple working tools, with AI where it actually helps.",
  roleLabel: 'AI Generalist · Full-stack builder',
  email: 'shaluidea1111@gmail.com',
  links: {
    github: 'https://github.com/shaluidea11',
    linkedin: 'https://www.linkedin.com/in/shalu-7901b4357',
    leetcode: 'https://leetcode.com/u/shasha_04',
  },
  resumePath: 'https://drive.google.com/file/d/1NWLjSJYpkltx7G3GhlTSnoSvrvWREZa2/view?usp=sharing',
  portraitPath: '/shalu.png',
  // Badge text for the rotating SVG badge
  badgeText: 'SHALU · AI GENERALIST · 2026 ·',
} as const;

export type Profile = typeof profile;
