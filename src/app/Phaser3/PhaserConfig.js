import Bootloader from './Bootloader';
import MainScene from './Scenes/MainScene';
import Scene2 from './Scenes/Scene2';
import SceneMsg1 from './Scenes/SceneMsg1';
import SceneMsg2 from './Scenes/SceneMsg2';
import ConfigScene from './Scenes/ConfigScene';
import PauseScene from './Scenes/PauseScene';
import EndScene from './Scenes/EndScene';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  dom: {
    createContainer: true
  },
  autoCenter: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 500 },
          debug: false
      }
  },
  scene: [ Bootloader, MainScene, Scene2, SceneMsg1, SceneMsg2, ConfigScene, PauseScene, EndScene]
};

var game = new Phaser.Game(config);

