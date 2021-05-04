import {CellTakenException, TerminatedGameException} from "./EngineException";

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

// Player one is the maximizing player
// PLayer two is the minimizing player
enum TerminalValue {
    MAX = 100,
    MIN = -100,
    DRAW = 0
}

export default class TicTacToeEngine {
    private currentPlayer: Player;
    private boardLength = 3;
    private board = new Array<Array<Cell>>(this.boardLength);
    private isTerminated: boolean;

    constructor(firstPlayer: Player = Player.PLAYER_ONE) {
        this.currentPlayer = firstPlayer;
        this.isTerminated = false;

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
     * @throws {TerminatedGameException} Exception thrown when the game was completed prior to current move
     * @throws {CellTakenException} Exception thrown when current move is invalid, cell chosen was already taken prior to current move
     */
    makeNextMove(x: number, y: number) {
        if(this.isTerminated) {
            throw new TerminatedGameException(`Player ${this.currentPlayer} Unable to make move at cell (y=${y}, x=${x}) - Game has already terminated`);
        }

        if(this.board[y][x] != Cell.EMPTY) {
            throw new CellTakenException(`The cell at (y=${y}, x=${x}) is already take by player ${this.board[y][x]}`);
        }
        
        const playerCell = this.currentPlayer == Player.PLAYER_ONE ? Cell.PLAYER_ONE_TAKEN : Cell.PLAYER_TWO_TAKEN;
        this.board[y][x] = playerCell;
        
        const gameStatus = this.getGameStatusAfterMove(this.board, x, y, playerCell);
        if(gameStatus != GameStatus.ONGOING) { // check if the current move was a game-terminating move
            this.isTerminated = true;
        }

        this.currentPlayer = this.currentPlayer ^ 1; // 1 ^ 1 = 0, 0 ^ 1 = 1

        return gameStatus;
    }

    getBestMove() : {x: number, y: number}{
        if(this.isTerminated) {
            throw new TerminatedGameException(`Unable to get next best move - Game has already terminated`);
        }

        const moveValues = new Map(); 
        let best: number;
        if(this.currentPlayer == Player.PLAYER_ONE) {
            best = TerminalValue.MIN; // initialize best to lowest possible value
        } else {
            best = TerminalValue.MAX; // initialize best to highest possible value
        }

        this.getAvailableCells(this.board).forEach(cell => {
            const clonedBoard = this.cloneBoard(this.board);
            if(this.currentPlayer == Player.PLAYER_ONE) {
                let moveValue = this.makePlayerOneMove(clonedBoard, cell.x, cell.y, 0);
                best = Math.max(best, moveValue);
                let moves = moveValues.has(moveValue) ? moveValues.get(moveValue) : [];
                moves.push(cell);
                moveValues.set(moveValue, moves);
            } else {
                let moveValue = this.makePlayerTwoMove(clonedBoard, cell.x, cell.y, 0);
                best = Math.min(best, moveValue);
                let moves = moveValues.has(moveValue) ? moveValues.get(moveValue) : [];
                moves.push(cell);
                moveValues.set(moveValue, moves);
            }
        });

        let bestMoves = moveValues.get(best);
        let index = 0;
        if(bestMoves.length > 1) { // if more than 1 best move, randomly choose among best moves
            index = Math.floor(Math.random() * bestMoves.length);
        }
        return bestMoves[index];
    }

    // Player one is the maximizing player
    private makePlayerOneMove(board: Array<Array<Cell>>, x: number, y: number, depth: number) : number {
        board[y][x] = Cell.PLAYER_ONE_TAKEN;
        const gameStatus = this.getGameStatusAfterMove(board, x, y, Cell.PLAYER_ONE_TAKEN);
        if(gameStatus == GameStatus.WIN_ON_HORIZONTAL || gameStatus == GameStatus.WIN_ON_VERTICAL || 
            gameStatus == GameStatus.WIN_ON_LEFT_DIAGONAL || gameStatus == GameStatus.WIN_ON_RIGHT_DIAGONAL) {
                return TerminalValue.MAX - depth;
        } else if (gameStatus == GameStatus.DRAW) {
            return TerminalValue.DRAW;
        }

        // Game did not terminate, continue with player two's next move
        let best = TerminalValue.MIN;
        this.getAvailableCells(board).forEach(cell => {
            const clonedBoard = this.cloneBoard(board);
            let playerTwoMoveValue = this.makePlayerTwoMove(clonedBoard, cell.x, cell.y, depth + 1);
            best = Math.max(best, playerTwoMoveValue);
        });

        // return the max of player two's moves
        return best;
    }

    // Player two is the minimizing player
    private makePlayerTwoMove(board: Array<Array<Cell>>, x: number, y: number, depth: number) : number {
        board[y][x] = Cell.PLAYER_TWO_TAKEN;
        const gameStatus = this.getGameStatusAfterMove(board, x, y, Cell.PLAYER_TWO_TAKEN);

        if(gameStatus == GameStatus.WIN_ON_HORIZONTAL || gameStatus == GameStatus.WIN_ON_VERTICAL || 
            gameStatus == GameStatus.WIN_ON_LEFT_DIAGONAL || gameStatus == GameStatus.WIN_ON_RIGHT_DIAGONAL) {
                return TerminalValue.MIN + depth;
        } else if (gameStatus == GameStatus.DRAW) {
            return TerminalValue.DRAW;
        }

        // Game did not terminate, continue with player one's next move
        let best = TerminalValue.MAX;
        this.getAvailableCells(board).forEach(cell => {
            const clonedBoard = this.cloneBoard(board);
            let playerOneMoveValue = this.makePlayerOneMove(clonedBoard, cell.x, cell.y, depth + 1);
            best = Math.min(best, playerOneMoveValue);
        });

        // return the min of player one's moves
        return best;
    }

    private getAvailableCells(board: Array<Array<Cell>>) {
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

    private isBoardFull(board: Array<Array<Cell>>) {
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

    private getGameStatusAfterMove(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {

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
        if(this.isBoardFull(this.board)) {
            return GameStatus.DRAW;
        } else {
            // else game is still on going
            return GameStatus.ONGOING;
        }
    }

    private isWinningRow(board: Array<Array<Cell>>, y: number, cell: Cell) {
        // check if the y-th row contains all of type cell
        for(let x = 0; x < this.boardLength; x++) {
            const currentCell = board[y][x];
            if(currentCell != cell) {
                return false;
            }
        }

        return true;
    }

    private isWinningCol(board: Array<Array<Cell>>, x: number, cell: Cell) {
        // check if the x-th column contains all of type cell
        for(let y = 0; y < this.boardLength; y++) {
            const currentCell = board[y][x];
            if(currentCell != cell) {
                return false;
            }
        }

        return true;
    }

    private isWinningLeftDiagonal(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {
        // check if (x, y) is in the left diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 2) || (x == 2 && y == 0)) {
            // check if the left diagonal is of type cell
            return (board[2][0] == cell && board[1][1] == cell && board[0][2] == cell);
        }
        return false;
    }

    private isWinningRightDiagonal(board: Array<Array<Cell>>, x: number, y: number, cell: Cell) {
        // check if (x, y) is in the right diagonal
        if((x == 1 && y == 1) || (x == 0 && y == 0) || (x == 2 && y == 2)) {
            // check if the right diagonal is of type cell
            return (board[0][0] == cell && board[1][1] == cell && board[2][2] == cell);
        }
        return false;
    }

    private cloneBoard(board: Array<Array<Cell>>) : Array<Array<Cell>> {
        const clone = new Array<Array<Cell>>(this.boardLength);
        for(let y = 0; y < this.boardLength; y++) {
            const row = board[y].map((cell) => cell); // identity function to duplicate inner array
            clone[y] = row;
        }
        return clone;
    }
}
