
class PauseScene extends Phaser.Scene {
  constructor() {
    super("PauseScene");
  }

  preload() {
    this.load.image("pause", "assets/scene2/img/pantalla_pausa.png");
    this.load.image("play", "assets/scene2/img/play.png");
  }

  create(){

    this.btnPlay = this.add.image(780, 20, 'play').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerdown', () => {
    this.scene.pause();
      this.scene.resume('Scene2');
      this.info.setVisible(false);
      this.btnPlay.setVisible(false);
    });

    this.info = this.add.image(400, 300, 'pause').setOrigin(0.5, 0.5).setScale(0.4);
    this.input.keyboard.on('keydown_R', this.resume, this);
    this.input.keyboard.on('keydown_ESC', this.restart, this);

  }

  resume(){
    this.scene.resume('Scene2');
    this.info.setVisible(false);
  }

  restart() {
    this.info.setVisible(false);
    this.scene.start('Scene2');
  }




  update(time, delta) {

  }
}

export default PauseScene;
