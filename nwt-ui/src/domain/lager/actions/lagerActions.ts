import {GlobalState} from "little-state-machine";
import {Lager} from "app/types/appTypes";

export const updateLager = (state: GlobalState, payload: {
    lager: Lager
}): GlobalState => {
    return {
        ...state,
    }
}
