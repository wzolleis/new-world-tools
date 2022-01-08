import {AppMenuEntry} from "app/menu/components/MenuItemView";

export const menuItems: AppMenuEntry[] = [
    {
        path: '/welcome',
        title: 'Übersicht',
        key: 'New World',
        iconType: "Game"
    },
    {
        path: '/users',
        title: 'User',
        key: 'users',
        iconType: "User"
    },
    {
        path: '/players',
        title: 'Spieler',
        key: 'players',
        iconType: "Player"
    },
    {
        path: '/cities',
        title: 'Cities',
        key: 'cities',
        iconType: "City"
    },
    {
        path: '/favorites',
        title: 'Favoriten',
        key: 'favorites',
        iconType: "Favorites"
    },
]