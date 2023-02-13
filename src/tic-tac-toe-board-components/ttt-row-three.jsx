import {TTTBox} from "./ttt-box";


export function TTTRowThree({stateManager}){
    return <div className={"TTTRow"}>
        <TTTBox row={2} col={0} stateManager={stateManager} className={"RightBorder"}/>
        <TTTBox row={2} col={1} stateManager={stateManager}/>
        <TTTBox row={2} col={2} stateManager={stateManager} className={"LeftBorder"}/>
    </div>
}