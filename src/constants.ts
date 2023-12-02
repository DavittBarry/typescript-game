export const GRID_CELLS_WIDTH = 44;
export const GRID_CELLS_HEIGHT = 44;

export const FALLBACK_WIDTH = 800;
export const FALLBACK_HEIGHT = 600;

export function calculateGridCellSize() {
  let width = FALLBACK_WIDTH;
  let height = FALLBACK_HEIGHT;

  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return Math.min(width / GRID_CELLS_WIDTH, height / GRID_CELLS_HEIGHT);
}
