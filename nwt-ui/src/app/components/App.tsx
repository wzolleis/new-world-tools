import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {AppMenu} from "./AppMenu";
import {AppContent} from "./AppContent";
import {initStore} from "../state/store";

initStore()

export const App = () => {
    return (
        <StateMachineProvider>
            <AppMenu/>
            <AppContent/>
        </StateMachineProvider>
    )
}