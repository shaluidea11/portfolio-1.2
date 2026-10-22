// src/data/projects.ts
// Single source of truth for all 6 projects.
// INTEGRITY: No fabricated metrics. metrics[] is empty unless Shalu provides verified numbers.
// images[] is empty with TODOs for Shalu to fill.

export type BentoSize = '1x1' | '2x1' | '1x2' | '2x2';
export type ProjectStatus = 'live' | 'in-progress' | 'complete' | 'archived';
export type AccentColor = 'periwinkle' | 'mint' | 'violet' | 'butter' | 'graphite' | 'ink';

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
  readonly type: 'repo' | 'live' | 'demo' | 'paper';
}

export interface CaseStudySection {
  /** Plain-language problem description */
  readonly friction: string;
  /** Who benefits */
  readonly whoItsFor: string;
  /** What was built — high level */
  readonly whatIBuilt: string;
  /** How it works — architecture/flow */
  readonly howItWorks: string;
  /** 2–4 honest bullets */
  readonly decisions: readonly string[];
  /** Reflection */
  readonly whatNext: string;
  /** Connecting to workflow tooling */
  readonly designerLens: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly oneLiner: string;
  readonly status: ProjectStatus;
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly bentoSize: BentoSize;
  readonly accentColor: AccentColor;
  readonly caseStudy: CaseStudySection | null;
  /** TODO(shalu): Add screenshot paths here */
  readonly images: readonly string[];
  /** Only add metrics you can verify. Each must have a source comment. */
  readonly metrics: readonly { label: string; value: string; source: string }[];
  readonly designerLensShort: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'customer360',
    title: 'Customer360',
    oneLiner: 'AI-native CRM that turns plain-English requests into structured audience actions.',
    status: 'live',
    stack: ['Next.js', 'NestJS', 'Fastify', 'BullMQ', 'Redis', 'LangGraph.js', 'Gemini 2.0', 'PostgreSQL', 'Docker', 'Railway CI/CD'],
    links: [
      { label: 'Live demo', url: 'https://dream-underground.netlify.app/login', type: 'live' },
      { label: 'GitHub', url: 'https://github.com/shaluidea11/Project-Dream_Underground', type: 'repo' },
    ],
    bentoSize: '2x1',
    accentColor: 'periwinkle',
    caseStudy: {
      // TODO(shalu): Write a more detailed friction description
      friction: 'Marketing teams describe audiences in plain language but CRMs demand structured filters. The gap wastes time and produces errors.',
      whoItsFor: 'Marketing and growth teams who describe their audiences in words, not database queries.',
      whatIBuilt: 'A Next.js + NestJS CRM with a 6-agent LangGraph.js pipeline. A Fastify simulator generates realistic customer events into BullMQ/Redis queues. Agents handle data cleaning, intelligence extraction, segmentation, campaign generation, trend analysis, and analytics — all triggered by a plain-English request.',
      howItWorks: 'Plain-English request → LangGraph.js orchestrator → 6 specialised agents (data cleaning, intelligence, segmentation, campaign gen, trend analysis, analytics) → structured audience filters + campaign output. BullMQ/Redis event pipeline. PostgreSQL persistence. Docker + Railway CI/CD.',
      decisions: [
        // TODO(shalu): Write 2–4 honest decisions/trade-offs
        'TODO(shalu): Decision 1',
        'TODO(shalu): Decision 2',
      ],
      whatNext: 'TODO(shalu): What would you do next or what did you get wrong?',
      designerLens: 'This project is about turning fuzzy human intent — said in words — into structured action. The same problem a design team hits when a brief is vague and the tool demands precision.',
    },
    images: [
      // TODO(shalu): Add screenshots — e.g. '/projects/customer360/hero.png'
    ],
    metrics: [
      // No fabricated metrics. Add only verified numbers with source.
    ],
    designerLensShort: 'Turning fuzzy human intent into structured action.',
  },
  {
    slug: 'care-emr',
    title: 'CARE EMR / UHI Switch',
    oneLiner: 'Healthcare interoperability system: one workflow across many surfaces and roles.',
    status: 'complete',
    stack: ['Django', 'DRF', 'React 19', 'Vite 6', 'Tailwind 4', 'FastAPI', 'Flutter', 'MedGemma', 'Ollama', 'Docker Compose'],
    links: [
      { label: 'GitHub', url: 'https://github.com/shaluidea11/care_uhi_switch', type: 'repo' },
    ],
    bentoSize: '1x1',
    accentColor: 'mint',
    caseStudy: {
      friction: 'TODO(shalu): Describe the friction — what problem does healthcare interoperability solve in plain language?',
      whoItsFor: 'Hospitals, clinics, and patients who need health records to flow across systems without manual re-entry.',
      whatIBuilt: 'A 5-component system built at a hackathon: Django+DRF backend, React 19 + Vite 6 + Tailwind 4 frontend, FastAPI consent broker, Flutter mobile app, and a MedGemma clinical plugin via Ollama. Docker Compose orchestrates multi-hospital deployment.',
      howItWorks: 'Patient data → Django DRF API → FastAPI consent broker (patient approval) → UHI-compliant data exchange → React dashboard (clinicians) + Flutter app (patients). MedGemma plugin provides clinical suggestions via Ollama.',
      decisions: [
        'TODO(shalu): Decision 1',
        'TODO(shalu): Decision 2',
      ],
      whatNext: 'TODO(shalu): What would you do next or what did you get wrong?',
      designerLens: 'One workflow that works across multiple surfaces and roles — web dashboard, mobile app, API layer. The same challenge any design team faces: consistency across touchpoints.',
    },
    images: [],
    metrics: [],
    designerLensShort: 'One workflow across many surfaces and roles.',
  },
  {
    slug: 'veriagent',
    title: 'VeriAgent',
    oneLiner: 'Safety runtime for AI coding agents: provenance, verification, trust.',
    // TODO(shalu): Confirm status — is VeriAgent still in progress?
    status: 'in-progress',
    stack: ['Git worktrees', 'AST analysis', 'Diff analysis', 'SHA-256', 'Ed25519', 'Policy scanning', 'Secret scanning'],
    links: [
      // TODO(shalu): Add repo link when public
    ],
    bentoSize: '1x1',
    accentColor: 'violet',
    caseStudy: {
      friction: 'TODO(shalu): Describe the friction — why do teams need to verify what an AI agent actually did?',
      whoItsFor: 'Engineering teams using AI coding agents who need proof of what the agent did and didn\'t do.',
      whatIBuilt: 'A safety runtime that sandboxes AI agent work in ephemeral Git worktrees, runs anti-cheating checks (AST + diff analysis), scans for policy violations and leaked secrets, compares agent claims to execution evidence, and produces SHA-256 digest chains with Ed25519-signed receipts.',
      howItWorks: 'Agent action → ephemeral Git-worktree sandbox → AST + diff anti-cheating checks → policy & secret scanning → consistency engine (claims vs evidence) → SHA-256 digest chain → Ed25519-signed receipt. Verify with `verify <receipt.json>`.',
      decisions: [
        'TODO(shalu): Decision 1',
        'TODO(shalu): Decision 2',
      ],
      whatNext: 'TODO(shalu): What would you do next or what did you get wrong?',
      designerLens: 'Provenance — knowing exactly what an AI did and being able to trust it. When a design team uses AI tools, they need the same confidence: what did the AI change, and can I trust it?',
    },
    images: [],
    metrics: [],
    designerLensShort: 'Knowing exactly what an AI did and trusting it.',
  },
  {
    slug: 'maze-solver',
    title: 'Maze Solver Visualizer',
    oneLiner: 'Interactive pathfinding visualizer with BFS, DFS, Dijkstra, and A*.',
    status: 'complete',
    stack: ['C++17', 'SFML', 'BFS', 'DFS', 'Dijkstra', 'A*', 'Polymorphic Solver'],
    links: [
      { label: 'GitHub', url: 'https://github.com/shaluidea11/maze-solver-visualizer', type: 'repo' },
    ],
    bentoSize: '2x1',
    accentColor: 'butter',
    caseStudy: {
      friction: 'Pathfinding algorithms are abstract and hard to understand from code alone. You need to see them work.',
      whoItsFor: 'Anyone learning algorithms who wants to see, not just read about, how BFS, DFS, Dijkstra, and A* explore a maze differently.',
      whatIBuilt: 'A C++17 + SFML desktop app. Recursive-backtracking generator creates mazes. Four algorithms (BFS, DFS, Dijkstra, A*) implemented as polymorphic Solver subclasses. Step/pause/frame-by-frame controls, speed slider, comparison mode, grids from 5×5 to 80×80.',
      howItWorks: 'Maze generator (recursive backtracking) → user picks algorithm(s) → solver runs step-by-step with visual feedback → comparison mode shows two algorithms side by side. Speed slider and frame controls let you slow down or step through.',
      decisions: [
        'TODO(shalu): Decision 1',
        'TODO(shalu): Decision 2',
      ],
      whatNext: 'TODO(shalu): What would you do next or what did you get wrong?',
      designerLens: 'Making an abstract process visible and explorable. The same skill a design team needs when explaining a complex system to stakeholders — turn the invisible into something you can point at.',
    },
    images: [],
    metrics: [],
    designerLensShort: 'Making an abstract process visible and explorable.',
  },
  {
    slug: 'human-digital-twin',
    title: 'Human Digital Twin',
    oneLiner: 'Solo AI healthcare SaaS with full documentation set.',
    status: 'complete',
    stack: ['FastAPI', 'FHIR/HL7', 'TimescaleDB', 'MongoDB', 'Kafka', 'Keycloak', 'XGBoost', 'TypeScript', 'Next.js'],
    links: [
      { label: 'GitHub', url: 'https://github.com/shaluidea11/Human-Digital-Twin', type: 'repo' },
    ],
    bentoSize: '1x1',
    accentColor: 'graphite',
    caseStudy: null, // No full case study for this project
    images: [],
    metrics: [],
    designerLensShort: 'Documentation others can actually adopt.',
  },
  {
    slug: 'neurogrowth-ai',
    title: 'NeuroGrowth AI',
    oneLiner: 'LSTM+Attention model with explainable outputs a non-expert can read.',
    status: 'complete',
    stack: ['PyTorch', 'LSTM+Attention', 'FastAPI', 'JWT RBAC', 'LangChain', 'SHAP', 'Docker', 'GCP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/shaluidea11/NeuroGrowthai', type: 'repo' },
    ],
    bentoSize: '1x1',
    accentColor: 'mint',
    caseStudy: null, // No full case study for this project
    images: [],
    metrics: [],
    designerLensShort: 'Explainable outputs a non-expert can read.',
  },
] as const;

// Projects that have full case studies
export const caseStudyProjects = projects.filter(
  (p): p is Project & { caseStudy: CaseStudySection } => p.caseStudy !== null
);

// Stats derived from verified data only
export const stats = [
  { label: 'National hackathons', value: '2', source: 'HackBricks 2025 + ITERYX \'26 from experience.ts' },
  { label: 'Internships', value: '2', source: 'PrepHire + AICTE EduSkills from experience.ts' },
  { label: 'ACM India Quantum Summer School', value: '1 of 60 nationally selected', source: 'experience.ts / ACM India selection' },
] as const;
