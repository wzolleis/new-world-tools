import {createStore, GlobalState} from "little-state-machine";

export const log = (store: any) => {
    console.log(store);
    return store;
}

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
        name: 'Antilia',
        cities: []
    },
    city: {
        key: 'everfall',
        name: 'Everfall',
        lager: {
            key: 'everfall_lager',
            content: []
        }
    }
}


const initialState: GlobalState = {
    games: [{
        ...initialData.game,
        players: [{
            ...initialData.player,
            worlds: [{
                ...initialData.world,
                cities: [{
                    ...initialData.city
                }]
            }]
        }],
    }]
}

export const initStore = (state = initialState) => {
    createStore(state,
        {
            middleWares: [log]
        }
    )
}
