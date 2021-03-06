class SceneMsg2 extends Phaser.Scene {
  constructor() {
    super("SceneMsg2");
  }

  preload() {
    this.load.image("info2", "assets/scene2/img/info2.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
  }

  create(){

    this.info = this.add.image(400, 300, 'info2').setOrigin(0.5, 0.5).setScale(0.5);

    this.btnPlay = this.add.image(400, 300, 'play').setOrigin(0.5, 0.5).setDisplaySize(80, 80);
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerdown', () => {
      this.scene.resume('Scene2');
      this.info.setVisible(false);
      this.btnPlay.setVisible(false);
    });
  }

  update(time, delta) {

  }
}

export default SceneMsg2;
