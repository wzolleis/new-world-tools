import {Icon} from "@mui/material";

export interface MenuItemType {
    icon: typeof Icon
    title: string
    items?: MenuItemType[]
}