import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CityStorage} from "common/types/commonTypes";
import remote, {restApi} from "common/api/restApi";
import {insert, remove} from "utils/arrayUtils";

interface StorageState {
    storages: CityStorage[]
}

const initialState: StorageState = {
    storages: []
}

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
        builder.addCase(insertStorage.fulfilled, (state, action) => {
            state.storages = insert(state.storages, action.payload)
        })
        builder.addCase(deleteStorage.fulfilled, (state, action) => {
            state.storages = remove(state.storages, action.payload.key)
        })
    }
    }
)
