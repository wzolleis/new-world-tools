import React from "react";
import {useStateMachine} from "little-state-machine";

export const AppContent = () => {
    const {state} = useStateMachine();
    const {worlds: [{lager}]} = state
    console.log(state)

    return (
        <div>Im Lager: {JSON.stringify(lager[0])}</div>
    )
}