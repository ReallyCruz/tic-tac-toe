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

function valueToDisplayText(currentValue) {
    if (currentValue === UNKNOWN_BOX_STATE) {
        return ' '
    } else if (currentValue === X_BOX_STATE) {
        return 'X'
    } else if (currentValue === O_BOX_STATE) {
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
            boxState.value = nextValue()
            stateManager.setState({
                ...stateManager.state,
                updateReason: `Box was clicked row[${row}] col[${className}] value[${value}]`
            })

            // box has been clicked, now it is opponents turn
            const opponentXOrO = boxState.value === 'X'? 'O': 'X';
            const bestOpponentMove = stateManager.bestMoveForPlayer(opponentXOrO);
            const bestBoxInState = stateManager.state.board[bestOpponentMove.row][bestOpponentMove.col];
            bestBoxInState.value = opponentXOrO;
            stateManager.setState({
                ...stateManager.state,
                updateReason: `Opponent Moved!!!`
            })
        }
    }

    const maybeWinners = stateManager.maybeGetWinners();
    let isWinner = isBoxWinner(boxState, maybeWinners);

    const finalClassName = `TicTacToeBox ${className}` + (isWinner? ' winner': '')

    return <button onClick={() => boxClicked(boxState, stateManager)} className={finalClassName}>
        {valueToDisplayText(boxState.value)}
    </button>
}