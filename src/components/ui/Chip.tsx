// src/components/ui/Chip.tsx

interface ChipProps {
  label: string;
  interactive?: boolean;
  active?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}

export function Chip({ label, interactive, active, dimmed, onClick }: ChipProps) {
  if (interactive) {
    return (
      <button
        type="button"
        className={`chip chip-interactive ${dimmed ? 'chip-dimmed' : ''}`}
        aria-pressed={active}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`chip ${dimmed ? 'chip-dimmed' : ''}`}>
      {label}
    </span>
  );
}
