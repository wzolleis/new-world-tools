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

export const findByKey = <T extends WithKey>(values: T[], key: ObjectKey): (T | undefined) => {
    return values.find(value => value.key === key)
}