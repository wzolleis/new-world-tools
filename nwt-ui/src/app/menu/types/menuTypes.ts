import {Icon} from "@mui/material";
import {WithKey} from "common/types/commonTypes";
import {IconType} from "common/types/iconType";

export interface MenuItemType {
    icon: typeof Icon
    title: string
    items?: MenuItemType[]
}

export interface AppMenuEntry extends WithKey {
    title: string,
    items?: AppMenuEntry[]
    iconType?: IconType,
    path: string
}
