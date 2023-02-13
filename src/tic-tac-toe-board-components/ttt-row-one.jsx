import {TTTBox} from "./ttt-box";

export function TTTRowOne({stateManager}){
    return <div className={"TTTRow"}>
        <TTTBox row={0} col={0} stateManager={stateManager} className={"BottomBorder RightBorder"}/>
        <TTTBox row={0} col={1} stateManager={stateManager} className={"BottomBorder"}/>
        <TTTBox row={0} col={2} stateManager={stateManager} className={"BottomBorder LeftBorder"}/>
    </div>
}