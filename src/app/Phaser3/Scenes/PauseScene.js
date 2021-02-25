
class PauseScene extends Phaser.Scene {
  constructor() {
    super("PauseScene");
  }

  preload() {
    this.load.image("pause", "assets/scene2/img/pause.gif");
  }

  create(){

    this.info = this.add.image(400, 300, 'pause').setOrigin(0.5, 0.5).setScale(0.4);
    this.input.keyboard.on('keydown_R', this.resume, this);
    this.input.keyboard.on('keydown_ESC', this.menu, this);

  }

  resume(){
    this.scene.resume('Scene2');
    this.info.setVisible(false);
  }

  menu() {
    this.info.setVisible(false);
    this.scene.stop('Scene2');
    this.scene.launch('ConfigScene');
  }


  update(time, delta) {

  }
}

export default PauseScene;
