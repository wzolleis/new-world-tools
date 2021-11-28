import {City, Player, Selection} from "common/types/commonTypes";
import {GlobalState} from "little-state-machine";


export const selectedData = (state: GlobalState): Selection => state.selection

export const selectedPlayer = (state: GlobalState): Player => {
    return state.selection.player
}

export const selectedCity = (state: GlobalState): City => {
    return state.selection.city
}

