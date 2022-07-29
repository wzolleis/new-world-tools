import * as React from "react";

export const ItemTypes = {
    resource: ''
}

export type Email = string
export type Password = string

export type RequestState = 'rejected' | 'fullfilled' | 'pending'

export const ItemCategories = {
    rewards: "",
    refining: "",
    weapons: "",
    apparel: "",
    smelting: "",
    cooking: "",
    leatherworking: "",
    woodworking: "",
    stonecutting: "",
    alchemy: "",
    fishing: "",
    craft_mods: "",
    resources: "",
}

export type ItemType = keyof typeof ItemTypes
export type ItemCategory = keyof typeof ItemCategories

export type ObjectKey = string

export const CommonActions = {
    save: 'save'
}

export type CommonActionType = keyof typeof CommonActions

export interface WithKey {
    key: ObjectKey
}

export interface User extends WithKey {
    name: string,
    password: string,
    state: string,
    players: Player[]
}

export interface Player extends WithKey {
    name: string,
    user: ObjectKey
}

export interface City extends WithKey {
    name: string
    details: string
    player: ObjectKey
    storage: CityStorage
}

export interface CityStorage extends WithKey {
    city: ObjectKey
    items: Item[]
}

export interface Item extends WithKey {
    name: string
    quantity: number
    category: ItemType
    attributes: {
        [attr: string]: string
    }
}

export interface Price {
    amount: number
    date: string
}

export interface MarketPlaceItem extends WithKey {
    name: string
    prices: Price[]
}

export interface MarketPlace {
    items: MarketPlaceItem[]
}

export type Nullable<T> = T | null
export type Undefined<T> = T | undefined

export interface AppError {
    reason: string
    code: number
}

export const dataStates = {
    'active': 'active',
}

export type TableActionClickHandler = (event: React.MouseEvent<HTMLButtonElement>, rowId: ObjectKey) => void