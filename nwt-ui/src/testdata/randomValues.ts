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
        return this.arrayElement(Object.values(CityNames))
    }

    itemType(): ItemType {
        return this.arrayElement(Object.values(ItemTypes))
    }

    randomNumber(): number {
        return Math.floor(Math.random() * 100)
    }

    randomCityDetails(): string {
        return faker.lorem.lines(3)
    }

}

export default new RandomValues()