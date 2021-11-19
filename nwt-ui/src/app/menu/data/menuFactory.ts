import {City, Game, Player, World} from "app/types/appTypes";
import {AppMenuEntry} from "app/menu/components/MenuItemView";

export const createMenu = (game: Game): AppMenuEntry[] => {
    const {players} = game
    return players.map(mapPlayer)
}

const mapPlayer = (player: Player): AppMenuEntry => {
    return {
        key: player.key,
        title: player.name,
        items: player.worlds.map(mapWorld)
    }
}

const mapWorld = (world: World): AppMenuEntry => {
    return {
        key: world.key,
        title: world.name,
        items: world.cities.map(mapCity)
    }
}

const mapCity = (city: City): AppMenuEntry => {
    return {
        key: city.key,
        title: city.name,
    }
}

