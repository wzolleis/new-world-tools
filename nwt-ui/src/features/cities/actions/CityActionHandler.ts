import {City} from "common/types/commonTypes";
import {v4 as uuidv4} from "uuid";

export const createNewCity = (cityKey: string = uuidv4()): City => {
    return {
        key: cityKey,
        details: '',
        name: '',
        player: '',
        storage: {
            key: uuidv4(),
            city: cityKey,
            items: []
        }
    }
}