import {O_BOX_STATE, TTTBoxState, TTTStateManager, X_BOX_STATE} from "../state/ttt-state-manager";


export class AIPlayer {
    constructor(xOrO) {
        // position is X or O
        // super(row, col, value);

        this.xOrO = xOrO;
    }

    minimax(stateManager, depth) {
        const currentStateStrength = stateManager.boardValueForPosition(this.xOrO);
        const possibleNextMoves = stateManager.getPossibleMoves();

        if (currentStateStrength > 0) {
            // AI won
            return currentStateStrength - depth;
        } else if (currentStateStrength < 0) {
            // Player won
            return currentStateStrength - depth;
        } else if (possibleNextMoves.length === 0) {
            // Game is over, CAT!
            return 0;
        }

        const nextTurnXOrO =  stateManager.lastPlayer === X_BOX_STATE? O_BOX_STATE: X_BOX_STATE
        let bestBox = null;
        let bestBoxScore = null;

        possibleNextMoves.map(newBox => {

            const newState = stateManager.withBoxFilled(newBox, nextTurnXOrO)
            const newStateManager = new TTTStateManager(newState, () => {});

            const strengthOfMove = this.minimax(newStateManager, depth + 1)

            if (nextTurnXOrO === this.xOrO) {
                // This is the max calculation
                if (bestBoxScore === null || strengthOfMove > bestBoxScore) {
                    bestBox = newBox;
                    bestBoxScore = strengthOfMove;
                }
            } else {
                // This is the minimizer / opponent / real human. Assume they are going to play optimally.
                if (bestBoxScore === null || strengthOfMove < bestBoxScore) {
                    bestBox = newBox;
                    bestBoxScore = strengthOfMove;
                }
            }
        })

        return bestBoxScore
    }

    strengthOfBox(box, stateManager, depth, xOrO) {
        // returns the strength for a box given a state using minimax by considering all possible ways the game can go
        // and returns the best value for that move, assuming the opponent plays optimally

        // This function does NOT choose the box for us. It only assigns a "score" to ONE box.

        const currentStateValue = stateManager.boardValueForPosition(this.xOrO); // 10 if player wins, -10 if player loses, else 0

        if (currentStateValue !== 0) {
            // 10 or -10 or null
            // We have a winner!
            // We can stop iterating
            if (depth === 0) {
                return currentStateValue;
            }
            return currentStateValue / depth; // called a terminal state, divide by width because we want to consider "closer" depth scores as better
        }

        const possibleMoves = stateManager.getPossibleMoves();
        const aiPlayerAlias = this;

        if (possibleMoves === 0) {
            return 0;
        }

        const scoresOfChildren = possibleMoves.map(newBox => {
            const newState = stateManager.withBoxFilled(newBox, this.xOrO);
            const newStateManager = new TTTStateManager(newState,() => {} )
            const nextTurnXOrO =  xOrO === X_BOX_STATE? O_BOX_STATE: X_BOX_STATE
            const strengthOfMove = aiPlayerAlias.strengthOfBox(newBox, newStateManager, depth + 1, nextTurnXOrO);
            if (Number.isNaN(strengthOfMove)) {
                return 0; // cat case
            }
            return strengthOfMove;
        });

        // if (this.xOrO !== xOrO) {
        //     // Other players turn.
        //     // const sumOfScores = scoresOfChildren.reduce((a, b) => a + b)
        //     // return sumOfScores / scoresOfChildren.length;
        //     return Math.min(scoresOfChildren)
        // }

        // But for AI, always play best possible way
        return Math.max(scoresOfChildren);
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
