import {AppBar} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";

export type AppBarContainerProps = PropsWithChildren<{}>

const TopAppBar: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    return (
        <AppBar
            position='fixed'
            elevation={0}
        >
            {children}
        </AppBar>
    )
}

export default TopAppBar