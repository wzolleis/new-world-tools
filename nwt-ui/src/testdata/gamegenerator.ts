import {v4 as uuidv4} from 'uuid';
import {City, Item, Lager} from "common/types/commonTypes";
import RandomValues from "testdata/randomValues";

interface GeneratorOptions {
    cities: number,
    items: number
}

export const defaultOptions: GeneratorOptions = {
    cities: 1,
    items: 1
}

const generateCity = (options: GeneratorOptions = defaultOptions): City[] => {
    const result: City[] = []
    for (let i = 0; i < options.cities; i++) {
        result.push({
            key: uuidv4(),
            name: RandomValues.cityName(),
            details: RandomValues.randomCityDetails(),
            lager: generateLager({...defaultOptions})[0]
        })
    }
    return result
}

const generateLager = (options: GeneratorOptions = defaultOptions): Lager[] => {
    const result: Lager[] = []
    result.push({key: uuidv4(), content: generateItem(options)})
    return result
}

const generateItem = (options: GeneratorOptions = defaultOptions): Item[] => {
    const result: Item[] = []
    for (let i = 0; i < options.items; i++) {
        result.push({
            key: uuidv4(),
            name: RandomValues.name(),
            quantity: RandomValues.randomNumber(),
            category: RandomValues.itemType()
        })
    }
    return result
}

