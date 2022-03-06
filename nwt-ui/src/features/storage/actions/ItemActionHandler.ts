import {City, CityStorage, Item, Undefined} from "common/types/commonTypes";
import {v4 as uuidv4} from 'uuid';
import {ItemFormData} from "features/storage/components/ItemEditor";

export interface ItemActionParameter {
    storages: CityStorage[]
    city: Undefined<City>,
    item: Item
    setEditorVisible: (visible: boolean) => void
}

export class ItemActionHandler {
    storages: CityStorage[]
    item: Item
    setEditorVisible: (visible: boolean) => void
    city: Undefined<City>

    constructor({storages, city, item, setEditorVisible}: ItemActionParameter) {
        this.storages = storages
        this.item = item
        this.city = city
        this.setEditorVisible = setEditorVisible
    }

    onInsert = () => {
        console.log(">>> insert item: ")
        console.log(">>>>>> item: ", this.item)
        console.log(">>>>>> city: ", this.city)
        this.setEditorVisible(true)
    }

    onUpdate = () => {
        console.log("update item: ", this.item)
    }

    onDelete = () => {
        console.log("delete item: ", this.item)
        this.setEditorVisible(true)
    }

    onCancel = () => {
        console.log("cancel: ", this.item)
        this.setEditorVisible(false)
    }

    onSubmit = (formValues: ItemFormData) => {
        console.log("submit: ", this.item)
        this.setEditorVisible(false)
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
            storages: [],
            item: ItemActionHandler.createNewItem(),
            setEditorVisible: () => {
            },
            city: undefined
        })
    }
}

