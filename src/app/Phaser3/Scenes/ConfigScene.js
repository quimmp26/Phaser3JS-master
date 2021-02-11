class ConfigScene extends Phaser.Scene {
  constructor() {
    super("ConfigScene");
  }

  preload() {
    this.load.image("bg", "assets/configScene/img/config_bg.png");
    this.load.image("character", "assets/configScene/img/character.png");
    this.load.html('form', 'assets/html/form.html');
  }

  create() {
    this.add.text(50, 20, "CHOOSE YOUR CHARACTER ", {
      fontSize: "40px",
      fill: "#000000",
      fontFamily: 'Font1',
    }).setDepth(1);

    this.add.image(0, 0, "bg").setOrigin(0).setDepth(0);
    this.add.image(0, 200, "character").setOrigin(0);

    this.form = this.add.dom(310, 280).createFromCache('form').setOrigin(0).setDepth(1);
    this.form.setPerspective(800);
    this.form.addListener('click');
    this.form.on('click', function(event) {
      if(event.target.name === 'submitBtn'){
        var name = this.getChildByName('name');
        var group = this.getChildByName('format');
        var powerup1 = this.getChildByName('tools');
        console.log(powerup1);
        for(let i = 0; i < powerup1.length; i++) {
          console.log(powerup1[i].checked);
        }
        console.log(name.value);
        console.log(group.value);

      }
    })
  }

  update() {

  }
}

export default ConfigScene;
