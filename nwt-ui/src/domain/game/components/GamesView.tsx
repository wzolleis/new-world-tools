import React, {useMemo} from "react";
import {useStateMachine} from "little-state-machine";
import {Game} from "app/types/appTypes";
import {Column} from "react-table";
import {BootstrapTable} from "common/components/BootstrapTable";

export const GamesView = () => {
    const {state: {games}} = useStateMachine();
    const columns: Array<Column<Game>> = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name'
        }
    ], [])

    return (
        <BootstrapTable columns={columns} data={games}/>
    )


}