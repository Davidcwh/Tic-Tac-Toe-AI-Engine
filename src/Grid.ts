import {BoardFullException, CellTakenException} from "./GridException";

export enum Player {
    PLAYER_ONE = 1,
    PLAYER_TWO = 2
}

enum Cell {
    EMPTY = 0,
    PLAYER_ONE_TAKEN = 1,
    PLAYER_TWO_TAKEN = 2
}

enum GameStatus {
    WIN_ON_HORIZONTAL,
    WIN_ON_VERTICAL, 
    WIN_ON_LEFT_DIAGONAL,
    WIN_ON_RIGHT_DIAGONAL,
    DRAW, ONGOING
}

export default class TicTacToeEngine {
    private currentPlayer: Player;
    private boardLength = 3;
    private board = new Array<Array<Cell>>(this.boardLength);

    constructor(firstPlayer: Player = Player.PLAYER_ONE) {
        this.currentPlayer = firstPlayer;

        // Populating the initial state of the game board
        for(let y = 0; y < this.boardLength; y++) {
            const row = new Array<Cell>(this.boardLength);
            for(let x = 0; x < this.boardLength; x++) {
                row[x] = Cell.EMPTY;
            }
            this.board[y] = row;
        }
    }

    /**
     * Makes the next move of the current player on the game board
     * @param {Number} x The row index of the cell chosen by current player
     * @param {Number} y The column index of the cell chosen by current player
     * @returns {GameStatus} The resultant game status of the move made.
     * @throws {BoardFullException} Exception thrown when board is already full, means game was completed prior to current move
     * @throws {CellTakenException} Exception thrown when current move is invalid, cell chosen was already taken prior to current move
     */
    makeNextMove(x: number, y: number) {
        if(this.isBoardFull()) {
            throw new BoardFullException(`Player ${this.currentPlayer} Unable to make move at cell (y=${y}, x=${x}) - board is already full`);
        }

        if(this.board[y][x] != Cell.EMPTY) {
            throw new CellTakenException(`The cell at (y=${y}, x=${x}) is already take by player ${this.board[y][x]}`);
        }
        
        this.board[y][x] = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;
        const gameStatus = this.getGameStatusAfterMove(x, y);
        this.currentPlayer = this.currentPlayer ^ 1; // 1 ^ 1 = 0, 0 ^ 1 = 1

        return gameStatus;
    }

    makeBestMove() {

    }

    private getAvailableCells() {
        let availableCells = [];

        for(let y = 0; y < this.boardLength; y++) {
            for(let x = 0; x < this.boardLength; x++) {
                const currentCell = this.board[y][x];
                if(currentCell == Cell.EMPTY) {
                    availableCells.push({x, y});
                }
            }
        }

        if(availableCells.length == 0) {
            throw new BoardFullException(`The game board is already full, unable to make new moves for player ${this.currentPlayer}`);
        }

        return availableCells;
    }

    private isBoardFull() {
        for(let y = 0; y < this.boardLength; y++) {
            for(let x = 0; x < this.boardLength; x++) {
                const currentCell = this.board[y][x];
                if(currentCell == Cell.EMPTY) {
                    return false;
                }
            }
        }

        return true;
    }

    private getGameStatusAfterMove(x: number, y: number) {

        // check if move was winning move
        if(this.isWinningRow(y)) {
            return GameStatus.WIN_ON_HORIZONTAL;
        }

        if(this.isWinningCol(x)) {
            return GameStatus.WIN_ON_VERTICAL;
        }

        if(this.isWinningLeftDiagonal(x, y)) {
            return GameStatus.WIN_ON_LEFT_DIAGONAL;
        }

        if(this.isWinningRightDiagonal(x, y)) {
            return GameStatus.WIN_ON_RIGHT_DIAGONAL;
        }

        // If not winning move, check if move resulted in draw
        if(this.isBoardFull()) {
            return GameStatus.DRAW;
        } else {
            // else game is still on going
            return GameStatus.ONGOING;
        }
    }

    private isWinningRow(y: number) {
        const playerCell = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;

        // check if the row has a cell not taken by the current player
        for(let x = 0; x < this.boardLength; x++) {
            const currentCell = this.board[y][x];
            if(currentCell != playerCell) {
                return false;
            }
        }

        return true;
    }

    private isWinningCol(x: number) {
        const playerCell = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;

        // check if the column has a cell not taken by the current player
        for(let y = 0; y < this.boardLength; y++) {
            const currentCell = this.board[y][x];
            if(currentCell != playerCell) {
                return false;
            }
        }

        return true;
    }

    private isWinningLeftDiagonal(x: number, y: number) {
        const playerCell = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;

        // check if current move is in left diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 2) || (x == 2 && y == 0)) {
            return (this.board[2][0] == playerCell && this.board[1][1] == playerCell && this.board[0][2] == playerCell);
        }
        return false;
    }

    private isWinningRightDiagonal(x: number, y: number) {
        const playerCell = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;

        // check if current move is in right diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 0) || (x == 2 && y == 2)) {
            return (this.board[0][0] == playerCell && this.board[1][1] == playerCell && this.board[2][2] == playerCell);
        }
        return false;
    }
}
