import * as Phaser from 'phaser';
import { nonWalkableSquares } from './non-walkables';
import { isWalkable } from '../../utils';
import {
  GRID_CELLS_WIDTH,
  GRID_CELLS_HEIGHT,
  calculateGridCellSize,
} from '../../constants';

export class Scene1 extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private gridMatrix!: number[][];
  private GRID_CELL_SIZE: number;
  private editMode: boolean = false;

  constructor() {
    super('scene1');
    this.GRID_CELL_SIZE = calculateGridCellSize();
    this.gridMatrix = Array(GRID_CELLS_HEIGHT)
      .fill(0)
      .map(() => Array(GRID_CELLS_WIDTH).fill(0));

    nonWalkableSquares.forEach(([x, y]) => {
      if (x >= 0 && x < GRID_CELLS_WIDTH && y >= 0 && y < GRID_CELLS_HEIGHT) {
        this.gridMatrix[y][x] = 1;
      }
    });
  }

  preload() {
    this.load.image('mainchar', 'assets/mainchar1.png');
    this.load.image('background1', 'assets/backgrounds/background1.png');
  }

  create() {
    const graphics = this.add
      .graphics({
        lineStyle: { width: 2, color: 0xff0000 },
      })
      .setDepth(1);

    const actualWidth = this.GRID_CELL_SIZE * GRID_CELLS_WIDTH;
    const actualHeight = this.GRID_CELL_SIZE * GRID_CELLS_HEIGHT;

    for (let x = 0; x <= actualWidth; x += this.GRID_CELL_SIZE) {
      graphics.lineBetween(x, 0, x, actualHeight);
    }
    for (let y = 0; y <= actualHeight; y += this.GRID_CELL_SIZE) {
      graphics.lineBetween(0, y, actualWidth, y);
    }

    this.add
      .image(0, 0, 'background1')
      .setOrigin(0, 0)
      .setDisplaySize(
        this.GRID_CELL_SIZE * GRID_CELLS_WIDTH,
        this.GRID_CELL_SIZE * GRID_CELLS_HEIGHT,
      )
      .setDepth(0);

    for (let y = 0; y < GRID_CELLS_HEIGHT; y++) {
      for (let x = 0; x < GRID_CELLS_WIDTH; x++) {
        if (this.gridMatrix[y][x] === 1) {
          graphics.fillRect(
            x * this.GRID_CELL_SIZE,
            y * this.GRID_CELL_SIZE,
            this.GRID_CELL_SIZE,
            this.GRID_CELL_SIZE,
          );
        }
      }
    }

    this.player = this.add.sprite(
      this.GRID_CELL_SIZE / 2,
      this.GRID_CELL_SIZE / 2,
      'mainchar',
    );
    this.player.setOrigin(0, 0);
    const scaleMultiplier = 3.0;
    this.player.setScale(
      (this.GRID_CELL_SIZE / this.player.width) * scaleMultiplier,
      (this.GRID_CELL_SIZE / this.player.height) * scaleMultiplier,
    );

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const gridX = Math.floor(pointer.x / this.GRID_CELL_SIZE);
      const gridY = Math.floor(pointer.y / this.GRID_CELL_SIZE);

      if (!isWalkable(this.gridMatrix, gridX, gridY)) {
        console.log(
          `Cannot move to non-walkable grid square: (${gridX}, ${gridY})`,
        );
        return; // Prevent moving to non-walkable square
      }

      const spriteCenterOffsetX = (this.player.width * this.player.scaleX) / 2;
      const spriteBottomCenterOffsetY = this.player.height * this.player.scaleY;
      this.tweens.add({
        targets: this.player,
        x: pointer.x - spriteCenterOffsetX,
        y: pointer.y - spriteBottomCenterOffsetY,
        duration: 500,
        ease: 'Linear',
      });
    });

    this.input.keyboard!.on('keydown-ENTER', () => {
      this.editMode = !this.editMode;
    });

    this.input.keyboard!.on('keydown-W', () => {
      if (this.editMode) {
        this.toggleWalkableState();
      }
    });

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) return;

    let targetX = this.player.x;
    let targetY = this.player.y;

    if (this.cursors.left.isDown) {
      targetX -= this.GRID_CELL_SIZE;
    } else if (this.cursors.right.isDown) {
      targetX += this.GRID_CELL_SIZE;
    } else if (this.cursors.up.isDown) {
      targetY -= this.GRID_CELL_SIZE;
    } else if (this.cursors.down.isDown) {
      targetY += this.GRID_CELL_SIZE;
    }

    const gridX = Math.floor(targetX / this.GRID_CELL_SIZE);
    const gridY = Math.floor(targetY / this.GRID_CELL_SIZE);

    if (isWalkable(this.gridMatrix, gridX, gridY)) {
      this.player.x = targetX;
      this.player.y = targetY;
    }
  }

  private toggleWalkableState(): void {
    const pointer = this.input.activePointer;
    const gridX = Math.floor(pointer.worldX / this.GRID_CELL_SIZE);
    const gridY = Math.floor(pointer.worldY / this.GRID_CELL_SIZE);

    if (
      gridX >= 0 &&
      gridX < GRID_CELLS_WIDTH &&
      gridY >= 0 &&
      gridY < GRID_CELLS_HEIGHT
    ) {
      this.gridMatrix[gridY][gridX] =
        this.gridMatrix[gridY][gridX] === 1 ? 0 : 1;
      console.log(
        `Toggled walkable state at (${gridX}, ${gridY}): ${this.gridMatrix[gridY][gridX]}`,
      );
    }
  }
}
