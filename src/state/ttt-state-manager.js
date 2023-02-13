import _ from 'lodash';
import {AIPlayer} from "../ai/ai-player";

export const UNKNOWN_BOX_STATE = 'unknown';
export const X_BOX_STATE = 'x';
export const O_BOX_STATE = 'o';


// class TTTBoxState {
//     constructor(stateObject, setState) {
//         this.stateObject = stateObject // { }
//         this.setState = setState; // function
//         this.boxState = UNKNOWN_BOX_STATE;
//     }
//
//     updateState(newValue) {
//         this.boxState = newValue;
//         this.setState({
//             ...this.stateObject
//         })
//     }
// }

export class TTTBoxState {
    constructor(row, col, value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }
}

function createNewInitialBox(row, col, initial_value=UNKNOWN_BOX_STATE) {
    return new TTTBoxState(row, col, initial_value);

}

function createNewInitialRow(row, initial_value) {
    return [
        createNewInitialBox(row, 0, initial_value),
        createNewInitialBox(row, 1, initial_value),
        createNewInitialBox(row, 2, initial_value),
    ]
}

/**
 * 1 2 3
 * 4 5 6
 * 7 8 9
 *
 * [
 *         {
 *             value: UNKNOWN_BOX_STATE, // 1 (0, 0)
 *             row: 0,
 *             column: 0
 *         },
 *         UNKNOWN_BOX_STATE, // 2 (0, 1)
 *         UNKNOWN_BOX_STATE // 3 (0, 2)
 *     ],
 *     [
 *         UNKNOWN_BOX_STATE, // 4 (1, 0)
 *         UNKNOWN_BOX_STATE, // 5 (1, 1)
 *         UNKNOWN_BOX_STATE // 6 (1, 2)
 *     ],
 *     [
 *         UNKNOWN_BOX_STATE, // 7 (2, 0)
 *         UNKNOWN_BOX_STATE, // 8 (2, 1)
 *         UNKNOWN_BOX_STATE // 9 (2, 2)
 *     ]
 * ]
 * @param col
 * @param initial_value
 * @returns {[{col: *, row: *, value: string},{col: *, row: *, value: string},{col: *, row: *, value: string}][]}
 */
export function createNewInitialBoard(initial_value = UNKNOWN_BOX_STATE) {
    return [
        createNewInitialRow(0,initial_value),
        createNewInitialRow(1,initial_value),
        createNewInitialRow(2,initial_value),
    ]
}

export function getInitialGameState() {
    return {
        board: createNewInitialBoard(), // array
        updateReason: ''
    }
}


export class TTTStateManager {
   constructor(state, setState) {
       // do something
       // initialize everything here
       this.state = state // INITIAL_GAME_STATE
       this.setState = setState // function to update THIS instance of INITIAL_GAME_STATE
   }

    /**
     * 1 2 3
     * 4 5 6
     * 7 8 9
     *
     * * (5) -> this.state[1][1]
     * @param boxNumber
     */
    boxNumberToBox(boxNumber) {
       switch (boxNumber) {
           case 1:
               return this.state.board[0][0]
           case 2:
               return this.state.board[0][1]
           case 3:
               return this.state.board[0][2]
           case 4:
               return this.state.board[1][0]
           case 5:
               return this.state.board[1][1]
           case 6:
               return this.state.board[1][2]
           case 7:
               return this.state.board[2][0]
           case 8:
               return this.state.board[2][1]
           case 9:
               return this.state.board[2][2]
           default:
               throw new Error('Invalid box entered!!!', boxNumber)
       }
   }

   getAllBoxes() {
        return [
            this.boxNumberToBox(1),
            this.boxNumberToBox(2),
            this.boxNumberToBox(3),
            this.boxNumberToBox(4),
            this.boxNumberToBox(5),
            this.boxNumberToBox(6),
            this.boxNumberToBox(7),
            this.boxNumberToBox(8),
            this.boxNumberToBox(9),
        ]
   }

    getBoxLine(boxOne, boxTwo, boxThree) {
        return [
            this.boxNumberToBox(boxOne),
            this.boxNumberToBox(boxTwo),
            this.boxNumberToBox(boxThree),
        ]
   }

    getAllStraightLines() {
        return [
            this.getBoxLine(1, 2, 3),
            this.getBoxLine(4, 5, 6),
            this.getBoxLine(7, 8, 9),
            this.getBoxLine(1, 4, 7),
            this.getBoxLine(2, 5, 8),
            this.getBoxLine(3, 6, 9),
            this.getBoxLine(1, 5, 9),
            this.getBoxLine(3, 5, 7),
        ]
   }

    /**
     * Returns true if it is winner. False otherwise
     * @param line
     */
    lineIsWinner(line) {
        const firstBox = line[0];
        const firstValue = firstBox.value;

        if (firstValue === UNKNOWN_BOX_STATE) {
            return false;
        }


        for (const box of line) {
            if (box.value !== firstValue) {
                return false;
            }
        }

        return true;
   }

    /**
     * This function returns the lines that have 3 in a row
     */
    maybeGetWinners() {
        return this.getAllStraightLines().filter(line => this.lineIsWinner(line)) // this is list with maybe one element
   }

    /**
     * Returns a list of boxes
     * @returns {*}
     */
    getPossibleMoves() {
        const allBoxes = this.getAllBoxes();
        return allBoxes.filter((box) => box.value === UNKNOWN_BOX_STATE)
   }

    /**
     * 10 if player wins, -10 if player loses, else 0
     */
    boardValueForPosition(xOrO) {
        const maybeWinners = this.maybeGetWinners();
        if (maybeWinners.length > 0) {
            // If there is a winner, the winner is the first line, because there can only be one winner in TTT
            const winningLine = maybeWinners[0];
            // There is winner
            const firstWinningBox = winningLine[0]
            if (firstWinningBox.value === xOrO) {
                // We are the winner!
                return 10;
            } else {
                // We are the loser!
                return -10;
            }
        } else {
            // No Winner
            return 0;
        }
    }

    /**
     * Creates a copy of the current state, with one new box populated
     * @param box
     * @param xOrO
     */
    withBoxFilled(box, xOrO) {
        const newState = _.cloneDeep(this.state) // creates copy of this.state

        newState.board[box.row][box.col].value = xOrO;

        return newState;
    }

    bestMoveForPlayer(xOrO) {
        const ai = new AIPlayer(xOrO);

        let bestBox = null;
        let bestBoxStrength = -Infinity;
        const stateManagerAlias = this; // this can not be called in the scope of an arrow function, so we create an alias

        this.getPossibleMoves().map(possibleBox => {
            const strengthOfBox = ai.strengthOfBox(possibleBox, stateManagerAlias, 0)

            if (strengthOfBox > bestBoxStrength) {
                bestBox = possibleBox;
                bestBoxStrength = strengthOfBox;
            }
        })

        return bestBox
    }
}



















//
//
//
//
// class Dog {
//     constructor(name) {
//         this.name = name
//     }
//
//     speak() {
//         console.log('bark, my name is ' + this.name)
//     }
// }
//
// class Cat {
//     constructor(name) {
//         this.name = name
//     }
//
//     speak() {
//         console.log('meow, my name is ' + this.name)
//     }
// }
//
//
// const fendi = new Dog('fendi')
//
// fendi.speak()
// // bark, my name is fendi
//
// const sugar = new Cat('sugar')
//
// fendi.speak()
// // meow, my name is sugar
//
// fendi.speak();
// fendi.speak();
// sugar.speak();

