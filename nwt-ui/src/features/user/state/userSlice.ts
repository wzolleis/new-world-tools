import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "common/types/commonTypes";
import {RootState} from "app/state/store";

interface UserState {
    users: User[]
    user: User | undefined
}

const initialState: UserState = {
    users: [],
    user: undefined,
}

export const userSlice = createSlice({
        name: 'login',
        initialState,
        reducers: {
            listUser: (state: UserState, action: PayloadAction<User[]>) => {
                state.users = action.payload
            }
        },
    }
)

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userState

export const {listUser} = userSlice.actions

export default userSlice.reducer