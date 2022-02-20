import {ObjectKey, WithKey} from "common/types/commonTypes";

export const remove = <T extends WithKey>(values: T[], key: ObjectKey): T[] => {
    return values.filter((value) => value.key !== key)
}

export const update = <T extends WithKey>(values: T[], replaceWith: T): T[] => {
    return [
        ...remove(values, replaceWith.key),
        replaceWith
    ]

}
export const insert = <T extends WithKey>(values: T[], toInsert: T): T[] => {
    return [
        ...values,
        toInsert
    ]
}

export const findByKey = <T extends WithKey>(values: T[], key: ObjectKey): (T | undefined) => {
    return values.find(value => value.key === key)
}

export const pickRandom = <T>(values: T[]): T => {
    let index = Math.floor(Math.random() * values.length)
    if (index < 0) index = 0
    if (index > values.length - 1) index = values.length - 1
    return values[index]
}