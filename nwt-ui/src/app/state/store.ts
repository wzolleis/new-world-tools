import {createStore, GlobalState} from "little-state-machine";

export const log = (store: any) => {
    console.log(store);
    return store;
}

const initialState: GlobalState = {
    worlds: [
        {
            key: 'testWorld',
            lager: [
                {
                    key: 'testlager-key',
                    city: 'Testcity'
                }
            ]
        }
    ]
}

export const initStore = () => {
    createStore(initialState,
        {
            middleWares: [log]
        }
    )
}
