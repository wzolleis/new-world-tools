import React from "react";
import {useStateMachine} from "little-state-machine";

export const GamesView = () => {
    const {state: {games}} = useStateMachine();
    return (
        <div>GAMES!</div>
    )
}