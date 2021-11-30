import {Selection} from "common/types/commonTypes";
import {AppState} from "app/state/store";


export const selectedData = (state: AppState): Selection => state.selectionState.selection
