// Then, handle actions in your reducers:
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {City, Undefined} from "common/types/commonTypes";
import {update} from "utils/arrayUtils";
import axios from "axios";
import {RootState} from "app/state/store";

interface CitiesState {
    cities: City[]
    city: Undefined<City>
}

const initialState: CitiesState = {
    cities: [],
    city: undefined
}

interface CityActionPayload {
    city: City
}

const restApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000
});


// First, create the thunk
export const saveCity = createAsyncThunk(
    'cities/saveCity',
    async (city: City, thunkAPI) => {
        const response = await restApi.post(`/cities/${city.key}`, {
            city
        })
        return {
            city: response.data
        }
    }
)

const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        updateCity: (state: CitiesState, action: PayloadAction<CityActionPayload>) => {
            state.cities = update(state.cities, action.payload.city)
        }
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(saveCity.fulfilled, (state, action) => {
            state.cities = update(state.cities, action.payload.city)
        })
    },
})

export const selectCity = (state: RootState) => state.cityState


export default citySlice.reducer