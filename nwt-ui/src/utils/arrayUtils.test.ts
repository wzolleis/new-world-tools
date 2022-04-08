import {pickRandom, remove, update} from "utils/arrayUtils";
import R from "ramda";

const randomStrings = ['kdjfkdsl', 'dklfsölie', 'ködjsfkas']

describe('array utils', () => {

    describe('array manipulation', () => {
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

    describe('filter array with dynamic property', () => {
        const array = [
            {
                id: 0,
                position: {
                    id: 1,
                    name: "foo"
                },
            },
            {
                id: 2,
                position: {
                    id: 2,
                    name: "bar",
                },
            }]
        const item = array[0]

        describe('filter array with dynamic property and ramda', () => {
            const viewPropertyOf = (item: unknown, property: string): unknown | undefined => {
                const lense = R.lensPath<unknown>(property.split("."))
                return R.view(lense, item)
            }

            const filterArrayWithProperty = (items: unknown[], property: string, expectedValue: unknown): (unknown | undefined)[] => {
                return items.filter(value => viewPropertyOf(value, property) === expectedValue)
            }

            it('should find nested path', () => {
                expect(viewPropertyOf(array[0], 'position.id')).toBe(1)
            })

            it('should find simple path', () => {
                expect(viewPropertyOf(item, 'id')).toBe(0)
            })

            it('should return undefined for unknown path', () => {
                expect(viewPropertyOf(item, 'position.evil')).toBeUndefined()
            })

            it('should find item in array with property', () => {
                const result = filterArrayWithProperty(array, 'position.id', 2)
                expect(result).toHaveLength(1)
                expect(result).toContainEqual(array[1])
            })

            it('should return emtpy array with unknown property', () => {
                const result = filterArrayWithProperty(array, 'position.evil', 2)
                expect(result).toBeDefined()
                expect(result).toBeEmpty()
            })

        })

        describe('filter array with dynamic property and reduce', () => {
            it('should work with reduce', () => {

                const viewPropertyOfWithReduce = (item: unknown, property: string): unknown | undefined => {
                    const parts = property.split(".")
                    return parts.reduce((acc: unknown, current: string) => {
                        // @ts-ignore
                        return (acc === undefined) ? undefined : acc[current]
                    }, item)
                }

                const filterArrayWithReduce = (items: unknown[], property: string, expectedValue: unknown): (unknown | undefined)[] => {
                    return items.filter(value => viewPropertyOfWithReduce(value, property) === expectedValue)
                }

                const myItem = {
                    id: 0,
                    position: {
                        id: 1,
                        name: "foo"
                    },
                }

                expect(viewPropertyOfWithReduce(myItem, 'position.id')).toBe(1)
                expect(viewPropertyOfWithReduce(myItem, 'id')).toBe(0)
                expect(viewPropertyOfWithReduce(myItem, 'position.name')).toBe('foo')
                expect(viewPropertyOfWithReduce(myItem, 'position.evil')).toBeUndefined()

                const result = filterArrayWithReduce(array, 'position.id', 1)
                expect(result).toHaveLength(1)
                expect(result).toContainEqual(item)

                expect(filterArrayWithReduce(array, 'position.evil', 1)).toBeEmpty()

            })
        })
    })
})