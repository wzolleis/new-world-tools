import React from "react";
import {useStateMachine} from "little-state-machine";

export const AppContent = () => {
    const {state} = useStateMachine();
    return (
        <div>Games: {JSON.stringify(state.games[0])}</div>
    )
}