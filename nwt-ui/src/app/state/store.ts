import {createStore, GlobalState} from "little-state-machine";

export const log = (store: any) => {
    console.log(store);
    return store;
}

const initialState: GlobalState = {
    players: [
        {
            name: 'Jack',
            key: 'jack',
            worlds: [
                {
                    key: 'testWorld',
                    cities: [
                        {
                            key: 'Everfall',
                            name: 'Everfall',
                            lager: {
                                key: 'everfall-lager',
                                content: 'something'
                            }
                        }
                    ]
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
