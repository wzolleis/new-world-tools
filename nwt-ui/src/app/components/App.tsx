import React from "react";
import {ConfirmProvider} from "material-ui-confirm";
import {AppRoutes} from "app/components/AppRoutes";
import {ThemeProvider} from "@mui/material/styles";
import store from 'app/state/store'
import {Provider} from 'react-redux'
import theme from "app/components/appTheme";


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
