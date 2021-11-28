import React, {useState} from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse, List, ListItem, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {WithKey} from "common/types/commonTypes";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {IconType} from "common/icons/iconFactory";
export interface AppMenuEntry extends WithKey{
    title: string,
    items?: AppMenuEntry[]
    iconType?: IconType,
    path: string
}

interface MenuItemProps extends WithKey {
    config: AppMenuEntry
}

const ListItemBody = (props: MenuItemProps) => {
    const {config} = props
    return (
        <>
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary={config.title}/>
        </>
    );
}

const MenuItem = (props: MenuItemProps) => {
    const {config} = props

    return (
        <ListItem button>
            <ListItemBody key={config.key} config={config}/>
        </ListItem>
    );
};

const ExpandableMenuItem = (props: MenuItemProps) => {
    const {config} = props

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemBody key={config.key} config={config}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <AppMenu items={config.items || []}/>
            </Collapse>
        </div>
    );
};

interface MenuProps {
    items: AppMenuEntry[]
}

export const AppMenu = (props: MenuProps) => {
    const {items: menuItems} = props

    const createList = (items: AppMenuEntry[]) => {
        let menu: Array<React.ReactElement> = [];
        items.map((menuItem) => {
            if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
                menu.push(
                    <ExpandableMenuItem
                        config={menuItem}
                        key={menuItem.key}
                    />);
            } else {
                menu.push
                (
                    <MenuItem
                    config={menuItem}
                    key={menuItem.title}
                />);
            }
        });
        return menu.concat();
    };

    return <List>{createList(menuItems)}</List>;
}