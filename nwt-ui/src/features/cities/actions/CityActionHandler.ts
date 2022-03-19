import {City, Undefined} from "common/types/commonTypes";
import {EditorType} from "common/types/editorType";
import {v4 as uuidv4} from "uuid";

const NOP = () => {
}
const NOP_CITY = (_: City) => {
}

const NOP_EDIT = (_: EditorType, __: City) => {
}

const NOP_SELECT = (_: Undefined<City>) => {
}

export interface CityActionParameter {
    onClose: () => void
    onInsert: (city: City) => void
    onUpdate: (city: City) => void
    onDelete: (city: City) => void
    onCancel: () => void
    onOpen: (editorType: EditorType, city: City) => void
    onSelect: (city: Undefined<City>) => void
}


export class CityActionHandler {
    onClose: () => void
    onInsert: (city: City) => void
    onUpdate: (city: City) => void
    onDelete: (city: City) => void
    onCancel: () => void
    onOpen: (editorType: EditorType, city: City) => void
    onSelect: (city: Undefined<City>) => void

    constructor({onClose, onInsert, onUpdate, onDelete, onCancel, onOpen, onSelect}: CityActionParameter) {
        this.onClose = onClose
        this.onUpdate = onUpdate
        this.onInsert = onInsert
        this.onDelete = onDelete
        this.onCancel = onCancel
        this.onOpen = onOpen
        this.onSelect = onSelect
    }

    static createNewCity(): City {
        return {
            key: uuidv4(),
            details: '',
            name: '',
            player: '',
            world: ''
        }
    }

    static createInstance(): CityActionHandler {
        return new CityActionHandler({
            onCancel: NOP,
            onDelete: NOP_CITY,
            onUpdate: NOP_CITY,
            onInsert: NOP_CITY,
            onClose: NOP,
            onOpen: NOP_EDIT,
            onSelect: NOP_SELECT
        })
    }
}