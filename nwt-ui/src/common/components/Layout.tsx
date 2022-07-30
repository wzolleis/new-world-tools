import React, {PropsWithChildren} from "react";
import {Drawer} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {Outlet} from "react-router-dom";
import AppMenu from "common/components/AppMenu";
import LayoutConstants from "common/constants/layoutConstants";
import {AppTheme} from "app/components/appTheme";
import {styled} from "@mui/material/styles";

const useStyles = makeStyles((theme: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        toolbar: theme.mixins.toolbar
    }
})

const Root = styled('div')(({theme}) => ({
    display: 'flex',
}))

const Page = styled('div')(({theme}) => ({
    width: '100%',
    padding: theme.spacing(3),
}))

const Toolbar = styled('div')(({theme}) => ({
    toolbar: theme.mixins.toolbar
}))

const Layout = ({children}: PropsWithChildren<{}>) => {
    const classes = useStyles()
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
                <Toolbar/>
                <Outlet/>
            </Page>
        </Root>
    )
}

export default Layout