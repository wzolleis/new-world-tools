import {useTheme} from "@mui/styles";
import {AppTheme} from "app/components/appTheme";
import InboxIcon from "@mui/icons-material/Inbox";
import {AccountBox, DeviceUnknown, Favorite, LocationCity, Menu, Storage, Workspaces} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import {IconType} from "common/types/iconType";

export interface AppIconProps {
    icon: IconType | undefined
}

const AppIcon = ({icon}: AppIconProps) => {
    const theme = useTheme<AppTheme>()
    const color = theme.custom.icons.backgroundColor
    switch (icon) {
        case "Game":
            return <InboxIcon sx={{color}}/>
        case "Player":
            return <AccountBox sx={{color}}/>
        case "World":
            return <Workspaces sx={{color}}/>
        case "City":
            return <LocationCity sx={{color}}/>
        case "Favorites":
            return <Favorite sx={{color}}/>
        case "User":
            return <PersonIcon sx={{color}}/>
        case "Storage":
            return <Storage sx={{color}}/>
        case "Menu":
            return <Menu sx={{color}}/>
        default:
            return <DeviceUnknown sx={{color}}/>
    }
}

export default AppIcon