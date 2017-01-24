/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('star', 'assets/CookieSprite.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('dude', 'assets/EvaSprite.png', 200, 200);

    },


    create: function() {
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');
        
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
        var ledge = this.platforms.create(170, 250, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.35, .7);
         
        ledge = this.platforms.create(80, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.4, .7);
        
        ledge = this.platforms.create(320, 175, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.35, .7);
        
        ledge = this.platforms.create(380, 328, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.35, .7);
        
        ledge = this.platforms.create(580, 185, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.35, .7);
        
        ledge = this.platforms.create(580, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.35, .7);
        
        //arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //player and its settings
        this.player = game.add.sprite(32, game.world.height - 250, 'dude');
        this.player.scale.setTo(0.1,0.1);
        
        //enable physics on player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = .5;
        this.player.body.gravity.y = 400;
        this.player.body.collideWorldBounds = true;
        
        //animations
        this.player.animations.add('left', [1, 2], 10, true);
        this.player.animations.add('right', [3, 4], 10, true);
        this.player.scale.setTo(0.8, 0.8);
        //our controls
        this.cursors = game.input.keyboard.createCursorKeys();
        
          //stars to collect
        this.stars = game.add.group();

        //enable physics on stars
        this.stars.enableBody = true;
        
        //stars
        for (var i = 0; i < 12; i++){
            
            //create star insode of group
            var star = this.stars.create(i * 70, 0, 'star');
            
            //enable gravity
            star.body.gravity.y = 300;
            
            //gives stars random bounce values
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
             //score
            this.scoreText = game.add.text( 16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        this.score = 0;
        
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
        else if(this.cursors.right.isDown){
            //move to right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            //stand still
            this.player.animations.stop();
            this.player.frame = 0;
        }
        //jump if touching ground
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
        }
        
               if (this.score === 4) {
            this.score = 0; };
        ledge = this.platforms.create(0, 30, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(2, 12);
        game.add.text(16, 16, 'YOU WIN!',
        {
           fontSize: '64xp', 
           fill: '#15f909'
        })
       
        //collide stars and platforms
        game.physics.arcade.collide(this.stars, this.platforms);
        
        //checks overlaps
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
        
        
       
    //size of green light
    this.player.body.setSize(85,140,47,50);
    },
     collectStar: function(player, star){
         //removes star
         star.kill();
         this.score++;
         this.scoreText.text = "score: " + this.score;
         
         
           //create star insode of group
            star = this.stars.create(Math.random() *600, 0, 'star');
            
            //enable gravity
            star.body.gravity.y = 300;
            
            //gives stars random bounce values
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

};
game.state.add('main', game_state.main);
