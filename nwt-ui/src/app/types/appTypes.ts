import {ItemType, CityName} from "common/types/commonTypes";

export type ObjectKey = string


export interface WithKey {
    key: ObjectKey
}

export interface Item extends WithKey {
    name: string
    quantity: number
    category: ItemType
}

export interface Lager extends WithKey {
    content: Item[]
}

export interface City extends WithKey {
    name: CityName
    lager: Lager
}

export interface World extends WithKey{
    name: string,
    cities: City[]
}

export interface Player extends WithKey {
    name: string,
    worlds: World[]
}

export interface Game extends WithKey {
    name: string
    players: Player[]
}

