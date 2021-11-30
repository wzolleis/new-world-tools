import {configureStore} from '@reduxjs/toolkit'
import playerReducer from 'domain/player/state/playerSlice'
import fetchingReducer from 'app/state/fetchingSlice'
import citiesReducer from 'domain/cities/state/citiesSlice'
import selectionReducer from 'app/state/selectionSlice'

const store = configureStore({
    reducer: {
        fetchingState: fetchingReducer,
        selectionState: selectionReducer,
        playerState: playerReducer,
        cityState: citiesReducer
    },
})


// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayerState, selection: SelectionState, fetching: FetchingState}
export type AppDispatch = typeof store.dispatch

export default store