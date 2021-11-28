import {GlobalState} from "little-state-machine";
import {Lager} from "common/types/commonTypes";

export const updateLager = (state: GlobalState, payload: {
    lager: Lager
}): GlobalState => {
    return {
        ...state,
    }
}
