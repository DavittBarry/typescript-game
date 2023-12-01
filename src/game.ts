import * as Phaser from 'phaser';
import './styles.css';

const GRID_CELL_SIZE = 32;
const GRID_WIDTH = Math.ceil(window.innerWidth / GRID_CELL_SIZE);
const GRID_HEIGHT = Math.ceil(window.innerHeight / GRID_CELL_SIZE);

class HelloWorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {}

  create() {
    const graphics = this.add.graphics({
      lineStyle: { width: 1, color: 0xffffff },
    });

    // Draw vertical lines
    for (let x = 0; x <= GRID_WIDTH * GRID_CELL_SIZE; x += GRID_CELL_SIZE) {
      graphics.lineBetween(x, 0, x, GRID_HEIGHT * GRID_CELL_SIZE);
    }

    // Draw horizontal lines
    for (let y = 0; y <= GRID_HEIGHT * GRID_CELL_SIZE; y += GRID_CELL_SIZE) {
      graphics.lineBetween(0, y, GRID_WIDTH * GRID_CELL_SIZE, y);
    }

    // Create a simple square to represent the player
    this.player = this.add
      .rectangle(
        GRID_CELL_SIZE / 2,
        GRID_CELL_SIZE / 2,
        GRID_CELL_SIZE,
        GRID_CELL_SIZE,
        0x0000ff,
      )
      .setOrigin(0, 0);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Calculate the grid cell coordinates
      const pointerX = Math.floor(pointer.x / GRID_CELL_SIZE) * GRID_CELL_SIZE;
      const pointerY = Math.floor(pointer.y / GRID_CELL_SIZE) * GRID_CELL_SIZE;

      // Move the player to the clicked grid cell
      this.player.setPosition(pointerX, pointerY);
    });

    // Create cursor keys for movement
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.x -= GRID_CELL_SIZE;
    } else if (this.cursors.right.isDown) {
      this.player.x += GRID_CELL_SIZE;
    }

    if (this.cursors.up.isDown) {
      this.player.y -= GRID_CELL_SIZE;
    } else if (this.cursors.down.isDown) {
      this.player.y += GRID_CELL_SIZE;
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GRID_WIDTH * GRID_CELL_SIZE,
  height: GRID_HEIGHT * GRID_CELL_SIZE,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
  },
  scene: HelloWorldScene,
};

new Phaser.Game(config);
