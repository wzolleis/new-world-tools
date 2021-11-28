import {createStore, GlobalState} from "little-state-machine";
import {City, Player} from "common/types/commonTypes";

export const log = (store: any) => {
    console.log(store);
    return store;
}

const cities: City[] = [
    {
        key: 'ae1b45cc-c380-4729-957d-bf4f7554f8af',
        name: "everfall",
        details: "Metall, Stein, Leder, Schmelzen, Schmiede Lvl 5",
        lager: {
            key: 'everfall_lager',
            content: []
        }
    },
    {
        key: '198fd1a9-670a-4847-aea6-abfa6c66600a',
        name: "windward",
        details: "das meiste Lvl3-4, Arcane Lvl 5, Workshop Lvl5",
        lager: {
            key: 'windsward_lager',
            content: []
        }
    }
]

const dschaeck: Player = {
    key: 'cfa4a36e-8f09-42f4-9cd9-d7161830c771',
    name: 'Dschaeck',
    cities
}


const initialState: GlobalState = {
    players: [dschaeck],
    selection: {
        city: cities[0],
        player: dschaeck
    }
}

export const initStore = (state = initialState) => {
    createStore(state,
        {
            middleWares: [log]
        }
    )
}
