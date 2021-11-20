import {v4 as uuidv4} from 'uuid';
import {City, Game, Item, Lager, Player, World} from "app/types/appTypes";
import RandomValues from "testdata/randomValues";

interface GeneratorOptions {
    worlds: number,
    players: number,
    cities: number,
    lager: number,
    items: number
}

export const defaultOptions: GeneratorOptions = {
    worlds: 1,
    players: 1,
    cities: 1,
    lager: 1,
    items: 1
}

export const generateGame = (options: GeneratorOptions = defaultOptions): Game => {
    return {
        key: uuidv4(),
        name: 'New World',
        players: generatePlayer(options)
    }
}


const generatePlayer = (options: GeneratorOptions = defaultOptions): Player[] => {
    const result: Player[] = []
    for (let i = 0; i < options.players; i++) {
        result.push({
            key: uuidv4(),
            worlds: generateWorld(options),
            name: RandomValues.name()
        })
    }
    return result

}

const generateWorld = (options: GeneratorOptions = defaultOptions): World[] => {
    const result: World[] = []
    for (let i = 0; i < options.worlds; i++) {
        result.push({
            name: RandomValues.name(),
            key: uuidv4(),
            cities: generateCity(options)
        })
    }
    return result
}

const generateCity = (options: GeneratorOptions = defaultOptions): City[] => {
    const result: City[] = []
    for (let i = 0; i < options.cities; i++) {
        result.push({
            key: uuidv4(),
            name: RandomValues.cityName(),
            details: RandomValues.randomCityDetails(),
            lager: generateLager({...defaultOptions, lager: 1})[0]
        })
    }
    return result
}

const generateLager = (options: GeneratorOptions = defaultOptions): Lager[] => {
    const result: Lager[] = []
    for (let i = 0; i < options.lager; i++) {
        result.push(
            {
                key: uuidv4(),
                content: generateItem(options)
            }
        )
    }
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

