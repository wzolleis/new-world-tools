import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CityStorage} from "common/types/commonTypes";
import {RootState} from "app/state/store";
import remote, {restApi} from "common/api/restApi";

interface StorageState {
    storages: CityStorage[]
}

const initialState: StorageState = {
    storages: []
}

export const emptyStorage: CityStorage = {
    key: '',
    city: '',
    items: []
}

// First, create the thunk
export const listStorage = createAsyncThunk(
    'storage/listStorage',
    async (_, thunkApi) => {
        const response = await restApi.get<CityStorage[]>(remote.path.storages)
        return response.data
    }
)

export const storageSlice = createSlice({
        name: 'storage',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(listStorage.fulfilled, (state, action) => {
                state.storages = action.payload
            })
        }
    }
)

// Other code such as selectors can use the imported `RootState` type
export const selectStorage = (state: RootState) => state.storageState

export default storageSlice.reducer