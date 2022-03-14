// Then, handle actions in your reducers:
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {City, Undefined} from "common/types/commonTypes";
import {insert, update} from "utils/arrayUtils";
import {RootState} from "app/state/store";
import remote, {restApi} from "common/api/restApi";

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

export const insertCity = createAsyncThunk(
    'city/insertCity',
    async (city: City) => {
        const response = await restApi.post<City>(remote.path.cities, city)
        return response.data
    }
)

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        updateCity: (state: CitiesState, action: PayloadAction<CityActionPayload>) => {
            state.cities = update(state.cities, action.payload.city)
        },
        insertCity: (state: CitiesState, action: PayloadAction<CityActionPayload>) => {
            state.cities = insert(state.cities, action.payload.city)
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