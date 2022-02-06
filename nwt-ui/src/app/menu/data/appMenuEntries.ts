import {messages} from "common/i18n/messages";
import {AppLinks} from "app/menu/data/appLinks";
import {AppMenuEntry} from "app/menu/types/menuTypes";

export const menuItems: AppMenuEntry[] = [
    {
        path: '/',
        title: messages.menu.welcome,
        key: 'New World',
        iconType: "Game"
    },
    {
        path: `/${AppLinks.users}`,
        title: messages.menu.user,
        key: 'users',
        iconType: "User"
    },
    {
        path: `/${AppLinks.cities}`,
        title: messages.menu.cities,
        key: 'cities',
        iconType: "City"
    },
    {
        path: `/${AppLinks.storages}`,
        title: messages.menu.storages,
        key: 'storages',
        iconType: "Storage"
    },
]