class SceneMsg1 extends Phaser.Scene {
  constructor() {
    super("SceneMsg1");
  }

  preload() {
    //this.load.image("info1", "assets/scene2/img/info1.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
  }

  create(){

    //this.info = this.add.image(400, 300, 'info1').setOrigin(0.5, 0.5).setScale(0.5);

    this.text = this.add.text(17, 270, '¡Ay, eso ha dolido! En realidad, solo ha sido un pequeño golpe, pero se ha generado una respuesta aumentada al estímulo doloroso… ¿Sabes cómo se llama este fenómeno? HIPERALGESIA.', {
      fontSize: "20px",
      fill: "#ffff00",
      fontFamily: 'Font1',
      align: 'center',
      wordWrap: {
        width: 700,
      },
      padding: {
        x: 50,
      },
    });


    this.btnPlay = this.add.image(400, 450, 'play').setOrigin(0.5, 0.5).setDisplaySize(80, 80);
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerdown', () => {
      this.scene.resume('Scene2');
      this.text.setVisible(false);
      this.btnPlay.setVisible(false);
    });


  }


  update(time, delta) {

  }
}

export default SceneMsg1;
