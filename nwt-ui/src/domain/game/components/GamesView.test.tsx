// noinspection DuplicatedCode

import React from "react";
import {screen, render} from "@testing-library/react";
import {StateMachineProvider} from "little-state-machine";
import {BootstrapTable, BootstrapTableProps} from "common/components/BootstrapTable";
import {generateGame} from "testdata/gamegenerator";
import {Game} from "app/types/appTypes";
import {Column} from "react-table";

describe('games table', () => {
    const setup = (): {
        data: Game[],
        columns: Array<Column<Game>>
    } => {
        const tableProps: BootstrapTableProps<Game> = {
            data: [generateGame()],
            columns: [{Header: 'Name', accessor: 'name'}]
        }

        render(
            <StateMachineProvider>
                <BootstrapTable {...tableProps}/>
            </StateMachineProvider>
        )

        return {
            ...tableProps
        }
    }

    it('should render without crash', () => {
        const {data} = setup()
        const playerName = data[0].name
        expect(screen.getByText(playerName)).toBeVisible()

    })
});