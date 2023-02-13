import {TTTBoxState} from "../state/ttt-state-manager";


export class AIPlayer {
    constructor(xOrO) {
        // position is X or O
        // super(row, col, value);

        this.xOrO = xOrO;
    }

    strengthOfBox(box, stateManager, depth) {
        // returns the strength for a box given a state using minimax by considering all possible ways the game can go
        // and returns the best value for that move, assuming the opponent plays optimally

        // This function does NOT choose the box for us. It only assigns a "score" to ONE box.

        const currentStateValue = stateManager.boardValueForPosition(this.xOrO); // 10 if player wins, -10 if player loses, else 0

        if (currentStateValue !== 0) {
            // 10 or -10
            // We have a winner!
            // We can stop iterating
            return currentStateValue; // called a terminal state
        }

        return Math.max(stateManager.getPossibleMoves().map(newBox => {
            const newState = stateManager.withBoxFilled(newBox, this.xOrO);
            return this.strengthOfBox(newBox, newState, depth + 1)
        }))
    }

    // countLengthStringRecursive(s, i = 0) {
    //     if (s === '') {
    //         return 0;
    //     }
    //     // s = 'car'
    //     const removedElement = s.pop() // takes the last character, and removes from the string, and returns it
    //     // removedElement = 'r'
    //     // s = 'ca'
    //
    //     return this.countLengthStringRecursive(s, i + 1)
    // }
    //
    // countLengthStringIterative(s) {
    //     let i = 0;
    //
    //     for (const char of s) {
    //         i++;
    //     }
    //
    //     return i;
    // }
}