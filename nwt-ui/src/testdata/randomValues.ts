

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
    return randomArray(Object.values(anEnum))
}

export const randomArray = <T>(anArray: T[]): T => {
    const randomIndex = Math.floor(Math.random() * anArray.length)
    return anArray[randomIndex]
}