import React from "react";
import {useStateMachine} from "little-state-machine";
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';


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

    return (
        <BootstrapTable bootstrap4={true} keyField='key' data={ games } columns={ columns() } />
    )
}