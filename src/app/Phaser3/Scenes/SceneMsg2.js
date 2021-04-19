class SceneMsg2 extends Phaser.Scene {
  constructor() {
    super("SceneMsg2");
  }

  preload() {
   // this.load.image("info2", "assets/scene2/img/info2.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
    this.load.image("msg", "assets/fondo-obrero.png");
  }

  create(){

    this.msg = this.add.image(0, 0, 'msg').setOrigin(0);

    this.text = this.add.text(17, 270, 'Esto te ha dolido muchísimo, ¿verdad? Da la impresión de que el clavo haya atravesado tu pie, ¡pero en realidad solo te ha rozado! Lo que ha pasado es que has percibido dolor ante un estímulo normalmente no doloroso… ¿Sabes cómo se llama este fenómeno? ALODINIA.', {
      fontSize: "20px",
      fill: "#000000",
      fontFamily: 'Font1',
      stroke: '#ffff00',
      strokeThickness: 4,
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
      this.msg.setVisible(false);
    });
  }

  update(time, delta) {

  }
}

export default SceneMsg2;
