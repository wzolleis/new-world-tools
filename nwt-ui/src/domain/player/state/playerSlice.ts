import {Player} from "common/types/commonTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "app/state/store";
import {remove, update} from "utils/arrayUtils";
import objectKeys from "app/state/objectKeys";

interface PlayerState {
    players: Player[]
}

const dschaeck: Player = {
    key: objectKeys.players.dschaeck,
    name: 'Dschaeck',
}

const initialState: PlayerState = {
    players: [dschaeck]
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        createPlayerAction: (state: PlayerState, action: PayloadAction<Player>) => {
            state.players.push(action.payload)
        },
        updatePlayerAction: (state: PlayerState, action: PayloadAction<Player>) => {
            state.players = update(state.players, action.payload)
        },
        removePlayerAction: (state: PlayerState, action: PayloadAction<Player>) => {
            state.players = remove(state.players, action.payload.key)
        },
        listPlayerAction: (state: PlayerState, action: PayloadAction<Array<Player>>) => {
            state.players = action.payload
        }
    }
})

export const {createPlayerAction, updatePlayerAction, listPlayerAction, removePlayerAction} = playerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPlayerState = (state: AppState) => state.playerState

export default playerSlice.reducer