import {useTheme} from "@mui/styles";
import {AppTheme} from "app/components/appTheme";
import InboxIcon from "@mui/icons-material/Inbox";
import {AccountBox, DeviceUnknown, Favorite, LocationCity, Menu, Storage, Workspaces} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import {IconType} from "common/types/iconType";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface AppIconProps {
    icon: IconType | undefined
    color?: string
}

const AppIcon = ({icon, color}: AppIconProps) => {
    const theme = useTheme<AppTheme>()
    const iconColor = color || theme.custom.icons.backgroundColor
    switch (icon) {
        case "Game":
            return <InboxIcon sx={{color: iconColor}}/>
        case "Player":
            return <AccountBox sx={{color: iconColor}}/>
        case "World":
            return <Workspaces sx={{color: iconColor}}/>
        case "City":
            return <LocationCity sx={{color: iconColor}}/>
        case "Favorites":
            return <Favorite sx={{color: iconColor}}/>
        case "User":
            return <PersonIcon sx={{color: iconColor}}/>
        case "Storage":
            return <Storage sx={{color: iconColor}}/>
        case "Menu":
            return <Menu sx={{color: iconColor}}/>
        case "Add":
            return <AddCircleIcon sx={{color: iconColor}}/>
        default:
            return <DeviceUnknown sx={{color: iconColor}}/>
    }
}

export default AppIcon