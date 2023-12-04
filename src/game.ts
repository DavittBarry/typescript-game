import * as Phaser from 'phaser';
import './styles.css';
import { Scene1 } from './scenes/scene1/scene1';
import {
  calculateGridCellSize,
  GRID_CELLS_WIDTH,
  GRID_CELLS_HEIGHT,
} from './constants';

window.addEventListener('load', () => {
  const GRID_CELL_SIZE = calculateGridCellSize();

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GRID_CELL_SIZE * GRID_CELLS_WIDTH,
    height: GRID_CELL_SIZE * GRID_CELLS_HEIGHT,
    scene: [Scene1],
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game-container',
  };

  new Phaser.Game(config);
});
