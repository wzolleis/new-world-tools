import InboxIcon from "@mui/icons-material/Inbox";
import React from "react";
import {AccountBox, DeviceUnknown, LocationCity, SentimentVeryDissatisfied, Workspaces} from "@mui/icons-material";
import {IconTypeMap} from "@mui/material";

export type IconType = 'Game' | "Player" | "World" | "City"

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
        default:
            return <DeviceUnknown color={color}/>
    }
}