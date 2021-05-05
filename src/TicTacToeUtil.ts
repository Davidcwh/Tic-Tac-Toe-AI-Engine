import {Cell, GameStatus} from './TicTacToeEngine';

export default class TicTacToeUtil {
    static boardLength = 3;

    static getAvailableCells(board: Array<Array<Cell>>) {
        let availableCells = [];

        for(let y = 0; y < this.boardLength; y++) {
            for(let x = 0; x < this.boardLength; x++) {
                const currentCell = board[y][x];
                if(currentCell == Cell.EMPTY) {
                    availableCells.push({x, y});
                }
            }
        }

        return availableCells;
    }

    static isBoardFull(board: Array<Array<Cell>>) {
        for(let y = 0; y < this.boardLength; y++) {
            for(let x = 0; x < this.boardLength; x++) {
                const currentCell = board[y][x];
                if(currentCell == Cell.EMPTY) {
                    return false;
                }
            }
        }

        return true;
    }

    static getGameStatusAfterMove(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {

        // check if move was winning move
        if(this.isWinningRow(board, y, cell)) {
            return GameStatus.WIN_ON_HORIZONTAL;
        }

        if(this.isWinningCol(board, x, cell)) {
            return GameStatus.WIN_ON_VERTICAL;
        }

        if(this.isWinningLeftDiagonal(board, x, y, cell)) {
            return GameStatus.WIN_ON_LEFT_DIAGONAL;
        }

        if(this.isWinningRightDiagonal(board, x, y, cell)) {
            return GameStatus.WIN_ON_RIGHT_DIAGONAL;
        }

        // If not winning move, check if move resulted in draw
        if(this.isBoardFull(board)) {
            return GameStatus.DRAW;
        } else {
            // else game is still on going
            return GameStatus.ONGOING;
        }
    }

    static isWinningRow(board: Array<Array<Cell>>, y: number, cell: Cell) {
        // check if the y-th row contains all of type cell
        for(let x = 0; x < this.boardLength; x++) {
            const currentCell = board[y][x];
            if(currentCell != cell) {
                return false;
            }
        }

        return true;
    }

    static isWinningCol(board: Array<Array<Cell>>, x: number, cell: Cell) {
        // check if the x-th column contains all of type cell
        for(let y = 0; y < this.boardLength; y++) {
            const currentCell = board[y][x];
            if(currentCell != cell) {
                return false;
            }
        }

        return true;
    }

    static isWinningLeftDiagonal(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {
        // check if (x, y) is in the left diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 2) || (x == 2 && y == 0)) {
            // check if the left diagonal is of type cell
            return (board[2][0] == cell && board[1][1] == cell && board[0][2] == cell);
        }
        return false;
    }

    static isWinningRightDiagonal(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {
        // check if (x, y) is in the right diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 0) || (x == 2 && y == 2)) {
            // check if the right diagonal is of type cell
            return (board[0][0] == cell && board[1][1] == cell && board[2][2] == cell);
        }
        return false;
    }

    static cloneBoard(board: Array<Array<Cell>>) : Array<Array<Cell>> {
        const clone = new Array<Array<Cell>>(this.boardLength);
        for(let y = 0; y < this.boardLength; y++) {
            const row = board[y].map((cell) => cell); // identity function to duplicate inner array
            clone[y] = row;
        }
        return clone;
    }
}