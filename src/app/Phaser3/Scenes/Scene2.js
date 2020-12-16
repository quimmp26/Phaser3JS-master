
class Scene2 extends Phaser.Scene {

  constructor() {
    super("Scene2");
  }

  preload(){
    this.load.tilemapTiledJSON('map', 'assets/img-scene1/map.json');
    this.load.spritesheet('tiles', 'assets/img-scene1/tiles.png', {frameWidth: 70, frameHeight: 70});
    this.load.image('coin', 'assets/img-scene1/coinGold.png');
    this.load.atlas('player', 'assets/img-scene1/player.png', 'assets/img-scene1/player.json');
  }

  create() {

    this.score = 0;
    this.gameOver = false;

    // Color de fondo
    this.cameras.main.setBackgroundColor('#ccccff');

    this.map = this.make.tilemap({key: 'map'});
    this.groundTiles = this.map.addTilesetImage('tiles');
    this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0);
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // coin image used as tileset
    this.coinTiles = this.map.addTilesetImage('coin');
    // add coins as tiles
    this.coinLayer = this.map.createDynamicLayer('Coins', this.coinTiles, 0, 0);

    // create the player sprite
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map

    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height-8);

    // player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);

    //this.physics.add.overlap(this.player, this.coinTiles, this.collectCoin, null, this);
    this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin
    // will be called
    this.physics.add.overlap(this.player, this.coinLayer);

    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });


    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // this text will show the score
    this.text = this.add.text(20, 20, '0', {
        fontSize: '40px',
        fill: '#000000'
    });

    // fix the text to the camera
    this.text.setScrollFactor(0);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectCoin(sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    this.score+=10; // add 10 points to the score
    this.text.setText(this.score); // set the text to show the current score
    return false;
  }

  update(time, delta) {

      if (this.cursors.left.isDown)
      {
          this.player.body.setVelocityX(-200);
          this.player.anims.play('walk', true); // walk left
          this.player.flipX = true; // flip the sprite to the left
      }
      else if (this.cursors.right.isDown)
      {
          this.player.body.setVelocityX(200);
          this.player.anims.play('walk', true);
          this.player.flipX = false; // use the original sprite looking to the right
      } else {
          this.player.body.setVelocityX(0);
          this.player.anims.play('idle', true);
      }
      // jump
      if (this.cursors.up.isDown && this.player.body.onFloor())
      {
          this.player.body.setVelocityY(-500);
      }
  }


}

export default Scene2;
