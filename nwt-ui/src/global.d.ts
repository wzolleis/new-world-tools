import 'little-state-machine';
import {Player, Selection} from "common/types/commonTypes";
import 'jest-extended';

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
        players: Player[]
        selection: Selection
    }
}