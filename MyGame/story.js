/* global game phaser game_state */ 
game_state.story = function () {};
game_state.story.prototype = {
    preload: function() {
        game.load.image('goto', 'assets/GoToGame.png');
        game.load.image('sky', 'assets/sky.png');
    },
    
    create: function(){
        game.add.sprite(0,0, 'sky');
        
        this.scoreText = game.add.text(16, 16, 'One day Eva was walking to school, when she realized \n  she forgot to eat breakfast!!!  \n \n Help Eva collect all the vegan cookies!!!', {
           fontSize: '32xp', 
           fill: '#15f909'
    });
    
    this.goTo = game.add.sprite(250, 300, 'goto');    
    this.goTo.inputEnabled = true;
    this.goTo.events.onInputDown.add(changelevel, this);
    this.goTo.visible = true;
    
        
    },
    
    update: function(){
    //continue to game pressing space bar
    }
},    
game.state.add('story', game_state.story);
game.state.start('story');
 
 function changelevel(){
     game.state.start('main');
 }