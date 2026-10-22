// src/components/maze/MazeCanvas.tsx
// Lazy-loaded canvas mini maze solver: BFS vs A* side by side.
// Step/speed controls, keyboard accessible, paused under reduced motion.
// Labelled "Web re-creation of my C++ Maze Solver".

import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ── Types ──
interface Cell {
  x: number;
  y: number;
  walls: [boolean, boolean, boolean, boolean]; // top, right, bottom, left
  visited: boolean;
}

type Grid = Cell[][];

// ── Maze Generation (recursive backtracking) ──
function createGrid(cols: number, rows: number): Grid {
  const grid: Grid = [];
  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({ x, y, walls: [true, true, true, true], visited: false });
    }
    grid.push(row);
  }
  return grid;
}

function getNeighbors(grid: Grid, cell: Cell, cols: number, rows: number): Cell[] {
  const { x, y } = cell;
  const neighbors: Cell[] = [];
  if (y > 0) { const n = grid[y - 1]?.[x]; if (n && !n.visited) neighbors.push(n); }
  if (x < cols - 1) { const n = grid[y]?.[x + 1]; if (n && !n.visited) neighbors.push(n); }
  if (y < rows - 1) { const n = grid[y + 1]?.[x]; if (n && !n.visited) neighbors.push(n); }
  if (x > 0) { const n = grid[y]?.[x - 1]; if (n && !n.visited) neighbors.push(n); }
  return neighbors;
}

function removeWalls(a: Cell, b: Cell) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  if (dx === 1) { a.walls[3] = false; b.walls[1] = false; }
  if (dx === -1) { a.walls[1] = false; b.walls[3] = false; }
  if (dy === 1) { a.walls[0] = false; b.walls[2] = false; }
  if (dy === -1) { a.walls[2] = false; b.walls[0] = false; }
}

function generateMaze(cols: number, rows: number): Grid {
  const grid = createGrid(cols, rows);
  const stack: Cell[] = [];
  const start = grid[0]?.[0];
  if (!start) return grid;
  start.visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!;
    const neighbors = getNeighbors(grid, current, cols, rows);
    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)]!;
      removeWalls(current, next);
      next.visited = true;
      stack.push(next);
    }
  }

  // Reset visited for solving
  for (const row of grid) for (const cell of row) cell.visited = false;
  return grid;
}

// ── Solvers ──
interface SolverState {
  visited: Set<string>;
  path: string[];
  frontier: { x: number; y: number; cost: number }[];
  done: boolean;
}

function key(x: number, y: number) { return `${x},${y}`; }

function initBFS(grid: Grid): SolverState {
  void grid;
  return {
    visited: new Set([key(0, 0)]),
    path: [],
    frontier: [{ x: 0, y: 0, cost: 0 }],
    done: false,
  };
}

function initAStar(grid: Grid, goalX: number, goalY: number): SolverState {
  void grid;
  const h = Math.abs(goalX) + Math.abs(goalY);
  return {
    visited: new Set([key(0, 0)]),
    path: [],
    frontier: [{ x: 0, y: 0, cost: h }],
    done: false,
  };
}

function getAccessibleNeighbors(grid: Grid, x: number, y: number, cols: number, rows: number) {
  const cell = grid[y]?.[x];
  if (!cell) return [];
  const result: { x: number; y: number }[] = [];
  if (!cell.walls[0] && y > 0) result.push({ x, y: y - 1 });
  if (!cell.walls[1] && x < cols - 1) result.push({ x: x + 1, y });
  if (!cell.walls[2] && y < rows - 1) result.push({ x, y: y + 1 });
  if (!cell.walls[3] && x > 0) result.push({ x: x - 1, y });
  return result;
}

