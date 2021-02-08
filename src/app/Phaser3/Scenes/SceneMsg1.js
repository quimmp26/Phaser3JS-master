class SceneMsg1 extends Phaser.Scene {
  constructor() {
    super("SceneMsg1");
  }

  preload() {
    this.load.image("info1", "assets/scene2/img/info1.jpg");
  }

  create(){

    this.info = this.add.image(400, 300, 'info1').setOrigin(0.5, 0.5).setScale(0.5);

    this.input.on('pointerup', function (pointer) {

      this.scene.resume('Scene2');
      this.info.setVisible(false);

    }, this);

  }

  update(time, delta) {

  }
}

export default SceneMsg1;
