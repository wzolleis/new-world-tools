import {AppMenuEntry} from "app/menu/components/MenuItemView";
import {messages} from "common/i18n/messages";
import {AppLinks} from "app/menu/data/appLinks";

export const menuItems: AppMenuEntry[] = [
    {
        path: '/',
        title: 'Übersicht',
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
        path:  `/${AppLinks.players}`,
        title: messages.menu.player,
        key: 'players',
        iconType: "Player"
    },
    {
        path:  `/${AppLinks.cities}`,
        title: messages.menu.cities,
        key: 'cities',
        iconType: "City"
    },
    {
        path:  `/${AppLinks.favorites}`,
        title: messages.menu.favorites,
        key: 'favorites',
        iconType: "Favorites"
    },
]