function stepBFS(state: SolverState, grid: Grid, cols: number, rows: number, goalX: number, goalY: number): SolverState {
  if (state.done || state.frontier.length === 0) return { ...state, done: true };

  const current = state.frontier.shift()!;
  const newVisited = new Set(state.visited);
  const newPath = [...state.path, key(current.x, current.y)];

  if (current.x === goalX && current.y === goalY) {
    return { visited: newVisited, path: newPath, frontier: [], done: true };
  }

  const neighbors = getAccessibleNeighbors(grid, current.x, current.y, cols, rows);
  const newFrontier = [...state.frontier];
  for (const n of neighbors) {
    const k = key(n.x, n.y);
    if (!newVisited.has(k)) {
      newVisited.add(k);
      newFrontier.push({ x: n.x, y: n.y, cost: 0 });
    }
  }

  return { visited: newVisited, path: newPath, frontier: newFrontier, done: false };
}

function stepAStar(state: SolverState, grid: Grid, cols: number, rows: number, goalX: number, goalY: number): SolverState {
  if (state.done || state.frontier.length === 0) return { ...state, done: true };

  // Pick lowest cost
  state.frontier.sort((a, b) => a.cost - b.cost);
  const current = state.frontier.shift()!;
  const newVisited = new Set(state.visited);
  const newPath = [...state.path, key(current.x, current.y)];

  if (current.x === goalX && current.y === goalY) {
    return { visited: newVisited, path: newPath, frontier: [], done: true };
  }

  const neighbors = getAccessibleNeighbors(grid, current.x, current.y, cols, rows);
  const newFrontier = [...state.frontier];
  for (const n of neighbors) {
    const k = key(n.x, n.y);
    if (!newVisited.has(k)) {
      newVisited.add(k);
      const h = Math.abs(goalX - n.x) + Math.abs(goalY - n.y);
      newFrontier.push({ x: n.x, y: n.y, cost: h });
    }
  }

  return { visited: newVisited, path: newPath, frontier: newFrontier, done: false };
}

// ── Drawing ──
function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  cellSize: number,
  offsetX: number,
  visited: Set<string>,
  path: string[],
  visitedColor: string,
  pathColor: string,
  cols: number,
  rows: number
) {
  // Visited cells
  for (const k of visited) {
    const [xStr, yStr] = k.split(',');
    const x = Number(xStr);
    const y = Number(yStr);
    ctx.fillStyle = visitedColor;
    ctx.fillRect(offsetX + x * cellSize, y * cellSize, cellSize, cellSize);
  }

  // Path
  for (const k of path) {
    const [xStr, yStr] = k.split(',');
    const x = Number(xStr);
    const y = Number(yStr);
    ctx.fillStyle = pathColor;
    ctx.fillRect(offsetX + x * cellSize, y * cellSize, cellSize, cellSize);
  }

  // Start & end
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(offsetX, 0, cellSize, cellSize);
  ctx.fillStyle = '#F44336';
  ctx.fillRect(offsetX + (cols - 1) * cellSize, (rows - 1) * cellSize, cellSize, cellSize);

  // Walls
  ctx.strokeStyle = 'var(--color-ink)';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y]?.[x];
      if (!cell) continue;
      const px = offsetX + x * cellSize;
      const py = y * cellSize;
      if (cell.walls[0]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + cellSize, py); ctx.stroke(); }
      if (cell.walls[1]) { ctx.beginPath(); ctx.moveTo(px + cellSize, py); ctx.lineTo(px + cellSize, py + cellSize); ctx.stroke(); }
      if (cell.walls[2]) { ctx.beginPath(); ctx.moveTo(px + cellSize, py + cellSize); ctx.lineTo(px, py + cellSize); ctx.stroke(); }
      if (cell.walls[3]) { ctx.beginPath(); ctx.moveTo(px, py + cellSize); ctx.lineTo(px, py); ctx.stroke(); }
    }
  }
}

// ── Component ──
const COLS = 15;
const ROWS = 15;

