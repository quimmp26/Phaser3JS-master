import Bootloader from './Bootloader';
import MainScene from './Scenes/MainScene';
import Scene1 from './Scenes/Scene1';
import Scene2 from './Scenes/Scene2';


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 500 },
          debug: false
      }
  },
  scene: [ Bootloader, Scene1, MainScene, Scene2 ]
};

var game = new Phaser.Game(config);

