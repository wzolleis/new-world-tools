export const CityNames = {
    "windward": "windward",
    "everfall": "everfall"
}

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
export type CityName = keyof typeof CityNames // e.g. "windward | "everfall"
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
    player: Player[]
}

export interface World extends WithKey {
    name: string
    cities: City[]
}

export interface Player extends WithKey {
    name: string,
    worlds: World[]
}

export interface City extends WithKey {
    name: CityName
    details: string
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

export type Nullable<T> = T | null
export type Undefined<T> = T | undefined

export interface AppError {
    reason: string
    code: number
}