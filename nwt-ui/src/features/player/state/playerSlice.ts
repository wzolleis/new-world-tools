import {dataStates, Player, Undefined} from "common/types/commonTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/state/store";
import {remove, update} from "utils/arrayUtils";
import remote, {restApi} from "common/api/restApi";

interface PlayerState {
    players: Player[]
    player: Undefined<Player>
}

const initialState: PlayerState = {
    players: [],
    player: undefined
}

// First, create the thunk
export const listPlayer = createAsyncThunk(
    'listPlayer',
    async (_, thunkApi) => {
        const response = await restApi.get<Player[]>(remote.path.players)
        return response.data
    }
)


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
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(listPlayer.fulfilled, (state, action) => {
            state.players = action.payload
            state.player = action.payload.find(player => player.state === dataStates.active)
        })
    },
})

export const {createPlayerAction, updatePlayerAction, removePlayerAction} = playerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPlayer = (state: RootState) => state.playerState

export default playerSlice.reducer