import 'little-state-machine';
import {Player, World} from "./app/types/appTypes";

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
       players: Player[]
    }
}