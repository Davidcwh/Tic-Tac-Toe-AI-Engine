import TicTacToeUtil from '../TicTacToeUtil';
import {Cell, GameStatus} from '../TicTacToeEngine';
import {describe, expect, test} from "@jest/globals";

describe("Tic Tac Toe Util test suite", () => {
    test("Get available cells from board", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 |   | 1
          | 2 |  
        1 |   | 1
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][2] = Cell.PLAYER_ONE_TAKEN;
        board[1][1] = Cell.PLAYER_TWO_TAKEN;
        board[2][0] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_ONE_TAKEN;

        let expected = [{x: 1, y: 0}, {x: 0, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}];
        let actual = TicTacToeUtil.getAvailableCells(board);
        expect(actual.length).toBe(expected.length);
        for(let i = 0; i < expect.length; i++) {
            expect(actual).toContainEqual(expected[i]);
        }
    });

    test("Clone Board", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 2 | 1
        1 | 1 | 2
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_TWO_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_ONE_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_TWO_TAKEN;

        let clone = TicTacToeUtil.cloneBoard(board);
        expect(clone).toEqual(board); // check if values are copied correctly
        expect(clone).not.toBe(board); // check if they are different instances, indeed deep cloned
    });

    test("Get Winning Row Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 2 | 1
        1 | 1 | 1
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_TWO_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_ONE_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_ONE_TAKEN;

        const expected = GameStatus.WIN_ON_HORIZONTAL;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 1, 2, Cell.PLAYER_ONE_TAKEN);
        expect(actual).toEqual(expected);
    });

    test("Get Winning Column Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 2 | 1
        1 | 2 | 1
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_TWO_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_ONE_TAKEN;
        board[2][1] = Cell.PLAYER_TWO_TAKEN;
        board[2][2] = Cell.PLAYER_ONE_TAKEN;

        const expected = GameStatus.WIN_ON_VERTICAL;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 1, 1, Cell.PLAYER_TWO_TAKEN);
        expect(actual).toEqual(expected);
    });

    test("Get Winning Left Diagonal Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 2 | 1
        2 | 1 | 1
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_TWO_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_TWO_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_ONE_TAKEN;

        const expected = GameStatus.WIN_ON_LEFT_DIAGONAL;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 0, 2, Cell.PLAYER_TWO_TAKEN);
        expect(actual).toEqual(expected);
    });

    test("Get Winning Right Diagonal Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 1 | 1
        2 | 1 | 1
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_ONE_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_TWO_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_ONE_TAKEN;

        const expected = GameStatus.WIN_ON_RIGHT_DIAGONAL;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 1, 1, Cell.PLAYER_ONE_TAKEN);
        expect(actual).toEqual(expected);
    });

    // tests isBoardFull for true as well
    test("Get Draw Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 1 | 1
        2 | 1 | 2
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_ONE_TAKEN;
        board[1][2] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_TWO_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_TWO_TAKEN;

        const expected = GameStatus.DRAW;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 2, 2, Cell.PLAYER_TWO_TAKEN);
        expect(actual).toEqual(expected);
    });

    // tests isBoardFull for false as well
    test("Get Draw Game Status", () => {
        const board = new Array<Array<Cell>>(TicTacToeUtil.boardLength);
        for(let y = 0; y < TicTacToeUtil.boardLength; y++) {
            const row = new Array<Cell>(TicTacToeUtil.boardLength);
            for(let x = 0; x < TicTacToeUtil.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            board[y] = row;
        }
        /*
        1 | 2 | 2
        2 | 1 |  
        2 | 1 | 2
        */
        board[0][0] = Cell.PLAYER_ONE_TAKEN;
        board[0][1] = Cell.PLAYER_TWO_TAKEN;
        board[0][2] = Cell.PLAYER_TWO_TAKEN;

        board[1][0] = Cell.PLAYER_TWO_TAKEN;
        board[1][1] = Cell.PLAYER_ONE_TAKEN;

        board[2][0] = Cell.PLAYER_TWO_TAKEN;
        board[2][1] = Cell.PLAYER_ONE_TAKEN;
        board[2][2] = Cell.PLAYER_TWO_TAKEN;

        const expected = GameStatus.ONGOING;
        const actual = TicTacToeUtil.getGameStatusAfterMove(board, 1, 2, Cell.PLAYER_ONE_TAKEN);
        expect(actual).toEqual(expected);
    });
})