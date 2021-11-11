import {randomArray, randomEnum} from "./randomValues";
import {CityName, ItemCategory} from "../app/types/constants";

describe('generate random enums', () => {
    it('should select random enum value', () => {
        const enumType = randomArray([CityName, ItemCategory])
        const result = randomEnum(enumType).toString()
        expect(result).toBeDefined()
        expect(result).toBeOneOf(Object.keys(enumType))
    })
})