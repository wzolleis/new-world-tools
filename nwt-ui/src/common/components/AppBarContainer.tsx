// @ts-ignore
import {AppBar, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";
import {makeStyles, useTheme} from "@mui/styles";
import LayoutConstants from "common/components/layoutConstants";
import {AppTheme} from "app/components/appTheme";

const useStyles = makeStyles((theme: AppTheme) => {
    const {drawerWidth} = LayoutConstants
//            backgroundColor: theme.custom.appBar.backgroundColor
    return {
        header: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    }
})

export interface AppBarProps {
}

export type AppBarContainerProps = PropsWithChildren<AppBarProps>

const AppBarContainer: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    const classes = useStyles()
    const theme = useTheme<AppTheme>()
    // style: {backgroundColor: "theme.custom.appBar.backgroundColor}
    return (
        <AppBar sx={{backgroundColor: theme.custom.appBar.backgroundColor}} className={classes.header}
                position='fixed'
                elevation={0}
        >
            {children}
        </AppBar>
    )
}

export default AppBarContainer