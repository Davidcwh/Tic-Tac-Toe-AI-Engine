# [Tic-Tac-Toe-Minimax-Engine](https://www.npmjs.com/package/tic-tac-toe-minimax-engine)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/davidcwh/Tic-Tac-Toe-AI-Engine/main.svg?style=flat-square)](https://codecov.io/gh/davidcwh/Tic-Tac-Toe-AI-Engine/)

A [light-weight NPM package](https://www.npmjs.com/package/tic-tac-toe-minimax-engine) that provides a Tic Tac Toe engine with the unbeatable [minimax AI algorithm](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/). The engine handles all game business logic, simply plug into any Javascript program to use.

In layman terms, the minimax algorithm looks into the future and chooses the best possible move.

## Install
`
npm i tic-tac-toe-minimax-engine
`

## API
### Import and Initialization
The following are the libaries that need to be imported. `TicTacToeEngine` is the engine class itself, `Player` and `GameStatus` are enum classes needed for input and output with the engine.
The game engine is initialized with the player that is starting first, either `Player.PLAYER_ONE` or `Player.PLAYER_TWO`.
```javascript
import TicTacToeEngine, {Player, GameStatus} from 'tic-tac-toe-minimax-engine';

// Create a new game where player 1 starts first
const game = new TicTacToeEngine(Player.PLAYER_ONE);
```
### Making A Move On The Board
Register a move by calling `makeNextMove(x, y)` where `x` is the column index and `y` is the row index of the game board. The indices range from 0 to 2 inclusive.
Player moves alternate between each function call, corresponding to the player's turns.
```javascript
// Player 1 chooses top left
game.makeNextMove(0, 0);

// Player 2 chooses bottom right
game.makeNextMove(2, 2);
```
`makeNextMove(x, y)` returns a `GameStatus` enum value, to indicate the game status after the move was made.
The following are the different possible values of `GameStatus` and their meaning.
```javascript
// Player 1 choose center
const gameStatus = game.makeNextMove(1, 1);

// Check game status after player 1 chooses center
if(gameStatus == GameStatus.WIN_ON_HORIZONTAL) {
    // Player 1 has 3 in a row in the center row
    /*
      | 2 | 2
    1 | 1 | 1
      |   | 2
    */
}

if(gameStatus == GameStatus.WIN_ON_VERTICAL) {
    // Player 1 has 3 in a row in the center column
    /*
      | 1 | 2
    2 | 1 |  
      | 1 | 2
    */
}

if(gameStatus == GameStatus.WIN_ON_LEFT_DIAGONAL) {
    // Player 1 has 3 in a row in the left diagonal
    /*
      | 2 | 1
      | 1 | 2
    1 |   | 2
    */
}

if(gameStatus == GameStatus.WIN_ON_RIGHT_DIAGONAL) {
    // Player 1 has 3 in a row in the right diagonal
    /*
    1 | 2 | 2
      | 1 | 2
      |   | 1
    */
}

if(gameStatus == GameStatus.DRAW) {
    // Player 1 took the last avaliable move and there are no winners
    /*
    1 | 2 | 2
    2 | 1 | 1
    1 | 1 | 2
    */
}

if(gameStatus == GameStatus.ONGOING) {
    // Player 1's move was not game winning, but there are still available moves left
    /*
    2 |   |  
      | 1 |  
      |   |  
    */
}
```

### Getting The Next Best Move
Get the best move for the current player about to make a move by calling `getBestMove()`. The function returns an object with the `x` and `y` values of the best move.
The minimax algorithm is used here.
```javascript
// Player 1 chooses top left
game.makeNextMove(0, 0);

// Gets the best move for the current player, player 2
const {x, y} = game.getBestMove();
game.makeNextMove(x, y); // Make best move for player 2
```
## Exceptions
### Making An Illegal Move
If `makeNextMove(x, y)` was called where the `(x, y)` cell on the board is already taken, then the engine will throw `CellTakenException`. 
The current player will have to call `makeNextMove(x, y)` again until a valid move is made.
```javascript
/* Example current board state
    2 |   |  
      | 1 |  
      |   |  
*/

// Player 2 attempts to take center
game.makeNextMove(1, 1); // Exception will be thrown here
```
### Interacting With A Terminated Game
After a game has terminated, any function calls of `makeNextMove(x, y)` and `getBestMove()` will throw `TerminatedGameException`.
Initialize a new `TicTacToeEngine` object to create a new game.

## Credits
This package was inspired by and completed with reference to the following sources:
- [Tic-Tac-Toe with Javascript ES2015: AI Player with Minimax Algorithm](https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa)
- [Step by step: Building and publishing an NPM Typescript package.](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)