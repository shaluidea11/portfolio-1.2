// src/App.tsx
// Main application shell — bento portfolio single page with hash routing.

import { useState, useCallback } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { getProjectSlugsForSkill } from './data/skills';
import { SkipLink } from './components/layout/SkipLink';
import { SideRail } from './components/layout/SideRail';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { WorkSection } from './components/bento/WorkSection';
import { CaseStudyDialog } from './components/case-study/CaseStudyDialog';
import { ProcessSection } from './components/process/ProcessSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';

export default function App() {
  const { route, navigate } = useHashRoute();

  // Skill filter state — drives dimming of project tiles
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Determine which project slug is open in the case study dialog
  const openSlug =
    route.segments[0] === 'work' && route.segments[1]
      ? route.segments[1]
      : null;

  const handleOpenProject = useCallback(
    (slug: string) => {
      navigate(`/work/${slug}`);
    },
    [navigate]
  );

  const handleCloseProject = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleNavigateProject = useCallback(
    (slug: string) => {
      navigate(`/work/${slug}`);
    },
    [navigate]
  );

  // Compute dimmed project slugs based on active skill
  const highlightedSlugs = activeSkill
    ? new Set(getProjectSlugsForSkill(activeSkill))
    : undefined;

  return (
    <>
      <SkipLink />
      <SideRail />

      <main id="main-content" className="page-container">
        <HeroSection />
        <WorkSection
          onOpenProject={handleOpenProject}
          dimmedSlugs={highlightedSlugs}
        />
        <ProcessSection />
        <AboutSection
          activeSkill={activeSkill}
          onSelectSkill={setActiveSkill}
        />
        <ContactSection />
        <Footer />
      </main>

      <MobileTabBar />

      {/* Case study dialog */}
      <CaseStudyDialog
        slug={openSlug}
        onClose={handleCloseProject}
        onNavigate={handleNavigateProject}
      />
    </>
  );
}
