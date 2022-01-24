import {configureStore} from '@reduxjs/toolkit'
import playerReducer from 'features/player/state/playerSlice'
import dataReducer from 'features/data/state/dataSlice'
import selectionReducer from 'features/data/state/selectionSlice'

const store = configureStore({
    reducer: {
        playerState: playerReducer,
        dataState: dataReducer,
        selectionState: selectionReducer
    },
})


// Infer the `AppState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayerState, selection: SelectionState, fetching: FetchingState}
export type AppDispatch = typeof store.dispatch

export default store