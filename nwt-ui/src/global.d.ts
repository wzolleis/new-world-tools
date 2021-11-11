import 'little-state-machine';
import {Game} from "./app/types/appTypes";
import 'jest-extended';

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
        games: Game[]
    }
}