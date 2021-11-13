// noinspection DuplicatedCode

import React from "react";
import {screen, render} from "@testing-library/react";
import {StateMachineProvider} from "little-state-machine";
import {generateGame} from "testdata/gamegenerator";
import {Game} from "app/types/appTypes";
import {Column} from "react-table";
import {GamesView} from "domain/game/components/GamesView";

describe('games table', () => {
    const setup = (data: Game[]) => {
        render(
            <StateMachineProvider>
                <GamesView/>
            </StateMachineProvider>
        )
    }

    it('should render without crash', () => {
        const tableData = [generateGame()]
        setup(tableData)
        const name = tableData[0].name
        // expect(screen.getByText(name)).toBeVisible()

    })
});