import {AppBar, Toolbar} from "@mui/material";
import React, {FunctionComponent, PropsWithChildren} from "react";

export type AppBarContainerProps = PropsWithChildren<{}>

const TopAppBar: FunctionComponent<AppBarContainerProps> = ({children}: AppBarContainerProps) => {
    return (
        <>
            <AppBar
                position='fixed'
                elevation={0}
            >
                {children}
            </AppBar>
            {/*
            leere Toolbar, damit der Content nicht von der Appbar überdeckt wird,
            siehe https://stackoverflow.com/questions/48508449/content-beneath-fixed-appbar
            */}
            <Toolbar/>
        </>
    )
}

export default TopAppBar