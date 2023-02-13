import logo from './logo.svg';
import './App.css';
import {TTTBoard} from "./tic-tac-toe-board-components/ttt-board";
import {ResetButton} from "./components/reset-button";
import {getInitialGameState, TTTStateManager} from "./state/ttt-state-manager";
import React from 'react'

function App() {
    const [state, setState] = React.useState(getInitialGameState());

    const karenTheManager = new TTTStateManager(state, setState);

    return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  tictactoe by cruz*/}
      {/*</header>*/}

        <div className={"GameView"}>
            <h1>
                Play Tic Tac Toe VS. An AI!
            </h1>
            <TTTBoard stateManager={karenTheManager}/>
            <ResetButton stateManager={karenTheManager}/>
        </div>
    </div>
  );
}

export default App;
