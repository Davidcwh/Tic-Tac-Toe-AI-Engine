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

export class InvalidPlayerException extends Error {
    constructor(message: string) {
        super(message);
    }
}