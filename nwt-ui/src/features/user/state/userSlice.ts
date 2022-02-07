import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {dataStates, User} from "common/types/commonTypes";
import {RootState} from "app/state/store";
import remote, {restApi} from "common/api/restApi";

interface UserState {
    users: User[]
    user: User | undefined
}

const initialState: UserState = {
    users: [],
    user: undefined,
}

// First, create the thunk
export const listUser = createAsyncThunk(
    'user/listUser',
    async (_, thunkApi) => {
        const response = await restApi.get<User[]>(remote.path.users)
        return response.data
    }
)

export const userSlice = createSlice({
        name: 'users',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(listUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.users = action.payload
                state.user = action.payload.find(user => user.state === dataStates.active)
            })
        },
    }
)

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userState

export default userSlice.reducer