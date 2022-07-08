import InboxIcon from "@mui/icons-material/Inbox";
import {AccountBox, DeviceUnknown, Favorite, LocationCity, Menu, Storage, Workspaces} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import {IconType} from "common/types/iconType";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

export interface AppIconProps {
    icon: IconType

    [key: string]: unknown
}

const AppIcon = ({icon, ...rest}: AppIconProps) => {
    switch (icon) {
        case "Game":
            return <InboxIcon {...rest}/>
        case "Player":
            return <AccountBox  {...rest}/>
        case "World":
            return <Workspaces  {...rest}/>
        case "City":
            return <LocationCity {...rest}/>
        case "Favorites":
            return <Favorite  {...rest}/>
        case "User":
            return <PersonIcon  {...rest}/>
        case "Storage":
            return <Storage  {...rest}/>
        case "Menu":
            return <Menu  {...rest}/>
        case "Add":
            return <AddCircleIcon  {...rest}/>
        case "Edit":
            return <EditIcon  {...rest}/>
        case "Delete":
            return <DeleteIcon  {...rest}/>
        case "Marketplace":
            return <TimelineOutlinedIcon {...rest}/>
        default:
            return <DeviceUnknown  {...rest}/>
    }
}

export default AppIcon