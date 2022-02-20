import React, {PropsWithChildren} from "react";
import {Drawer} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {Outlet} from "react-router-dom";
import AppMenu from "common/components/AppMenu";
import LayoutConstants from "common/constants/layoutConstants";
import {AppTheme} from "app/components/appTheme";

const useStyles = makeStyles((theme: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        page: {
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        title: {
            padding: theme.spacing(2),
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,

        },
        date: {
            flexGrow: 1
        },
        toolbar: theme.mixins.toolbar
    }
})

const Layout = ({children}: PropsWithChildren<{}>) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}
                anchor="left"
            >
                {/* links/list section */}
                <AppMenu/>
            </Drawer>
            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout