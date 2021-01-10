import { chdir } from "process";
import { isThisTypeNode } from "typescript";

class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "assets/img-scene1/map2.json");
    this.load.spritesheet("tiles", "assets/img-scene1/tiles.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.image("coin", "assets/img-scene1/coinGold.png");
    this.load.atlas(
      "player",
      "assets/img-scene1/player.png",
      "assets/img-scene1/player.json"
    );
    this.load.image("bomb", "assets/bomb.png");
    this.load.image('armor05', "assets/armor/armor0,5.png");
    this.load.image('armor1', "assets/armor/armor1.png");
    this.load.image('armor15', "assets/armor/armor1,5.png");
    this.load.image('armor2', "assets/armor/armor2.png");
    this.load.image('armor25', "assets/armor/armor2,5.png");
    this.load.image('armor3', "assets/armor/armor3.png");

    this.load.audio("music", "assets/img-scene1/gamemusic.mp3");
    this.load.audio("coin", "assets/img-scene1/coin.mp3");
    this.load.audio("pain", "assets/img-scene1/pain.mp3");
  }

  create() {
    this.score = 0;
    this.gameOver = false;
    this.timer = 0;

    this.music = this.sound.add("music", {loop: true});
    this.coin = this.sound.add("coin", {loop: false});
    this.pain = this.sound.add("pain", {loop: false});

    //this.music = this.sound.add("music");
    this.music.play();

    // Color de fondo
    this.cameras.main.setBackgroundColor("#ccccff");

    this.map = this.make.tilemap({ key: "map" });
    this.groundTiles = this.map.addTilesetImage("tiles");
    this.groundLayer = this.map.createDynamicLayer(
      "World",
      this.groundTiles,
      0,
      0
    );
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // coin image used as tileset
    this.coinTiles = this.map.addTilesetImage("coin");
    // add coins as tiles
    this.coinLayer = this.map.createDynamicLayer("Coins", this.coinTiles, 0, 0);

    // create the player sprite
    this.player = this.physics.add.sprite(260, 400, "player");
    //this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map

    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height - 8);

    // player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);

    //this.physics.add.overlap(this.player, this.coinTiles, this.collectCoin, null, this);
    this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);

    //this.groundLayer.setTileIndexCallback(14, this.collectCoin, this);

    //this.coinLayer.setTileIndexCallback(17, this.damageCoin, this);

    // when the player overlaps with a tile with index 17, collectCoin
    // will be called
    this.physics.add.overlap(this.player, this.coinLayer);

    // player walk animation
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "p1_walk",
        start: 1,
        end: 11,
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

    // this text will show the score
    this.text = this.add.text(20, 20, "0", {
      fontSize: "40px",
      fill: "#000000",
    });

    // fix the text to the camera
    this.text.setScrollFactor(0);


    this.armor05 = this.add.image(700, 30, "armor05");
    this.armor05.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor05.setScrollFactor(0);
    this.armor1 = this.add.image(700, 30, "armor1");
    this.armor1.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor1.setScrollFactor(0);
    this.armor15 = this.add.image(700, 30, "armor15");
    this.armor15.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor15.setScrollFactor(0);
    this.armor2 = this.add.image(700, 30, "armor2");
    this.armor2.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor2.setScrollFactor(0);
    this.armor25 = this.add.image(700, 30, "armor25");
    this.armor25.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor25.setScrollFactor(0);
    this.armor3 = this.add.image(700, 30, "armor3");
    this.armor3.setScale(0.1).setDisplaySize(150,50).setVisible(false);
    this.armor3.setScrollFactor(0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bombs = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.damageBomb,
      null,
      this
    );
  }

  collectCoin(sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    this.score += 10; // add 10 points to the score
    this.coin.play();
    this.text.setText(this.score); // set the text to show the current score
    if(this.score === 10) {
      this.armor05.setVisible(true);
    }
    else if(this.score === 20) {
      this.armor1.setVisible(true);
    }
    else if(this.score === 30) {
      this.armor1.setVisible(true);
    }
    else if(this.score === 40) {
      this.armor15.setVisible(true);
    }
    else if(this.score === 50) {
      this.armor2.setVisible(true);
    }
    else if(this.score === 60) {
      this.armor25.setVisible(true);
    }
    else if(this.score === 70) {
      this.armor3.setVisible(true);
    }
    return false;
  }

  damageBomb(sprite, tile) {
    //this.coinLayer.removeTileAt(tile.x, tile.y);
    this.score -= 10;
    this.pain.play();
    this.text.setText(this.score);
    //this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("idle", true);
    this.bombs.children.iterate(function(child){
     this.bombs.remove(child, true);
    }, this);
    return false;
  }

  update(time, delta) {
    this.timer += delta;
    while (this.timer > 5000) {
      this.timer -= 5000;
      this.x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      this.bomb = this.bombs.create(this.x, 100, "bomb");
      this.bomb.setBounce(1);
      this.bomb.setCollideWorldBounds(true);
      this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.bomb.allowGravity = false;
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
      this.player.body.setVelocityY(-550); //500
    }
  }
}

export default Scene2;
