import React from "react";
import {useStateMachine} from "little-state-machine";
import { StateMachineProvider, createStore } from 'little-state-machine'



export const AppContent = () => {
    const {state} = useStateMachine();
    const {lager} = state.players[0].worlds[0].cities[0]

    return (
        <div>Im Lager: {JSON.stringify(lager.content)}</div>
    )
}