
class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "assets/scene2/json/Map5.json");
    this.load.spritesheet("platforms", "assets/scene2/img/platforms.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.image("coin", "assets/scene2/img/coin.png");
    this.load.atlas(
      "player",
      "assets/scene2/img/obrero.png",
      "assets/scene2/json/obrero.json"
    );

    this.load.image("play", "assets/scene2/img/play.png");
    this.load.image("stop", "assets/scene2/img/pause.png");

    this.load.image("city", "assets/scene2/img/bg_city.png");

    this.load.image("bomb", "assets/scene2/img/totxo.png");
    this.load.image("nail", "assets/scene2/img/clau.png");

    this.load.image('pain', "assets/scene2/img/pain.png");
    this.load.image('life', "assets/scene2/img/life.png");

    this.load.image('boots', "assets/scene2/epis/boots.png");
    this.load.image('helmet', "assets/scene2/epis/helmet.png");
    this.load.image('vest', "assets/scene2/epis/vest.png");
    this.load.image("painkiller", "assets/scene2/img/painkiller.png");

    this.load.audio("music", "assets/scene2/sounds/gamemusic.mp3");
    this.load.audio("coin", "assets/scene2/sounds/coin.mp3");
    this.load.audio("pain", "assets/scene2/sounds/pain.mp3");
    this.load.audio("item", "assets/scene2/sounds/items.mp3");

    //this.load.image("info1", "assets/scene2/img/info1.jpg");
  }

  init(data) {
    this.name = data.player;
    this.group = data.group;
    console.log('init', data);
  }

  create() {
    this.life = 100;
    this.pain = 0;
    this.score = 0;
    this.timer = 0;

    //IMPLEMENTAR 4 MISATGES AMB CONTADOR 1
    this.countBombs = 0;
    this.countBombsWithHelmet = 0;
    this.countNails = 0;
    this.countNailsWithBoots = 0;

    this.haveHelmet = false;
    this.haveBoots = false;
    this.haveVest = false;
    this.gameOver = false;
    this.resume = false;

    this.isPaused = false;

    //Add sounds
    this.music = this.sound.add("music", {loop: true});
    this.coin = this.sound.add("coin", {loop: false});
    this.painSound = this.sound.add("pain", {loop: false});
    this.item = this.sound.add("item", {loop: false});

    //Play music
    //this.music.play();

    // Color de fondo
    //this.cameras.main.setBackgroundColor("#ccccff");

    this.mainGround = this.add.image(0, 0, "city").setOrigin(0).setDepth(0);
    this.mainGround.setScrollFactor(0);

    this.map = this.make.tilemap({ key: "map" });
    this.groundTiles = this.map.addTilesetImage("platforms");
    this.groundLayer = this.map.createDynamicLayer(
      "World",
      this.groundTiles,
      0,
      0
    );
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;


    this.coinTiles = this.map.addTilesetImage("coin");
    this.coinLayer = this.map.createDynamicLayer("Coin", this.coinTiles, 0, 0);

    this.helmetTiles = this.map.addTilesetImage("helmet");
    this.helmetLayer = this.map.createDynamicLayer("Helmet", this.helmetTiles, 0, 0);

    this.bootsTiles = this.map.addTilesetImage("boots");
    this.bootsLayer = this.map.createDynamicLayer("Boots", this.bootsTiles, 0, 0);

    this.vestTiles = this.map.addTilesetImage("vest");
    this.vestLayer = this.map.createDynamicLayer("Vest", this.vestTiles, 0, 0);

    // create the player sprite
    this.player = this.physics.add.sprite(10, 1000, "player");
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.player.setScale(0.25, 0.25);

    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height - 8);

    // player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);

    //this.physics.add.overlap(this.player, this.coinTiles, this.collectCoin, null, this);
    this.coinLayer.setTileIndexCallback(5, this.collectCoin, this);
    this.helmetLayer.setTileIndexCallback(6, this.collectHelmet, this);
    this.bootsLayer.setTileIndexCallback(7, this.collectBoots, this);
    this.vestLayer.setTileIndexCallback(8, this.collectVest, this);

    //this.groundLayer.setTileIndexCallback(14, this.collectCoin, this);
    //this.coinLayer.setTileIndexCallback(17, this.damageCoin, this);

    // when the player overlaps with a tile with index 17, collectCoin
    // will be called
    this.physics.add.overlap(this.player, this.coinLayer);
    this.physics.add.overlap(this.player, this.helmetLayer);
    this.physics.add.overlap(this.player, this.bootsLayer);
    this.physics.add.overlap(this.player, this.vestLayer);


    // player walk animation
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "p1_walk",
        start: 1,
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: "p1_stand" }],
      frameRate: 10,
    });

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // scoreText
    this.scoreText = this.add.text(270, 26, "Puntuación: 0", {
      fontSize: "20px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    });


    this.imgPain = this.add.image(30, 30, 'pain').setDisplaySize(40,48);
    this.imgPain.setScrollFactor(0);

    //Pain points
    this.painText = this.add.text(60, 26, "0", {
      fontSize: "20px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    });

    this.imgLife = this.add.image(130, 35, 'life').setDisplaySize(40,38);
    this.imgLife.setScrollFactor(0);

    //Live points
    this.lifeText = this.add.text(160, 26, "100", {
      fontSize: "20px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    });

    //Player name
    this.playerName = this.add.text(600, 550, this.name, {
      fontSize: "20px",
      fill: "#ffffff",
      fontFamily: 'Font1',
    });

    //Team name
    this.groupName = this.add.text(600, 570, this.group, {
      fontSize: "20px",
      fill: "#ff0000",
      fontFamily: 'Font1',
    });




    //Play resume btns
    this.btnPlay = this.add.image(780, 20, 'stop').setOrigin(0.5, 0.5).setDisplaySize(30, 30);
    this.btnPlay.setInteractive();
    this.btnPlay.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('PauseScene');
    });

    // fix the text to the camera
    this.scoreText.setScrollFactor(0);
    this.painText.setScrollFactor(0);
    this.lifeText.setScrollFactor(0);
    this.btnPlay.setScrollFactor(0);
    this.playerName.setScrollFactor(0);
    this.groupName.setScrollFactor(0);

    this.helmet = this.add.image(640, 40, "helmet");
    this.helmet.setVisible(false);
    this.helmet.setScrollFactor(0);

    this.boots = this.add.image(700, 40, "boots");
    this.boots.setVisible(false);
    this.boots.setScrollFactor(0);

    this.vest = this.add.image(760, 40, "vest");
    this.vest.setVisible(false);
    this.vest.setScrollFactor(0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bombs = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.damageBomb,
      null,
      this
    );

    this.nails = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.nails,
      this.collisionNail,
      null,
      this
    );

    this.painkillers = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.painkillers,
      this.collectPainkiller,
      null,
      this
    );

    for(var i = 0; i < 5; i++) {
      const xspawn = Math.floor(Math.random()*(5100));
      this.painkiller = this.painkillers.create(xspawn, 50, "painkiller")
      this.painkiller.setScale(0.08, 0.08);
      this.physics.add.collider(this.groundLayer, this.painkiller);
      console.log(i);
    }

    for(var i = 0; i < 20; i++) {
      const xspawn = Math.floor(Math.random()*(5100));
      this.nail = this.nails.create(xspawn, 50, "nail")
      this.nail.setScale(0.3, 0.3);
      this.physics.add.collider(this.groundLayer, this.nail);
      console.log(i);
    }

    this.graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });

  }

  collectCoin(sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y);
    this.coin.play();
    this.score += 5;
    this.scoreText.setText("Puntuación: "+this.score);
    return false;
  }

  collectHelmet(sprite, tile) {
    this.helmetLayer.removeTileAt(tile.x, tile.y);
    this.item.play();
    //this.text.setText(this.armorPoints); // set the text to show the current armorPoints
    if(this.haveHelmet === false) {
      this.helmet.setVisible(true);
      this.haveHelmet = true;
    }
    return false;
  }

  collectBoots(sprite, tile) {
    this.bootsLayer.removeTileAt(tile.x, tile.y);
    this.item.play();
    //this.text.setText(this.armorPoints); // set the text to show the current armorPoints
    if(this.haveBoots === false) {
      this.boots.setVisible(true);
      this.haveBoots = true;
    }
    return false;
  }

  collectVest(sprite, tile) {
    this.vestLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    this.item.play();
    //this.text.setText(this.armorPoints); // set the text to show the current armorPoints
    if(this.haveVest === false) {
      this.vest.setVisible(true);
      this.haveVest = true;
    }
    return false;
  }

  collectPainkiller(sprite, painkiller) {
    //this.item.play();
    if(this.pain > 9) {
      this.pain = this.pain - 10;
      this.painText.setText("Dolor: "+this.pain);
    }
    painkiller.disableBody(true, true);

  }

  collisionNail(sprite, nail) {

    if(this.haveBoots){ // if you have 1 item
      const randompain = this.pain + (Math.floor(Math.random()*(10))); //random value range(0-10)
      this.pain = randompain;
      this.life -= 5;
    } else if(this.haveVest) {
      const randompain = this.pain + (Math.floor(Math.random()*(15))); //random value range(0-15)
      this.pain = randompain;
      this.life -= 7;
    } else {
      this.life -= 10;
      const randompain = this.pain + (Math.floor(Math.random()*(20 - 5) + 5)); //random value range (20-5)
      this.pain =randompain;
    }

    this.painSound.play();
    this.lifeText.setText(this.life);
    this.painText.setText(this.pain);
    this.player.anims.play("idle", true);

    nail.disableBody(true, true);

    console.log("nail collisioned!");
  }

  damageBomb(sprite, bomb) {
    this.countBombs ++;
    //this.coinLayer.removeTileAt(tile.x, tile.y);
    if(this.haveHelmet == true){ // if you have 1 item
      const randompain = this.pain + (Math.floor(Math.random()*(10))); //random value range(0-10)
      this.pain = randompain;
      this.life -= 5;
    } else if(this.haveVest) {
      const randompain = this.pain + (Math.floor(Math.random()*(15))); //random value range(0-15)
      this.pain = randompain;
      this.life -= 7;
    } else {
      this.life -= 10;
      const randompain = this.pain + (Math.floor(Math.random()*(20 - 5) + 5)); //random value range (20-5)
      this.pain =randompain;
    }

    if(this.haveVest == true){ // if you have 1 item
      const randompain = this.pain + (Math.floor(Math.random()*(10))); //random value range(0-15)
      this.pain = randompain;
      this.life -= 5;
    } else {
      this.life -= 10;
      const randompain = this.pain + (Math.floor(Math.random()*(20 - 5) + 5)); //random value range (20-5)
      this.pain =randompain;
    }

    this.painSound.play();
    this.lifeText.setText(this.life);
    this.painText.setText(this.pain);
    this.player.anims.play("idle", true);
    // this.bombs.children.iterate(function(child){
    //  this.bombs.remove(child, true);
    // }, this);
    this.bombs.remove(bomb, true);

    //Show message
    if(this.countBombs == 1) {
      this.input.keyboard.removeAllKeys(false);
      this.scene.pause();
      this.cursors = this.input.keyboard.createCursorKeys();
      this.scene.launch('SceneMsg1');
    }

    return false;

  }


  update(time, delta) {
    this.timer += delta;

    while (this.timer > 3000) {
      this.timer -= 3000;

      this.x = Phaser.Math.Between(this.player.x - 300, this.player.x + 300);
      this.physics.add.collider(
        this.groundLayer,
        this.bomb,
        (sprite, boom) => {
          this.bombs.remove(boom, true, true);
        },
        null,
        this
        );
      this.bomb = this.bombs.create(this.x, 0, "bomb").setScale(0.5,0.5);
      //this.bomb.setBounce(1);

      //this.bomb.setCollideWorldBounds(true);
      this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.bomb.allowGravity = false;
    }

    if(this.life <= 0) {
      this.gameOver = true;
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.play('idle', true);
      this.scoreText = this.add.text(130, 250, "Game Over", {
        fontSize: "100px",
        fill: "#000000",
        fontFamily: 'Font1',
      });
      this.scoreText.setScrollFactor(0);
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
          this.scene.start('Scene2');
        },
        loop: false
      })
    }

    if(this.pain >= 100) {
      this.gameOver = true;
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.play('idle', true);
      this.scoreText = this.add.text(130, 250, "Game Over", {
        fontSize: "100px",
        fill: "#000000",
        fontFamily: 'Font1',
      });
      this.scoreText.setScrollFactor(0);
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
          this.scene.start('Scene2');
        },
        loop: false
      })
    }
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("walk", true); // walk left
      this.player.flipX = true; // flip the sprite to the left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("walk", true);
      this.player.flipX = false; // use the original sprite looking to the right
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
    // jump
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-600); //500
    }


    if(this.player.x >= 5170 && this.haveBoots == true && this.haveVest == true && this.haveHelmet == true){ //5170
      this.scene.start('EndScene', {player: this.name, group: this.group, points: this.score, life: this.life, pain: this.pain});
    }


  }
}

export default Scene2;
