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
