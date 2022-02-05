import {AppBar} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";


const useStyles = makeStyles((theme: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,

        },
        userName: {
            marginLeft: drawerWidth
        },
        toolbar: theme.mixins.toolbar
    }
})

export interface AppBarProps {
}

export type AppBarContainerProps = PropsWithChildren<AppBarProps>

const AppBarContainer: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    const classes = useStyles()

    return (
        <AppBar className={classes.appBar}
                position='fixed'
                elevation={0}
                color='primary'
        >
            {children}
        </AppBar>
    )
}

export default AppBarContainer