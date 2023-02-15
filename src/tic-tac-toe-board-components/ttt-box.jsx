import React from "react";
import {O_BOX_STATE, UNKNOWN_BOX_STATE, X_BOX_STATE} from "../state/ttt-state-manager";
import {value} from "lodash/seq";

let lastEntry = O_BOX_STATE; // first one will be x

function nextValue() {
    if (lastEntry === O_BOX_STATE) {
        lastEntry = X_BOX_STATE
        return lastEntry
    } else {
        lastEntry = O_BOX_STATE
        return lastEntry
    }
}

function valueToDisplayText(boxState) {
    if (boxState.value === UNKNOWN_BOX_STATE) {
        return boxState.boxStrength
    } else if (boxState.value === X_BOX_STATE) {
        return 'X'
    } else if (boxState.value === O_BOX_STATE) {
        return 'O'
    }
}

function isBoxWinner(currentBox, winningLines) {
    for (const winningLine of winningLines) {
        for (const winningBox of winningLine) {
            if (winningBox.row === currentBox.row && winningBox.col === currentBox.col) {
                        // currentBox is a winner!
                        return true;
                    }
        }
    }
    return false;
}

export function TTTBox({className, stateManager, row, col}){
    // Do something with stateManager when clicked (i.e. change to X or O
    const boxState = stateManager.state.board[row][col] // boxState = { row: 0, col: 0, value: '' }

    function boxClicked() {
        if (boxState.value === UNKNOWN_BOX_STATE) {
            console.log('box clicked', boxState)
            const currentPlayerXOrO = nextValue();
            boxState.value = currentPlayerXOrO;

            // box has been clicked, now it is opponents turn
            const opponentXOrO = nextValue();

            // opponentPlaysOptimally is FALSE here because opponent here is HUMAN who might not play optimally
            const bestOpponentMove = stateManager.bestMoveForPlayer(opponentXOrO, false);

            if (bestOpponentMove !== null) {
                // If opponent has best move, set it! This is where the AI actually tells our board what the best move is
                const bestBoxInState = stateManager.state.board[bestOpponentMove.row][bestOpponentMove.col];
                bestBoxInState.value = opponentXOrO;
            }

            // Now, for fun, let's also calculate best move for the human player, and update those boxStrengths
            // This function call will update box.boxStrength for each of the possible boxes

            // opponentPlaysOptimally is TRUE here because opponent here is AI who WILL ALWAYS play optimally
            stateManager.bestMoveForPlayer(currentPlayerXOrO, false);

            stateManager.setState({
                ...stateManager.state,
                updateReason: `Box clicked, opponent moved, and calculated box strengths for player`
            })
        }
    }

    const maybeWinners = stateManager.maybeGetWinners();
    let isWinner = isBoxWinner(boxState, maybeWinners);
    const isUnknown = boxState.value === UNKNOWN_BOX_STATE;

    const finalClassName = `TicTacToeBox ${className}` + (isWinner? ' winner': '') + (isUnknown? ' unknown' : '')

    return <button onClick={() => boxClicked(boxState, stateManager)} className={finalClassName}>
        {valueToDisplayText(boxState)}
    </button>
}
