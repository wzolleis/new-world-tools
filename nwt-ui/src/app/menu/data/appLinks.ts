import {City, MarketPlaceItem} from "common/types/commonTypes";

export const AppLinks = {
    root: '/',
    cities: 'cities',
    users: 'users',
    marketplace: "economy",
    favorites: 'favorites'
}


export const AppLinksCreator = {
    createCityDetailsLink: (city: City) => `/${AppLinks.cities}/${city.key}`,
    createMarketPlaceItemDetailsLink: (item: MarketPlaceItem) => `/${AppLinks.marketplace}/${item.key}`,
    createStorageLink: (city: City) => `/${AppLinks.cities}/${city.key}/storage/${city.storage.key}`
}