class SceneMsg3 extends Phaser.Scene {
  constructor() {
    super("SceneMsg3");
  }

  preload() {
   // this.load.image("info2", "assets/scene2/img/info2.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
    this.load.image("msg", "assets/fondo-obrero.png");
  }

  create(){

    this.msg = this.add.image(0, 0, 'msg').setOrigin(0);

    this.text = this.add.text(17, 270, 'Qué estrés estoy teniendo…Esto duele cada vez más.¿Sabías que la amígdala es el área cerebral relevante involucrada en los mecanismos cerebrales relacionados con las emociones, el estrés o la ansiedad y también es parte del sistema modulador descendente del dolor? Además, contribuye notablemente en respuestas como el miedo y la ansiedad relacionadas con la experiencia del dolor.', {
      fontSize: "20px",
      fill: "#000000",
      stroke: '#ffff00',
      strokeThickness: 4,
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
      this.msg.setVisible(false);
    });
  }

  update(time, delta) {

  }
}

export default SceneMsg3;
