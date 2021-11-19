import React, {PropsWithChildren} from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {AppMenuEntry} from "app/menu/components/MenuItemView";
import {getIcon} from "common/icons/iconFactory";
import {useLocation, useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%',
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
    }
})

const Layout = ({children}: PropsWithChildren<{}>) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    // const {state: {games}} = useStateMachine();
    const menuItems: AppMenuEntry[] = [
        {
            path: 'games',
            title: 'Games',
            key: 'games',
            iconType: "Game"
        },
        {
            path: 'cities',
            title: 'City',
            key: 'cities',
            iconType: "City"
        },
        {
            path: 'worlds',
            title: 'Worlds',
            key: 'worlds',
            iconType: "World"
        },
        {
            path: 'players',
            title: 'Player',
            key: 'players',
            iconType: 'Player'
        }
    ]

    console.log('path = ', location.pathname)

    return (
        <div className={classes.root}>
            {/* main content */}
            <div className={classes.page}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{paper: classes.drawerPaper}}
                    anchor="left"
                >
                    <div>
                        <Typography variant="h5">New World</Typography>
                    </div>

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
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout