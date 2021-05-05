import TicTacToeEngine, {Player, GameStatus} from '../TicTacToeEngine';
import {CellTakenException, TerminatedGameException} from "../EngineException";
import {describe, expect, test} from "@jest/globals";

describe("Tic Tac Toe Engine Make Next Move test suite", () => {
    test("Make Next Move Terminated Game Exception on Draw", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 | 2 | 2
        2 | 1 | 1
        1 | 1 | 2
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.DRAW); // player one move

        expect(() => {
            ticTacToeEngine.makeNextMove(1, 1)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=1, x=1) - Game has already terminated'));
    });

    test("Make Next Move Cell Taken Exception", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 | 2 | 2
        2 | 1 | 1
        1 | 1 | 
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move

        expect(() => {
            ticTacToeEngine.makeNextMove(1, 1)
        }).toThrow(new CellTakenException('The cell at (y=1, x=1) is already take by player 1'));
    });

    test("Player One Win on Right Diagonal", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 | 2 | 2
        2 | 1 | 1
          |   | 1
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.WIN_ON_RIGHT_DIAGONAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 2)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=2, x=0) - Game has already terminated'));
    });

    test("Player One Win on Left Diagonal", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          | 2 | 1 
        2 | 1 |  
        1 |   |  
        */
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.WIN_ON_LEFT_DIAGONAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(2, 2)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=2, x=2) - Game has already terminated'));
    });

    test("Player One Win on first row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 | 1 | 1 
          | 2 |  
          | 2 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 1)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=1, x=0) - Game has already terminated'));
    });

    test("Player One Win on second row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          | 2 |  
        1 | 1 | 1
          | 2 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player One Win on third row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          | 2 |  
          | 2 |  
        1 | 1 | 1
        */
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player One Win on first column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 |   |   
        1 | 2 |  
        1 | 2 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(1, 0)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=0, x=1) - Game has already terminated'));
    });

    test("Player One Win on second column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          | 1 |   
        2 | 1 |  
        2 | 1 |  
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player One Win on third column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          |   | 1 
        2 |   | 1
        2 |   | 1
        */
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player one move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 2 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    // player 2 tests
    test("Player Two Win on Right Diagonal", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
        2 | 1 | 1
        1 | 2 | 2
          |   | 2
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.WIN_ON_RIGHT_DIAGONAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 2)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=2, x=0) - Game has already terminated'));
    });

    test("Player Two Win on Left Diagonal", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          | 1 | 2 
        1 | 2 |  
        2 |   |  
        */
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.WIN_ON_LEFT_DIAGONAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(2, 2)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=2, x=2) - Game has already terminated'));
    });

    test("Player Two Win on first row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
        2 | 2 | 2 
          | 1 |  
          | 1 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 1)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=1, x=0) - Game has already terminated'));
    });

    test("Player Two Win on second row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          | 1 |  
        2 | 2 | 2
          | 1 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player Two Win on third row", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          | 1 |  
          | 1 |  
        2 | 2 | 2
        */
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.WIN_ON_HORIZONTAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player Two Win on first column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
        2 |   |   
        2 | 1 |  
        2 | 1 |  
        */
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(1, 0)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=0, x=1) - Game has already terminated'));
    });

    test("Player Two Win on second column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          | 2 |   
        1 | 2 |  
        1 | 2 |  
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });

    test("Player Two Win on third column", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          |   | 1 
        2 |   | 1
        2 |   | 1
        */
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.WIN_ON_VERTICAL); // player two move
        expect(() => {
            ticTacToeEngine.makeNextMove(0, 0)
        }).toThrow(new TerminatedGameException('Player 1 Unable to make move at cell (y=0, x=0) - Game has already terminated'));
    });
});


describe("Tic Tac Toe Engine Get Best Move test suite", () => {
    test("Get best move for Player Two simple test - 3 options", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
        1 |   | 2
          | 2 |  
        1 | 1 | 2
        */
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move

        const expected = {x: 2, y: 1};
        const actual = ticTacToeEngine.getBestMove();
        expect(actual).toEqual(expected);
    });

    test("Get best move for Player One simple test - 3 options", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        2 |   | 1
          | 1 |  
        2 | 2 | 1
        */
        expect(ticTacToeEngine.makeNextMove(1, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move

        const expected = {x: 2, y: 1};
        const actual = ticTacToeEngine.getBestMove();
        expect(actual).toEqual(expected);
    });

    test("Get best move for Player One depth case", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
          | 1 |  
        2 |   | 1
        2 | 2 | 1
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move

        const expected = {x: 2, y: 0};
        const actual = ticTacToeEngine.getBestMove();
        expect(actual).toEqual(expected);
    });

    test("Get best move for Player Two depth case", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
          | 2 |  
        1 |   | 2
        1 | 1 | 2
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move

        const expected = {x: 2, y: 0};
        const actual = ticTacToeEngine.getBestMove();
        expect(actual).toEqual(expected);
    });

    test("Get best move for Player One multiple moves case", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        /*
        1 | 1 |  
        2 |   |  
        2 | 2 | 1
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player two move

        const expected = [{x: 1, y: 1}, {x: 2, y: 0}];
        const actual = ticTacToeEngine.getBestMove();
        expect(expected).toContainEqual(actual);
    });

    test("Get best move for Player Two multiple moves case", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_TWO);
        /*
        2 | 2 |  
        1 |   |  
        1 | 1 | 2
        */
        expect(ticTacToeEngine.makeNextMove(1, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 1)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(0, 0)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(0, 2)).toEqual(GameStatus.ONGOING); // player one move
        expect(ticTacToeEngine.makeNextMove(2, 2)).toEqual(GameStatus.ONGOING); // player two move
        expect(ticTacToeEngine.makeNextMove(1, 2)).toEqual(GameStatus.ONGOING); // player one move

        const expected = [{x: 1, y: 1}, {x: 2, y: 0}];
        const actual = ticTacToeEngine.getBestMove();
        expect(expected).toContainEqual(actual);
    });

    test("Get best move AI against AI", () => {
        const ticTacToeEngine = new TicTacToeEngine(Player.PLAYER_ONE);
        // If minimax algorithm works, both players making the best move everytime will always end in a draw
        
        const p1move1 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p1move1.x, p1move1.y)).toEqual(GameStatus.ONGOING); // player one move
        const p2move1 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p2move1.x, p2move1.y)).toEqual(GameStatus.ONGOING); // player two move

        const p1move2 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p1move2.x, p1move2.y)).toEqual(GameStatus.ONGOING); // player one move
        const p2move2 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p2move2.x, p2move2.y)).toEqual(GameStatus.ONGOING); // player two move

        const p1move3 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p1move3.x, p1move3.y)).toEqual(GameStatus.ONGOING); // player one move
        const p2move3 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p2move3.x, p2move3.y)).toEqual(GameStatus.ONGOING); // player two move

        const p1move4 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p1move4.x, p1move4.y)).toEqual(GameStatus.ONGOING); // player one move
        const p2move4 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p2move4.x, p2move4.y)).toEqual(GameStatus.ONGOING); // player two move

        const p1move5 = ticTacToeEngine.getBestMove();
        expect(ticTacToeEngine.makeNextMove(p1move5.x, p1move5.y)).toEqual(GameStatus.DRAW); // player one move

        // console.table(p1move1);
        // console.table(p2move1);

        // console.table(p1move2);
        // console.table(p2move2);

        // console.table(p1move3);
        // console.table(p2move3);

        // console.table(p1move4);
        // console.table(p2move4);

        // console.table(p1move5);
    });
})