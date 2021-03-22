var name = '';
var group = '';
var points = 0;
var life = 0;
var pain = 0;

class EndScene extends Phaser.Scene {

  constructor() {
    super("EndScene");

  }

  init(data) {
    this.name = data.player;
    this.group = data.group;
    this.points = data.points;
    this.life = data.life;
    this.pain = data.pain;
    console.log('init', data);
  }

  preload() {
    this.load.image("bg", "assets/configScene/img/config_bg.png");
    this.load.image("character", "assets/configScene/img/character.png");

    this.load.image('pain', "assets/scene2/img/pain.png");
    this.load.image('life', "assets/scene2/img/life.png");

    this.load.image("play", "assets/scene2/img/play.png");
  }

  create() {

    this.add.text(50, 20, "PUNTUACIÓN FINAL", {
      fontSize: "40px",
      fill: "#000000",
      fontFamily: 'Font1',
    }).setDepth(1);

    this.add.text(270, 200, this.points, {
      fontSize: "280px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    }).setDepth(1);

    this.add.image(380, 550, 'pain').setScale(0.15,0.15).setDepth(1);

    //Pain points
    this.add.text(450, 530, this.pain, {
      fontSize: "40px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    }).setDepth(1);

    this.add.image(600, 560, 'life').setScale(0.15,0.15).setDepth(1);

    //Live points
    this.add.text(670, 530, this.life, {
      fontSize: "40px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    }).setDepth(1);

    //Player name
    this.add.text(50, 80, this.name, {
      fontSize: "37px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    }).setDepth(1);

    //Team name
    this.add.text(50, 130, this.group, {
      fontSize: "37px",
      fill: "#ffff00",
      fontFamily: 'Font1',
    }).setDepth(1);


    this.add.image(0, 0, "bg").setOrigin(0).setDepth(0);
    this.add.image(0, 200, "character").setOrigin(0);

    this.btnPlay = this.add.image(400, 100, 'play').setOrigin(0.5, 0.5).setDisplaySize(60, 60);
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerdown', () => {
      this.scene.start('CreditsScene');
    });

  }


  update(time, delta) {

  }
}

export default EndScene;
