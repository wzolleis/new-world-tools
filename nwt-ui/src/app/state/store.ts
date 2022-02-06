import {configureStore} from '@reduxjs/toolkit'
import cityReducer from 'features/cities/state/citiesSlice'
import userReducer from 'features/user/state/userSlice'
import playerReducer from 'features/player/state/playerSlice'
import storageReducer from 'features/storage/state/storageSlice'

const store = configureStore({
    reducer: {
        playerState: playerReducer,
        userState: userReducer,
        cityState: cityReducer,
        storageState: storageReducer,
    },
})


// Infer the `AppState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayerState, selection: SelectionState, fetching: FetchingState}
export type AppDispatch = typeof store.dispatch

export default store