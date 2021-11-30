import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "app/state/store";
import {City} from "common/types/commonTypes";
import {remove, update} from "utils/arrayUtils";
import objectKeys from "app/state/objectKeys";


interface CityState {
    cities: City[]
}

const cities: City[] = [
    {
        key: objectKeys.cities.everfall,
        name: "everfall",
        details: "Metall, Stein, Leder, Schmelzen, Schmiede Lvl 5",
        player: objectKeys.players.dschaeck,
        lager: {
            key: 'everfall_lager',
            content: []
        }
    },
    {
        key: objectKeys.cities.windward,
        player: objectKeys.players.dschaeck,
        name: "windward",
        details: "das meiste Lvl3-4, Arcane Lvl 5, Workshop Lvl5",
        lager: {
            key: 'windsward_lager',
            content: []
        }
    }
]

const initialState: CityState = {
    cities
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

export const { createCityAction, removeCityAction, updateCityAction, listCitiesAction } = citiesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCities = (state: AppState) => state.cityState

export default citiesSlice.reducer
