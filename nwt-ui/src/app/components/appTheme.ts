import {createTheme, Theme} from "@mui/material/styles";
import {blue} from "@mui/material/colors";
import {ThemeOptions} from "@mui/material/styles/createTheme";

interface CustomCssOptions {
    custom: {
        menuIcons: {
            color: string
        },
        appBarIcons: {
            color: string
        },
        appBarButtons: {
            color: string
        }
    }
}


export type AppTheme = Theme & CustomCssOptions
const cssVariables: CustomCssOptions = {
    custom: {
        menuIcons: {
            color: blue[900]
        },
        appBarIcons: {
            color: "white"
        },
        appBarButtons: {
            color: "white"
        }
    }
};

const themeOptions: ThemeOptions = {
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: blue[900],
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: blue[900]
                }
            }
        },
    }
}


const theme: AppTheme = createTheme(themeOptions, cssVariables) as AppTheme;

export default theme
