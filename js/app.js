// Enemies our player must avoid
class Enemy{
    constructor(x=10, y=60){
            this.sprite = 'images/enemy-bug.png';
            this.x = x;
            this.y = y;
            this.step = [100,80];
            this.speed = 50;
        }
    update(dt){
        this.x= (this.x>400)? 0: (this.x+(this.speed*dt));
        this.position = [Math.round(this.x/this.step[0]),Math.round(this.y/this.step[1])];
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};



class Player{
    constructor(x=200, y=400){
        this.sprite = 'images/char-princess-girl.png';
        this.x= x;
        this.y= y;
        this.step = [100,80];
        this.move = [0,0];
        this.win = false;
    }
    update(){
        this.position = [(this.x/this.step[0]),(this.y/this.step[1])];
        //console.log(`player position: ${this.position}`);
        checkForCollision();
        checkForWin();
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.win){
            console.log(this.win);
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

    handleInput(keypress){
        switch(keypress){

            case 'left':
                this.move = ((this.x===0)?[0,0]:[-1,0]);
                //console.log(`${keypress}: x=${this.x},y=${this.y}`);
                break;
       
            case 'up':
                this.move = ((this.y===0)?[0,0]:[0,-1]);
                //console.log(`${keypress}: x=${this.x},y=${this.y}`);
                break;
        
            case 'right':
                this.move= ((this.x===this.step[0]*4)?[0,0]:[1,0]);
                //console.log(`${keypress}: x=${this.x},y=${this.y}`);
                break;
            
            case 'down':
                this.move = ((this.y===this.step[1]*5)?[0,0]:[0,1]);
                //console.log(`${keypress}: x=${this.x},y=${this.y}`);
                break;
        }

        this.x+= this.step[0]*this.move[0];
        this.y+= this.step[1]*this.move[1];
    }
};

    function checkForCollision(){
        for(let enemy of allEnemies) {
            if((player.position[0]===enemy.position[0]) && (player.position[1]===enemy.position[1])){
                resetPlayer();
            }
        }
    };

    function checkForWin(){
        console.log(`checking for win ${player.position[1]}`);
        if (player.position[1]===0){
            player.win = true;
            for(let enemy of allEnemies){
                enemy.speed=0;
            }
            console.log('cplayer position is top row');
        }
    };

    function resetPlayer(){
        [player.x,player.y]= [2*player.step[0],5*player.step[1]];
    }

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
        resetPlayer();
        player.win = false;
        for (let enemy of allEnemies){
            enemy.speed=50;
        }
    }
});