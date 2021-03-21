class SceneMsg2 extends Phaser.Scene {
  constructor() {
    super("SceneMsg2");
  }

  preload() {
   // this.load.image("info2", "assets/scene2/img/info2.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
  }

  create(){

    //this.info = this.add.image(400, 300, 'info2').setOrigin(0.5, 0.5).setScale(0.5);

    this.text = this.add.text(17, 270, 'Esto te ha dolido muchísimo, ¿verdad? Da la impresión de que el clavo haya atravesado tu pie, ¡pero en realidad solo te ha rozado! Lo que ha pasado es que has percibido dolor ante un estímulo normalmente no doloroso… ¿Sabes cómo se llama este fenómeno? ALODINIA.', {
      fontSize: "20px",
      fill: "#ffff00",
      fontFamily: 'Font1',
      align: 'center',
      wordWrap: {
        width: 650,
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

export default SceneMsg2;
