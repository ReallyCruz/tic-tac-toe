import {TTTBox} from "./ttt-box";


export function TTTRowTwo({stateManager}){
    return <div className={"TTTRow"}>
        <TTTBox row={1} col={0} stateManager={stateManager} className={"RightBorder BottomBorder"}/>
        <TTTBox row={1} col={1} stateManager={stateManager} className={"BottomBorder"}/>
        <TTTBox row={1} col={2} stateManager={stateManager} className={"BottomBorder LeftBorder"}/>
    </div>
}