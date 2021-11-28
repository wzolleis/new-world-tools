import {City, Player, World} from "common/types/commonTypes";
import {AppMenuEntry} from "app/menu/components/MenuItemView";


export const createMenu = (ciites: City[]): AppMenuEntry[] => {
    return ciites.map(mapCity)
}

const mapPlayer = (player: Player): AppMenuEntry => {
    return {
        key: player.key,
        title: player.name,
        iconType: "Player",
        items: player.worlds.map(mapWorld),
        path: `players/${player.key}`
    }
}

const mapWorld = (world: World): AppMenuEntry => {
    return {
        key: world.key,
        title: world.name,
        iconType: "World",
        items: world.cities.map(mapCity),
        path: `worlds/${world.key}`
    }
}

const mapCity = (city: City): AppMenuEntry => {
    return {
        key: city.key,
        title: city.name,
        iconType: "City",
        path: `cities/${city.key}`
    }
}

