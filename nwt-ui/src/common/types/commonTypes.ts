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