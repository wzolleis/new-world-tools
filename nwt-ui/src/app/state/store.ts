import {createStore, GlobalState} from "little-state-machine";
import {defaultOptions, generateGame} from "testdata/gamegenerator";

export const log = (store: any) => {
    console.log(store);
    return store;
}


const initialState: GlobalState = {
    games: [generateGame({
        ...defaultOptions,
        worlds: 2,
        players: 5
    })]
}

export const initStore = (state = initialState) => {
    createStore(state,
        {
            middleWares: [log]
        }
    )
}
