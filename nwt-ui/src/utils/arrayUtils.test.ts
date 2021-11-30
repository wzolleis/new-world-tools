import {remove, update} from "utils/arrayUtils";
import faker from "faker";

describe('array utils', () => {
    const values = [{key: "1", value: "a"}, {key: "3", value: "c"}, {key: "2", value: "b"}]

    it('should replace value', () => {
        const toReplace = faker.random.arrayElement(values)
        const replaceWith = {
            ...toReplace,
            value: faker.name.firstName()
        }
        const updated = update(values, replaceWith)
        expect(updated.find(v => v.key === replaceWith.key)).toBe(replaceWith)
    })

    it('should remove value', () => {
        const toRemove = faker.random.arrayElement(values)
        const updated = remove(values, toRemove.key)
        expect(updated.find(v => v.key === toRemove.key)).toBeUndefined()
    })
})