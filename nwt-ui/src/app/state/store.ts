import {createStore, GlobalState} from "little-state-machine";
import {generateGame} from "../../testdata/gamegenerator";

export const log = (store: any) => {
    console.log(store);
    return store;
}


const initialState: GlobalState = {
    games: [generateGame()]
}

export const initStore = () => {
    createStore(initialState,
        {
            middleWares: [log]
        }
    )
}
