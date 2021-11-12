import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {AppMenu} from "app/components/AppMenu";
import {AppContent} from "./AppContent";

export const App = () => {
    return (
        <StateMachineProvider>
            <AppMenu/>
            <AppContent/>
        </StateMachineProvider>
    )
}