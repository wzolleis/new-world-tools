import React from "react";
import {StateMachineProvider} from "little-state-machine";
import {DevTool} from "little-state-machine-devtools";
import {ConfirmProvider} from "material-ui-confirm";
import {AppRoutes} from "app/components/AppRoutes";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/styles";
import {Theme} from "@mui/material";
import {blue} from "@mui/material/colors";


export interface AppTheme extends Theme {
    custom: {
        selected: {
            backgroundColor: string
        }
    }
}

// background: '#31AEF1'
const cssVariables = {
    custom: {
        selected: {
            backgroundColor: blue["900"]
        }
    }
};

const theme: AppTheme = createTheme({}, cssVariables) as AppTheme;

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