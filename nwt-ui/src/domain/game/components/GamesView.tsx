import React from "react";
import {useStateMachine} from "little-state-machine";
import BootstrapTable, {BootstrapTableProps, ColumnDescription} from 'react-bootstrap-table-next';
import {Game} from "app/types/appTypes";


const columns = (): ColumnDescription[] => {
    return [
        {
            text: 'Name',
            dataField: 'name'
        }
    ]
}

export const GamesView = () => {
    const {state: {games}} = useStateMachine();

    const tableProps: BootstrapTableProps<Game> = {
        bootstrap4: true,
        columns: columns(),
        data: games,
        keyField: 'key',
        selectRow: {
            mode: 'radio',
            clickToSelect :true,
            hideSelectColumn: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log('game selected:', row)
            }
        }
    }

    return (
        <BootstrapTable {...tableProps} />
    )
}