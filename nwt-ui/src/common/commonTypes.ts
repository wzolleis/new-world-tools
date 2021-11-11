export const CityNames = {
    everfall: 'Everfall',
    windward: 'Windward'
}

export const ItemTypes = {
    resource: 'Resource'
}

export type CityName = typeof CityNames.windward | typeof CityNames.everfall

export type ItemType = typeof ItemTypes.resource