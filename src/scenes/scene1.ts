import * as Phaser from 'phaser';
import {
  GRID_CELLS_WIDTH,
  GRID_CELLS_HEIGHT,
  calculateGridCellSize,
} from '../constants';

export class Scene1 extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private gridMatrix!: number[][];
  private GRID_CELL_SIZE: number;

  constructor() {
    super('hello-world');
    this.GRID_CELL_SIZE = calculateGridCellSize();
    this.gridMatrix = Array(GRID_CELLS_HEIGHT)
      .fill(0)
      .map(() => Array(GRID_CELLS_WIDTH).fill(0));

    // Mark specific cells as non-walkable
    this.gridMatrix[10][10] = 1;
  }

  preload() {
    this.load.image('mainchar', 'assets/mainchar1.png');
    this.load.image('background1', 'assets/backgrounds/background1.png');
  }

  create() {
    const graphics = this.add.graphics({
      lineStyle: { width: 1, color: 0xffffff },
    });

    // Calculate the actual size of the grid
    const actualWidth = this.GRID_CELL_SIZE * GRID_CELLS_WIDTH;
    const actualHeight = this.GRID_CELL_SIZE * GRID_CELLS_HEIGHT;

    // Draw grid lines
    for (let x = 0; x <= actualWidth; x += this.GRID_CELL_SIZE) {
      graphics.lineBetween(x, 0, x, actualHeight);
    }
    for (let y = 0; y <= actualHeight; y += this.GRID_CELL_SIZE) {
      graphics.lineBetween(0, y, actualWidth, y);
    }

    // Set background
    this.add
      .image(0, 0, 'background1')
      .setOrigin(0, 0)
      .setDisplaySize(
        this.GRID_CELL_SIZE * GRID_CELLS_WIDTH,
        this.GRID_CELL_SIZE * GRID_CELLS_HEIGHT,
      );

    // Create the player sprite and set its size
    this.player = this.add.sprite(
      this.GRID_CELL_SIZE / 2,
      this.GRID_CELL_SIZE / 2,
      'mainchar',
    );
    this.player.setOrigin(0, 0);
    const scaleMultiplier = 3.0;
    const playerScale =
      (this.GRID_CELL_SIZE / this.player.width) * scaleMultiplier;
    this.player.setScale(playerScale, playerScale);

    // Setup event listeners for pointer clicks
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const gridX = Math.floor(pointer.x / this.GRID_CELL_SIZE);
      const gridY = Math.floor(pointer.y / this.GRID_CELL_SIZE);

      // Check if the clicked cell is walkable
      if (this.isWalkable(gridX, gridY)) {
        const pointerX = gridX * this.GRID_CELL_SIZE;
        const pointerY = gridY * this.GRID_CELL_SIZE;
        this.tweens.add({
          targets: this.player,
          x: pointerX,
          y: pointerY,
          duration: 500,
          ease: 'Linear',
        });
      }
    });

    // Create the cursor keys for movement
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) return;

    // Player movement
    if (this.cursors.left.isDown) {
      const targetX = this.player.x - this.GRID_CELL_SIZE;
      const gridX = Math.floor(targetX / this.GRID_CELL_SIZE);
      const gridY = Math.floor(this.player.y / this.GRID_CELL_SIZE);

      if (this.isWalkable(gridX, gridY)) {
        this.player.x = targetX;
      }
    }
  }

  // Helper method to check if a cell is walkable
  private isWalkable(x: number, y: number): boolean {
    // Check if the coordinates are within the grid bounds
    if (x < 0 || y < 0 || x >= GRID_CELLS_WIDTH || y >= GRID_CELLS_HEIGHT) {
      return false;
    }
    return this.gridMatrix[y][x] === 0;
  }
}