export function MazeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(80);
  const [grid, setGrid] = useState<Grid>(() => generateMaze(COLS, ROWS));
  const [bfsState, setBfsState] = useState<SolverState>(() => initBFS(grid));
  const [astarState, setAstarState] = useState<SolverState>(() => initAStar(grid, COLS - 1, ROWS - 1));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goalX = COLS - 1;
  const goalY = ROWS - 1;

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    const newGrid = generateMaze(COLS, ROWS);
    setGrid(newGrid);
    setBfsState(initBFS(newGrid));
    setAstarState(initAStar(newGrid, COLS - 1, ROWS - 1));
  }, []);

  const stepOnce = useCallback(() => {
    setBfsState((prev) => stepBFS(prev, grid, COLS, ROWS, goalX, goalY));
    setAstarState((prev) => stepAStar(prev, grid, COLS, ROWS, goalX, goalY));
  }, [grid, goalX, goalY]);

  const toggleRun = useCallback(() => {
    if (prefersReduced) return;
    setRunning((prev) => !prev);
  }, [prefersReduced]);

  // Auto-step when running
  useEffect(() => {
    if (!running || prefersReduced) return;
    const delay = Math.max(20, 200 - speed * 2);
    intervalRef.current = setInterval(() => {
      setBfsState((prev) => {
        if (prev.done) return prev;
        return stepBFS(prev, grid, COLS, ROWS, goalX, goalY);
      });
      setAstarState((prev) => {
        if (prev.done) return prev;
        return stepAStar(prev, grid, COLS, ROWS, goalX, goalY);
      });
    }, delay);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, speed, grid, goalX, goalY, prefersReduced]);

  // Stop when both done
  useEffect(() => {
    if (bfsState.done && astarState.done) setRunning(false);
  }, [bfsState.done, astarState.done]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = Math.floor(Math.min(canvas.width / (COLS * 2 + 2), canvas.height / ROWS));
    const totalW = COLS * cellSize;
    const gap = cellSize * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FAFAF8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Labels
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.fillStyle = '#5A5A5C';
    ctx.textAlign = 'center';

    const bfsOffset = 0;
    const astarOffset = totalW + gap;

    // Draw BFS
    drawGrid(ctx, grid, cellSize, bfsOffset, bfsState.visited, bfsState.path, 'rgba(169, 221, 217, 0.5)', 'rgba(127, 128, 214, 0.7)', COLS, ROWS);
    // Draw A*
    drawGrid(ctx, grid, cellSize, astarOffset, astarState.visited, astarState.path, 'rgba(255, 195, 94, 0.4)', 'rgba(143, 114, 200, 0.7)', COLS, ROWS);

    // Labels below
    ctx.fillStyle = '#0D0D0F';
    ctx.font = '700 12px system-ui, sans-serif';
    ctx.fillText('BFS', bfsOffset + totalW / 2, ROWS * cellSize + 18);
    ctx.fillText('A*', astarOffset + totalW / 2, ROWS * cellSize + 18);
  }, [grid, bfsState, astarState]);

  return (
    <div
      className="tile tile-white"
      style={{ padding: '24px', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <p className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 2px' }}>
            Maze Solver
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-graphite)' }}>
            Web re-creation of my C++ Maze Solver — BFS vs A* side by side
          </p>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={560}
        height={280}
        style={{
          width: '100%',
          maxWidth: 560,
          height: 'auto',
          display: 'block',
          margin: '0 auto 16px',
          borderRadius: 'var(--radius-chip)',
        }}
        aria-label="Maze solver visualization: BFS on the left, A* on the right"
        role="img"
      />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: '8px 16px', fontSize: 'var(--text-small)' }}
          onClick={toggleRun}
          disabled={prefersReduced}
          aria-label={running ? 'Pause solver' : 'Start solver'}
        >
          {running ? '⏸ Pause' : '▶ Run'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: 'var(--text-small)' }}
          onClick={stepOnce}
          aria-label="Step one frame"
        >
          Step
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: 'var(--text-small)' }}
          onClick={reset}
          aria-label="Generate new maze"
        >
          New maze
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--color-graphite)' }}>
          Speed
          <input
            type="range"
            min={10}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: 80 }}
            aria-label="Solver speed"
          />
        </label>
        {prefersReduced && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-graphite)', fontStyle: 'italic' }}>
            Auto-play disabled (reduced motion)
          </span>
        )}
      </div>
    </div>
  );
}
