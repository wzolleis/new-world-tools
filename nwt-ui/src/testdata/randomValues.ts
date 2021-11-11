import faker from 'faker'
import {CityName, CityNames, ItemType, ItemTypes} from "../common/commonTypes";

export const RandomValues = {
    arrayElement: <T>(anArray: T[]): T => {
        return faker.random.arrayElement(anArray)
    },
    name: (): string => {
        return faker.name.findName()
    },
    cityName: (): CityName => {
        return RandomValues.arrayElement(Object.values(CityNames))
    },
    itemType: (): ItemType => {
        return RandomValues.arrayElement(Object.values(ItemTypes))
    },
    randomNumber: (): number => {
        return Math.floor(Math.random() * 100)
    }
}