import 'little-state-machine';
import {World} from "./app/types/appTypes";

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
        worlds: World[]
    }
}