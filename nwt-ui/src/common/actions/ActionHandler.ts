import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";
import {CityActionHandler} from "features/cities/actions/CityActionHandler";

interface ActionHandlerContextParams {
    itemActionHandler: ItemActionHandler
    cityActionHandler: CityActionHandler
}

export class ActionHandler {
    itemActionHandler: ItemActionHandler
    cityActionHandler: CityActionHandler

    constructor({
                    itemActionHandler,
                    cityActionHandler,
                }: ActionHandlerContextParams) {
        this.cityActionHandler = cityActionHandler
        this.itemActionHandler = itemActionHandler
    }
}