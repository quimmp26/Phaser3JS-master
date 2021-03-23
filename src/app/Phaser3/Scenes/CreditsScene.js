import { TimeoutError } from "rxjs";

class CreditsScene extends Phaser.Scene {

  constructor() {
    super("CreditsScene");
  }

  preload() {
    this.load.html('credits', 'assets/html/credits.html');
  }

  create() {

    this.timer = this.time.now;

    this.form = this.add.dom(400, 0).createFromCache('credits').setOrigin(0);

    /*this.form.setPerspective(800);
    this.form.addListener('click');*/


    /*this.form.on('click', function(event) {
      if(event.target.name === 'submitBtn'){
        name = this.getChildByName('name');
        group = this.getChildByName('format');

        if (name.value !== '' && group.value !== '' && group.value !== 'Elige un equipo')
        {
            sceneOK = true;
            this.removeListener('click');
        }

      }

    });*/

  }


  update(time, delta) {
    if(time >= this.timer + 20000) {
      this.scene.start('Bootloader');
    }

  }
}

export default CreditsScene;
