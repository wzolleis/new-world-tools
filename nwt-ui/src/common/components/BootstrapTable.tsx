import React from 'react';
import {WithKey} from "app/types/appTypes";
import {Column, useTable} from "react-table";

export interface BootstrapTableProps<TableRowType extends WithKey> {
    columns: Array<Column<TableRowType>>
    data: TableRowType[]
}

export const BootstrapTable = <TableRowType extends WithKey, >(props: BootstrapTableProps<TableRowType>) => {
    const {data, columns} = props
    const {getTableProps, rows, headerGroups, getTableBodyProps, prepareRow} = useTable({columns, data})
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
