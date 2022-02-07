// Then, handle actions in your reducers:
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {City, Undefined} from "common/types/commonTypes";
import {update} from "utils/arrayUtils";
import axios from "axios";
import {RootState} from "app/state/store";
import remote from "common/api/restApi";

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


export const listCity = createAsyncThunk(
    'city/listCity',
    async () => {
        const response = await restApi.get<City[]>(remote.path.cities)
        return response.data
    }
)

export const updateCity = createAsyncThunk(
    'city/updateCity',
    async (city: City) => {
        const response = await restApi.put<City>(remote.path.city(city.key), city)
        return response.data
    }
)

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        updateCity: (state: CitiesState, action: PayloadAction<CityActionPayload>) => {
            state.cities = update(state.cities, action.payload.city)
        }
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(listCity.fulfilled, (state, action) => {
            state.cities = action.payload
        })
    },
})

export const selectCity = (state: RootState) => state.cityState


export default citySlice.reducer