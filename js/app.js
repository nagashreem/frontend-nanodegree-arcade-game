
class Character{
    constructor(x=0, y=0, sprite){
            this.sprite = sprite;
            this.x = x;
            this.y = y;
            this.step = [100,80];
            this.position = [];
        }
    update(){
        this.position = [Math.round(this.x/this.step[0]),Math.round(this.y/this.step[1])];
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

class Enemy extends Character{
    constructor(x,y,sprite){
        super(x,y,sprite='images/enemy-bug.png');
        this.speed = 50;
    }

    update(dt){
        super.update();
        this.x= (this.x>400)? 0: (this.x+(this.speed*dt));
    }

    render(){
        super.render();

    }

}

class Player extends Character{
    constructor(x=200,y=400,sprite ='images/char-princess-girl.png' ){
        super(x,y,sprite);
        this.move = [0,0];
        this.win = false;
    }

    update(){
        super.update();
        this.checkForCollision();
        this.checkForWin();
    }

    render(){
        super.render();
        if (this.win){
            ctx.font = "36pt Impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("WELL DONE!",player.step[0]*2.5,player.step[1]*3);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText("WELL DONE!",player.step[0]*2.5,player.step[1]*3);

            ctx.font = "20pt Impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press ENTER to play again!",player.step[0]*2.5,player.step[1]*4);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeText("Press ENTER to play again!",player.step[0]*2.5,player.step[1]*4);
        }
    }

    handleInput(keyInput){
        switch(keyInput){

            case 'left':
                this.move = ((this.x===0)?[0,0]:[-1,0]);
                break;
       
            case 'up':
                this.move = ((this.y===0)?[0,0]:[0,-1]);
                break;
        
            case 'right':
                this.move= ((this.x===this.step[0]*4)?[0,0]:[1,0]);
                break;
            
            case 'down':
                this.move = ((this.y===this.step[1]*5)?[0,0]:[0,1]);
                break;
        }

        this.x+= this.step[0]*this.move[0];
        this.y+= this.step[1]*this.move[1];
    }

    checkForCollision(){
        for(let enemy of allEnemies) {
            if((this.position[0]===enemy.position[0]) && (this.position[1]===enemy.position[1])){
                this.resetPlayer();
            }
        }
    }
    
    checkForWin(){
        if (this.position[1]===0){
            this.win = true;
            for(let enemy of allEnemies){
                enemy.speed=0;
            }
        }
    };

    resetPlayer(){
        [this.x,this.y]= [2*this.step[0],5*this.step[1]];
        this.move = [0,0];
    }
};

const allEnemies = [new Enemy(100,65),new Enemy(200,145), new Enemy(300,225)];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keypress', function(e) {
    if(e.keyCode ===13){
        player.resetPlayer();
        player.win = false;
        for (let enemy of allEnemies){
            enemy.speed=50;
        }
    }
});