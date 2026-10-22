// src/components/hero/WorkflowStrip.tsx
// Animated CSS-only workflow strip: Brief → Explore → Refine → Ship
// One step highlights in turn.

import { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const steps = ['Brief', 'Explore', 'Refine', 'Ship'];

export function WorkflowStrip() {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <div className="workflow-strip" role="presentation">
      {steps.map((step, i) => (
        <span key={step}>
          {i > 0 && <span className="workflow-arrow" aria-hidden="true"> → </span>}
          <span
            className={`workflow-step ${activeStep === i ? 'workflow-step-active' : ''}`}
          >
            {step}
          </span>
        </span>
      ))}
    </div>
  );
}
