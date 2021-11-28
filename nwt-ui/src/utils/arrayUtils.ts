import {WithKey} from "common/types/commonTypes";

export const remove = <T extends WithKey>(values: T[], toRemove: T): T[] => {
    return values.filter((value) => value.key !== toRemove.key)
}

export const replace = <T extends WithKey>(values: T[], toReplace: T,replaceWith: T ): T[] => {
    return [
        ...remove(values, toReplace),
        replaceWith
    ]
}
