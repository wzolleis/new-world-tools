import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {listUser, userSlice} from "features/user/state/userSlice";
import {User} from "common/types/commonTypes";
import {RootState} from "app/state/store";

const restApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
});

interface DataState {
    user: User[]
}

interface FetchDataResponse {
    user: User[]
}

// First, create the thunk
export const loadData = createAsyncThunk(
    'loadData',
    async (_, thunkAPI) => {
        console.log("load data in thunk: ")
        const response = await restApi.get<FetchDataResponse>('/data')
        const data = response.data
        const {user} = data
        // thunkAPI.dispatch(listUser(user))
        return {user}
    }
)

const initialState: DataState = {
    user: []
}


// Then, handle actions in your reducers:
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loadData.fulfilled, (state, action) => {
            // Add user to the state array
            state.user = action.payload.user
        })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.dataState

export const {} = dataSlice.actions

export default dataSlice.reducer