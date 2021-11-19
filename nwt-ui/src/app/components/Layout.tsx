import React, {PropsWithChildren} from "react";
import {AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {AppMenuEntry} from "app/menu/components/MenuItemView";
import {getIcon} from "common/icons/iconFactory";
import {useLocation, useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom'
import {format} from 'date-fns'
import {useStateMachine} from "little-state-machine";

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => {
    return {
        page: {
            background: '#f9f9f9',
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
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2),
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        date: {
            flexGrow: 1
        },
        toolbar: theme.mixins.toolbar
    }
})

const Layout = ({children}: PropsWithChildren<{}>) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const {state: {games}} = useStateMachine()
    const player = games[0].players[0]
    const menuItems: AppMenuEntry[] = [
        {
            path: '/welcome',
            title: 'New World',
            key: 'New World',
            iconType: "Game"
        },
        {
            path: '/cities',
            title: 'Cities',
            key: 'cities',
            iconType: "City"
        },
    ]

    console.log('path = ', location.pathname)
    console.log('player = ', player?.name)

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
                        Today is the
                    </Typography>
                    <Typography>{player.name}</Typography>
                </Toolbar>
            </AppBar>
            {/* side drawer */}
            <div className={classes.page}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{paper: classes.drawerPaper}}
                    anchor="left"
                >
                    {/* links/list section */}
                    <List>
                        {menuItems.map(item => {
                            const active = location.pathname === item.path
                            const className = active ? classes.active : undefined
                            console.log(`item ${item.title} is active =`, active)

                            return (
                                <ListItem key={item.key}
                                          button={true}
                                          className={className}
                                          onClick={() => navigate(item.path)}
                                >
                                    <ListItemIcon>{getIcon(item.iconType)}</ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Drawer>
            </div>
            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout