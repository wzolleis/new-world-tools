import {AppBar} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";
import {makeStyles} from "@mui/styles";
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

const TopAppBar: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    const classes = useStyles()
    return (
        <AppBar className={classes.header}
                position='fixed'
                elevation={0}
        >
            {children}
        </AppBar>
    )
}

export default TopAppBar