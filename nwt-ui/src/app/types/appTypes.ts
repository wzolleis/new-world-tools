export type ObjectKey = string

export interface WithKey {
    key: ObjectKey
}

export interface Lager extends WithKey {
    content: string
}

export interface City extends WithKey {
    name: string
    lager: Lager
}

export interface World extends WithKey{
    cities: City[]
}

export interface Player extends WithKey {
    name: string,
    worlds: World[]
}