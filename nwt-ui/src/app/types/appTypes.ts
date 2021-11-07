export type ObjectKey = string

export interface WithKey {
    key: ObjectKey
}

export interface World extends WithKey{
    lager: Lager[]
}

export interface Lager extends WithKey {
    city: string
}