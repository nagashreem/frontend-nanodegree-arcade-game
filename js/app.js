/** @description Store the values corresponding to rows and columns of the Canvas
    @constant
    @maxX and maxY store total number of blocks per row and column respectively
    @pixelsPerX and pixelsPerY store the number of pixels per block 
    @type {number}
*/
const maxX = 4;
const maxY = 5;
const pixelsPerX = 100;
const pixelsPerY= 80;

/** @description True if the Player has won
    @variable
    @type {number}
*/
let win = false;

/**
 * @description Creates a new Enemy
 * @constructor
 * @param {number} x coordinate on the canvas for the placement of the object
 * @param {number} y coordinate on the canvas for the placement of the object
 * @param {string} sprite - image(png) to be the object
 * @param {number} speed - speed with which the object should be moved along the canvas
 */
class Enemy{
    constructor(x, y, sprite ='images/enemy-bug.png', speed = 50){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
    }

/**
* @description Updates the position of the Enemy object
* @param {number} dt - a time delta between ticks
* If the Enemy Object has reached the end of the screen, start from the start of the screen
* Compute the position in terms of blocks represented by posX and posY of the Enemy on the screen
*/
    update(dt){
        this.x+= this.speed*dt;
        if (this.x > maxX*pixelsPerX){
            this.x = 0;
        } 
        this.posX = Math.round(this.x/pixelsPerX);
        this.posY = Math.round(this.y/pixelsPerY);
    }

/**
* @description Draws the Enemy object on the canvas
* @param none
*/
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

/**
 * @description Creates a new Player
 * @constructor
 * @param {number} x coordinate on the canvas for the placement of the object
 * @param {number} y coordinate on the canvas for the placement of the object
 * @param {string} sprite - image(png) to be the object
 */
class Player {
    constructor(x = 2*pixelsPerX, y = 5*pixelsPerY, sprite = 'images/char-princess-girl.png'){
       this.x = x;
       this.y = y;
       this.sprite = sprite;
    }

/**
* @description Updates the position of the Player object
* @param none
* Compute the position in terms of blocks represented by posX and posY of the Player on the screen
* Check if the Player collides with any of the Enemies
* Check if the Player has reached the top row(water)
*/
    update(){
        this.posX = Math.round(this.x/pixelsPerX);
        this.posY = Math.round(this.y/pixelsPerY);
        checkForCollision();
        checkForWin();
    }

/**
* @description Draws the Player object on the canvas
* @param none
*/
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

/**
* @description Resets the position of the Player
* @param none
*/
    reset(){
        this.x = 2*pixelsPerX;
        this.y = 5*pixelsPerY;
    }

/**
* @description Moves the Player object on the canvas based on the keyboard input
* @param {key} Arrow keys 
* If the Player has reached the end of the screen, do not update the position
*/
    handleInput(keyInput){
        switch(keyInput){
            case 'left':
                if(this.x!==0){
                    this.x-= pixelsPerX;
                }
                break;
       
            case 'up':
                if(this.y!==0){
                    this.y-= pixelsPerY;
                }
                break;
        
            case 'right':
                if(this.x!==pixelsPerX*maxX){
                    this.x+= pixelsPerX;
                }
                break;
            
            case 'down':
                if(this.y!==pixelsPerY*maxY){
                    this.y+= pixelsPerY;
                }
                break;
        }
    }
};

/**
* @description Checks if the Player object collides with the Enemy object
* Check if the Player object and any Enemy object are in the same position
* Reset the Player position back to start upon collision
* @param none
*/
function checkForCollision(){
    for(let enemy of allEnemies) {
        if((enemy.posX===player.posX) && (enemy.posY===player.posY)){
            player.reset();
        }
    }
}

/**
* @description Renders the 'Winning Message' on the canvas when the Player object wins
* @param none
*/    
function renderWin(){
    if(win){
        ctx.font = "36pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("WELL DONE!", pixelsPerX*2.5, pixelsPerY*3);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText("WELL DONE!", pixelsPerX*2.5, pixelsPerY*3);

        ctx.font = "20pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Press ENTER to play again!", pixelsPerX*2.5, pixelsPerY*4);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("Press ENTER to play again!", pixelsPerX*2.5, pixelsPerY*4);
    }
}

/**
* @description Checks if the Player object has won
* Check if the Player has reached the top most row
* If the Player has won, pause the enemies and render the Win message (invoked from engine.js)
* @param none
*/
function checkForWin(){
    if (player.posY===0){
        for(let enemy of allEnemies){
            enemy.speed = 0;
        }
        win = true;
    }
}

/** 
* Instantiate the Player and Enemy objects
* Create multiple enemy objects and place them in an array allEnemies
*/
const player = new Player();
const allEnemies = [new Enemy(100,65), new Enemy(200,145), new Enemy(300,225)];


/**
* Listen for key presses and send the keys to the
* Player.handleInput() method.
*/
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/**
* Listen for 'Enter' key press 
* Reset the position of the Player and speed of the Enemy and restart the game 
*/
document.addEventListener('keypress', function(e) {
    if(e.keyCode===13){
        player.reset();
        for(let enemy of allEnemies){
            enemy.speed = 50;
        } 
        win = false;       
    }
});