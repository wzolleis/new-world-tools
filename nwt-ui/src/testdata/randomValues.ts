import faker from 'faker'
import {CityName, CityNames, ItemType, ItemTypes} from "common/types/commonTypes";


class RandomValues {
    arrayElement<T>(anArray: T[]): T {
        return faker.random.arrayElement(anArray)
    }

    name(): string {
        return faker.name.findName()
    }

    cityName(): CityName {
        const values: CityName[] = Object.keys(CityNames) as CityName[]
        return this.arrayElement(values)
    }

    itemType(): ItemType {
        const values: ItemType[] = Object.keys(ItemTypes) as ItemType[]
        return this.arrayElement(values)
    }

    randomNumber(): number {
        return Math.floor(Math.random() * 100)
    }

    randomCityDetails(): string {
        return faker.lorem.lines(3)
    }

}

export default new RandomValues()