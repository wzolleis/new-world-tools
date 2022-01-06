import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/state/store";
import {City} from "common/types/commonTypes";
import {remove, update} from "utils/arrayUtils";

interface CityState {
    cities: City[]
}

const initialState: CityState = {
    cities: []
}

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        createCityAction: (state: CityState, action: PayloadAction<City>) => {
            state.cities.push(action.payload)
        },
        removeCityAction: (state: CityState, action: PayloadAction<City>) => {
            state.cities = remove(state.cities, action.payload.key)
        },
        updateCityAction: (state: CityState, action: PayloadAction<City>) => {
            state.cities = update(state.cities, action.payload)
        },
        listCitiesAction: (state: CityState, action: PayloadAction<City[]>) => {
            state.cities = action.payload
        }
    }
})

export const {createCityAction, removeCityAction, updateCityAction, listCitiesAction} = citiesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCities = (state: RootState) => state.cityState

export default citiesSlice.reducer
