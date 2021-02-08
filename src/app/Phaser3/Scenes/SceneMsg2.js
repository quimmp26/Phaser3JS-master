class SceneMsg2 extends Phaser.Scene {
  constructor() {
    super("SceneMsg2");
  }

  preload() {
    this.load.image("info2", "assets/scene2/img/info2.jpg");
  }

  create(){

    this.info = this.add.image(400, 300, 'info2').setOrigin(0.5, 0.5).setScale(0.5);

    this.input.on('pointerup', function (pointer) {

      this.scene.resume('Scene2');
      this.info.setVisible(false);

    }, this);

  }

  update(time, delta) {

  }
}

export default SceneMsg2;
