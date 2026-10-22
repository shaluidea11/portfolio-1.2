// src/components/process/ProcessSection.tsx
// Interactive stepper: "How I'd work on a design team"
// This is a plan, not a claim of past work.

import { useState } from 'react';

const steps = [
  {
    title: 'Observe & interview designers',
    description:
      'Sit with the team. Watch how they work. Ask what slows them down, what they repeat, what breaks. Don\'t assume — listen.',
  },
  {
    title: 'Log friction',
    description:
      'Write down every pain point: time lost, repeated steps, context-switching, broken handoffs. Prioritise by frequency and severity.',
  },
  {
    title: 'Prototype the smallest tool',
    description:
      'Pick the highest-impact friction. Build the smallest thing that removes it — a script, a plugin, a simple UI. Ship it, get feedback, iterate.',
  },
  {
    title: 'Document & present',
    description:
      'Write clear docs so anyone on the team can use and extend it. Present the problem, the solution, and the measured improvement.',
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" aria-label="Process" style={{ marginBottom: 'var(--gap-section)' }}>
      <h2 className="section-heading">How I'd work on a design team</h2>
      <p
        style={{
          color: 'var(--color-graphite-dark)',
          marginBottom: 24,
          maxWidth: '68ch',
          fontSize: 'var(--text-small)',
          fontStyle: 'italic',
        }}
      >
        This is a plan for how I'd approach the role — not a claim of past design-team experience.
      </p>

      <div className="stepper" role="list">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            className={`stepper-step ${activeStep === i ? 'stepper-step-active' : ''}`}
            onClick={() => setActiveStep(i)}
            role="listitem"
            aria-current={activeStep === i ? 'step' : undefined}
          >
            <div className="stepper-number">{i + 1}</div>
            <div className="stepper-content">
              <h3>{step.title}</h3>
              {activeStep === i && <p>{step.description}</p>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
