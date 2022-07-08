import {City} from "common/types/commonTypes";

export const AppLinks = {
    root: '/',
    cities: 'cities',
    users: 'users',
    marketplace: "economy",
    favorites: 'favorites'
}


export const AppLinksCreator = {
    createCityDetailsLink: (city: City) => `/${AppLinks.cities}/${city.key}`,
    createStorageLink: (city: City) => `/${AppLinks.cities}/${city.key}/storage/${city.storage.key}`
}