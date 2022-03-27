import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CityStorage} from "common/types/commonTypes";
import {RootState} from "app/state/store";
import remote, {restApi} from "common/api/restApi";
import {insert, remove, update} from "utils/arrayUtils";

interface StorageState {
    storages: CityStorage[]
}

interface StorageActionPayload {
    storage: CityStorage
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

export const updateStorage = createAsyncThunk(
    'storage/updateStorage',
    async (storage: CityStorage) => {
        const response = await restApi.put<CityStorage>(remote.path.storage(storage.key), storage)
        return response.data
    }
)

export const insertStorage = createAsyncThunk(
    'storage/insertStorage',
    async (storage: CityStorage) => {
        const response = await restApi.post<CityStorage>(remote.path.storages, storage)
        return response.data
    }
)
export const deleteStorage = createAsyncThunk(
    'storage/deleteStorage',
    async (storage: CityStorage) => {
        const response = await restApi.delete<CityStorage>(remote.path.storage(storage.key))
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
        builder.addCase(insertStorage.fulfilled, (state, action) => {
            state.storages = insert(state.storages, action.payload)
        })
        builder.addCase(updateStorage.fulfilled, (state, action) => {
            state.storages = update(state.storages, action.payload)
        })
        builder.addCase(deleteStorage.fulfilled, (state, action) => {
            state.storages = remove(state.storages, action.payload.key)
        })
    }
    }
)

// Other code such as selectors can use the imported `RootState` type
export const selectStorage = (state: RootState) => state.storageState

export default storageSlice.reducer