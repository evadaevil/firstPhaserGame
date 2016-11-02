/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    },


    create: function() {
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(0, 0, 'star');
        //platforms groups
        this.platforms = game.add.group();
        //enable physics
        this.platforms.enableBody = true;
        //ground
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        //scale to fit width
        ground.scale.setTo(2, 2);
        //stops from falling when you jump on it
        ground.body.immovable = true;
        //ledges
        var ledge = this.platforms.create(50, 150, 'ground');
        ledge.body.immovable = true;
        //arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //player and its settings
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        //enable physics on player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = .5;
        this.player.body.gravity.y = 400;
        this.player.body.collideWorldBounds = true;
        //animations
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [0, 1, 2, 3], 10, true);
        //our controls
        this.cursors = game.input.keyboard.createCursorKeys();

    },


    update: function() {

//collide player and platform
        game.physics.arcade.collide(this.player, this.platforms);
//reset player velocity
this.player.body.velocity.x = 0;
if(this.cursors.left.isDown) {
    //move to left
    this.player.body.velocity.x = -150;
    this.player.animations.play('left');
}
else if(this.cursors.right.isDown);{
    //move to right
    this.player.body.velocity.x = 150;
    this.player.animations.play('right');
}
else {
    //stand still
    this.player.animations.stop();
    this.player.frame = 4;
}
//jump if touching ground
if (this.cursors.up.isDown &&)

    },


}
game.state.add('main', game_state.main);
game.state.start('main');
