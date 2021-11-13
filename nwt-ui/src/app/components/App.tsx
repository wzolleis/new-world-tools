import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {AppMenu} from "app/components/AppMenu";
import {AppContent} from "./AppContent";
import {DevTool} from "little-state-machine-devtools";

export const App = () => {
    return (
        <StateMachineProvider>
            <AppMenu/>
            <DevTool/>
            <AppContent/>
        </StateMachineProvider>
    )
}