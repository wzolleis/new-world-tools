export const CityNames = {
    "windward": "windward",
    "everfall": "everfall"
}

export const ItemTypes = {
    resource: ''
}

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
    details: string
}

export interface Player extends WithKey {
    name: string,
    cities: City[]
}

export interface Selection {
    player: Player
    city: City
}

export type Nullable<T> = T | null

export interface AppError {
    reason: string
    code: number
}