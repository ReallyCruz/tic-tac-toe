import {getInitialGameState} from "../state/ttt-state-manager";

function onResetClicked(stateManager) {
    // Want to reset the state
    stateManager.setState(getInitialGameState())
    console.log('Resetting state!')
}

export function ResetButton({stateManager}) {
    return (
        <button onClick={() => onResetClicked(stateManager)} className={"ResetButton"}>
            Reset Button
        </button>
    )
}