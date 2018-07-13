// Enemies our player must avoid
class Enemy{
    constructor(x=10, y=60){
            this.sprite = 'images/enemy-bug.png';
            this.x = x;
            this.y = y;
            this.step = [100,80];
        }
    update(dt){
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x= (this.x>400)? 0: (this.x+(50*dt));
        this.position = [Math.round(this.x/this.step[0]),Math.round(this.y/this.step[1])];
        //console.log(`enemy position: ${this.position}`);
    }
    render(){
        // Draw the enemy on the screen, required method for game
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
    }
    update(){
        this.position = [(this.x/this.step[0]),(this.y/this.step[1])];
        //console.log(`player position: ${this.position}`);
        checkForCollision();
        checkForWin();
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
        //console.log(`checking for collision`);
        for(let enemy of allEnemies) {
            //console.log(`enemy: ${enemy.position} player: ${player.position}`);
            if((player.position[0]===enemy.position[0]) && (player.position[1]===enemy.position[1])){
                //console.log(`enemy: ${enemy.x},${enemy.y} player: ${player.x}, ${player.y}`);
                resetPlayer();
            }
        }
    };

    function checkForWin(){
        console.log(`checking for win ${player.position[1]}`);
        if (player.position[1]===0){
               /*  ctx.font = "36pt Impact";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("WELL DONE!",player.step[0]*2.5,player.step[1]*4);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.strokeText("WELL DONE!",player.step[0]*2.5,player.step[1]*4);  */
                resetPlayer();
            
        }
    };

    function resetPlayer(){
        [player.x,player.y]= [2*player.step[0],5*player.step[1]];
    }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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
