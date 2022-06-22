import {configureStore} from '@reduxjs/toolkit'
import userReducer from 'features/user/state/userSlice'
import playerReducer from 'features/player/state/playerSlice'
import {nwtApi} from "common/api/queryApi";

const store = configureStore({
    reducer: {
        playerState: playerReducer,
        userState: userReducer,
        [nwtApi.reducerPath]: nwtApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nwtApi.middleware)
})


// Infer the `AppState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayerState, selection: SelectionState, fetching: FetchingState}
export type AppDispatch = typeof store.dispatch

export default store