import {AIPlayer} from "./ai-player";
import {getInitialGameState, O_BOX_STATE, TTTStateManager, X_BOX_STATE} from "../state/ttt-state-manager";

/**
 *
 * @param xBoxes: [ [0,0], [0,1] ]
 * @param oBoxes: [ [1,0], [1,1] ]
 */
function createInitialTestState({xBoxes, oBoxes}) {
    const ai = new AIPlayer(O_BOX_STATE)
    const state = getInitialGameState();

    xBoxes.map(xBox => {
        // xBox: [0, 0]
        state.board[xBox[0]][xBox[1]].value = X_BOX_STATE
    });

    oBoxes.map(oBox => {
        // oBox: [0, 0]
        state.board[oBox[0]][oBox[1]].value = O_BOX_STATE
    });

    return {
        ai: ai,
        stateManager: new TTTStateManager(state, () => {})
    }
}

describe('testing ai-player', () => {
    describe('minimax works correctly', () => {
        it('AI has potential win on next move', () => {

            const {ai, stateManager} = createInitialTestState({
                xBoxes: [
                    [0,0],
                    [0,1]
                ],
                oBoxes: [
                    [0,2],
                    [1,1]
                ]
            })


            stateManager.bestMoveForPlayer(X_BOX_STATE, true) // the ai will always play optimally because it finds the move with the highest strength, and O is the opponent

            console.log('sdf,jhvb')
        })

        // it('o can win, it is o turn', () => {
        //     const {ai, stateManager} = createInitialTestState({
        //         xBoxes: [
        //             [0,0],
        //             [0,1],
        //             [1,0]
        //         ],
        //         oBoxes: [
        //             [0,2],
        //             [1,1]
        //         ]
        //     })
        //
        //
        //     stateManager.bestMoveForPlayer(X_BOX_STATE, true) // the ai will always play optimally because it finds the move with the highest strength, and O is the opponent
        //
        //     console.log('sdf,jhvb')
        //
        // })
    })
})
