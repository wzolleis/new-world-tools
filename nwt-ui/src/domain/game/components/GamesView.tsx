import React, {useMemo} from "react";
import {useStateMachine} from "little-state-machine";
import {Game} from "app/types/appTypes";
import {Column, useTable} from "react-table";

export const GamesView = () => {
    const {state: {games}} = useStateMachine();
    const columns: Array<Column<Game>> = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name'
        }
    ], [])

    const {getTableProps, rows, headerGroups, getTableBodyProps, prepareRow} = useTable({
        columns, data: games
    })

    return (
        <table {...getTableProps()} className='table table-dark table-bordered table-active table-responsive'>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}