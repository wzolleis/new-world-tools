import {createStore, GlobalState} from "little-state-machine";
import {CityNames} from "common/types/commonTypes";
import {City} from "app/types/appTypes";

export const log = (store: any) => {
    console.log(store);
    return store;
}

const cities: City[] =  [
    {
        key: CityNames.everfall,
        name: "everfall",
        details: "Metall, Stein, Leder, Schmelzen, Schmiede Lvl 5",
        lager: {
            key: 'everfall_lager',
            content: []
        }
    },
    {
        key: CityNames.windward,
        name: "windward",
        details: "das meiste Lvl3-4, Arcane Lvl 5, Workshop Lvl5",
        lager: {
            key: 'windsward_lager',
            content: []
        }
    }
]

const initialData = {
    game: {
        key: "new_word",
        name: "New World",
        players: []
    },
    player: {
        key: 'Dschaeck',
        name: 'Dschaeck',
        worlds: []
    },
    world: {
        key: 'antilia',
        name: 'Antillia',
        cities: [
            ...cities
        ]
    },
}


const initialState: GlobalState = {
    games: [{
        ...initialData.game,
        players: [{
            ...initialData.player,
            worlds: [
                {...initialData.world}
            ]
        }],
    }],
    selection: {
        game: initialData.game.key,
        world: initialData.world.key,
        player: initialData.player.key
    }
}

export const initStore = (state = initialState) => {
    createStore(state,
        {
            middleWares: [log]
        }
    )
}
