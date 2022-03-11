import {Item} from "common/types/commonTypes";
import {v4 as uuidv4} from 'uuid';
import {EditorType} from "common/types/editorType";

export interface ItemActionParameter {
    onClose: () => void
    onInsert: (item: Item) => void
    onUpdate: (item: Item) => void
    onDelete: (item: Item) => void
    onCancel: () => void
    onOpen: (editorType: EditorType, item: Item) => void
}

const NOP = () => {
}
const NOP_ITEM = (_: Item) => {
}

export class ItemActionHandler {
    onClose: () => void
    onInsert: (item: Item) => void
    onUpdate: (item: Item) => void
    onDelete: (item: Item) => void
    onCancel: () => void
    onOpen: (editorType: EditorType, item: Item) => void

    constructor({onClose, onInsert, onUpdate, onDelete, onCancel, onOpen}: ItemActionParameter) {
        this.onClose = onClose
        this.onUpdate = onUpdate
        this.onInsert = onInsert
        this.onDelete = onDelete
        this.onCancel = onCancel
        this.onOpen = onOpen
    }

    static createNewItem(): Item {
        return {
            key: uuidv4(),
            quantity: 0,
            name: '',
            attributes: {},
            category: 'resource'
        }
    }


    static createInstance(): ItemActionHandler {
        return new ItemActionHandler({
            onCancel: NOP,
            onDelete: NOP_ITEM,
            onUpdate: NOP_ITEM,
            onInsert: NOP_ITEM,
            onClose: NOP,
            onOpen: (_: EditorType, __: Item) => {
            }
        })
    }
}

