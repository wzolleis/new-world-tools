import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {City, Undefined} from "common/types/commonTypes";
import {remove} from "utils/arrayUtils";
import remote, {restApi} from "common/api/restApi";

interface CitiesState {
    cities: City[]
    city: Undefined<City>
}

const initialState: CitiesState = {
    cities: [],
    city: undefined
}

export const deleteCity = createAsyncThunk(
    'city/deleteCity',
    async (city: City) => {
        await restApi.delete<City>(remote.path.city(city.key))
        return city
    }
)

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(deleteCity.fulfilled, (state, action) => {
            console.log('remove city from state', action.payload)
            state.cities = remove(state.cities, action.payload.key)
        })
    },
})

// export const selectCity = (state: RootState) => state.cityState


export default citySlice.reducer