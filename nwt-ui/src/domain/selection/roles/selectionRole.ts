import {Selection} from "app/types/appTypes";
import {GlobalState} from "little-state-machine";

export const selectedData = (state: GlobalState): Selection => {
    const game = state.games.find(game => game.key === state.selection.game) || null
    const player = game?.players.find(player => player.key === state.selection.player) || null
    const world = player?.worlds.find(world => world.key === state.selection.world) || null

    return {
        game: game,
        player: player,
        world: world
    }
}

