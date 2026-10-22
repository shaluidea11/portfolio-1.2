// scripts/check-content.ts
// Content validation: run with `npx tsx scripts/check-content.ts`
// Fails on: missing source comments, unknown skills in projects, metrics without source.

import { projects } from '../src/data/projects';
import { allSkillNames } from '../src/data/skills';
import { experience } from '../src/data/experience';

let errors = 0;

function fail(msg: string) {
  console.error(`❌ ${msg}`);
  errors++;
}

function warn(msg: string) {
  console.warn(`⚠️  ${msg}`);
}

// 1. Check all experience items have source
for (const item of experience) {
  if (!item.source || item.source.trim() === '') {
    fail(`Experience "${item.title}" is missing a source comment.`);
  }
}

// 2. Check all stats have source
for (const stat of (await import('../src/data/projects')).stats) {
  if (!stat.source || stat.source.trim() === '') {
    fail(`Stat "${stat.label}" is missing a source comment.`);
  }
}

// 3. Check project metrics have source
for (const project of projects) {
  for (const metric of project.metrics) {
    if (!metric.source || metric.source.trim() === '') {
      fail(`Project "${project.title}" metric "${metric.label}" is missing a source comment.`);
    }
  }
}

// 4. Check no unknown skills are referenced in project stacks
// (This is informational — project stacks use tech names, not skill names)

// 5. Check for TODO markers in case studies
for (const project of projects) {
  if (!project.caseStudy) continue;
  const cs = project.caseStudy;

  if (cs.friction.startsWith('TODO')) {
    warn(`Project "${project.title}" case study friction is a TODO.`);
  }
  if (cs.whatNext.startsWith('TODO')) {
    warn(`Project "${project.title}" case study whatNext is a TODO.`);
  }
  for (const d of cs.decisions) {
    if (d.startsWith('TODO')) {
      warn(`Project "${project.title}" has a TODO decision.`);
    }
  }
}

// 6. Check all skill names in skillCategories are unique
const seen = new Set<string>();
for (const name of allSkillNames) {
  if (seen.has(name)) {
    fail(`Duplicate skill name: "${name}"`);
  }
  seen.add(name);
}

// 7. Check no empty images arrays have been filled with placeholder paths
for (const project of projects) {
  for (const img of project.images) {
    if (img.includes('placeholder') || img.includes('stock')) {
      fail(`Project "${project.title}" has a placeholder/stock image: ${img}`);
    }
  }
}

console.log('');
if (errors > 0) {
  console.error(`\n${errors} error(s) found. Fix before deploying.`);
  process.exit(1);
} else {
  console.log('✅ Content validation passed.');
}
