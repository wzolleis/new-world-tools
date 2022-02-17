import {WithKey} from "common/types/commonTypes";
import {IconType} from "common/types/iconType";

export interface AppMenuEntry extends WithKey {
    title: string,
    items?: AppMenuEntry[]
    iconType: IconType,
    path: string
}
