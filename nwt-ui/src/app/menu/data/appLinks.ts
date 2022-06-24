import {City} from "common/types/commonTypes";

export const AppLinks = {
    root: '/',
    cities: 'cities',
    users: 'users',
    players: 'players',
    favorites: 'favorites'
}


export const AppLinksCreator = {
    createCityDetailsLink: (city: City) => `/${AppLinks.cities}/${city.key}`
}