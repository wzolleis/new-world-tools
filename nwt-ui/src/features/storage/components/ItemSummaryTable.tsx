import {City, Player} from "common/types/commonTypes";
import * as React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";
import {groupBy, sum} from "ramda";

export interface ItemSummaryTableProps {
    player: Player
}

interface ItemSummaryTableRow {
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
        field: 'totalQuantity', headerName: messages.citiesItemsTable.quantity, filterable: false, editable: true
    },
    {
        field: 'cityNames', headerName: messages.citiesItemsTable.city, filterable: false, editable: true, flex: 1
    },
]

interface ItemSummaryRawData {
    id: string
    name: string
    quantity: number
    city: City
}

const mapToItemRawData = (player: Player): ItemSummaryRawData[] => {
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

const mapToTableRows = (player: Player): ItemSummaryTableRow[] => {
    const data: ItemSummaryRawData[] = mapToItemRawData(player)
    const groupedByItemName: Record<string, ItemSummaryRawData[]> = groupBy((value) => value.name, data)
    return Object.keys(groupedByItemName)
        .map((itemName: string) => {
            const items: ItemSummaryRawData[] = groupedByItemName[itemName]
            const totalQuantity = sum(items.map(v => v.quantity))
            const cityNames = items.map(v => v.city.name).join()
            return {
                id: itemName,
                name: itemName,
                totalQuantity,
                cityNames,
                cities: items.map(v => v.city)
            }
        })
}

const ItemSummaryTable = ({player}: ItemSummaryTableProps) => {
    const rows: ItemSummaryTableRow[] = mapToTableRows(player)

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
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemSummaryTable