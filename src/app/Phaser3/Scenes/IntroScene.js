var name = '';
var group = '';

class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  init(data) {
    this.name = data.player;
    this.group = data.group;
    console.log('init', data);
  }

  preload() {
   // this.load.image("info2", "assets/scene2/img/info2.jpg");
    this.load.image("play", "assets/scene2/img/play.png");
  }

  create(){

    //this.info = this.add.image(400, 300, 'info2').setOrigin(0.5, 0.5).setScale(0.5);

    this.text = this.add.text(17, 200, 'Hoy es el primer día de tu trabajo en la construcción después del último accidente que tuviste hace 6 meses. ¡Aún puedes sentir el profundo dolor que te causó en el pie aquel maldito clavo! Sin embargo, empiezas con muchas ganas.¡Intenta ganar el máximo número de monedas! Pero recuerda, debes evitar los obstáculos, como la caída de ladrillos o los clavos del suelo y para finalizar tu partida deberás llegar al final del mapa i recoger los equipos de protección individual, el CASCO, el CHALECO i las BOTAS. A por ello!', {
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
      this.scene.start('Scene2', {player: this.name, group: this.group});
      this.text.setVisible(false);
      this.btnPlay.setVisible(false);
    });
  }

  update(time, delta) {

  }
}

export default IntroScene;
