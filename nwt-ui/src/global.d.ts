import 'little-state-machine';
import {Game, ObjectKey} from "app/types/appTypes";
import 'jest-extended';

declare module 'little-state-machine' {
    // noinspection JSUnusedGlobalSymbols
    interface GlobalState {
        games: Game[],
        selection: {
            game: ObjectKey,
            player: ObjectKey,
            world: ObjectKey,
        }
    }
}