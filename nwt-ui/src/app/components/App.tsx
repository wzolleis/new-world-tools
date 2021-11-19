import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {DevTool} from "little-state-machine-devtools";
import {ConfirmProvider} from "material-ui-confirm";
import {AppRoutes} from "app/components/AppRoutes";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/styles";

const theme = createTheme();

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StateMachineProvider>
                <DevTool/>
                <ConfirmProvider>
                    <AppRoutes/>
                </ConfirmProvider>
            </StateMachineProvider>
        </ThemeProvider>
    )
}