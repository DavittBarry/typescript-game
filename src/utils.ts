import { GRID_CELLS_WIDTH, GRID_CELLS_HEIGHT } from './constants';

export function isWalkable(
  gridMatrix: number[][],
  x: number,
  y: number,
): boolean {
  if (x < 0 || y < 0 || x >= GRID_CELLS_WIDTH || y >= GRID_CELLS_HEIGHT) {
    return false;
  }
  return gridMatrix[y][x] === 0;
}
