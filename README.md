# frontend-nanodegree-arcade-game

## Table of Contents

* [Files](#files)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [License](#license)

## Files

The Project repository includes css, images, and js folders, as well as an index.html and a README.md file. 

- The css folder contains a style.css file.
- The images folder contains the png image files, which are used when displaying the game. The images for the player and enemy character are going to be loaded from this folder.
- The js folder also contains the app engine needed to run the game and a resources.js file. Y
- index.html - opening index.html should load the game
- README.md should contain instructions on how to load and play the game.

## Instructions

### How to Load the game
- Download all the files in the repository
- Open index.html in a browser

#### For Browsers that do not support ES6
- Install [Node](https://nodejs.org/en/)
- In the Node.js command prompt, go to the directory containing Project files
- Run the command *npm install*
- After npm is successfully installed, run the command *npm run build*
- The js files wll be transpiled to ES5 code that will be able to run in every browser

### How to Play the game
In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md). The starter code was provided by Udacity for _all_ Udacity students. The game logic has been implemented by Nagashree Mylaraiah. 

## License

MIT License

Copyright (c) [2018] [Nagashree Mylaraiah]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
