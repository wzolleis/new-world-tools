export type ObjectKey = string


export interface WithKey {
    key: ObjectKey
}

export interface Item extends WithKey {
    name: string
    quantity: number
    category: string
}

export interface Lager extends WithKey {
    content: Item[]
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

export interface Game extends WithKey {
    name: string
    players: Player[]
}
