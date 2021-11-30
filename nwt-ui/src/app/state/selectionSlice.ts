import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "app/state/store";
import {City, Player, Selection} from "common/types/commonTypes";
import objectKeys from "app/state/objectKeys";

interface SelectionState {
    selection: Selection
}

const initialState: SelectionState = {
    selection: {
        player: objectKeys.players.dschaeck,
        city: objectKeys.cities.everfall
    }
}

export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        selectPlayerAction: (state: SelectionState, action: PayloadAction<Player>) => {
            state.selection.player = action.payload.key
        },
        selectCityAction: (state: SelectionState, action: PayloadAction<City>) => {
            state.selection.city = action.payload.key
        },
        clearSelectionAction: (state: SelectionState) => {
            state.selection = initialState.selection
        }
    }
})

export const {selectPlayerAction, selectCityAction, clearSelectionAction} = selectionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSelectionState = (state: AppState) => state.selectionState

export default selectionSlice.reducer
