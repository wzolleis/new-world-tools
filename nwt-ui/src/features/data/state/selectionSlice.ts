import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppSelection} from "common/types/commonTypes";
import {RootState} from "app/state/store";

const restApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
});

interface SelectionState {
    selection: AppSelection
}

interface FetchSelectionResponse {
    selection: AppSelection
}

// First, create the thunk
export const loadSelection = createAsyncThunk(
    'loadSelection',
    async (_, thunkAPI) => {
        const response = await restApi.get<FetchSelectionResponse>('/selection')
        const {selection}: FetchSelectionResponse = response.data
        return {
            selection: {
                user: selection.user,
                player: selection.player
            }
        }
    }
)

const initialState: SelectionState = {
    selection: {
        user: '',
        player: ''
    }
}


// Then, handle actions in your reducers:
const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loadSelection.fulfilled, (state, action) => {
            // Add user to the state array
            state.selection = action.payload.selection
        })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.dataState

export const {} = selectionSlice.actions

export default selectionSlice.reducer