// noinspection DuplicatedCode

import React from "react";
import {screen, render} from "@testing-library/react";
import {GlobalState, StateMachineProvider} from "little-state-machine";
import {generateGame} from "testdata/gamegenerator";
import {Game} from "app/types/appTypes";
import {GamesView} from "domain/game/components/GamesView";
import {initStore} from "app/state/store";

describe('games table', () => {
    const setup = (data: Game[]) => {
        const state: GlobalState = {
            games: [...data]
        }
        initStore(state)
        render(
            <StateMachineProvider>
                <GamesView/>
            </StateMachineProvider>
        )
    }

    it('should render without crash', () => {
        const data = [generateGame()]
        setup(data)
        const name = data[0].name
        const row = screen.getByText(name)
        expect(row).not.toBeNull()
    })
});