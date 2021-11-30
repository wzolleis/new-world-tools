import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "app/state/store";

interface FetchingData {
    active: boolean
    action?: string
    code?: number
    reason?: string
}

interface FetchingState {
    fetching: FetchingData
}

const initialState: FetchingState = {
    fetching: {
        active: false
    }
}

export const fetchingSlice = createSlice({
    name: 'fetching',
    initialState,
    reducers: {
        fetchingStart: (state: FetchingState, action: PayloadAction<FetchingData>) => {
            state.fetching = {
                ...action.payload,
                active: true
            }
        },
        fetchingDone: (state: FetchingState, action: PayloadAction<FetchingData>) => {
            state.fetching = {
                ...action.payload,
                active: false
            }
        },
        fetchingError: (state: FetchingState, action: PayloadAction<FetchingData>) => {
            state.fetching = {
                ...action.payload,
                active: false
            }
        },
        clearFetching: (state: FetchingState) => {
            state.fetching = initialState.fetching
        }
    }
})

export const { fetchingStart, fetchingDone, fetchingError } = fetchingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFetching = (state: AppState) => state.fetchingState

export default fetchingSlice.reducer
