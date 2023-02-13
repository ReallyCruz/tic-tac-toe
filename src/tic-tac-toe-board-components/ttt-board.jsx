import {TTTRowOne} from "./ttt-row-one";
import {TTTRowTwo} from "./ttt-row-two";
import {TTTRowThree} from "./ttt-row-three";
import React from 'react';


export function TTTBoard({stateManager}){

    return <div className={'TTTBoard'}>
        <TTTRowOne stateManager={stateManager}/>
        <TTTRowTwo stateManager={stateManager}/>
        <TTTRowThree stateManager={stateManager}/>
    </div>
}