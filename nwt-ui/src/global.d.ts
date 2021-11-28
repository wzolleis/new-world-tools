import 'little-state-machine';
import {City, Nullable, ObjectKey} from "common/types/commonTypes";
import 'jest-extended';

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
        cities: City[],
        player: Player,
        selection: {
            city: Nullable<ObjectKey>
        }
    }
}