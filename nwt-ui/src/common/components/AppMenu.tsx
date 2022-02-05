import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {menuItems} from "app/menu/data/appMenuEntries";
import {getIcon} from "common/icons/iconFactory";
import React from "react";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import {useLocation, useNavigate} from "react-router-dom";
import LayoutConstants from "common/components/layoutConstants";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants
    return {
        drawer: {
            width: drawerWidth,
        }
    }
})
const AppMenu = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    return (
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
    )
}

export default AppMenu