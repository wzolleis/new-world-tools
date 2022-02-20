import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {menuItems} from "app/menu/data/appMenuEntries";
import React from "react";
import {makeStyles} from "@mui/styles";
import {useLocation, useNavigate} from "react-router-dom";
import LayoutConstants from "common/constants/layoutConstants";
import {AppTheme} from "app/components/appTheme";
import AppIcon from "common/components/AppIcon";
import {useTheme} from "@mui/material/styles";

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
    const theme = useTheme<AppTheme>()
    const iconColor = theme.custom.menuIcons.color

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
                        <ListItemIcon><AppIcon icon={item.iconType} sx={{color: iconColor}}/></ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default AppMenu