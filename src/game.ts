import * as Phaser from 'phaser';
import './styles.css';

// Cell definition
const GRID_CELLS_WIDTH = 11;
const GRID_CELLS_HEIGHT = 11;

// Calculate the cell size based on the window size and the number of cells
const GRID_CELL_SIZE = Math.min(
  window.innerWidth / GRID_CELLS_WIDTH,
  window.innerHeight / GRID_CELLS_HEIGHT,
);

class HelloWorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('hello-world');
  }

  preload() {
    this.load.image('mainchar', 'assets/mainchar1.png');
    this.load.image('background1', 'assets/backgrounds/background1.png');
  }

  create() {
    //const graphics = this.add.graphics({
    //  lineStyle: { width: 1, color: 0xffffff },
    //});

    // Calculate the actual size of the grid
    //const actualWidth = GRID_CELL_SIZE * GRID_CELLS_WIDTH;
    //const actualHeight = GRID_CELL_SIZE * GRID_CELLS_HEIGHT;

    // Draw grid lines
    //for (let x = 0; x <= actualWidth; x += GRID_CELL_SIZE) {
    //  graphics.lineBetween(x, 0, x, actualHeight);
    //}
    //for (let y = 0; y <= actualHeight; y += GRID_CELL_SIZE) {
    // graphics.lineBetween(0, y, actualWidth, y);
    //}
    // Set background
    this.add
      .image(0, 0, 'background1')
      .setOrigin(0, 0)
      .setDisplaySize(
        GRID_CELL_SIZE * GRID_CELLS_WIDTH,
        GRID_CELL_SIZE * GRID_CELLS_HEIGHT,
      );

    // Create the player sprite and set its size
    this.player = this.add.sprite(
      GRID_CELL_SIZE / 2,
      GRID_CELL_SIZE / 2,
      'mainchar',
    );
    this.player.setOrigin(0, 0);
    // Calculate the scale for the player to fit within a grid cell
    const playerScale = GRID_CELL_SIZE / this.player.width;
    this.player.setScale(playerScale, playerScale);

    // Setup event listeners for pointer clicks
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const pointerX = Math.floor(pointer.x / GRID_CELL_SIZE) * GRID_CELL_SIZE;
      const pointerY = Math.floor(pointer.y / GRID_CELL_SIZE) * GRID_CELL_SIZE;
      this.tweens.add({
        targets: this.player,
        x: pointerX,
        y: pointerY,
        duration: 500,
        ease: 'Linear',
      });
    });

    // Create the cursor keys for movement
    if (this.input && this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (!this.cursors || !this.player) return;

    // Player movement
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
  width: GRID_CELL_SIZE * GRID_CELLS_WIDTH,
  height: GRID_CELL_SIZE * GRID_CELLS_HEIGHT,
  scene: [HelloWorldScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
