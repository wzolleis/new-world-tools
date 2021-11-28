import {City, Player} from "common/types/commonTypes";
import {AppMenuEntry} from "app/menu/components/MenuItemView";


export const createMenu = (ciites: City[]): AppMenuEntry[] => {
    return [
        ...ciites.map(mapCity)
    ]
}

const mapPlayer = (player: Player): AppMenuEntry => {
    return {
        key: player.key,
        title: player.name,
        iconType: "Player",
        path: `players/${player.key}`
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

