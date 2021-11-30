import React from "react";
import {ConfirmProvider} from "material-ui-confirm";
import {AppRoutes} from "app/components/AppRoutes";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/styles";
import {Theme} from "@mui/material";
import {blue} from "@mui/material/colors";
import store from 'app/state/store'
import {Provider} from 'react-redux'

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

const init = () => {
    // initDatabase()
}

export const App = () => {
    init()

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ConfirmProvider>
                    <AppRoutes/>
                </ConfirmProvider>
            </Provider>
        </ThemeProvider>
    )
}
