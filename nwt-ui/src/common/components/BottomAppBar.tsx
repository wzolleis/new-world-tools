import {AppBar} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";
import {makeStyles, useTheme} from "@mui/styles";
import LayoutConstants from "common/constants/layoutConstants";
import {AppTheme} from "app/components/appTheme";

const useStyles = makeStyles((theme: AppTheme) => {
    const {drawerWidth} = LayoutConstants
    return {
        header: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    }
})

export interface AppBarProps {
}

export type AppBarContainerProps = PropsWithChildren<AppBarProps>

const BottomAppBar: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    const classes = useStyles()
    const theme = useTheme<AppTheme>()
    return (
        <AppBar className={classes.header}
                position='fixed'
                elevation={0}
        >
            {children}
        </AppBar>
    )
}

export default BottomAppBar