import {Theme} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {blue} from "@mui/material/colors";

export interface AppTheme extends Theme {
    custom: {
        appBar: {
            backgroundColor: string
        }
        icons: {
            backgroundColor: string
        }
    }
}

const cssVariables = {
    custom: {
        appBar: {
            backgroundColor: blue[900]
        },
        icons: {
            backgroundColor: blue[900]
        }
    }
};

const theme: AppTheme = createTheme({}, cssVariables) as AppTheme;

export default theme
