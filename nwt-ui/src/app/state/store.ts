import {configureStore} from '@reduxjs/toolkit'
import playerReducer from 'features/player/state/playerSlice'
import citiesReducer from 'features/cities/state/citiesSlice'
import userReducer from 'features/user/state/userSlice'

const store = configureStore({
    reducer: {
        playerState: playerReducer,
        cityState: citiesReducer,
        userState: userReducer
    },
})


// Infer the `AppState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayerState, selection: SelectionState, fetching: FetchingState}
export type AppDispatch = typeof store.dispatch

export default store