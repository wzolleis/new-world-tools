import {Selection} from "common/types/commonTypes";
import {GlobalState} from "little-state-machine";

export const selectedData = (state: GlobalState): Selection => {
    const city = state.cities.find(city => city.key === state.selection.city) || null
    return {city}
}

