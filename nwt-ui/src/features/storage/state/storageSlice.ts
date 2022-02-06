import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CityStorage} from "common/types/commonTypes";
import {RootState} from "app/state/store";

interface StorageState {
    storages: CityStorage[]
}

const initialState: StorageState = {
    storages: []
}

export const storageSlice = createSlice({
        name: 'login',
        initialState,
        reducers: {
            listStorage: (state: StorageState, action: PayloadAction<CityStorage[]>) => {
                state.storages = action.payload
            }
        },
    }
)

// Other code such as selectors can use the imported `RootState` type
export const selectStorage = (state: RootState) => state.storageState

export const {listStorage} = storageSlice.actions

export default storageSlice.reducer