export class BoardFullException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class CellTakenException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class TerminatedGameException extends Error {
    constructor(message: string) {
        super(message);
    }
}