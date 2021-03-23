var sceneOK = false;
var name = '';
var group = '';

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

    this.text = this.add.text(20, 150, "Introduce tus datos para continuar", {
      fontSize: "20px",
      fill: "#ff0000",
      fontFamily: 'Font1',
    });
    this.text.setVisible(false);

    this.form = this.add.dom(310, 280).createFromCache('form').setOrigin(0).setDepth(1);
    this.form.setPerspective(800);
    this.form.addListener('click');
    this.form.on('click', function(event) {
      if(event.target.name === 'submitBtn'){
        name = this.getChildByName('name');
        group = this.getChildByName('format');

        if (name.value !== '' && group.value !== '' && group.value !== 'Elige un equipo')
        {
            sceneOK = true;
            this.removeListener('click');
        }

      }

    });

  }


  update(time, delta) {
    if(sceneOK == true){
      this.scene.start('IntroScene', {player: name.value, group: group.value});
    }
  }
}

export default ConfigScene;
