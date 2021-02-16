var sceneOK = false;
var name = '';
var group = '';
var powerup = '';
var powerup1 = '';
var powerup2 = '';
var powerup3 = '';

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
        powerup1 = this.getChildByID('tool-1');
        powerup2 = this.getChildByID('tool-2');
        powerup3 = this.getChildByID('tool-3');

        if (name.value !== '' && group.value !== '')
        {
          if(powerup1.checked === true){
            powerup = 'JUMP';
          }else if(powerup2.checked === true){
            powerup = 'MUSCLE';
          }else if(powerup3.checked === true){
            powerup = 'SPRINT';
          }
            sceneOK = true;
            this.removeListener('click');

        }

        console.log(powerup1.checked);

      }

    });

  }


  update(time, delta) {
    if(sceneOK == true){
      this.scene.start('Scene2', {player: name.value, group: group.value, powerup: powerup});
    }
  }
}

export default ConfigScene;
