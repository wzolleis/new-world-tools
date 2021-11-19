import React, {PropsWithChildren} from "react";
import {AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {AppMenuEntry} from "app/menu/components/MenuItemView";
import {getIcon} from "common/icons/iconFactory";
import {useLocation, useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom'
import { format } from 'date-fns'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            // @ts-ignore
            padding: theme.spacing(3)
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
        active: {
            background: '#f4f4f4'
        },
        title: {
            // @ts-ignore
            padding: theme.spacing(2)
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        date: {
            flexGrow: 1
        },
        // @ts-ignore
        toolbar: theme.mixins.toolbar
    }
})

const Layout = ({children}: PropsWithChildren<{}>) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    // const {state: {games}} = useStateMachine();
    const menuItems: AppMenuEntry[] = [
        {
            path: 'welcome',
            title: 'New World',
            key: 'New World',
            iconType: "Game"
        },
        {
            path: 'cities',
            title: 'Cities',
            key: 'cities',
            iconType: "City"
        },
    ]

    console.log('path = ', location.pathname)

    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar className={classes.appBar}
                    position='fixed'
                    elevation={0}
                    color='primary'
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>Welcome to Brave New World</Typography>
                </Toolbar>
            </AppBar>
            {/* main content */}
            <div className={classes.page}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{paper: classes.drawerPaper}}
                    anchor="left"
                >
                    {/* links/list section */}
                    <List>
                        {menuItems.map(item => (
                            <ListItem key={item.key}
                                      button={true}
                                      className={location.pathname === item.path ? classes.active : undefined}
                                      onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>{getIcon(item.iconType)}</ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
            <div className={classes.page}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout