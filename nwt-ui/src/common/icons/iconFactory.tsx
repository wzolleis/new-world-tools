import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import {AccountBox, DeviceUnknown, Favorite, LocationCity, Storage, Workspaces} from "@mui/icons-material";

export type IconType = 'Game' | "Player" | "World" | "City" | "Favorites" | "User" | "Storage"

export const getIcon = (icon: IconType | undefined): React.ReactElement => {
    const color = 'secondary'
    switch (icon) {
        case "Game":
            return <InboxIcon color={color}/>
        case "Player":
            return <AccountBox color={color}/>
        case "World":
            return <Workspaces color={color}/>
        case "City":
            return <LocationCity color={color}/>
        case "Favorites":
            return <Favorite color={color}/>
        case "User":
            return <PersonIcon color={color}/>
        case "Storage":
            return <Storage color={color}/>
        default:
            return <DeviceUnknown color={color}/>
    }
}