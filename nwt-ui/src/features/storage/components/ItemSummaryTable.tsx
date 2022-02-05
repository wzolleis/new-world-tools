import {City, Player} from "common/types/commonTypes";
import * as React from "react";
import {DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";
import {groupBy, sum} from "ramda";

export interface ItemSummaryTableProps {
    player: Player | undefined
    onRowSelected: (itemSummary: ItemSummaryTableRow | undefined) => void
}

export interface ItemSummaryTableRow {
    id: string
    name: string
    totalQuantity: number
    cityNames: string
    cities: City[]
}

const columns: GridColDef[] = [
    {
        field: 'name', headerName: messages.citiesItemsTable.name, filterable: true, flex: 1
    },
    {
        field: 'totalQuantity', headerName: messages.citiesItemsTable.quantity, filterable: false
    },
    {
        field: 'cityNames', headerName: messages.citiesItemsTable.city, filterable: false, editable: true, flex: 1
    },
]

interface ItemSummaryData {
    id: string
    name: string
    quantity: number
    city: City
}

const mapToSummaryData = (player: Player): ItemSummaryData[] => {
    return player.worlds.flatMap(world => world.cities)
        .flatMap((city: City) => {
            return {
                items: city.lager.items,
                city
            }
        })
        .flatMap(v => {
            return v.items.flatMap(item => {
                return {
                    id: item.key,
                    name: item.name,
                    quantity: item.quantity,
                    city: v.city
                }
            })
        })
}

const mapToTableRows = (player: Player | undefined): ItemSummaryTableRow[] => {
    if (!player) return []

    const data: ItemSummaryData[] = mapToSummaryData(player)
    const groupedByItemName: Record<string, ItemSummaryData[]> = groupBy((value) => value.name, data)
    const cityNameSingle = (item: ItemSummaryData): string => item.city.name
    const cityNameMulti = (item: ItemSummaryData): string => `${item.city.name}:${item.quantity}`
    return Object.keys(groupedByItemName)
        .map((itemName: string) => {
            const items: ItemSummaryData[] = groupedByItemName[itemName]
            const totalQuantity = sum(items.map(v => v.quantity))
            const cityNameFn = items.length > 1 ? cityNameMulti : cityNameSingle
            const cityNames = items.map(cityNameFn).join()
            return {
                id: itemName,
                name: itemName,
                totalQuantity,
                cityNames,
                cities: items.map(v => v.city)
            }
        })
}

const ItemSummaryTable = ({player, onRowSelected}: ItemSummaryTableProps) => {
    const rows: ItemSummaryTableRow[] = mapToTableRows(player)

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        const rowId = selectionModel.length > 0 ? selectionModel[0] : null
        const selectedRow = rows.find(row => row.id == rowId)
        onRowSelected(selectedRow)
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{flexGrow: 1}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        showCellRightBorder={true}
                        showColumnRightBorder={true}
                        onSelectionModelChange={onSelectionChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemSummaryTable