import * as Phaser from 'phaser';

class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world');
    }

    preload() {
        // Preload assets if any
    }

    create() {
        this.add.text(400, 300, 'Hello World!', { color: '#0f0' });
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: HelloWorldScene
};

const game = new Phaser.Game(config);
