import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "common/types/commonTypes";
import {RootState} from "app/state/store";
import authenticationService from "features/user/service/authenticationService";

interface AuthenticationState {
    user: User | undefined,
    loading: string | undefined
}

const initialState: AuthenticationState = {
    user: undefined,
    loading: undefined
}

// First, create the thunk
export const loginUser = createAsyncThunk(
    'login',
    async (params: { email: string, password: string }, thunkAPI) => {
        return await authenticationService.authenticate(params)
    }
)

export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state: AuthenticationState, action: PayloadAction<User>) => {
            state.user = undefined
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginUser.rejected, (state, action) => {
            // Add user to the state array
            state.user = undefined
            state.loading = action.meta.requestStatus
        })
        builder.addCase(loginUser.pending, (state, action) => {
            // Add user to the state array
            state.user = undefined
            state.loading = action.meta.requestStatus
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // Add user to the state array
            state.user = action.payload
            state.loading = action.meta.requestStatus
        })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userState

export const {logout} = userSlice.actions

export default userSlice.reducer