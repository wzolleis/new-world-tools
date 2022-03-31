import {City, CityStorage, ObjectKey} from "common/types/commonTypes";
import * as React from "react";
import {useEffect} from "react";
import {DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";
import {groupBy, sum} from "ramda";

export interface ItemSummaryTableProps {
    storages: CityStorage[]
    cities: City[]
    onRowSelected: (itemSummary: ItemSummaryTableRow | undefined) => void
}

export interface ItemSummaryTableRow {
    id: string
    name: string
    totalQuantity: number
    cityNames: string
    cities: ObjectKey[]
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
    cityKey: ObjectKey
}

const mapToSummaryData = (storages: CityStorage[]): ItemSummaryData[] => {
    return storages.flatMap(storage => {
        return {
            items: storage.items,
            city: storage.city
        }
    })
        .flatMap(v => {
            return v.items.flatMap(item => {
                return {
                    id: item.key,
                    name: item.name,
                    quantity: item.quantity,
                    cityKey: v.city
                }
            })
        })
}

const mapToTableRows = (storages: CityStorage[], cities: City[]): ItemSummaryTableRow[] => {
    const data: ItemSummaryData[] = mapToSummaryData(storages)
    const groupedByItemName: Record<string, ItemSummaryData[]> = groupBy((value) => value.name, data)
    const cityName = (item: ItemSummaryData): string => {
        return cities.find(city => city.key === item.cityKey)?.name || messages.citiesItemsTable.unknownCity
    }
    const cityNameMulti = (item: ItemSummaryData): string => `${cityName(item)}:${item.quantity}`
    return Object.keys(groupedByItemName)
        .map((itemName: string) => {
            const items: ItemSummaryData[] = groupedByItemName[itemName]
            const totalQuantity = sum(items.map(v => v.quantity))
            const cityNameFn = items.length > 1 ? cityNameMulti : cityName
            const cityNames = items.map(cityNameFn).join()
            return {
                id: itemName,
                name: itemName,
                totalQuantity,
                cityNames,
                cities: items.map(v => v.cityKey)
            }
        })
}

const ItemSummaryTable = ({storages, cities, onRowSelected}: ItemSummaryTableProps) => {
    const rows: ItemSummaryTableRow[] = mapToTableRows(storages, cities)
    const initialSelection = rows.length > 0 ? [rows[0].id] : []
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>(initialSelection);

    useEffect(() => {
        if (initialSelection.length > 0) {
            const selectedRow = rows.find(row => row.id === initialSelection[0])
            onRowSelected(selectedRow)
        }
    }, [])

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        setSelectionModel(selectionModel)
        const rowId = selectionModel.length > 0 ? selectionModel[0] : null
        const selectedRow = rows.find(row => row.id === rowId)
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
                        selectionModel={selectionModel}
                        autoHeight={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemSummaryTable