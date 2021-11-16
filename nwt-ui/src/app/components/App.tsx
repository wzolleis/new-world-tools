import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {DevTool} from "little-state-machine-devtools";
import {ConfirmProvider} from "material-ui-confirm";
import {AppRoutes} from "app/components/AppRoutes";

export const App = () => {
    return (
        <StateMachineProvider>
            <DevTool/>
            <ConfirmProvider>
                <AppRoutes/>
            </ConfirmProvider>
        </StateMachineProvider>
    )
}