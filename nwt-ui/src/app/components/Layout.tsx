import React, {PropsWithChildren} from "react";
import {AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {getIcon} from "common/icons/iconFactory";
import {useLocation, useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom'
import {menuItems} from "app/menu/data/appMenuEntries";
import {AppTheme} from "app/components/App";
import {useAppSelector} from "app/state/hooks";
import {findByKey} from "utils/arrayUtils";
import {messages} from "common/i18n/messages";
import {selectPlayerState} from "features/player/state/playerSlice";
import {Player} from "common/types/commonTypes";
import {selectUser} from "features/user/state/userSlice";
import {AppLinks} from "app/components/AppRoutes";

const drawerWidth = 240

const useStyles = makeStyles((theme: AppTheme) => {
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
        userName: {
            marginLeft: drawerWidth
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
    const {user} = useAppSelector(selectUser)
    const dummyPlayer =  {
        name: 'dummy.player',
        key: '4031e661-91a5-4130-b61e-6c063cfe48ac',
        worlds: {}
    }

    const player = user?.player || dummyPlayer

    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar className={classes.appBar}
                    position='fixed'
                    elevation={0}
                    color='primary'
            >
                <Toolbar>
                    <div className={classes.userName}>
                        <Typography>{player?.name || messages.common.noSelection}</Typography>
                    </div>
                </Toolbar>
            </AppBar>
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}
                anchor="left"
            >
                {/* links/list section */}
                <List className={classes.drawer}>
                    {menuItems.map(item => {
                        const active = location.pathname === item.path
                        return (
                            <ListItem key={item.key}
                                      button={true}
                                      selected={active}
                                      onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>{getIcon(item.iconType)}</ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        )
                    })}
                </List>
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