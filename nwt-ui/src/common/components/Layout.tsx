import React from "react";
import {Drawer} from "@mui/material";
import {Outlet} from "react-router-dom";
import AppMenu from "common/components/AppMenu";
import LayoutConstants from "common/constants/layoutConstants";
import {styled} from "@mui/material/styles";

const Root = styled('div')(() => ({
    display: 'flex',
}))

const Page = styled('div')(({theme}) => ({
    width: '100%',
    padding: theme.spacing(3),
}))

const Layout = () => {
    const {drawerWidth} = LayoutConstants

    return (
        <Root>
            {/* side drawer */}
            <Drawer
                sx={{width: drawerWidth}}
                variant="permanent"
                anchor="left"
            >
                {/* links/list section */}
                <AppMenu/>
            </Drawer>
            {/* main content */}
            <Page>
                <Outlet/>
            </Page>
        </Root>
    )
}

export default Layout