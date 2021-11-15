import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {AppMenu} from "app/components/AppMenu";
import {DevTool} from "little-state-machine-devtools";
import {Outlet} from "react-router-dom";
import {ConfirmProvider} from "material-ui-confirm";

export const App = () => {
    return (
        <StateMachineProvider>
            <AppMenu/>
            <DevTool/>
            <ConfirmProvider>
                <Outlet/>
            </ConfirmProvider>
        </StateMachineProvider>
    )
}