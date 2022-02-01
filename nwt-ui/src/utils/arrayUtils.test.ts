import {pickRandom, remove, update} from "utils/arrayUtils";

const randomStrings = ['kdjfkdsl', 'dklfsölie', 'ködjsfkas']

describe('array utils', () => {
    const values = [{key: "1", value: "a"}, {key: "3", value: "c"}, {key: "2", value: "b"}]

    it('should replace value', () => {
        const toReplace = pickRandom(values)
        const replaceWith = {
            ...toReplace,
            value: pickRandom(randomStrings)
        }
        const updated = update(values, replaceWith)
        expect(updated.find(v => v.key === replaceWith.key)).toBe(replaceWith)
    })

    it('should remove value', () => {
        const toRemove = pickRandom(values)
        const updated = remove(values, toRemove.key)
        expect(updated.find(v => v.key === toRemove.key)).toBeUndefined()
    })
})