import {WithKey} from "../app/types/appTypes";

export const remove = <T extends WithKey>(values: T[], toRemove: T): T[] => {
    return values.filter((value) => value.key !== toRemove.key)
}

export const replace = <T extends WithKey>(values: T[], toAppend: T): T[] => {
    return [
        ...remove(values, toAppend),
        toAppend
    ]
}
